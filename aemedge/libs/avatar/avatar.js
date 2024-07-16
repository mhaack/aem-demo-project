import { createOptimizedPicture, decorateIcons } from '../../scripts/aem.js';
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
    this.image = (image && image !== '0') ? image : null;
  }

  static fromAuthorEntry(profile) {
    return new Avatar(
      profile.name,
      profile.title,
      profile.description,
      profile.path,
      profile.image,
    );
  }

  getImage() {
    return this.image ? createOptimizedPicture(this.image, this.title, false, breakpoints) : null;
  }

  render(size, imageOnly) {
    if (imageOnly) {
      return div({ class: `avatar ${size}` }, this.image ? div(this.getImage()) : div());
    }
    return div(
      { class: 'avatar-wrapper' },
      div({ class: `avatar ${size}` }, this.image ? div(this.getImage()) : div()),
      div(
        { class: 'avatar-info' },
        div({ class: 'name' }, div(`${this.name}`)),
        this.description && this.description !== '0'
          ? div({ class: 'description info' }, this.description)
          : '',
      ),
    );
  }

  renderDetails(size, linkText) {
    const element = div(
      { class: 'avatar-wrapper' },
      this.image ? div({ class: `avatar ${size}` }, div(this.getImage())) : div({ class: 'no-avatar' }),
      div(
        { class: 'avatar-details' },
        h2(this.name),
        this.description && this.description !== '0' ? p(this.description) : '',
        this.path
          ? p(
            { class: 'link' },
            a({ href: this.path, 'aria-label': 'Read more' }, linkText),
            span({ class: 'icon icon-link-arrow' }),
          )
          : '',
      ),
    );
    decorateIcons(element);
    return element;
  }
}
