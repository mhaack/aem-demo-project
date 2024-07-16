import { toClassName } from '../../scripts/aem.js';
import { a, span, button } from '../../scripts/dom-builder.js';

export default class Tag {
  constructor(name, value, id) {
    this.name = name;
    this.value = value;
    this.id = id || toClassName(name);
  }

  getTagInfo() {
    return {
      id: this.id,
      type: 'tag',
      name: this.name,
      value: this.value,
    };
  }

  render() {
    return a({ class: 'tag', href: this.value }, this.name);
  }

  renderButtonTag() {
    const clostBtn = span({ class: 'close' });
    clostBtn.addEventListener('click', (e) => {
      const tagEvent = new CustomEvent('sap:itemClose', {
        detail: this.getTagInfo(),
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
        'data-tag-category': this.id,
      },
      this.name,
      clostBtn,
    );
  }
}
