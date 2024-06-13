/* eslint-disable class-methods-use-this */
import { div, section } from '../../scripts/dom-builder.js';
import { toClassName } from '../../scripts/aem.js';
import { getParameterMap } from '../../scripts/utils.js';
import Menu from '../menu/menu.js';
import Tag from '../tag/tag.js';

export default class Filters {
  constructor(filters, placeholders, nonFilterParams, id) {
    this.filters = filters || [];
    this.placeholders = placeholders || {};
    this.nonFilterParams = nonFilterParams || ['page', 'sort', 'order', 'limit'];
    this.id = id;
  }

  registerHandler(filter, dialog) {
    filter.addEventListener('sap:itemSelect', (e) => {
      const tags = new Set();
      dialog.querySelectorAll('.tag').forEach((tag) => {
        tags.add(tag.getAttribute('value'));
      });
      if (tags.has(e.detail.value)) return;
      const tag = new Tag(e.detail.label, e.detail.value, e.detail.id);
      dialog.append(tag.renderButtonTag());
      const url = new URL(window.location.href);
      const params = new URLSearchParams(url.search);
      params.append(e.detail.id, e.detail.value);
      this.nonFilterParams.forEach((param) => {
        params.delete(param);
      });
      url.search = params.toString();
      window.history.pushState(null, null, url);
    });
  }

  getTags(filterPanel) {
    let tagMap = {};
    filterPanel.querySelectorAll('.menu > .items > .item').forEach((item) => {
      tagMap = {
        ...tagMap,
        [item.getAttribute('data-item-value')]: {
          name: item.getAttribute('data-item-name'),
          category: item.getAttribute('data-item-category'),
        },
      };
    });
    return [...getParameterMap().entries()]
      .filter(([key]) => key.startsWith(this.id))
      .map(([, value]) => value)
      .map((value) => value.map((tag) => {
        if (!tagMap[tag]) return null;
        return new Tag(tagMap[tag].name, tag, tagMap[tag].category);
      }))
      .flat()
      .filter((tag) => tag !== null);
  }

  getTagsPanel() {
    const tagsPanel = div({ class: 'tags-panel' });
    tagsPanel.addEventListener('sap:itemClose', (e) => {
      const url = new URL(window.location.href);
      const params = new URLSearchParams(url.search);
      params.delete(e.detail.category, e.detail.value);
      this.nonFilterParams.forEach((param) => {
        params.delete(param);
      });
      url.search = params.toString();
      window.history.pushState(null, null, url);
    });
    return tagsPanel;
  }

  getFilterPanel() {
    const filterPanel = div({ class: 'filter-panel' });
    filterPanel.addEventListener('click', (event) => {
      if (filterPanel.contains(event.target)) return;
      filterPanel.querySelectorAll('.menu').forEach((menu) => {
        menu.setAttribute('aria-expanded', 'false');
      });
    });
    return filterPanel;
  }

  render() {
    const noResultLabel = this.placeholders.noResults || 'No results found';
    const filterPanel = this.getFilterPanel();
    const tagsPanel = this.getTagsPanel();
    const resultsPanel = div({ class: 'results-panel' }, noResultLabel);
    this.filters.forEach((filter) => {
      if (filter.items.length === 0) return;
      const filterMenu = new Menu(filter.name, filter.items, `${this.id}-${toClassName(filter.name)}`).render();
      filterPanel.append(filterMenu);
      this.registerHandler(filterMenu, tagsPanel);
    });
    this.getTags(filterPanel).forEach((tag) => tagsPanel.append(tag.renderButtonTag()));
    return section({ class: 'filters' }, filterPanel, resultsPanel, tagsPanel);
  }

  updateResults(block, count) {
    const resultsPanel = block.querySelector('.results-panel');
    resultsPanel.textContent = count === 0 ? this.placeholders.noResults || 'No results found' : `${count} results`;
  }
}
