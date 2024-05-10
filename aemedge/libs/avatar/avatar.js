import { createOptimizedPicture, decorateIcons, loadCSS } from '../../scripts/aem.js';
import {
  div, a, h2, p, span,
} from '../../scripts/dom-builder.js';

const breakpoints = [{ width: '480' }];

export default class Avatar {
  constructor(name, title, description, path, image) {
    this.name = name;
    this.title = title;
    this.description = description;
    this.path = path;
    this.image = image;
  }

  static fromAuthorEntry(ae) {
    return new Avatar(ae.author, ae.title, ae.description, ae.path, ae.image);
  }

  getImage() {
    return this.image ? createOptimizedPicture(this.image, this.title, false, breakpoints) : null;
  }

  render(size, excludeStyles, imageOnly) {
    if (!excludeStyles) {
      loadCSS(`${window.hlx.codeBasePath}/libs/avatar/avatar.css`);
    }
    if (imageOnly) {
      return div({ class: `avatar ${size}` }, this.image ? div(this.getImage()) : div());
    }
    return div(
      { class: 'avatar-wrapper' },
      div({ class: `avatar ${size}` }, this.image ? div(this.getImage()) : div()),
      div(
        { class: 'avatar-info' },
        div({ class: 'name' }, div(`${this.name}`)),
        this.description ? div({ class: 'description info' }, this.description) : '',
      ),
    );
  }

  renderDetails(size, excludeStyles) {
    if (!excludeStyles) {
      loadCSS(`${window.hlx.codeBasePath}/libs/avatar/avatar.css`);
    }
    const element = div(
      { class: 'avatar-wrapper' },
      div({ class: `avatar ${size}` }, this.image ? div(this.getImage()) : div()),
      div(
        { class: 'avatar-details' },
        h2(this.name),
        p(this.description),
        this.path ? p(
          { class: 'link' },
          a({ href: this.path, 'aria-label': 'Read more' }, 'Link'),
          span({ class: 'icon icon-link-arrow' }),
        ) : '',
      ),
    );
    decorateIcons(element);
    return element;
  }
}
