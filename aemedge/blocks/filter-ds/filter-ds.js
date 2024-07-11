/* eslint-disable no-use-before-define */
import { decorateIcons } from '../../scripts/aem.js';
import {
  button, div, label, nav, span,
} from '../../scripts/dom-builder.js';
import { applySelectedFilters, getRawFilteredData, resetFilteredData } from '../../scripts/search-filter.js';
import { buildNewCards } from '../search/search.js';

const APPLIED_FILTERS = new Map();
const sortOrder = 'A - Z';

export default async function decorate() {
  const searchForm = document.querySelector('#ui-search-form');
  const searchItems = document.querySelector('.search-result-items');

  const resultDisplay = div(
    {
      class: 'result-display',
    },
    span({ class: 'results-count' }, getRawFilteredData().length, ' results'),

  );
  const tagdisplay = div(
    { class: 'show-tags' },
    button(
      {
        class: 'clear-all',
        style: 'display : none',
        onclick: (event) => {
          event.preventDefault();
          APPLIED_FILTERS.clear();
          removeTag();
          removeFilterSelectionAndClose();
        },
      },
      'Clear All',
      span({ class: 'icon icon-close' }),
    ),
  );
  searchItems.prepend(resultDisplay);
  searchItems.after(tagdisplay);

  const filterButton = button(
    {
      'aria-label': 'Filter',
      class: 'filter-btn',
      title: 'Filter',
      type: 'button',
      onclick: (event) => {
        const filterBtn = event.currentTarget;
        filterBtn.classList.toggle('expanded');
        const filterMenu = filterBtn.nextSibling;
        filterMenu.classList.toggle('open');
        const formOffsetLeft = searchForm.offsetLeft;
        const elem = document.querySelector('.filter-menu');
        elem.style.left = `${formOffsetLeft}px`;
      },
    },
    span({ class: 'label' }, 'Filter & Sort'),
    span({ class: 'icon icon-filter' }),
  );

  const filterOptions = [
    {
      category: 'Technology',
      options: [
        { key: 'sapWebComponents', label: 'SAP Web Components', category: 'uielementstechnology' },
        { key: 'sapui5', label: 'SAPUI5', category: 'uielementstechnology' },
      ],
    },
    {
      category: 'Design Owner',
      options: [
        { key: 'aiDesignSystem', label: 'AI Design System', category: 'designowner' },
        { key: 'cloudErp', label: 'Cloud ERP', category: 'designowner' },
        { key: 'coreDesignCax', label: 'Core Design CAX', category: 'designowner' },
        { key: 'successFactors', label: 'SuccessFactors', category: 'designowner' },
        { key: 'codeDesignSystem', label: 'Core Design System', category: 'designowner' },
      ],
    },
    {
      category: 'Element Type',
      options: [
        { key: 'component', label: 'Component', category: 'elementtype' },
        { key: 'pattern', label: 'Pattern', category: 'elementtype' },
        { key: 'subComponent', label: 'Subcomponent', category: 'elementtype' },
        { key: 'chart', label: 'Chart', category: 'elementtype' },
      ],
    },
    {
      category: 'Category',
      options: [
        { key: 'action', label: 'Action', category: 'uielementscategory' },
        { key: 'dataVisualization', label: 'Data Visualization', category: 'uielementscategory' },
        { key: 'containers', label: 'Containers', category: 'uielementscategory' },
        { key: 'inputSelection', label: 'Input and Selection', category: 'uielementscategory' },
        { key: 'displayMsg', label: 'Display and Messaging', category: 'uielementscategory' },
        { key: 'tableListTree', label: 'Table,List,Tree', category: 'uielementscategory' },
      ],
    },
    {
      category: 'UI Element Status',
      options: [
        { key: 'new', label: 'New', category: 'elementstatus' },
        { key: 'updated', label: 'Updated', category: 'elementstatus' },
        { key: 'deprecated', label: 'Deprecated', category: 'elementstatus' },
        { key: 'live', label: 'Live', category: 'elementstatus' },
        { key: 'targetDesign', label: 'Target Design', category: 'elementstatus' },
      ],
    },
  ];

  const itemsContainer = div(
    { class: 'items-container' },
  );

  filterOptions.forEach(({ category, options }) => {
    const filter = div(
      { class: 'filter-item' },
      label(category),
    );
    const item = div(
      { class: 'item-options' },
    );
    // eslint-disable-next-line no-shadow
    options.forEach(({ key, label, category }) => {
      const option = span(
        {
          class: 'label',
          'data-key': key,
          onclick: (event) => {
            const clickedItem = event.target;
            clickedItem.classList.toggle('selected');
            const filterKey = clickedItem.getAttribute('data-key');
            if (APPLIED_FILTERS.has(filterKey)) {
              APPLIED_FILTERS.delete(filterKey);
            } else {
              APPLIED_FILTERS.set(filterKey, { category, filter: clickedItem.textContent });
            }
            if (APPLIED_FILTERS.size === 0) {
              document.querySelector('.count').style.display = 'none';
            } else {
              updateCount();
            }
            removeTag();
            if (APPLIED_FILTERS !== 0) {
              APPLIED_FILTERS.forEach((obj) => {
                const filterTags = span({ class: 'tags' }, obj.filter, button(
                  {
                    class: 'icon icon-close-tag',
                    onclick: (e) => {
                      e.preventDefault();
                      const spanTag = e.target.closest('span.tags');
                      if (spanTag) {
                        spanTag.remove();
                        APPLIED_FILTERS.delete(key);
                        applyFilterAndClose(APPLIED_FILTERS);
                        resetFilteredData();
                      }
                    },
                  },
                  'x',
                ));
                tagdisplay.append(filterTags);
                return tagdisplay;
              });
            } else {
              removeFilterSelectionAndClose();
            }
          },
        },
        label,
      );
      item.append(option);
    });
    filter.append(item);
    itemsContainer.append(filter);
  });

  const filterActions = div(
    { class: 'filter-actions' },
    button(
      {
        class: 'apply-filter-btn',
        onclick: (event) => {
          event.preventDefault();
          applyFilterAndClose();
        },
      },
      'Show Results',
      span({ class: 'count' }),
    ),
    button(
      {
        class: 'clear-filter-btn',
        onclick: (event) => {
          event.preventDefault();
          APPLIED_FILTERS.clear();
          resetResultsCount();
        },
      },
      'Clear All',
    ),
    button(
      {
        class: 'reset-filter-btn',
        onclick: (event) => {
          event.preventDefault();
          APPLIED_FILTERS.clear();
          resetResultsCount();
        },
      },
      'Reset',
    ),
    button(
      {
        class: 'icon close-menu-btn',
        onclick: (event) => {
          event.preventDefault();
          APPLIED_FILTERS.clear();
          removeFilterSelectionAndClose();
        },
      },
      span({ class: 'icon icon-close' }),
    ),
  );

  const filterMenu = nav(
    { class: 'filter-menu' },
    div(
      { class: 'items-accordion' },
      button(
        {
          class: 'accordion-label',
          onclick: (event) => {
            event.preventDefault();
            accordionClose();
          },
        },
        'Filter',
        span({
          class: 'icon icon-slim-arrow-down',
        }),
        span({
          class: 'icon icon-slim-arrow-right',
        }),
      ),
    ),
    itemsContainer,
    filterActions,
  );

  const filterContainer = div(
    { class: 'filter-container' },
    filterButton,
    filterMenu,
  );

  decorateIcons(filterContainer);

  function filterBttn(x) {
    if (x.matches) {
      searchForm.append(filterContainer);
      document.querySelector('.filter-btn>.label').innerText = 'Filter';
      document.querySelector('.search-result-items>.sort').firstChild.data = 'Sort by:';
    } else {
      searchItems.prepend(filterContainer);
      document.querySelector('.filter-btn>.label').innerText = 'Filter & Sort';
      document.querySelector('.search-result-items>.sort').firstChild.data = '';
    }
  }
  const x = window.matchMedia('(width >= 1280px)');
  filterBttn(x);
  x.addEventListener('change', () => {
    filterBttn(x);
  });

  const filterB = document.querySelector('.filter-btn');
  const filterM = document.querySelector('.filter-menu');
  document.addEventListener('mousedown', (event) => {
    if (!filterM.contains(event.target) && !filterB.contains(event.target)) {
      filterM.classList.remove('open');
    }
  });
}

