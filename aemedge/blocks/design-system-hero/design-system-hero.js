import { decorateIcons, getMetadata } from '../../scripts/aem.js';
import {
  a,
  button,
  div,
  img,
  li,
  picture,
  source,
  span,
  ul,
} from '../../scripts/dom-builder.js';
import '@udex/webcomponents/dist/HeroBanner.js';
import { getVersionList } from '../../scripts/utils.js';
import { getLatestVersion } from '../../scripts/ds-scripts.js';

async function addVersioningDropdown(currentVersion, breadcrumb) {
  const dropdownArrowDown = span({ class: 'icon icon-slim-arrow-right-blue' });
  let versionSelectorTarget = currentVersion;
  if (currentVersion === 'latest') {
    versionSelectorTarget = await getLatestVersion();
  }
  // dropdown button which handles the open and closing of the dropdown
  const dropdownButton = button(
    {
      class: 'dropdown-btn',
      onclick: (e) => {
        const options = e.target.parentNode;
        if (options) {
          options.classList.toggle('open');
        }
      },
    },
    versionSelectorTarget,
    dropdownArrowDown,
  );
  decorateIcons(dropdownButton);

  const currentPathname = window.location.pathname;

  // options dropdown items container
  const options = ul(
    { class: 'options' },
    ...(await getVersionList()).reverse().map((version) => li(
      { value: version },
      a({ href: currentPathname.replace(versionSelectorTarget, version) }, version),
    )),
  );

  const dropdownOptions = div(
    { class: 'dropdown-options' },
    options,
  );

  const versions = div(
    { class: 'last-updated-version' },
    div({ class: 'last-updated-date' }),
    div(
      { class: 'dropdown' },
      dropdownButton,
      dropdownOptions,
    ),
  );
  breadcrumb.append(versions);
}

export default async function decorate(block) {
  const heading = block.querySelector('div > div > div:nth-child(1) > div > h1');
  const subHeadingText = block.querySelector('div > div > div:nth-child(1) > div > h3')?.textContent ?? '';

  const category = getMetadata('category') || 'uielements';
  const pagetype = getMetadata('pagetype') || 'inner';
  const imageName = `${category}-${pagetype}`;

  const breadcrumbItems = div({ class: 'items' });
  const metaBreadcrumbs = getMetadata('breadcrumbs');
  if (metaBreadcrumbs) {
    const breadcrumbText = `Home / ${metaBreadcrumbs}`;
    breadcrumbText.split('/').forEach((itemText) => {
      const item = Object.assign(document.createElement('a'), { className: 'item' });
      if (itemText.trim() === 'Home') {
        item.innerHTML = itemText.trim();
        item.setAttribute('href', '/topics/');
      } else {
        const separator = document.createElement('span');
        separator.innerHTML = ' / ';
        breadcrumbItems.append(separator);
        item.innerHTML = `${itemText.trim()}`;
        item.setAttribute('href', '/fiori-design-web/ui-elements/ui-elements');
      }
      breadcrumbItems.append(item);
    });
  }

  const breadcrumb = div(
    { class: 'breadcrumb' },
    breadcrumbItems,
  );

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

  const currentVersion = getMetadata('version');
  if (currentVersion) {
    await addVersioningDropdown(currentVersion, breadcrumb);
  }

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
