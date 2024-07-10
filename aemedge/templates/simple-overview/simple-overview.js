import {
  a as aElem, div, h1, h2, p,
} from '../../scripts/dom-builder.js';
import { buildBlock, getMetadata, loadCSS } from '../../scripts/aem.js';
import { addMetadata, fioriWebRootUrl, redirectTo404 } from '../../scripts/utils.js';
import ffetch from '../../scripts/ffetch.js';
import { getSitePlatform } from '../../scripts/ds-scripts.js';

function comparePathPriority(order, pathA, pathB) {
  const aPriority = order.find((o) => o.path === pathA)?.priority || 0;
  const bPriority = order.find((o) => o.path === pathB)?.priority || 0;
  return bPriority - aPriority;
}

class Section {
  prefix;

  relativePath;

  title;

  subtitle;

  pagesInfo = [];

  constructor(relativePath, title, pagesInfo = [], subtitle = null) {
    this.relativePath = `/${relativePath}/`;
    this.title = title;
    this.subtitle = subtitle || title;
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
        p(this.subtitle),
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

export function getPathParts(path) {
  return path.split('/').filter((part) => part !== '');
}

// eslint-disable-next-line max-len
export async function renderOverviewPage(main, overviewAbsolutePathParts, pageCandidates, overviewLatestUrl, overviewPageInfo, order) {
  const pagesInfo = pageCandidates
    .filter((pageInfo) => pageInfo.latestUrl.startsWith(overviewLatestUrl))
    .filter((pageInfo) => pageInfo.breadcrumbs !== '');
  const overviewPageInfoRelativePath = overviewPageInfo.path;
  const overviewPageInfoOverviewPage = overviewPageInfo.overview;

  // eslint-disable-next-line max-len
  const [firstLevelPages, otherSectionPages] = pagesInfo.reduce(([firstSection, sections], pageInfo) => {
    if (pageInfo.pathParts.length === overviewAbsolutePathParts.length + 1) {
      firstSection.push(pageInfo);
    } else {
      sections.push(pageInfo);
    }

    return [firstSection, sections];
  }, [[], []]);

  const overviewIndex = firstLevelPages.findIndex(
    (pageInfo) => pageInfo.latestUrl === overviewLatestUrl + overviewPageInfoOverviewPage,
  );
  const overviewSectionPage = firstLevelPages[overviewIndex];
  if (overviewIndex !== -1) {
    firstLevelPages.splice(overviewIndex, 1);
  }

  const overviewRelativePathParts = getPathParts(overviewPageInfoRelativePath);

  const pageBreadcrumbsComponents = pagesInfo[0].breadcrumbs.split(' / ').slice(0, overviewRelativePathParts.length);
  const pageTitle = pageBreadcrumbsComponents[pageBreadcrumbsComponents.length - 1];

  const metaFields = {
    breadcrumbs: pageBreadcrumbsComponents.join(' / '),
    title: pageTitle,
    pagetype: 'main',
  };
  addMetadata(metaFields, document);

  loadCSS(`${window.hlx.codeBasePath}/templates/web-component/web-component.css`);
  loadCSS(`${window.hlx.codeBasePath}/styles/design-system/overview.css`);

  const fioriPartsLength = getPathParts(fioriWebRootUrl, '').length;
  const breadcrumbsElementNumber = overviewAbsolutePathParts.length - fioriPartsLength;
  const sectionObjects = Object.values(otherSectionPages.reduce((acc, pageInfo) => {
    const title = pageInfo.breadcrumbs
      .split('/')
      .map((part) => part.trim())[breadcrumbsElementNumber];

    let accElem = acc[title];
    if (!accElem) {
      const relativePath = pageInfo.pathParts.slice(breadcrumbsElementNumber, breadcrumbsElementNumber + overviewAbsolutePathParts.length - 1).join('/');
      accElem = new Section(relativePath, title);
      acc[title] = accElem;
    }

    accElem.addPageInfo(pageInfo);

    return acc;
  }, {}));

  if (sectionObjects.length === 0 && !overviewSectionPage) {
    sectionObjects.push(new Section(overviewPageInfoRelativePath, '', firstLevelPages, pageTitle));
  } else {
    sectionObjects.push(...firstLevelPages.map((pageInfo) => {
      const startRelativePath = pageInfo.latestUrl.indexOf(overviewPageInfoRelativePath);
      const relativePath = pageInfo.latestUrl.substring(startRelativePath);
      return new Section(relativePath, pageInfo.title, [pageInfo], pageTitle);
    }));
  }

  sectionObjects.sort((a, b) => comparePathPriority(order, a.relativePath, b.relativePath));

  let overviewSection = null;
  if (overviewSectionPage) {
    const overviewTitle = h2('Overview');
    const block = buildBlock('tiles', [[div(
      p(getMetadata('title')),
      p(overviewSectionPage.title),
      p(overviewSectionPage['intro-desc']),
      aElem({ href: overviewSectionPage.path }),
    )]]);
    block.classList.add('overview');
    block.classList.add('full-width');
    overviewSection = div(
      overviewTitle,
      block,
    );
    overviewSection.classList.add('highlight');
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
}

export default async function decorate(main) {
  loadCSS(`${window.hlx.codeBasePath}/templates/web-component/web-component.css`);
  loadCSS(`${window.hlx.codeBasePath}/styles/design-system/overview.css`);

  const path = document.location.pathname;
  const overviewAbsolutePathParts = getPathParts(path);

  const platform = getSitePlatform();
  const candidatePages = await ffetch('/design-system/query-index.json')
    .chunks(10000)
    .filter((pageInfo) => pageInfo.path.startsWith(`/design-system/fiori-design-${platform}`))
    .map((pageInfo) => {
      pageInfo.latestUrl = pageInfo.path;
      pageInfo.pathParts = getPathParts(pageInfo.path);
      return pageInfo;
    })
    .all();

  const data = await ffetch(`/design-system/fiori-design-${platform}/overview-pages.json`)
    .sheet('pages')
    .all();
  const overviewPageInfo = data.find((overviewInfo) => path.endsWith(overviewInfo.path));
  if (!overviewPageInfo) {
    console.warn('overview page info not found for path', path, data);
    await redirectTo404();
    return;
  }

  const order = await ffetch(`/design-system/fiori-design-${platform}/overview-pages.json`)
    .sheet('order')
    .all();

  await renderOverviewPage(
    main,
    overviewAbsolutePathParts,
    candidatePages,
    path,
    overviewPageInfo,
    order,
  );
}
