/* eslint-disable class-methods-use-this */
import {
  div, domEl, fieldset, form, input, label, section, span,
} from '../../scripts/dom-builder.js';
import { getParameterMap } from '../../scripts/utils.js';
import Menu from '../menu/menu.js';
import Tag from '../tag/tag.js';
import Button from '../button/button.js';

const SORT = 'sort';
export const defaultSort = 'latest';

export default class Filters {
  /**
   * @private
   */
  tagsPanel;

  /**
   * @private
   */
  resultsPanel;

  /**
   * @private
   */
  filterPanel;

  /**
   * @private
   */
  filterOverlay;

  sortMenu;

  /**
   * @type {{[key: string]: { value: string, label: string, id: string }[]}}
   */
  selectedFilters = {};

  /**
   * @type {"oldest" | "latest"}
   */
  selectedSort;

  /**
   * @param filters
   * {{
   *  [id: string]: {
   *    id: string,
   *    name: string,
   *    items: {
   *      id: string,
   *      label: string,
   *      value: string
   *    }[]
   *  }
   * }}
   * @param placeholders {{ [ key: string ]: string } }
   * @param nonFilterParams {string[]}
   * @param id {string}
   * @param sort {"oldest" | "latest"}
   */
  constructor(filters, placeholders, nonFilterParams, id, sort) {
    this.filters = filters || {};
    this.placeholders = placeholders || {};
    this.nonFilterParams = nonFilterParams || ['page', 'sort', 'order', 'limit'];
    this.sortParam = nonFilterParams.find((param) => param.endsWith('sort'));
    this.id = id;
    this.selectedSort = sort || defaultSort;
    this.sortOptions = [
      {
        id: 'latest',
        label: this.placeholders.sortLatest,
        value: 'latest',
      },
      {
        id: 'oldest',
        label: this.placeholders.sortOldest,
        value: 'oldest',
      },
    ];
  }

  /**
   * @private
   */
  updateTags() {
    const selectedFiltersFlat = Object.values(this.selectedFilters).flat();
    const selectedFiltersValues = new Set(selectedFiltersFlat.map((item) => item.value));
    const tags = new Set();
    this.tagsPanel.querySelectorAll('.tag').forEach((tag) => {
      const tagValue = tag.getAttribute('value');
      tags.add(tagValue);
      if (!selectedFiltersValues.has(tagValue)) {
        tag.remove();
      }
    });
    selectedFiltersFlat.forEach((item) => {
      if (tags.has(item.value)) return;
      const tag = new Tag(item.label, item.value, item.id);
      this.tagsPanel.append(tag.renderButtonTag());
    });
  }

  /**
   * @private
   */
  updateUrlAndParams() {
    const url = new URL(window.location.href);
    const params = new URLSearchParams();
    Object.values(this.selectedFilters).flat().forEach((item) => {
      params.append(item.id, item.value);
    });
    this.nonFilterParams.forEach((param) => {
      params.delete(param);
    });
    if (this.sortParam && this.selectedSort) {
      params.append(this.sortParam, this.selectedSort);
    }

    url.search = params.toString();
    window.history.pushState(null, null, url);
  }

  /**
   * @private
   */
  removeSelectedFilters(...filterItems) {
    filterItems.forEach((item) => {
      if (!this.selectedFilters[item.id] || this.selectedFilters[item.id].length === 0) {
        return;
      }
      this.selectedFilters[item.id] = this.selectedFilters[item.id]
        .filter((selected) => selected.value !== item.value);
    });
  }

  /**
   * @private
   */
  addSelectedFilters(...filterItems) {
    filterItems.forEach((item) => {
      if (
        this.selectedFilters[item.id]?.find((selectedItem) => item.value === selectedItem.value)
      ) {
        return;
      }
      this.selectedFilters[item.id] = this.selectedFilters[item.id]
        ? [
          ...this.selectedFilters[item.id],
          { id: item.id, label: item.label, value: item.value },
        ]
        : [{ id: item.id, label: item.label, value: item.value }];
    });
  }

  updateSortMenuTitle() {
    this.sortMenu.querySelector('.title').textContent = this.selectedSort;
  }

  updateSort(sort) {
    this.selectedSort = sort;
    this.updateSortMenuTitle();
    this.updateUrlAndParams();
    this.updateFilterOverlay();
  }

