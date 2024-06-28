import { loadFragment } from '../../scripts/scripts.js';
import ffetch from '../../scripts/ffetch.js';
import {
  addMetadata, compareVersions, fioriWebRootUrl, redirectTo404,
} from '../../scripts/utils.js';
import { getMetadata } from '../../scripts/aem.js';
import { getLatestUrl } from '../../scripts/ds-scripts.js';
import { getVersionedPathParts, renderOverviewPage } from '../simple-overview/simple-overview.js';

function correctUrlVersion(path, virtualVersion, sourceVersion) {
  if (virtualVersion === 'latest') {
    return path.replace(`v${sourceVersion}/`, '');
  }

  return path.replace(sourceVersion, virtualVersion);
}

function findVersion(version, pageVersions) {
  if (version === 'latest') {
    return pageVersions[pageVersions.length - 1];
  }

  for (let i = 0; i < pageVersions.length; i += 1) {
    const comparison = compareVersions(pageVersions[i].version, version);
    if (comparison === 0) {
      return pageVersions[i];
    }

    if (comparison > 0) {
      if (i === 0) {
        // eslint-disable-next-line no-console
        console.warn(`No version found for ${version} using the first available`);
        return pageVersions[0];
      }
      return pageVersions[i - 1];
    }
  }

  return pageVersions[pageVersions.length - 1];
}

async function fallbackOverviewPage(main, virtualVersion, candidateVersions) {
  const path = document.location.pathname;
  const data = await ffetch(`${fioriWebRootUrl}overview-pages.json`).sheet('pages').all();
  const overviewPageInfo = data.find((overviewInfo) => path.endsWith(overviewInfo.path));
  if (!overviewPageInfo) {
    console.warn('overview page info not found for path', path, data);
    return false;
  }

  const overviewLatestUrl = getLatestUrl(path, virtualVersion);

  // TODO use "breadcrumbs 1" and "breadcrumbs 2" for the filtering

  const filtered = candidateVersions
    .map((pageInfo) => {
      pageInfo.latestUrl = getLatestUrl(pageInfo.path, pageInfo.version);
      pageInfo.pathParts = getVersionedPathParts(pageInfo.path, pageInfo.version);
      return pageInfo;
    })
    .filter((pageInfo) => pageInfo.latestUrl.startsWith(overviewLatestUrl));
  const pagesInfo = Object.values(filtered
    .reduce((acc, pageInfo) => {
      const parentUrl = getLatestUrl(pageInfo.path, pageInfo.version);
      const accElement = acc[parentUrl];
      if (!accElement) {
        acc[parentUrl] = pageInfo;
      } else if (compareVersions(accElement.version, pageInfo.version) < 0) {
        acc[parentUrl] = pageInfo;
      }

      return acc;
    }, {}));

  if (pagesInfo.length === 0) {
    console.warn('No pages found for path', path, filtered, pagesInfo);
    return false;
  }
  const overviewAbsolutePathParts = getVersionedPathParts(path, virtualVersion);
  const order = await ffetch(`${fioriWebRootUrl}overview-pages.json`).sheet('order').all();
  await renderOverviewPage(
    main,
    overviewAbsolutePathParts,
    pagesInfo,
    overviewLatestUrl,
    overviewPageInfo,
    order,
  );

  return true;
}

export default async function decorate(main) {
  const doc = document;
  doc.body.classList.add('design-system', 'web-component');
  doc.head.querySelector('meta[name="template"]').setAttribute('content', 'web-component');

  const path = doc.location.pathname;

  const metaVersion = getMetadata('version');
  const virtualVersion = metaVersion || 'latest';
  const latestUrl = getLatestUrl(path, virtualVersion);

  const candidatePages = await ffetch(`${fioriWebRootUrl}query-index.json`)
    .chunks(10000)
    .filter((pageInfo) => compareVersions(virtualVersion, pageInfo.version) >= 0 && pageInfo.breadcrumbs !== '')
    .all();
  const pageVersions = candidatePages.filter(
    (row) => getLatestUrl(row.path, row.version) === latestUrl,
  );

  pageVersions.sort((a, b) => compareVersions(a.version, b.version));

  const sourceVersion = findVersion(virtualVersion, pageVersions);
  if (!sourceVersion) {
    if (!await fallbackOverviewPage(main, virtualVersion, candidatePages)) {
      await redirectTo404();
    }
    return;
  }

  document.title = sourceVersion.title;

  const metaFields = {
    targetVersionUrl: sourceVersion.path,
    breadcrumbs: sourceVersion.breadcrumbs,
  };

  if (sourceVersion.uielementstechnology) {
    metaFields.uielementstechnology = sourceVersion.uielementstechnology;
  }
  if (sourceVersion.designowner) {
    metaFields.designowner = sourceVersion.designowner;
  }
  if (sourceVersion.elementtype) {
    metaFields.elementtype = sourceVersion.elementtype;
  }
  addMetadata(metaFields, doc);

  const newMain = await loadFragment(sourceVersion.path, true);
  newMain.querySelectorAll('a').forEach((a) => {
    const href = a.getAttribute('href');
    if (href) {
      a.setAttribute('href', correctUrlVersion(href, virtualVersion, sourceVersion.version));
    }
  });

  main.replaceWith(newMain);
}
