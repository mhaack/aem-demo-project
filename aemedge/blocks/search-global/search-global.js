import { buildBlock, decorateBlock, loadBlock } from '../../scripts/aem.js';
import {
  a, div, h1, h3, h4, p, span,
} from '../../scripts/dom-builder.js';
import { getLatestVersion } from '../../scripts/ds-scripts.js';

let RAW_SEARCH_DATA = [];
let FILTERED_SEARCH_DATA = [];

async function fetchPageSearchData() {
  const response = await fetch('/design-system/query-index.json?limit=10000');
  const resData = await response.json();
  RAW_SEARCH_DATA = [...resData.data];
}

async function filterDataWithSearchText(searchText) {
  const categoriesWeb = ['Discover', 'Foundations', 'UI Elements', 'Floor Plans', 'Resources', 'Learning', 'Community', 'Support'];
  const categoriesIos = ['Discover', 'Foundations', 'UI Elements', 'Page Types', 'Resources', 'SAP Fiori watchOS', 'CarPlay Design', 'Design Services', 'How to Contribute'];
  const categoriesAndroid = ['Discover', 'Foundations', 'UI Elements', 'Resources', 'SAP Fiori for Wear OS', 'Android Auto Design', 'Design Services', 'How to Contribute'];
  let mainCategories = [...categoriesWeb];
  if (window.location.pathname.includes('ios')) {
    mainCategories = [...categoriesIos];
  } else if (window.location.pathname.includes('android')) {
    mainCategories = [...categoriesAndroid];
  }
  RAW_SEARCH_DATA.forEach((item) => {
    const breadcrumbs = item.breadcrumbs.split(' / ');
    const category = mainCategories.find((cat) => breadcrumbs.includes(cat));
    item.category = category || 'Other';
  });
  const categorizedData = RAW_SEARCH_DATA.sort((obj1, obj2) => {
    const firstCat = obj1.category;
    const secondCat = obj2.category;
    return firstCat.localeCompare(secondCat);
  });
  // filter data based on application type and version
  const [, , appType] = window.location.pathname.split('/');
  let appVersion = await getLatestVersion();
  if ((appType.indexOf('android') > -1) || (appType.indexOf('ios') > -1)) {
    appVersion = '';
  }
  const pathParam = appVersion?.length ? `${appType}/v${appVersion}` : appType;
  FILTERED_SEARCH_DATA = categorizedData.filter(({ title, path }) => {
    const hasSearchText = title.toLowerCase().includes(searchText.toLowerCase());
    return path.includes(pathParam) && hasSearchText;
  });
}

async function buildSearchResultTiles() {
  const htmlResponse = div({ class: 'results-container' });
  FILTERED_SEARCH_DATA.forEach(async (tileInfo) => {
    const block = buildBlock('tiles', div(
      p({ class: 'category' }, tileInfo.category),
      h4(tileInfo.title),
      p(tileInfo['intro-desc']),
      a({ href: tileInfo.path }, span(tileInfo.path)),
    ));
    // eslint-disable-next-line no-unused-vars
    const blockWrapper = div({}, block);
    decorateBlock(block);
    await loadBlock(block).then((res) => htmlResponse.append(res));
  });
  return htmlResponse;
}

export default async function decorate(block) {
  await fetchPageSearchData();
  const searchParams = new URLSearchParams(window.location.search);
  const searchText = searchParams.get('q');
  await filterDataWithSearchText(searchText);
  if (FILTERED_SEARCH_DATA.length) {
    const resultsFor = h1(`Showing results for "${searchText}"`);
    const resultsCount = p({ class: 'results-count' }, `${FILTERED_SEARCH_DATA.length} results`);
    block.append(resultsFor);
    block.append(resultsCount);
    block.append(await buildSearchResultTiles());
  } else {
    const noResults = div(
      { class: 'no-search-results' },
      h1('Sorry, no search results were found'),
      h3('Make sure that all words were spelled correctly, or search for a new keyword'),
    );
    block.append(noResults);
  }
}
