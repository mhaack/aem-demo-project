import { loadFragment } from '../../scripts/scripts.js';
import ffetch from '../../scripts/ffetch.js';
import {
  a as aElem,
  div,
  h1,
  h2,
  meta,
  p,
} from '../../scripts/dom-builder.js';
import {
  compareVersions,
  fioriWebRootUrl,
  redirectTo404,
} from '../../scripts/utils.js';
import {
  buildBlock,
  getMetadata,
  loadCSS,
} from '../../scripts/aem.js';

function comparePathPriority(order, pathA, pathB) {
  const aPriority = order.find((o) => o.path === pathA)?.priority || 0;
  const bPriority = order.find((o) => o.path === pathB)?.priority || 0;
  return bPriority - aPriority;
}

class Section {
  prefix;

  title;

  pagesInfo = [];

  constructor(relativePath, title, pagesInfo = []) {
    this.relativePath = `/${relativePath}/`;
    this.title = title;
    this.pagesInfo = pagesInfo;
  }

  addPageInfo(pageInfo) {
    this.pagesInfo.push(pageInfo);
  }

  render(order) {
    this.pagesInfo.sort((a, b) => {
      const pathA = this.getPageRelativePath(a);
      const pathB = this.getPageRelativePath(b);
      return comparePathPriority(order, pathA, pathB);
    });

    const tiles = buildBlock('tiles', this.pagesInfo.map((pageInfo) => [
      div(
        p(this.title),
        aElem({ href: pageInfo.path }, p(pageInfo.title)),
        p(pageInfo['intro-desc']),
      ),
    ]));
    tiles.classList.add('overview');

    if (this.title) {
      return div(
        h2(this.title),
        tiles,
      );
    }

    return div(tiles);
  }

  getPageRelativePath(pageInfo) {
    const { latestUrl } = pageInfo;
    return latestUrl.substring(latestUrl.indexOf(this.relativePath));
  }
}

function getLatestUrl(path, virtualVersion) {
  if (virtualVersion === 'latest') {
    return path;
  }

  return path.replace(`v${virtualVersion}/`, '');
}

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

function addMetadata(metaFields, doc) {
  Object.entries(metaFields).forEach(([name, content]) => {
    const metaField = meta({
      name,
      content,
    });
    doc.head.append(metaField);
  });
}

function getPathParts(path, virtualVersion) {
  return getLatestUrl(path, virtualVersion).split('/').filter((part) => part !== '');
}

async function fallbackOverviewPage(doc, virtualVersion, candidateVersions) {
  const path = doc.location.pathname;
  const data = await ffetch(`${fioriWebRootUrl}overview-pages.json`).sheet('pages').all();
  const overviewPageInfo = data.find((overviewInfo) => path.endsWith(overviewInfo.path));
  if (!overviewPageInfo) {
    // eslint-disable-next-line no-console
    console.warn('overview page info not found for path', path, data);
    return false;
  }

  const overviewLatestUrl = getLatestUrl(path, virtualVersion);

  // TODO use "breadcrumbs 1" and "breadcrumbs 2" for the filtering

  const filtered = candidateVersions
    .map((pageInfo) => {
      pageInfo.latestUrl = getLatestUrl(pageInfo.path, pageInfo.version);
      pageInfo.pathParts = getPathParts(pageInfo.path, pageInfo.version);
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
    // eslint-disable-next-line no-console
    console.warn('No pages found for path', path, filtered, pagesInfo);
    return false;
  }

  const overviewAbsolutePathParts = getPathParts(path, virtualVersion);
  const fioriParts = getPathParts(fioriWebRootUrl, '');

  // eslint-disable-next-line max-len
  const [firstLevelPages, otherSectionPages] = pagesInfo.reduce(([firstSection, sections], pageInfo) => {
    if (pageInfo.pathParts.length === overviewAbsolutePathParts.length + 1) {
      firstSection.push(pageInfo);
    } else {
      sections.push(pageInfo);
    }

    return [firstSection, sections];
  }, [[], []]);

  const overviewIndex = firstLevelPages
    .findIndex((pageInfo) => pageInfo.latestUrl === overviewLatestUrl + overviewPageInfo.overview);
  const overviewSectionPage = firstLevelPages[overviewIndex];
  if (overviewIndex !== -1) {
    firstLevelPages.splice(overviewIndex, 1);
  }

  const pageBreadcrumbsComponents = pagesInfo[0].breadcrumbs.split(' / ')
    .slice(0, overviewAbsolutePathParts.length);
  const pageTitle = pageBreadcrumbsComponents[1];

  const metaFields = {
    breadcrumbs: pageBreadcrumbsComponents.join(' / '),
    title: pageTitle,
    pagetype: 'main',
  };
  addMetadata(metaFields, doc);

  const main = doc.querySelector('main');

  loadCSS(`${window.hlx.codeBasePath}/templates/web-component/web-component.css`);
  loadCSS(`${window.hlx.codeBasePath}/styles/design-system/overview.css`);

  const breadcrumbsElementNumber = overviewAbsolutePathParts.length - fioriParts.length;
  const sectionObjects = Object.values(otherSectionPages.reduce((acc, pageInfo) => {
    const title = pageInfo.breadcrumbs
      .split('/')
      .map((part) => part.trim())[breadcrumbsElementNumber];

    let accElem = acc[title];
    if (!accElem) {
      // eslint-disable-next-line max-len
      accElem = new Section(pageInfo.pathParts.slice(breadcrumbsElementNumber, breadcrumbsElementNumber + overviewAbsolutePathParts.length - 1)
        .join('/'), title);
      acc[title] = accElem;
    }

    accElem.addPageInfo(pageInfo);

    return acc;
  }, {}));
  if (sectionObjects.length === 0 && !overviewSectionPage) {
    sectionObjects.push(new Section(overviewPageInfo.path, '', firstLevelPages));
  } else {
    sectionObjects.push(...firstLevelPages.map((pageInfo) => {
      const startRelativePath = pageInfo.latestUrl.indexOf(overviewPageInfo.path);
      const relativePath = pageInfo.latestUrl.substring(startRelativePath);
      return new Section(relativePath, pageInfo.title, [pageInfo]);
    }));
  }

  const order = await ffetch(`${fioriWebRootUrl}overview-pages.json`).sheet('order').all();
  sectionObjects.sort((a, b) => comparePathPriority(order, a.relativePath, b.relativePath));

  let overviewSection = null;

  if (overviewSectionPage) {
    const overviewTitle = h2('Overview');
    const block = buildBlock('tiles', [[div(
      p(overviewSectionPage.title),
      p(overviewSectionPage['intro-desc']),
      aElem({ href: overviewSectionPage.path }, 'Learn more'),
    )]]);
    block.classList.add('overview');
    overviewSection = div(
      overviewTitle,
      block,
    );
  }

  main.replaceChildren(div(
    buildBlock('design-system-hero', [[h1(pageTitle)]]),
  ));

  if (overviewSection) {
    main.append(overviewSection);
  }

  main.append(
    ...(sectionObjects.map((section) => section.render(order))),
  );

  return true;
}

async function decorate(doc) {
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
    if (!await fallbackOverviewPage(doc, virtualVersion, candidatePages)) {
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

  const main = doc.querySelector('main');
  const newMain = await loadFragment(sourceVersion.path, true);
  newMain.querySelectorAll('a').forEach((a) => {
    const href = a.getAttribute('href');
    if (href) {
      a.setAttribute('href', correctUrlVersion(href, virtualVersion, sourceVersion.version));
    }
  });

  main.replaceWith(newMain);
}

await decorate(document);
