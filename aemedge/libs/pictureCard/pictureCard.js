import Card from '../card/card.js';
import {
  li, a, span, div, p,
} from '../../scripts/dom-builder.js';
import { createOptimizedPicture, loadCSS } from '../../scripts/aem.js';
import Avatar from '../avatar/avatar.js';

export default class PictureCard extends Card {
  constructor(title, path, type, info, profileEntry, image, tagLabel, description, eager) {
    super(title, path, type, info);
    this.profileEntry = profileEntry;
    this.image = image;
    this.tagLabel = tagLabel;
    this.description = description;
    this.eager = eager;
  }

  getOptimizedPicture() {
    return createOptimizedPicture(this.image, this.title, this.eager, [{ width: '750' }]);
  }

  getTagLabel() {
    return this.tagLabel ? span({ class: 'tag-label' }, this.tagLabel) : '';
  }

  getDescription(horizontal) {
    return horizontal && this.description && this.description !== '0'
      ? p({ class: 'description' }, this.description)
      : '';
  }

  getAvatarElement(profileEntry) {
    if (!profileEntry) {
      return '';
    }

    return profileEntry?.image
      && new URL(this.profileEntry.image).pathname !== '/default-meta-image.png' && profileEntry.name.indexOf('+ more') === -1
      ? div(
        { class: 'author-profile' },
        Avatar.fromAuthorEntry(profileEntry).render('small'),
      )
      : div(
        { class: 'author subtitle' },
        span(`${this.profileEntry.name}`),
      );
  }

  render(horizontal, excludeStyles) {
    if (!excludeStyles) {
      loadCSS(`${window.hlx.codeBasePath}/libs/pictureCard/pictureCard.css`);
    }
    const externalLink = this.path.startsWith('http') || this.path.startsWith('//');
    const info = externalLink ? span({ class: 'external-link' }, this.info) : this.info;

    return li(
      { class: `picture-card ${horizontal ? 'horizontal' : ''}` },
      a(
        { href: this.path, 'aria-label': this.title, target: externalLink ? '_blank' : '_self' },
        div(
          { class: 'picture' },
          this.getOptimizedPicture(),
        ),
        div(
          { class: 'cardcontent' },
          this.getTagLabel(),
          div({ class: 'type' }, this.getType()),
          div({ class: 'title text' }, span(this.title)),
          this.getDescription(horizontal),
        ),
        div(
          { class: 'infoblock' },
          this.getAvatarElement(this.profileEntry),
          div({ class: 'info' }, info),
        ),
      ),
    );
  }
}
