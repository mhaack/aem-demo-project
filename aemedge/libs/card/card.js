import {
  li, a, p, div, span,
} from '../../scripts/dom-builder.js';

export default class Card {
  constructor(title, path, type, info) {
    this.title = title;
    this.info = info;
    this.path = path;
    this.type = type;
  }

  getType() {
    return this.type?.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }

  getLabel() {
    return this.info ? p({ class: 'label eyebrow' }, this.info) : '';
  }

  render() {
    return li(
      { class: 'card' },
      p({ class: 'type eyebrow' }, this.getType()),
      p({ class: 'title link' }, a({ href: this.path, 'aria-label': this.title }, this.title)),
      this.getLabel(),
    );
  }

  renderExternalCard() {
    return div(
      { class: 'card' },
      div({ class: 'title' }, p(this.title)),
      div(
        { class: 'button-container' },
        p(
          a(
            {
              href: this.path, 'aria-label': this.type, target: '_blank', class: 'button',
            },
            span(this.type),
          ),
        ),
      ),
    );
  }
}
