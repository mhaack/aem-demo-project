import { loadFragment } from '../../scripts/scripts.js';
import ffetch from '../../scripts/ffetch.js';
import {
  a as aElem, div, h1, h2, meta, p,
} from '../../scripts/dom-builder.js';
import { compareVersions, fioriWebRootUrl } from '../../scripts/utils.js';
import {
  buildBlock, getMetadata, loadCSS, toClassName,
} from '../../scripts/aem.js';

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

function breadcrumbsMatch(breadcrumbs, pathSections) {
  const breadcrumbSections = breadcrumbs.split(' / ');
  if (breadcrumbSections.length < pathSections.length) {
    return false;
  }

  for (let i = 0; i < pathSections.length; i += 1) {
    if (toClassName(breadcrumbSections[i]) !== pathSections[i]) {
      return false;
    }
  }

  return true;
}

function fallbackVersioning(doc, virtualVersion, candidateVersions) {
  const path = doc.location.pathname;

  const latestUrlParts = getLatestUrl(path, virtualVersion).split('/').slice(3);

  if (latestUrlParts.length !== 3 || latestUrlParts[2] !== '') {
    return false;
  }

  // TODO use "breadcrumbs 1" and "breadcrumbs 2" for the filtering

  const pathSections = latestUrlParts.slice(0, 2);
  const pagesInfo = Object.values(candidateVersions
    .filter((pageInfo) => breadcrumbsMatch(pageInfo.breadcrumbs, pathSections))
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
    return false;
  }

  // eslint-disable-next-line max-len
  const [firstSectionPages, otherSectionPages] = pagesInfo.reduce(([firstSection, sections], pageInfo) => {
    const splitBreadcrumbs = pageInfo.breadcrumbs.split(' / ');
    if (splitBreadcrumbs.length === pathSections.length + 1) {
      firstSection.push(pageInfo);
    } else {
      sections.push(pageInfo);
    }

    return [firstSection, sections];
  }, [[], []]);

  const pageBreadcrumbsComponents = pagesInfo[0].breadcrumbs.split(' / ').slice(0, 2);
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

  const sections = Object.entries(otherSectionPages.reduce((acc, pageInfo) => {
    const thirdBreadcrumb = pageInfo.breadcrumbs.split(' / ')[2];
    const accElem = acc[thirdBreadcrumb];
    if (accElem) {
      accElem.push(pageInfo);
    } else {
      acc[thirdBreadcrumb] = [pageInfo];
    }

    return acc;
  }, {})).map(([title, sectionPages]) => div(
    h2(title),
    buildBlock('tiles', sectionPages.map((pageInfo) => [
      div(
        p(title),
        p(pageInfo.title),
        p(pageInfo['intro-desc']),
      ),
    ])),
  ));

  const heroBlock = buildBlock('design-system-hero', [[h1(pageTitle)]]);
  const firstLevelPageCards = buildBlock('tiles', firstSectionPages.map((pageInfo) => [div(
    p(pageInfo.title),
    p(pageInfo['intro-desc']),
    aElem({ href: pageInfo.path }, 'Learn more'),
  )]));
  if (sections.length > 0) {
    main.replaceChildren(
      div(
        heroBlock,
        h2('Overview'),
        firstLevelPageCards,
      ),
      ...sections,
    );
  } else {
    main.replaceChildren(
      div(heroBlock),
      div(firstLevelPageCards),
    );
  }

  return true;
}

async function decorate(doc) {
  doc.body.classList.add('design-system', 'web-component');
  doc.head.querySelector('meta[name="template"]').setAttribute('content', 'web-component');

  const path = doc.location.pathname;

  const metaVersion = getMetadata('version');
  const virtualVersion = metaVersion || 'latest';
  const latestUrl = getLatestUrl(path, virtualVersion);

  const candidatePages = await ffetch(`${fioriWebRootUrl}query-index.json`).chunks(10000).filter((pageInfo) => compareVersions(virtualVersion, pageInfo.version) >= 0).all();
  const pageVersions = candidatePages.filter(
    (row) => getLatestUrl(row.path, row.version) === latestUrl,
  );

  pageVersions.sort((a, b) => compareVersions(a.version, b.version));

  const sourceVersion = findVersion(virtualVersion, pageVersions);
  if (!sourceVersion) {
    if (!fallbackVersioning(doc, virtualVersion, candidatePages)) {
      doc.location.href = '/404';
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
