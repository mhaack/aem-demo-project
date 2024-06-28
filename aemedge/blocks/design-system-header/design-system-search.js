import { decorateIcons, getMetadata } from '../../scripts/aem.js';
import {
  a,
  button,
  div,
  fieldset,
  form,
  input,
  p,
  span,
} from '../../scripts/dom-builder.js';
import { getLatestVersion } from '../../scripts/ds-scripts.js';

let RAW_SEARCH_DATA = [];

function getIconName(category) {
  if (category === 'UI Elements') return 'icon icon-ui-elements';
  if (category === 'CarPlay Design') return 'icon icon-carplay-design';
  if (category?.length) {
    return `icon icon-${category.toLowerCase()}`;
  }
  return 'icon icon-menu';
}
/**
 * create search results html data from the response data
 */
function buildSearchResults(resultsData) {
  const resultsContainer = document.querySelector('.search-form-results');
  resultsContainer.innerHTML = '';
  let currentCategory = '';
  resultsData.forEach(({ title, path, category: categoryName }) => {
    const resultItem = div({ class: 'result-item' }, a({ href: path }, title));
    if (currentCategory !== categoryName) {
      currentCategory = categoryName;

      const category = div(
        { class: 'category' },
        span(
          { class: getIconName(categoryName) },
          categoryName,
        ),
      );
      resultsContainer.appendChild(category);
    }
    resultsContainer.appendChild(resultItem);
  });
  decorateIcons(resultsContainer);
}

function updateSearchResults(searchText) {
  if (searchText.length === 0) {
    buildSearchResults(RAW_SEARCH_DATA);
  } else {
    const rawData = [...RAW_SEARCH_DATA];
    const filteredData = rawData.filter((item) => {
      const itemTitle = item.title.toLowerCase();
      return itemTitle.includes(searchText.toLowerCase());
    });
    const resultsContainer = document.querySelector('.search-form-results');
    resultsContainer.innerHTML = '';
    let currentCategory = '';
    if (filteredData.length === 0) {
      resultsContainer.appendChild(p({ class: 'empty-results' }, 'No results found'));
    } else {
      filteredData.forEach(({ title, path, category: categoryName }) => {
        const startIndex = title.toLowerCase().indexOf(searchText.toLowerCase());
        const replaceStr = title.substring(startIndex, startIndex + searchText.length);
        const highlightedText = title.replace(replaceStr, `<strong>${replaceStr}</strong>`);
        const linkItem = a({ href: path });
        linkItem.innerHTML = highlightedText;
        const resultItem = div({ class: 'result-item' }, linkItem);
        if (currentCategory !== categoryName) {
          currentCategory = categoryName;
          const category = div(
            { class: 'category' },
            span(
              { class: getIconName(categoryName) },
              categoryName,
            ),
          );
          resultsContainer.appendChild(category);
        }
        resultsContainer.appendChild(resultItem);
      });
      decorateIcons(resultsContainer);
    }
  }
}

/**
 * Add the search form.
 * TODO: Search implementation is WIP
 * @param mastheadSearch {HTMLElement} The search section.
 */
function addSearchForm(mastheadSearch) {
  let action = '/design-system/fiori-design-web/search';
  if (window.location.pathname.includes('/design-system/fiori-design-ios')) {
    action = '/design-system/fiori-design-ios/search';
  } else if (window.location.pathname.includes('/design-system/fiori-design-android')) {
    action = '/design-system/fiori-design-android/search';
  }
  const searchForm = form({
    action,
    class: 'search-form',
    id: 'search-form',
    name: 'search-form',
    method: 'get',
  });

  const searchInput = fieldset({
    class: 'search-form-fieldset search-form-fieldset-input',
  }, input({
    class: 'search-input',
    id: 'search-input',
    name: 'q',
    placeholder: 'Search across SAP Design System for Web',
    type: 'search',
    onsearch: (event) => {
      const searchText = event.target.value;
      if (searchText.trim().length === 0) {
        updateSearchResults('');
      }
    },
    onkeyup: (event) => {
      const searchText = event.target;
      const searchResults = searchText.parentNode.nextSibling.nextSibling;
      if (searchText.value === '') {
        searchResults.classList.remove('open');
      } else {
        searchResults.classList.add('open');
      }
      updateSearchResults(searchText.value);
    },
  }));

  // TODO: Reset button and voice search button (Frontify)
  // TODO: Reset button only visible when input is not empty (+ aria-hidden)
  // const searchFormButtons = fieldset({
  //   class: 'search-form-fieldset search-form-fieldset-buttons',
  // }, button({
  //   class: 'search-form-btn search-form-reset-btn',
  //   label: 'Reset',
  //   type: 'reset',
  //   onclick: () => {
  //     document.getElementById('search-input').focus();
  //   },
  // }, span({
  //   class: 'icon icon-x',
  // })), button({
  //   class: 'search-form-btn search-form-submit-btn',
  //   label: 'Voice Search',
  //   type: 'submit',
  // }, span({
  //   class: 'icon icon-microphone',
  // })), button({
  //   class: 'search-form-btn search-form-submit-btn',
  //   label: 'Search',
  //   type: 'submit',
  // }, span({
  //   class: 'icon icon-search',
  // })));

  const searchFormButtons = fieldset({
    class: 'search-form-fieldset search-form-fieldset-buttons',
  }, button({
    class: 'search-form-btn search-form-submit-btn',
    label: 'Search',
    type: 'submit',
  }, span({
    class: 'icon icon-search',
  })));

  const searchFormResultsList = div({ class: 'search-form-results' });

  searchForm.appendChild(searchInput);
  searchForm.appendChild(searchFormButtons);
  searchForm.appendChild(searchFormResultsList);
  mastheadSearch.appendChild(searchForm);
}

async function filterDataWithCategories() {
  // assign categories to result data
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
    item.category = category || 'Other'; // Assign "Unknown" if no category matches
  });
  const categorizedData = RAW_SEARCH_DATA.sort((c, b) => c.category.localeCompare(b.category));
  // filter data based on application type and version
  const [, , appType] = window.location.pathname.split('/');
  let appVersion = await getLatestVersion();
  if ((appType.indexOf('android') > -1) || (appType.indexOf('ios') > -1)) {
    appVersion = '';
  }
  const pathParam = appVersion?.length ? `${appType}/v${appVersion}` : appType;
  RAW_SEARCH_DATA = categorizedData.filter((item) => item.path.includes(pathParam));
}

async function fetchPageSearchData() {
  await fetch('/design-system/query-index.json?limit=10000')
    .then((response) => response.json())
    .then((resData) => {
      RAW_SEARCH_DATA = [...resData.data];
    });
}

export default async function init(block, mastheadSearch) {
  await fetchPageSearchData();
  await filterDataWithCategories();
  addSearchForm(mastheadSearch);
  const template = getMetadata('template');
  if (template !== 'landing-page') {
    addSearchForm(mastheadSearch);
  }
  buildSearchResults(RAW_SEARCH_DATA);
}
