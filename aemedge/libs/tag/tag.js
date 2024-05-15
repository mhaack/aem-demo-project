import { loadCSS, toClassName } from '../../scripts/aem.js';
import { a, span, button } from '../../scripts/dom-builder.js';

export default class Tag {
  constructor(name, value, category, id) {
    this.name = name;
    this.value = value;
    this.category = category;
    this.id = id || toClassName(name);
  }

  render(excludeStyles) {
    if (!excludeStyles) {
      loadCSS(`${window.hlx.codeBasePath}/libs/tag/tag.css`);
    }
    return a({ class: 'tag', href: this.value }, this.name);
  }

  renderButtonTag(excludeStyles) {
    if (!excludeStyles) {
      loadCSS(`${window.hlx.codeBasePath}/libs/tag/tag.css`);
    }
    const clostBtn = span({ class: 'close' });
    clostBtn.addEventListener('click', (e) => {
      const tagEvent = new CustomEvent('sap:itemClose', {
        detail: {
          id: this.id,
          type: 'tag',
          name: this.name,
          value: this.value,
          category: this.category,
        },
        bubbles: true,
        cancelable: true,
      });
      clostBtn.dispatchEvent(tagEvent);
      e.target.parentElement.remove();
    });
    return button(
      {
        class: 'tag button',
        name: toClassName(this.name),
        value: this.value,
        'data-tag-category': this.category,
      },
      this.name,
      clostBtn,
    );
  }
}
