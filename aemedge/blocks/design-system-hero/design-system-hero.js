import { createOptimizedPicture, getMetadata } from '../../scripts/aem.js';
import { div } from '../../scripts/dom-builder.js';
import '@udex/webcomponents/dist/HeroBanner.js';

const mediaQueryXL = window.matchMedia('(min-width: 1600px)');
const mediaQueryL = window.matchMedia('(min-width: 1280px)');
const mediaQueryM = window.matchMedia('(min-width: 980px)');
const mediaQueryS = window.matchMedia('(min-width: 640px)');

function decorateImageName(imageName) {
  let decoratedImageName = '';
  if (mediaQueryXL.matches) {
    decoratedImageName = `xl-${imageName}`;
  } else if (mediaQueryL.matches) {
    decoratedImageName = `l-${imageName}`;
  } else if (mediaQueryM.matches) {
    decoratedImageName = `m-${imageName}`;
  } else if (mediaQueryS.matches) {
    decoratedImageName = `s-${imageName}`;
  } else {
    decoratedImageName = `xs-${imageName}`;
  }

  return `/design-system/images/hero/${decoratedImageName}.png`;
}

function decorateImage(hero, imageName) {
  const decoratedImageName = decorateImageName(imageName);
  const picture = createOptimizedPicture(decoratedImageName);
  const oldPicture = hero.querySelector('picture');
  if (picture) {
    picture.setAttribute('slot', 'backgroundPicture');
    const img = picture.querySelector('img');
    img.classList.add('custom-background-image');
    hero.append(picture);
  }
  if (oldPicture) {
    oldPicture.remove();
  }
  return hero;
}

export default async function decorate(block) {
  const heading = block.querySelector('div > div > div:nth-child(1) > div > h1');
  const subHeadingText = block.querySelector('div > div > div:nth-child(1) > div > h3').textContent;
  const imageName = block.querySelector('div:nth-child(1) > div > div > div:nth-child(2) > div').textContent;
  const breadcrumb = div({
    class: 'breadcrumb-container',
  });
  const breadcrumbText = `Home / ${getMetadata('breadcrumbs')}`;
  breadcrumbText.split('/').forEach((itemText) => {
    const item = Object.assign(document.createElement('span'), { className: 'breadcrumb-item' });
    if (itemText.trim() === 'Home') {
      item.innerHTML = itemText.trim();
    } else {
      const seprator = document.createElement('span');
      seprator.innerHTML = ' / ';
      breadcrumb.append(seprator);
      item.innerHTML = `${itemText.trim()}`;
    }
    breadcrumb.append(item);
  });

  const hero = div({
    class: 'fiori-hero-banner',
  });

  const subHeading = document.createElement('p');
  subHeading.classList.add('hero-sub-heading');
  const textValue = subHeadingText.substring(0, subHeadingText.indexOf('|') - 1);
  subHeading.innerHTML = textValue;
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

  const contentSlot = div(
    {
      slot: 'content',
      class: ['hero-banner', 'media-content'],
    },
    heading,
    tagsContainer,
  );

  hero.append(contentSlot);
  const breadcrumbSlot = div(
    {
      slot: 'additionalContent',
      class: ['hero-banner', 'media-additionalContent'],
    },
    breadcrumb,
  );
  hero.append(breadcrumbSlot);

  decorateImage(hero, imageName);
  mediaQueryXL.addEventListener('change', () => {
    decorateImage(hero, imageName);
  });
  mediaQueryL.addEventListener('change', () => {
    decorateImage(hero, imageName);
  });
  mediaQueryM.addEventListener('change', () => {
    decorateImage(hero, imageName);
  });
  mediaQueryS.addEventListener('change', () => {
    decorateImage(hero, imageName);
  });
  block.replaceWith(hero);
}