// close the filter menu and reset filter selection
function removeFilterSelectionAndClose() {
  document.querySelector('.filter-btn').classList.remove('expanded');
  document.querySelector('.filter-menu').classList.remove('open');
  resetResultsCount();
  buildNewCards(getRawFilteredData(), sortOrder);
}

// reset filter selection
function resetResultsCount() {
  resetFilteredData();
  const resultsCount = document.querySelector('.results-count');
  resultsCount.textContent = `${getRawFilteredData().length} results`;
  document.querySelector('.count').style.display = 'none';
  document.querySelectorAll('.item-options span.label').forEach((elem) => elem.classList.remove('selected'));
  applySelectedFilters();
  buildNewCards(getRawFilteredData(), sortOrder);
}

// apply the filter and close the filter menu
function applyFilterAndClose() {
  applySelectedFilters(APPLIED_FILTERS);
  const resultsCounter = document.querySelector('.results-count');
  const data = getRawFilteredData();
  if (APPLIED_FILTERS.size !== 0) {
    resultsCounter.textContent = `${data.length} results`;
  } else {
    resetResultsCount();
  }
  document.querySelector('.filter-btn').classList.remove('expanded');
  document.querySelector('.filter-menu').classList.remove('open');
  buildNewCards(data, sortOrder);
}

function accordionClose() {
  const item = document.querySelector('.items-container').style;
  const arrowdown = document.querySelector('.icon.icon-slim-arrow-down').style;
  const arrowright = document.querySelector('.icon.icon-slim-arrow-right').style;
  if (item.display === 'none') {
    item.display = 'block';
    arrowdown.display = 'block';
    arrowright.display = 'none';
  } else {
    item.display = 'none';
    arrowdown.display = 'none';
    arrowright.display = 'block';
  }
}

function removeTag() {
  Array.from(document.querySelectorAll('span.tags')).forEach((tag) => tag.remove());
}

function updateCount() {
  const counter = document.querySelector('.count');
  if (APPLIED_FILTERS !== 0) {
    counter.style.display = 'block';
    applySelectedFilters(APPLIED_FILTERS);
    counter.textContent = getRawFilteredData().length;
    if (counter.textContent === '0') {
      counter.style.display = 'none';
    }
  } else {
    counter.style.display = 'none';
  }
}
