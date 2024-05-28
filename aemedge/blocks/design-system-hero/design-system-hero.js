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
  const imageName = block.querySelector('div:nth-child(1) > div > div > div:nth-child(2) > div').textContent;
  const breadcrumbText = getMetadata('breadcrumbs');
  const breadcrumb = document.createElement('span');
  breadcrumb.innerHTML = breadcrumbText;

  const hero = div({
    class: 'fiori-hero-banner',
  });
  const contentSlot = div(
    {
      slot: 'content',
      class: ['hero-banner', 'media-content'],
    },
    heading,
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
