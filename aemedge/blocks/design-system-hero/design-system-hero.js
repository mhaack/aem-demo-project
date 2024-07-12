import { decorateIcons, getMetadata } from '../../scripts/aem.js';
import {
  a, button, div, img, li, picture, source, span, ul,
} from '../../scripts/dom-builder.js';
import '@udex/webcomponents/dist/HeroBanner.js';
import { fioriWebRootUrl, getVersionList } from '../../scripts/utils.js';
import {
  getLatestUrl,
  getLatestVersion,
  getPathParts,
  getSiteOverviewPages,
} from '../../scripts/ds-scripts.js';

async function addVersioningDropdown(currentVersion, breadcrumb) {
  const dropdownArrowDown = span(
    {
      class: 'icon icon-slim-arrow-right-blue',
      onclick: (e) => {
        const options = e.target.closest('.dropdown');
        if (options) {
          options.classList.toggle('open');
        }
      },
    },
  );
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
    span({ class: 's-view' }, 'v'),
    span({ class: 'lg-view' }, 'Version'),
    versionSelectorTarget,
    dropdownArrowDown,
  );
  decorateIcons(dropdownButton);

  let editablePathname = window.location.pathname;
  if (currentVersion === 'latest') {
    editablePathname = editablePathname.replace(fioriWebRootUrl, `${fioriWebRootUrl}v${versionSelectorTarget}/`);
  }

  // options dropdown items container
  const options = ul(
    { class: 'options' },
    ...(await getVersionList()).reverse().map((version) => li(
      { value: version },
      a({ href: editablePathname.replace(versionSelectorTarget, version) }, version),
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

function getPathForBreadcrumbComponent(pathParts, idx, version, overviewPaths) {
  const diff = (version === 'latest' || idx === 0) ? 2 : 3;

  const path = `/${pathParts.slice(0, idx + diff).join('/')}/`;
  if (idx === 0) {
    return path;
  }

  const isOverviewPage = overviewPaths.some((pagePath) => path.endsWith(pagePath));
  if (isOverviewPage) {
    return path;
  }

  return null;
}

export default async function decorate(block) {
  const heading = block.querySelector('div > div > div:nth-child(1) > div > h1');
  const subHeadingText = block.querySelector('div > div > div:nth-child(1) > div > h3')?.textContent ?? '';

  const category = getMetadata('category') || 'uielements';
  const pagetype = getMetadata('pagetype') || 'inner';
  const imageName = `${category}-${pagetype}`;

  const breadcrumbItems = div({ class: 'items' });
  const metaBreadcrumbs = getMetadata('breadcrumbs');
  const currentVersion = getMetadata('version');
  if (metaBreadcrumbs) {
    const breadcrumbParts = ['Home', ...metaBreadcrumbs.split('/').map((part) => part.trim())];

    const latestUrl = getLatestUrl(window.location.pathname, currentVersion);
    const overviewPaths = (await getSiteOverviewPages())
      .map((page) => page.path)
      .filter((path) => latestUrl.includes(path));

    const pathParts = getPathParts(window.location.pathname);

    breadcrumbParts.forEach((itemText, idx) => {
      if (idx !== 0) {
        const separator = document.createElement('span');
        separator.innerHTML = ' / ';
        breadcrumbItems.append(separator);
      }
      let path = window.location.pathname;
      if (idx !== breadcrumbParts.length - 1) {
        path = getPathForBreadcrumbComponent(pathParts, idx, currentVersion, overviewPaths);
      }
      const item = (path) ? a({ class: 'item', href: path }, itemText) : span({ class: 'item' }, itemText);
      breadcrumbItems.append(item);
    });
  }

  const breadcrumb = div(
    { class: 'breadcrumb' },
    breadcrumbItems,
  );

  const subHeading = document.createElement('p');
  subHeading.classList.add('hero-sub-heading');
  const lastPipe = subHeadingText.indexOf('|');
  subHeading.innerHTML = (lastPipe === -1) ? subHeadingText : subHeadingText.substring(0, lastPipe);
  heading.append(subHeading);

  const tagsContainer = div({ class: 'tags-container' });
  const componentTags = [getMetadata('uielementstechnology'), getMetadata('elementtype')];
  let hasTags = false;
  componentTags.forEach((tagName) => {
    if (tagName.trim().length > 0) {
      const tagItem = Object.assign(document.createElement('span'), { className: 'tag' });
      tagItem.innerHTML = tagName;
      tagsContainer.append(tagItem);
      hasTags = true;
    }
  });

  if (currentVersion && !block.classList.contains('landing-page')) {
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
  if (hasTags) {
    hero.classList.add('with-tags');
  }

  block.replaceWith(hero);
  const dropB = document.querySelector('.dropdown-btn');
  const dropM = document.querySelector('.dropdown');
  document.addEventListener('mousedown', (event) => {
    if (!dropM.contains(event.target) && !dropB.contains(event.target)) {
      dropM.classList.remove('open');
    }
  });

  const pagetypes = getMetadata('pagetype');
  const titleheading = document.title;
  const slot = document.querySelector('div[slot=content]');

  if (pagetypes === 'home') {
    const title = div(
      {
        slot: 'title',
        class: ['hero-banner', 'media-content'],
      },
      titleheading,
    );
    slot.prepend(title);
  }
}
