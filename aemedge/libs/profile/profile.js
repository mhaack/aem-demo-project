import { loadCSS } from '../../scripts/aem.js';
import { div, a } from '../../scripts/dom-builder.js';
import Avatar from '../avatar/avatar.js';

export default class Profile {
  constructor(name, title, description, path, image) {
    this.name = name;
    this.title = title;
    this.description = description;
    this.path = path;
    this.image = image;
  }

  static fromAuthorEntry(ae) {
    return new Profile(ae.author, ae.title, ae.description, ae.path, ae.image);
  }

  render(excludeStyles, horizontal) {
    if (!excludeStyles) {
      loadCSS(`${window.hlx.codeBasePath}/libs/profile/profile.css`);
    }
    return div(
      { class: horizontal ? 'profile hor' : 'profile' },
      new Avatar(
        this.name,
        this.title,
        this.description,
        this.path,
        this.image,
      ).renderDetails('big'),
    );
  }

  renderCard(horizontal) {
    loadCSS(`${window.hlx.codeBasePath}/libs/profile/profile.css`);
    return a({ class: 'plink', href: this.path, 'aria-label': 'Read more' }, div(
      { class: horizontal ? 'profile hor' : 'profile' },
      new Avatar(
        this.name,
        this.title,
        this.description,
        this.path,
        this.image,
      ).renderDetails('big'),
    ));
  }
}
