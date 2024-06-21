let RAW_DATA = [];
let RAW_FILTERED_DATA = [];
let LATEST_VERSION = [];

export async function fetchData(url) {
  let responseData;
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json.data;
  } catch (err) {
    // todo: handle error here
    responseData = [];
  }
  return responseData;
}

export async function getLatestVersion() {
  // todo: get it dynamically
  return '1-124';
}

export function getRawData() {
  return RAW_DATA;
}

export function getRawFilteredData() {
  return RAW_FILTERED_DATA;
}

// filter the raw data with latest version
function fitlerData() {
  return RAW_DATA?.filter((item) => {
    const segments = item.path.split('/').filter(Boolean);
    const uiElementsIndex = segments.findIndex((segment) => segment === 'ui-elements');
    const isValidPath = uiElementsIndex !== -1;
    return (item.version === LATEST_VERSION) && isValidPath;
  });
}

// fetch and filter the json data
export async function fetchAndFilterData(dataUrl) {
  RAW_DATA = await fetchData(dataUrl);
  LATEST_VERSION = await getLatestVersion();
  RAW_FILTERED_DATA = fitlerData();
  return RAW_FILTERED_DATA;
}
function appendCardListeners(wrapper) {
  const cards = wrapper.querySelectorAll('.search-result-card');
  cards.forEach((card) => {
    const link = card.querySelector('.search-result-card-link');
    card.addEventListener('click', () => {
      link.click();
    });
  });
}
export function resetFilteredData() {
  RAW_FILTERED_DATA = fitlerData();
}
function capitalizeString(str) {
  if (!str || typeof str !== 'string') {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function buildResultHeader() {
  const resultHeaderTemplate = `<div class="header-row">
    <div class="header-cell">Title</div>
    <div class="header-cell">Design owning area</div>
    <div class="header-cell">Technology</div>
    <div class="header-cell">Status</div>
  </div>`;
  return resultHeaderTemplate;
}
function buildCardTemplate(cardObj) {
  if (cardObj?.path.endsWith('/usage')) {
    return;
  }

  // valid url = /design-system/fiori-design-web/v1-124/ui-elements/<componentName>/
  // invalid-url = /design-system/fiori-design-web/v1-124/ui-elements/<componentName>/<subCompName>/
  if (cardObj?.path.replace('/design-system/fiori-design-web/v1-124/ui-elements/', '').split('/').length > 2) {
    return;
  }

  let introDesc = cardObj['intro-desc'] || 'Default';
  const prefix = '/design-system/fiori-design-web/v1-124/ui-elements/';
  const defaultPath = '/design-system/images/result-overview/cards-compact.svg';
  let imageLink = cardObj['intro-img'] || '';
  const hasPageTabs = cardObj['page-tabs'] !== '';
  if (hasPageTabs) {
    const newPath = `${cardObj.path}usage`;
    const card = RAW_DATA.filter(({ path }) => path === newPath);
    introDesc = card[0]?.['intro-desc'] || '';
    imageLink = card[0]?.['intro-img'];
  }
  if (imageLink?.length > 0) {
    const responsePath = imageLink.substr(imageLink.indexOf('/') + 1, imageLink.length);
    imageLink = prefix + responsePath;
  } else {
    imageLink = defaultPath;
  }

  // eslint-disable-next-line consistent-return
  return `
    <div class="search-result-card">
      <div class="search-result-card-head">
        <img src="${imageLink}" />
      </div>
      <div class="search-result-card-content">
        <h2><span>${cardObj?.designowner || 'Default'}</span></h2>
        <h3 class="search-result-card-title">${cardObj?.title}</h3>
        <p class="search-result-card-description">${introDesc}</p>
        <div class="d-flex justify-content-between align-items-center">
          <span class="search-result-card-tag"><span>${cardObj?.uielementstechnology || 'Default'}</span></span>
          <span class="search-result-card-status ${cardObj.elementstatus?.toLowerCase?.() || 'default'}">${capitalizeString(cardObj.elementstatus) || 'status'}</span>
        </div>
      </div>
      <a href="${cardObj?.path}" class="search-result-card-link"></a>
    </div>
  `;
}
export function updateCardsFromFilteredRawData() {
  const wrapper = document.querySelector('.search-result-cards-wrapper');
  wrapper.innerHTML = '';
  const resultHeader = buildResultHeader();
  wrapper.innerHTML = resultHeader + RAW_FILTERED_DATA.map(buildCardTemplate).join('');
  appendCardListeners(wrapper);
  return wrapper;
}

export function applySelectedFilters(appliedFilters) {
  if (appliedFilters?.size) {
    appliedFilters.forEach((item) => {
      const { category, filter } = item;
      RAW_FILTERED_DATA = RAW_FILTERED_DATA.filter((data) => data[category] === filter);
    });
  } else {
    resetFilteredData();
  }
  updateCardsFromFilteredRawData();
}

export function applySearchKeyOnFilteredData(searchText) {
  if (searchText.length === 0) {
    resetFilteredData();
  }
  RAW_FILTERED_DATA = RAW_FILTERED_DATA?.filter((item) => {
    const titleLowerCase = item.title?.toLocaleLowerCase() || '';
    return titleLowerCase?.includes(searchText);
  });
  updateCardsFromFilteredRawData();
}

export function buildCardsFromFilteredRawData(resultData) {
  const wrapper = document.createElement('div');
  wrapper.className = 'search-result-cards-wrapper grid-view';
  const resultHeader = buildResultHeader();
  if (resultData?.length) {
    wrapper.innerHTML = resultHeader + resultData.map(buildCardTemplate).join('');
  } else {
    wrapper.innerHTML = resultHeader + RAW_FILTERED_DATA.map(buildCardTemplate).join('');
  }
  appendCardListeners(wrapper);
  return wrapper;
}
