import { getMetadata } from '../../scripts/aem.js';
import {
  div,
  img,
  picture,
  source,
} from '../../scripts/dom-builder.js';
import '@udex/webcomponents/dist/HeroBanner.js';

export default async function decorate(block) {
  const heading = block.querySelector('div > div > div:nth-child(1) > div > h1');
  const subHeadingText = block.querySelector('div > div > div:nth-child(1) > div > h3')?.textContent ?? '';
  const imageName = block.querySelector('div:nth-child(1) > div > div > div:nth-child(2) > div').textContent;
  const breadcrumb = div({
    class: 'breadcrumb-container',
  });
  const metaBreadcrumbs = getMetadata('breadcrumbs');
  if (metaBreadcrumbs) {
    const breadcrumbText = `Home / ${metaBreadcrumbs}`;
    breadcrumbText.split('/').forEach((itemText) => {
      const item = Object.assign(document.createElement('span'), { className: 'breadcrumb-item' });
      if (itemText.trim() === 'Home') {
        item.innerHTML = itemText.trim();
      } else {
        const separator = document.createElement('span');
        separator.innerHTML = ' / ';
        breadcrumb.append(separator);
        item.innerHTML = `${itemText.trim()}`;
      }
      breadcrumb.append(item);
    });
  }

  const subHeading = document.createElement('p');
  subHeading.classList.add('hero-sub-heading');
  subHeading.innerHTML = subHeadingText.substring(0, subHeadingText.indexOf('|') - 1);
  heading.append(subHeading);

  const tagsContainer = Object.assign(document.createElement('div'), { className: 'tags-container' });
  const componentTags = [getMetadata('designowner'), getMetadata('uielementstechnology'), getMetadata('elementtype')];
  componentTags.forEach((tagName) => {
    if (tagName.trim().length > 0) {
      const tagItem = Object.assign(document.createElement('span'), { className: 'tag' });
      tagItem.innerHTML = tagName;
      tagsContainer.append(tagItem);
    }
  });

  const hero = div(
    { class: 'fiori-hero-banner' },
    div(
      {
        slot: 'content',
        class: ['hero-banner', 'media-content'],
      },
      heading,
      tagsContainer,
    ),
    div(
      {
        slot: 'additionalContent',
        class: ['hero-banner', 'media-additionalContent'],
      },
      breadcrumb,
    ),
    picture(
      { slot: 'backgroundPicture' },
      source({ media: '(min-width: 1600px)', srcset: `/design-system/images/hero/xl-${imageName}.svg` }),
      source({ media: '(min-width: 1280px)', srcset: `/design-system/images/hero/l-${imageName}.svg` }),
      source({ media: '(min-width: 980px)', srcset: `/design-system/images/hero/m-${imageName}.svg` }),
      source({ media: '(min-width: 640px)', srcset: `/design-system/images/hero/s-${imageName}.svg` }),
      img({ src: `/design-system/images/hero/xs-${imageName}.svg`, classList: 'custom-background-image' }),
    ),
  );

  block.replaceWith(hero);
}
