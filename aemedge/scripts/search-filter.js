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
    <div class="header-cell">Element Type</div>
  </div>`;
  return resultHeaderTemplate;
}
function buildCardTemplate(cardObj) {
  if (cardObj?.path.endsWith('/usage') || cardObj?.path.endsWith('/style')) {
    return;
  }

  // valid url = /design-system/fiori-design-web/v1-124/ui-elements/<componentName>/
  // invalid-url = /design-system/fiori-design-web/v1-124/ui-elements/<componentName>/<subCompName>/
  if (cardObj?.path.replace('/design-system/fiori-design-web/v1-124/ui-elements/', '').split('/').length > 2) {
    return;
  }

  let introDesc = cardObj['intro-desc'] || 'Default';
  // const prefix = '/design-system/fiori-design-web/v1-124/ui-elements/';
  const defaultPath = '/design-system/images/result-overview/cards-compact.svg';
  let imageLink = cardObj.image || '';
  const hasPageTabs = cardObj['page-tabs'] !== '';
  if (hasPageTabs) {
    const newPath = `${cardObj.path}usage`;
    const card = RAW_DATA.filter(({ path }) => path === newPath);
    introDesc = card[0]?.['intro-desc'] || '';
    // imageLink = card[0]?.image;
  }
  if (imageLink?.length > 0 && imageLink !== 'https://www.sap.com/default-meta-image.png?width=1200&format=pjpg&optimize=medium') {
    try {
      const url = new URL(imageLink); // Assuming 'https://example.com' as the base URL
      imageLink = url.pathname;
    } catch (error) {
      imageLink = defaultPath; // Fallback to defaultPath in case of an invalid URL
    }
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
        <h3 class="search-result-card-title">${cardObj?.title}</h3>
        <p class="search-result-card-description">${introDesc}</p>
        <div class="d-flex justify-content-between align-items-center">
          <span class="search-result-card-tag"><span class='tech'>${cardObj?.uielementstechnology || 'Default'}</span><span class='design'>${cardObj?.designowner || 'Default'}</span><span class='type'>${cardObj?.elementtype || 'Default'}</span>
          <span class="search-result-card-status ${cardObj.elementstatus?.toLowerCase?.() || 'default'}">${capitalizeString(cardObj.elementstatus) || 'status'}</span></span>
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
  resetFilteredData();
  if (appliedFilters?.size) {
    const newFiltersObject = {};
    appliedFilters.forEach((value) => {
      const { category, filter } = value;
      if (newFiltersObject[category]) {
        newFiltersObject[category].filters.push(filter);
      } else {
        newFiltersObject[category] = { filters: [filter] };
      }
    });

    RAW_FILTERED_DATA = RAW_FILTERED_DATA.filter((item) => {
      let isMatch = true;
      Object.entries(newFiltersObject).forEach((value) => {
        const [category, val] = value;
        if (!val.filters.includes(item[category])) {
          isMatch = false;
        }
      });

      return isMatch;
    });
  } else {
    resetFilteredData();
  }
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
