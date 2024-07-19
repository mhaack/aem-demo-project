import { getMetadata, decorateIcons, loadCSS } from '../../scripts/aem.js';
import { loadFragment, decorateExternalLinks } from '../../scripts/scripts.js';
import {
  div, span, p, button, a, nav as navBuilder, hr,
} from '../../scripts/dom-builder.js';
import Button from '../../libs/button/button.js';

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 1280px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const navElement = document.getElementById('nav-primary');
    const navSections = navElement.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavLists(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(navElement, navSections);
      navElement.querySelector('button').focus();
    }
  }
}

/**
 * Toggles all nav lists
 * @param {Element} sections The container element
 * @param {Element[]} exclude Elements to exclude
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavLists(sections, exclude = [], expanded = false) {
  sections
    .querySelectorAll('.nav__tab-list .nav__list-parent')
    .forEach((section) => {
      if (exclude.includes(section)) {
        return;
      }
      section.setAttribute('aria-expanded', Boolean(expanded).toString());
    });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const menuButton = nav.querySelector('.burger-menu button');
  const ariaExpandedOrDesktop = expanded || isDesktop.matches;
  document.body.style.overflowY = ariaExpandedOrDesktop ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  menuButton.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  menuButton.setAttribute('aria-current', Boolean(!expanded).toString());
  // enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    // collapse menu on escape press
    window.addEventListener('keydown', closeOnEscape);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
  }
}

// TODO: Add search bar to nav when search is implemented
// function addSearchBar(element) {
//   const searchBar = div(
//     { class: 'search-bar' },
//     div(
//       { class: 'text-box' },
//       span({ class: 'label-text' }),
//       div({ class: 'voice-search' }, div({ class: 'microphone' })),
//       div({ class: 'search' }, div({ class: 'search-e' })),
//     ),
//     input({ class: 'search-box', placeholder: 'Search' }),
//   );
//   element.prepend(searchBar);
// }

function getNavBar(nav) {
  const navBar = div({ class: 'nav-bar' });
  const classes = ['sections', 'explore', 'tools'];
  classes.forEach((c) => {
    const section = nav.querySelector(`.nav-${c}`);
    if (section) {
      navBar.append(section);
    }
  });
  return navBar;
}

function getActionBar(nav, navSections) {
  const openButton = p(
    { class: 'button-container burger-menu' },
    button(
      {
        class: 'button',
        type: 'button',
        'aria-controls': 'nav-primary',
        'aria-label': 'Open Navigation',
      },
      span({ class: 'icon icon-burger' }),
    ),
  );
  openButton.addEventListener('click', () => toggleMenu(nav, navSections));
  const closeButton = p(
    { class: 'button-container close-menu' },
    button(
      {
        class: 'button',
        type: 'button',
        'aria-controls': 'nav-primary',
        'aria-label': 'Close Navigation',
      },
      span({ class: 'icon icon-close' }),
    ),
  );
  closeButton.addEventListener('click', () => {
    nav.setAttribute('aria-expanded', 'false');
    nav.querySelector('.burger-menu button').setAttribute('aria-current', false);
    document.body.style.overflowY = '';
  });
  const separator = div({ class: 'separator' });

  const actionBar = div({ class: 'nav-actions', id: 'action-buttons' });
  actionBar.append(openButton);
  actionBar.append(separator);
  actionBar.append(closeButton);
  const navTools = nav.querySelector('.nav-tools');
  navTools?.querySelectorAll(':scope p').forEach((tool) => {
    const toolElement = tool.cloneNode(true);
    actionBar.prepend(toolElement);
  });
  decorateIcons(openButton);
  decorateIcons(closeButton);
  return actionBar;
}

function decorateLogo(nav) {
  const navBrand = nav.querySelector('.nav-brand');
  const brandLogo = div(
    { class: 'logo' },
    a(
      {
        href: '/',
        title: 'SAP',
        'aria-label': 'SAP',
      },
      span({ class: 'icon icon-brand' }),
    ),
  );
  const brandElementsWrapper = navBrand.firstElementChild;
  if (
    brandElementsWrapper != null
    && brandElementsWrapper.classList.contains('default-content-wrapper')
  ) {
    brandElementsWrapper.prepend(brandLogo);
  } else {
    navBrand.prepend(brandLogo);
  }
  const brandLink = navBrand.querySelector('.button');
  if (brandLink) {
    brandLink.className = '';
    brandLink.closest('.button-container').className = '';
  }
  const brandElement = navBrand.querySelectorAll('p');
  if (brandElement.length > 0) {
    brandElement[0].classList.add('site-label');
  }
  decorateIcons(brandLogo);
}

function wrapLinkTextNodeInSpan(link) {
  Array.from(link.childNodes)
    .forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
        const spanElement = span();
        const textNode = node.cloneNode(true);
        spanElement.appendChild(textNode);
        link.replaceChild(spanElement, node);
      }
    });
}

function decorateListItemText(listItem) {
  wrapLinkTextNodeInSpan(listItem);
  const firstChild = listItem.querySelector(':first-child');
  firstChild?.classList.add('text');
  firstChild?.setAttribute('tabindex', 0);
  return firstChild;
}

function decorateListItem(nav, listItem, parents = []) {
  let clickableElement = listItem;
  if (listItem.querySelector('ul')) {
    clickableElement = decorateListItemText(listItem);
    listItem.classList.add('nav__list-parent');
    listItem.querySelectorAll('li').forEach((item) => {
      decorateListItem(nav, item, [listItem, ...parents]);
    });
    const toggle = (event) => {
      event.preventDefault();
      toggleAllNavLists(nav, [listItem, ...parents]);
      const expanded = listItem.getAttribute('aria-expanded') === 'true';
      listItem.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    };
    clickableElement?.addEventListener('click', toggle);
    clickableElement?.addEventListener('keydown', (event) => {
      if (event.code === 'Enter' || event.code === 'Space') {
        toggle(event);
      }
    });
  } else if (listItem.textContent === '---') {
    listItem.parentElement?.replaceChild(hr({ class: 'nav__separator' }), listItem);
  } else {
    wrapLinkTextNodeInSpan(listItem.querySelector('a'));
  }
  decorateExternalLinks(listItem);
  return listItem;
}

function addHeadingToDropMenu(listItem) {
  const headingText = listItem.querySelector('.text')?.textContent;
  if (headingText) {
    const heading = div({ class: 'nav__list-parent__dropdown__heading' }, headingText);
    const ul = listItem.querySelector('ul');
    const dropdown = div({ class: 'nav__list-parent__dropdown' }, heading, ul);
    listItem.appendChild(dropdown);
  }
}

function addColumnClasses(tabItem) {
  const sublistCount = tabItem.querySelectorAll(':scope > ul > li > ul').length;
  let columnClass = '';
  if (sublistCount >= 7) {
    columnClass = 'nav__list--4-column';
  } else if (sublistCount >= 5) {
    columnClass = 'nav__list--3-column';
  } else if (sublistCount >= 2) {
    columnClass = 'nav__list--2-column';
  }
  if (columnClass) {
    tabItem.classList.add(columnClass);
  }
}

function createDropMenu(nav, tabs, addTitles) {
  tabs.classList.add('nav__tab-list');

  tabs.querySelectorAll(':scope > .default-content-wrapper > ul > li').forEach((tabItem) => {
    decorateListItem(nav, tabItem, []);
    tabItem.classList.add('nav__tab');

    addColumnClasses(tabItem);

    if (addTitles) {
      addHeadingToDropMenu(tabItem);
    }
  });
}

async function generateTopNavigation() {
  // load nav as fragment
  const navMeta = getMetadata('global-nav');
  const navPath = navMeta ? new URL(navMeta).pathname : '/global-nav';
  const fragment = await loadFragment(navPath);
  const primaryNav = navBuilder({ id: 'nav-primary', 'aria-label': 'primary navigation' });

  while (fragment.firstElementChild) {
    primaryNav.append(fragment.firstElementChild);
  }
  // Brand section should never contain a list element
  const hasBrand = !primaryNav.children[0].querySelector('ul');
  if (!hasBrand) {
    // Populate with a dummy div if brand is not present
    primaryNav.insertBefore(div(), primaryNav.firstElementChild);
  }
  const classes = ['brand', 'sections', 'explore', 'tools'];
  classes.forEach((c, i) => {
    const section = primaryNav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  // populate logo
  decorateLogo(primaryNav);

  const navExplore = primaryNav.querySelector('.nav-explore');
  if (navExplore) {
    createDropMenu(primaryNav, navExplore, true);
  }

  // generate links
  const navSections = primaryNav.querySelector('.nav-sections');
  if (navSections) {
    createDropMenu(primaryNav, navSections);
    // TODO: Add search bar to nav when search is implemented
    // addSearchBar(navSections);
  }

  primaryNav.setAttribute('aria-expanded', 'false');
  primaryNav.append(getNavBar(primaryNav));
  primaryNav.append(getActionBar(primaryNav, navSections));

  return primaryNav;
}

function removeIconString(text) {
  return text ? text.replace(/:.+:/, '') : '';
}

async function generateSecondaryNavigation() {
  const navMeta = getMetadata('nav');
  if (!navMeta) {
    return null;
  }

  const navPath = navMeta ? new URL(navMeta).pathname : '/nav';
  const navFragment = await loadFragment(navPath);
  if (!navFragment) {
    return null;
  }

  loadCSS(`${window.hlx.codeBasePath}/blocks/header/secondary-nav.css`);

  const [title, tabs, action] = navFragment.children;

  const secondNav = navBuilder(
    { id: 'nav-secondary', 'aria-label': 'secondary navigation' },
    title?.children.length > 0 ? div({ class: 'nav-secondary-title' }, ...title.children) : '',
    div(
      { class: 'nav-secondary__dropdown' },
      tabs?.children.length > 0 ? div({ class: 'nav-secondary-tabs' }, ...tabs.children) : '',
      action?.children.length > 0 ? div({ class: 'nav-secondary-actions' }, ...action.children) : '',
    ),
  );

  const sideSections = secondNav.querySelector('.nav-secondary-tabs');
  let tabText;
  if (sideSections) {
    createDropMenu(secondNav, sideSections);
    sideSections.querySelectorAll('a').forEach((link) => {
      const href = new URL(link.href);
      if (window.location.pathname === href.pathname) {
        link.parentElement.setAttribute('aria-current', 'page');
      }
    });
    const activeTabText = removeIconString(sideSections.querySelector('li[aria-current="page"] a')?.textContent);
    const firstTabText = removeIconString(sideSections.querySelector('a')?.textContent);
    tabText = activeTabText || firstTabText;
  }

  const navActions = secondNav.querySelector('.nav-secondary-actions');
  if (navActions) {
    navActions.querySelectorAll('a').forEach((link) => {
      const isSecondary = link.parentElement.tagName === 'EM';
      const text = link?.textContent || null;
      const href = link?.href || null;
      const navCta = new Button(
        text,
        null,
        isSecondary ? 'secondary' : 'primary',
        { xs: 'medium', l: 'small' },
        href,
      );
      navActions.append(navCta.render());
    });
    navActions.firstElementChild.remove();
  }

  secondNav.querySelectorAll('.default-content-wrapper a').forEach((link) => {
    const href = new URL(link.href);
    if (window.location.pathname === href.pathname) {
      link.setAttribute('aria-current', 'page');
    }
  });

  const navTitle = removeIconString(secondNav.querySelector('.nav-secondary-title')?.textContent);
  const mobileDropdownButton = button(
    {
      class: 'nav-secondary__dropdown-trigger',
      'aria-expanded': 'false',
      'aria-haspopup': 'true',
      'aria-label': 'Secondary Navigation toggle',
      'aria-controls': 'nav-secondary',
    },
    span(
      { class: 'nav-secondary__dropdown-trigger__content' },
      navTitle ? span({ class: 'nav-secondary__dropdown-trigger__title' }, navTitle) : '',
      tabText ? span({ class: 'nav-secondary__dropdown-trigger__tab-label' }, tabText) : '',
    ),
  );
  mobileDropdownButton.addEventListener('click', () => {
    const expanded = secondNav.getAttribute('aria-expanded') === 'true';
    toggleAllNavLists(secondNav);
    secondNav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    mobileDropdownButton.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  });
  secondNav.insertBefore(mobileDropdownButton, secondNav.firstChild);
  return secondNav;
}

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const nav = await generateTopNavigation();
  if (nav) {
    block.append(nav);
  }
  const secondNav = await generateSecondaryNavigation();
  if (secondNav) {
    block.append(secondNav);
  }
  document.addEventListener('click', (event) => {
    if (nav && !nav.contains(event.target)) {
      toggleAllNavLists(nav);
      nav.setAttribute('aria-expanded', 'false');
    }
    if (secondNav && !secondNav.contains(event.target)) {
      toggleAllNavLists(secondNav);
      secondNav.setAttribute('aria-expanded', 'false');
    }
  });

  const hero = document.body.querySelector('.hero-wrapper');
  if (secondNav && hero) {
    // Should appear at top of screen when hero is no longer visible
    const heroObserver = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) {
        secondNav.classList.add('nav-secondary--fixed');
      } else {
        secondNav.classList.remove('nav-secondary--fixed');
      }
    });
    heroObserver.observe(hero);
  }
}
