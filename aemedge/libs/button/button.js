import {
  a, button, div, span,
} from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';

export default class Button {
  constructor(label, icon, level, sizeConfig, href, iconOnly = false) {
    this.label = label;
    this.icon = icon;
    this.level = level;
    if (sizeConfig && typeof sizeConfig === 'object') {
      this.sizeConfig = sizeConfig;
    } else if (sizeConfig && typeof sizeConfig === 'string') {
      this.sizeConfig = {
        xs: sizeConfig,
      };
    } else {
      this.sizeConfig = {
        xs: 'medium', l: 'large',
      };
    }
    this.href = href;
    this.iconOnly = iconOnly;
  }

  getIcon() {
    return this.icon ? span({ class: `icon ${this.icon}` }) : '';
  }

  render(isDisabled) {
    const btn = this.href ? a(
      {
        class: `button ${this.level ? this.level : ''} ${this.iconOnly ? 'icon-only' : ''}`,
        href: this.href,
      },
      this.label && !this.iconOnly ? span(this.label) : '',
      this.getIcon(),

    ) : button(
      {
        class: `button ${this.level ? this.level : ''} ${this.iconOnly ? 'icon-only' : ''}`,
        type: 'button',
        'aria-label': this.label,
      },
      this.label && !this.iconOnly ? span(this.label) : '',
      this.getIcon(),
    );
    if (this.sizeConfig) {
      Object.entries(this.sizeConfig).forEach(([key, value]) => {
        btn.classList.add(`button-${key}-${value}`);
      });
    }
    if (isDisabled) {
      btn.setAttribute('disabled', 'disabled');
    }
    const btnWrapper = div({ class: 'button-container' }, btn);
    if (this.icon) {
      decorateIcons(btnWrapper);
    }
    return btnWrapper;
  }
}
