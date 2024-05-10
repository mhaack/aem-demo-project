import {
  a, button, p, span,
} from '../../scripts/dom-builder.js';
import { loadCSS, decorateIcons } from '../../scripts/aem.js';

export default class Button {
  constructor(label, icon, level, size, href) {
    this.label = label;
    this.icon = icon;
    this.level = level;
    this.size = size;
    this.href = href;
  }

  getIcon() {
    return this.icon ? span({ class: `icon ${this.icon}` }) : '';
  }

  render(excludeStyles) {
    if (!excludeStyles) {
      loadCSS(`${window.hlx.codeBasePath}/libs/button/button.css`);
    }
    const btn = p(
      { class: 'button-wrapper' },
      button(
        {
          class: `button ${this.level ? this.level : ''} ${this.size ? this.size : ''}`,
          type: 'button',
          'aria-label': this.label,
        },
        this.href ? a({ href: this.href }, this.label) : span(this.label),
        this.getIcon(),
      ),
    );
    if (this.icon) {
      decorateIcons(btn);
    }
    return btn;
  }
}
