// import searchIndexData from './mock.js';
import {
  ul, li, span,
  div,
  button,
} from '../../scripts/dom-builder.js';
import {
  applySearchKeyOnFilteredData,
  buildCardsFromFilteredRawData, fetchAndFilterData, getRawFilteredData,
  updateCardsFromFilteredRawData,
} from '../../scripts/search-filter.js';

function createSearchBox() {
  const searchBoxTemplate = `
  <form class="ui-search-form" id="ui-search-form">
    <input type="text" class="ui-search-input" id="ui-search-input" placeholder="Search UI Elements">
  </form>
  `;
  const searchBoxWrapper = document.createElement('div');
  searchBoxWrapper.innerHTML = searchBoxTemplate;
  return searchBoxWrapper;
}

function performSearch(event) {
  event.preventDefault();
  const searchInput = document.getElementById('ui-search-input');
  const searchText = searchInput.value?.toLocaleLowerCase?.();
  // to get rid of eslint error, intentionally making this function in multi lines
  applySearchKeyOnFilteredData(searchText);
}

function searchHandler() {
  const searchForm = document.getElementById('ui-search-form');
  searchForm.addEventListener('submit', performSearch);

  const searchInput = document.getElementById('ui-search-input');
  searchInput.addEventListener('keyup', performSearch);
}

function delegateEvents() {
  searchHandler();
}

function buildToggle() {
  const toggleBtn = span({ class: 'buttons' });
  const gridBtn = button({ class: 'switch-view grid active', type: 'button' });
  const listBtn = button({ class: 'switch-view list', type: 'button' });
  toggleBtn.append(gridBtn, listBtn);
  return toggleBtn;
}

function sort(data, criterion) {
  switch (criterion) {
    case 'A - Z':
      // eslint-disable-next-line max-len, max-len
      return data.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
    case 'Z - A':
      // eslint-disable-next-line max-len
      return data.sort((a, b) => b.title.toLowerCase().localeCompare(a.title.toLowerCase()));
    default: return data;
  }
}

export function buildNewCards(data, criterion) {
  sort(data, criterion);
  updateCardsFromFilteredRawData();
}

function decorateSearchResultItems() {
  const searchResultItems = div({ class: 'search-result-items' });
  const searchResultContainer = document.querySelector('.search-result-container');

  const sortEl = div({ class: 'sort' }, 'Sort by: ', span({ class: 'sort-az' }, 'A - Z'));

  searchResultItems.append(sortEl);

  const dropdown = ul(
    { class: 'dropdown', role: 'menu' },
    li({ role: 'menuitem', class: 'sort-option active', 'sort-criterion': 'A - Z' }, span('A - Z')),
    li({ role: 'menuitem', class: 'sort-option', 'sort-criterion': 'Z - A' }, span('Z - A')),
  );

  const toggle = buildToggle();
  sortEl.append(dropdown, toggle);
  searchResultContainer.prepend(searchResultItems);

  const sortAZ = document.querySelector('.sort-az');
  sortAZ.addEventListener('click', () => {
    sortAZ.parentElement.classList.toggle('active');
    dropdown.classList.toggle('show');
  });

  const sortOptions = document.querySelectorAll('.sort-option');
  sortOptions.forEach((option) => {
    option.addEventListener('click', (event) => {
      const target = event.currentTarget;
      const selectedOption = target.getAttribute('sort-criterion');
      sortAZ.textContent = target.textContent;
      dropdown.classList.remove('show');
      sortAZ.parentElement.classList.remove('active');
      sortOptions.forEach((el) => el.classList.remove('active'));
      target.classList.add('active');
      const data = getRawFilteredData();
      buildNewCards(data, selectedOption);
    });
  });

  document.addEventListener('click', (event) => {
    if (!event.target.matches('.sort-az')) {
      dropdown.classList.remove('show');
      sortAZ.parentElement.classList.remove('active');
    }
  });
}

function decorateSwitchView() {
  const buttons = document.querySelectorAll('.switch-view');
  const searchResultContainer = document.querySelector('.search-result-cards-wrapper');

  function handleBtnClick() {
    buttons.forEach((btn) => btn.classList.remove('active'));
    this.classList.add('active');

    if (this.classList.contains('grid')) {
      searchResultContainer.classList.remove('list-view');
      searchResultContainer.classList.add('grid-view');
    } else if (this.classList.contains('list')) {
      searchResultContainer.classList.remove('grid-view');
      searchResultContainer.classList.add('list-view');
    }
  }

  buttons.forEach((btns) => {
    btns.addEventListener('click', handleBtnClick);
  });
}

async function fetchData(jsonLink) {
  const data = await fetchAndFilterData(jsonLink?.href);
  sort(data, 'A - Z');
}

export default async function decorate(block) {
  const jsonLink = block?.querySelector('a');
  await fetchData(jsonLink);
  const result = buildCardsFromFilteredRawData();
  const searchBoxWrapper = createSearchBox();
  block.innerHTML = '';
  block.appendChild(searchBoxWrapper.firstElementChild);
  const resultContainer = document.createElement('div');
  resultContainer.className = 'search-result-container';
  block.appendChild(resultContainer);
  resultContainer.appendChild(result);
  delegateEvents();
  decorateSearchResultItems();
  decorateSwitchView();
}
