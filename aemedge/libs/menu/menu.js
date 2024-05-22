/* eslint-disable class-methods-use-this */
import {
  li, p, label, ul, menu as menuBuilder,
} from '../../scripts/dom-builder.js';
import { loadCSS, toClassName } from '../../scripts/aem.js';

export default class List {
  constructor(name, items, id) {
    this.name = name;
    this.items = items;
    this.id = id || toClassName(name);
  }

  getType() {
    return this.type?.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }

  getLabel() {
    return this.name;
  }

  attachHandler(element) {
    element.addEventListener('click', () => {
      const expanded = element.getAttribute('aria-expanded') === 'true';
      element.setAttribute('aria-expanded', !expanded);
    });
  }

  getListItem(title, value) {
    const item = li(
      {
        class: 'item',
        'data-item-name': title,
        'data-item-value': value,
        'data-item-category': this.id,
      },
      p({ class: 'option' }, title),
    );
    item.addEventListener('click', () => {
      const listEvent = new CustomEvent('sap:itemSelect', {
        detail: {
          id: this.id,
          type: 'menu',
          label: title,
          value,
        },
        bubbles: true,
        cancelable: true,
      });
      item.dispatchEvent(listEvent);
    });
    return item;
  }

  render(excludeStyles) {
    if (!excludeStyles) {
      loadCSS(`${window.hlx.codeBasePath}/libs/menu/menu.css`);
    }
    const menuItems = this.items.map((item) => this.getListItem(item.label, item.value));
    const menu = menuBuilder(
      { class: 'menu' },
      label({ class: 'title' }, this.name),
      ul({ class: 'items' }, ...menuItems),
    );
    this.attachHandler(menu);
    return menu;
  }
}