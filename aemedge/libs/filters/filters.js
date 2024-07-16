/* eslint-disable class-methods-use-this */
import {
  div, domEl, fieldset, label, section, span, input,
} from '../../scripts/dom-builder.js';
import { getParameterMap } from '../../scripts/utils.js';
import Menu from '../menu/menu.js';
import Tag from '../tag/tag.js';
import Button from '../button/button.js';

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

  /**
   * @type {{[key: string]: { value: string, label: string, id: string }[]}}
   */
  selectedFilters = {};

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
   */
  constructor(filters, placeholders, nonFilterParams, id) {
    this.filters = filters || {};
    this.placeholders = placeholders || {};
    this.nonFilterParams = nonFilterParams || ['page', 'sort', 'order', 'limit'];
    this.id = id;
  }

  /**
   * @private
   */
  updateTags() {
    const tags = new Set();
    this.tagsPanel.querySelectorAll('.tag').forEach((tag) => {
      tags.add(tag.getAttribute('value'));
    });
    Object.values(this.selectedFilters).flat().forEach((item) => {
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
      inputEl.checked = filterValues.includes(inputEl.value);
    });
  }

  /**
   * @private
   */
  dispatchFilterChangeEvent() {
    this.filterPanel.dispatchEvent(
      new CustomEvent('sap:filterChange', { detail: this.selectedFilters, bubbles: true, cancelable: true }),
    );
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
   */
  registerFilterApplyHandler() {
    this.filterOverlay.addEventListener('sap:filterApply', (e) => {
      this.selectedFilters = {};
      this.updateSelectedFilters('add', ...e.detail);
      this.dispatchFilterChangeEvent();
    });
  }

  /**
   * @private
   * @returns {HTMLElement} checkbox element
   */
  renderFilterOverlayOption(item) {
    return div(
      { class: 'filter-overlay_filter_option' },
      label(
        { class: 'filter-overlay_filter_option_label' },
        input(
          {
            class: 'filter-overlay_filter_option_input',
            type: 'checkbox',
            value: item.value,
            id: item.id,
            name: item.label,
          },
        ),
        span(item.label),
      ),
    );
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

  /**
   * @private
   * @returns {HTMLElement} filter overlay element
   */
  initialiseFilterOverlay() {
    this.filterOverlay = div({ class: 'filter-overlay', id: `${this.id}-filter-overlay` });

    const showResultsButton = new Button('Show results', null, 'primary', 'medium', null, false).render();
    showResultsButton.classList.add('filter-overlay_show-results');
    showResultsButton.addEventListener('click', () => {
      this.filterOverlay.setAttribute('aria-expanded', 'false');
      this.filterOverlay.dispatchEvent(
        new CustomEvent(
          'sap:filterApply',
          {
            detail: Array.from(this.filterOverlay.querySelectorAll('input'))
              .filter((inputEl) => inputEl.checked)
              .map((inputEl) => ({
                id: inputEl.id,
                label: inputEl.name,
                value: inputEl.value,
              })),
            bubbles: true,
            cancelable: true,
          },
        ),
      );
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
    this.registerFilterApplyHandler();
    this.registerItemCloseHandler();
  }

  /**
   * @private
   */
  initialiseFilterPanel() {
    this.filterPanel = div({ class: 'filter-panel' });
    this.initialiseFilterOverlay();

    // FIXME: Update to "Filter & Sort" when sorting implemented
    const filterAndSortButton = new Button('Filter', null, 'primary', 'medium', null, false).render();
    filterAndSortButton.classList.add('filter-panel_filter-and-sort');
    filterAndSortButton.addEventListener('click', () => {
      this.filterOverlay.setAttribute('aria-expanded', 'true');
    });
    this.filterPanel.append(div({ class: 'filter-panel_actions' }, filterAndSortButton));

    const filterOverlayFilters = div({ class: 'filter-overlay_filters' });
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

    this.filterOverlay.append(filterOverlayFilters);
    this.updateFilterOverlay();
    document.body.append(this.filterOverlay);
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