  /**
   * @private
   * @param mode {'remove' | 'add'}
   * @param filterItems {{ id: string, label: string, value: string }[]}
   */
  updateSelectedFilters(mode, ...filterItems) {
    if (mode === 'remove') {
      this.removeSelectedFilters(...filterItems);
    } else if (mode === 'add') {
      this.addSelectedFilters(...filterItems);
    }

    this.updateFilterOverlay();
    this.updateUrlAndParams();
    this.updateTags();
  }

  /**
   * @private
   */
  updateFilterOverlay() {
    const filterValues = Object.values(this.selectedFilters).flat().map((filter) => filter.value);
    Array.from(this.filterOverlay.querySelectorAll('input')).forEach((inputEl) => {
      if (inputEl.name !== SORT) {
        inputEl.checked = filterValues.includes(inputEl.value);
      } else {
        inputEl.checked = this.selectedSort === inputEl.value;
      }
    });
  }

  /**
   * @private
   */
  dispatchFilterChangeEvent() {
    this.filterPanel.dispatchEvent(
      new CustomEvent('sap:filterChange', {
        detail: {
          filters: this.selectedFilters,
          sort: this.selectedSort,
        },
        bubbles: true,
        cancelable: true,
      }),
    );
  }

  /**
   * @private
   */
  registerSortResultsHandler() {
    this.sortMenu.addEventListener('sap:itemSelect', (e) => {
      this.updateSort(e.detail.value);
      this.dispatchFilterChangeEvent();
    });
  }

  /**
   * @private
   */
  registerItemSelectHandler(filter) {
    filter.addEventListener('sap:itemSelect', (e) => {
      this.updateSelectedFilters('add', e.detail);
      this.dispatchFilterChangeEvent();
    });
  }

  /**
   * @private
   */
  registerItemCloseHandler() {
    this.tagsPanel.addEventListener('sap:itemClose', (e) => {
      this.updateSelectedFilters('remove', e.detail);
      this.dispatchFilterChangeEvent();
    });
  }

  /**
   * @private
   * @returns {HTMLElement} checkbox element
   */
  renderFilterOverlayOption(item, type = 'checkbox', name = '') {
    return div(
      { class: 'filter-overlay_filter_option' },
      label(
        { class: 'filter-overlay_filter_option_label' },
        input(
          {
            class: 'filter-overlay_filter_option_input',
            type,
            value: item.value,
            id: item.id,
            name: name || item.label,
          },
        ),
        span(item.label),
      ),
    );
  }

  /**
   * @private
   * @returns {HTMLElement} filter overlay sort options
   */
  renderFilterOverlaySortOptions() {
    const filterOptionFieldSet = fieldset({ class: 'filter-overlay_filter_options' });
    const filterOptions = domEl(
      'details',
      { class: 'filter-overlay_filter' },
      domEl(
        'summary',
        { class: 'filter-overlay_filter_label' },
        span('Sort'),
      ),
      filterOptionFieldSet,
    );
    this.sortOptions.forEach((item) => {
      filterOptionFieldSet.append(
        this.renderFilterOverlayOption(item, 'radio', SORT),
      );
    });

    return filterOptions;
  }

  /**
   * @private
   * @returns {HTMLElement} filter overlay filter options
   */
  renderFilterOverlayOptions(filter) {
    const filterOptionFieldSet = fieldset({ class: 'filter-overlay_filter_options' });
    const filterOptions = domEl(
      'details',
      { class: 'filter-overlay_filter' },
      domEl(
        'summary',
        { class: 'filter-overlay_filter_label' },
        span(filter.name),
      ),
      filterOptionFieldSet,
    );
    filter.items.forEach((item) => {
      filterOptionFieldSet.append(this.renderFilterOverlayOption(item));
    });

    return filterOptions;
  }

  applyFilters() {
    this.filterOverlay.setAttribute('aria-expanded', 'false');
    const filters = [];
    let sort;
    Array.from(this.filterOverlay.querySelectorAll('input'))
      .filter((inputEl) => inputEl.checked)
      .forEach((inputEl) => {
        if (inputEl.name === SORT) {
          sort = inputEl.value;
        } else {
          filters.push({
            id: inputEl.id,
            label: inputEl.name,
            value: inputEl.value,
          });
        }
      });
    this.selectedFilters = {};
    this.updateSelectedFilters('add', ...filters);
    this.updateSort(sort);
    this.dispatchFilterChangeEvent();
  }

