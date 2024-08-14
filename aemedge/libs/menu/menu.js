/* eslint-disable class-methods-use-this */
import {
  li, p, span, ul, menu as menuBuilder,
} from '../../scripts/dom-builder.js';
import { toClassName } from '../../scripts/aem.js';

export default class List {
  constructor(name, items, id, titlePrefix) {
    this.name = name;
    this.items = items;
    this.id = id || toClassName(name);
    this.titlePrefix = titlePrefix;
  }

  attachHandler(element) {
    element.addEventListener('click', () => {
      const expanded = element.getAttribute('aria-expanded') === 'true';
      element.setAttribute('aria-expanded', !expanded);
    });
  }

  addClickHandlerToDocument(menu) {
    document.addEventListener('click', (event) => {
      const isClickInsideMenu = menu.contains(event.target);
      if (!isClickInsideMenu) {
        menu.setAttribute('aria-expanded', false);
      }
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

  render() {
    const menuItems = this.items.map((item) => this.getListItem(item.label, item.value));
    let scroll = '';
    if (menuItems.length > 10) scroll = 'scrollable';
    const menu = menuBuilder(
      { class: 'menu' },
      span(
        { class: 'label' },
        this.titlePrefix ? span({ class: 'prefix' }, this.titlePrefix) : '',
        span({ class: 'title' }, this.name),
      ),
      ul({ class: `items ${scroll}` }, ...menuItems),
    );
    this.attachHandler(menu);
    this.addClickHandlerToDocument(menu);
    return menu;
  }
}
