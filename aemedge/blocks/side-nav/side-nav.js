import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../../scripts/scripts.js';
import {
  button, div, nav as navBuilder, span,
} from '../../scripts/dom-builder.js';

function collapse(collapsable) {
  if (collapsable) {
    collapsable.setAttribute('aria-expanded', 'false');
  }
}

function expand(expandable) {
  if (expandable) {
    expandable.setAttribute('aria-expanded', 'true');
  }
}

function toggleAllNavLists(nav, exclude = [], expanded = false) {
  nav
    .querySelectorAll('.nav__list-parent')
    .forEach((section) => {
      if (exclude.includes(section)) {
        return;
      }
      section.setAttribute('aria-expanded', Boolean(expanded).toString());
    });
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
    // If list item parent is a link, don't toggle
    // Will navigate to new page where the menu will be expanded
    if (!listItem.querySelector(':scope > a')) {
      const toggle = () => {
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
    }
  }
  return listItem;
}

function createDropMenu(nav, tabs) {
  tabs.querySelectorAll(':scope > .default-content-wrapper > ul > li').forEach((tabItem) => {
    decorateListItem(nav, tabItem, []);
  });
}

function addClickHandlerToDropdownButton(nav, dropdownButton) {
  dropdownButton.addEventListener('click', () => {
    const expanded = nav.getAttribute('aria-expanded');
    const listHidden = !expanded || expanded === 'false';
    if (listHidden) {
      expand(dropdownButton);
      expand(nav);
    } else {
      collapse(dropdownButton);
      collapse(nav);
    }
  });
}

function renderDropdownButton(active, activeParent, fallback) {
  const dropdownButtonLabels = [];
  if (active && activeParent) {
    // Alternate between level 1 and level 2 text in collapsed/espanded state
    dropdownButtonLabels.push(span({ class: 'nav-side__dropdown-button__level-2' }, active.textContent));
    dropdownButtonLabels.push(span({ class: 'nav-side__dropdown-button__level-1' }, activeParent.querySelector('.text')?.textContent));
  } else if (active) {
    // Show active link name if level 1
    dropdownButtonLabels.push(span({ class: 'nav-side__dropdown-button__level-1' }, active.textContent));
  }
  if (dropdownButtonLabels.length === 0) {
    // Fallback to first link if no links in nav are currently active
    dropdownButtonLabels.push(span({ class: 'nav-side__dropdown-button__level-1' }, fallback));
  }

  return button(
    {
      class: 'nav-side__dropdown-button',
      'aria-expanded': 'false',
      'aria-haspopup': 'true',
      'aria-controls': 'sidenav',
      'aria-label': 'Side Navigation',
    },
    ...dropdownButtonLabels,
  );
}

async function generateSideNavigation() {
  const template = getMetadata('template');
  if (template !== 'hub-l2') {
    return null;
  }
  const sideNavMeta = getMetadata('sidenav');
  const sideNavPath = sideNavMeta
    ? new URL(sideNavMeta).pathname
    : `/${window.location.pathname.split('/')[1]}/sidenav`;
  const sideFragment = await loadFragment(sideNavPath);
  if (!sideFragment) {
    return null;
  }
  const allSideNavSections = div({ class: 'nav-side__sections-container' });
  while (sideFragment.firstElementChild) {
    allSideNavSections.append(sideFragment.firstElementChild);
  }
  Array.from(allSideNavSections.children).forEach((section) => {
    if (section) {
      section.classList.add('nav-side__sections');
      createDropMenu(allSideNavSections, section);
    }
  });

  let active;
  let activeParent;
  allSideNavSections.querySelectorAll('.default-content-wrapper a').forEach((link) => {
    const href = new URL(link.href);
    if (window.location.pathname === href.pathname) {
      active = link;
      active.setAttribute('aria-current', 'page');
      activeParent = active?.closest('.nav__list-parent');
      expand(activeParent);
    }
  });

  const fallback = allSideNavSections.querySelector('p, a, .text')?.textContent;
  const dropdownButton = renderDropdownButton(active, activeParent, fallback);

  const sideNav = navBuilder({ id: 'sidenav' }, dropdownButton, allSideNavSections);

  addClickHandlerToDropdownButton(sideNav, dropdownButton);

  return sideNav;
}

export default async function decorate(block) {
  const sideNav = await generateSideNavigation();
  if (sideNav) {
    block.append(sideNav);
  }
}