  /**
   * @private
   * @returns {HTMLElement} filter overlay element
   */
  initialiseFilterOverlay() {
    this.filterOverlay = div({ class: 'filter-overlay', id: `${this.id}-filter-overlay` });

    const showResultsButton = new Button('Show results', null, 'primary', 'medium', null, false).render();
    showResultsButton.classList.add('filter-overlay_show-results');
    showResultsButton.addEventListener('click', () => {
      this.applyFilters();
    });
    const resetButton = new Button('Reset', null, 'tertiary', 'medium', null, false).render();

    resetButton.classList.add('filter-overlay_reset');
    resetButton.addEventListener('click', () => {
      this.updateFilterOverlay();
    });

    const closeButton = new Button('Close', 'icon-close', 'tertiary', 'medium', null, true).render();
    closeButton.classList.add('filter-overlay_close');
    closeButton.addEventListener('click', () => {
      this.filterOverlay.setAttribute('aria-expanded', 'false');
    });

    this.filterOverlay.append(div({ class: 'filter-overlay_actions' }, showResultsButton, resetButton, closeButton));
    this.registerItemCloseHandler();
  }

  /**
   * @private
   */
  initialiseFilterPanel() {
    this.filterPanel = div({ class: 'filter-panel' });
    this.initialiseFilterOverlay();

    const filterAndSortButton = new Button('Filter & Sort', null, 'primary', 'medium', null, false).render();
    filterAndSortButton.classList.add('filter-panel_filter-and-sort');
    filterAndSortButton.addEventListener('click', () => {
      this.filterOverlay.setAttribute('aria-expanded', 'true');
    });
    this.filterPanel.append(div({ class: 'filter-panel_actions' }, filterAndSortButton));

    const filterOverlayFilters = form({ class: 'filter-overlay_filters' });

    filterOverlayFilters.append(this.renderFilterOverlaySortOptions());

    Object.values(this.filters).forEach((filter) => {
      if (filter.items.length === 0) return;
      const filterMenu = new Menu(
        filter.name,
        filter.items,
        filter.id,
      ).render();
      this.filterPanel.append(filterMenu);
      this.registerItemSelectHandler(filterMenu);
      filterOverlayFilters.append(this.renderFilterOverlayOptions(filter));
    });

    this.sortMenu = new Menu(
      '',
      this.sortOptions,
      `${this.id}-sort`,
      this.placeholders.sortBy || 'Sort by:',
    ).render();
    this.registerSortResultsHandler();
    const sortMenuLabel = span({ class: 'filter_position-end' });
    sortMenuLabel.append(this.sortMenu);
    this.updateSortMenuTitle();
    this.filterPanel.append(sortMenuLabel);

    this.filterOverlay.append(filterOverlayFilters);
    this.updateFilterOverlay();
    this.filterPanel.append(this.filterOverlay);
  }

  /**
   * @private
   */
  initialiseSelectedFilters() {
    this.selectedFilters = [...getParameterMap().entries()]
      .filter(([key]) => key.startsWith(this.id))
      .reduce((acc, [key, value]) => {
        if (!this.filters[key]) {
          return acc;
        }
        const filterItems = this.filters[key].items.filter((item) => value.includes(item.value));
        if (filterItems.length === 0) {
          return acc;
        }

        acc[key] = filterItems;
        return acc;
      }, {});
  }

  /**
   * @private
   */
  initialiseTagPanel() {
    this.tagsPanel = div({ class: 'tags-panel' });
    this.updateTags();
  }

  render() {
    this.initialiseSelectedFilters();

    const noResultLabel = this.placeholders.noResults || 'No results found';
    this.resultsPanel = div({ class: 'results-panel' }, noResultLabel);
    this.initialiseTagPanel();
    this.initialiseFilterPanel();

    return section({ class: 'filters' }, this.filterPanel, this.resultsPanel, this.tagsPanel);
  }

  updateResults(block, count) {
    if (this.resultsPanel) {
      this.resultsPanel.textContent = count === 0 ? this.placeholders.noResults || 'No results found' : `${count} results`;
    }
  }
}
