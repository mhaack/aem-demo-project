import {
  a,
  div,
  img,
  li,
  span,
  ul,
} from '../../scripts/dom-builder.js';
import ffetch from '../../scripts/ffetch.js';
import { convertStringToKebabCase } from '../../scripts/utils.js';
import { mediaQueryLists } from '../../scripts/config-ds.js';

// TODO: Update the URL to the actual query index URL
const QUERY_INDEX_URL = '/fiori-design-web/mock-query-index.json';
const VALUE_SEPARATOR = ',';
const isCategoryHeaderLink = (el) => el.tagName === 'A' && el.getAttribute('href') === '#' && el.hasAttribute('data-category');
const isOverviewPageLink = (el) => el.tagName === 'A' && el.hasAttribute('data-overview');
const isLevel2ListLink = (el) => el.tagName === 'A' && !isCategoryHeaderLink(el) && !isOverviewPageLink(el);
const body = document.querySelector('body');
let mainNavWrapper;
let mainNavLinks;
let level1ListItems;
let level2Lists;
let categoryHeaderLinks;
let isExpanded = false;
let isPointerInside = false;

/**
 * Handle the click event on a link and update the visual state of the main navigation.
 * @param event {Event} The click event.
 */
function handleMainNavLinkClick(event) {
  const target = event.target.closest('a');
  const categoryHeaders = [...mainNavWrapper.querySelectorAll('.main-nav__category-header')];

  /**
   * Category header link has only expanded/collapsed behavior
   */
  if (isCategoryHeaderLink(target)) {
    event.preventDefault();
    event.stopPropagation();
  }

  categoryHeaders.forEach((link) => {
    const level1ListItem = link.closest('.main-nav__list-level-1-item');
    const level2List = level1ListItem?.querySelector('.main-nav__list-level-2');

    if (isCategoryHeaderLink(target)) {
      const isLinkTarget = link === target;
      const isLinkCurrent = link.getAttribute('aria-current') === 'true';
      const isLevel1Expanded = level1ListItem?.getAttribute('aria-expanded') === 'true';
      const isLevel2Expanded = level2List?.getAttribute('aria-expanded') === 'true';

      /**
       * Reset the expanded state of the category header and its sublist.
       */
      if (!isLinkTarget) {
        link.setAttribute('aria-current', 'false');
        level1ListItem?.setAttribute('aria-expanded', 'false');
        level2List?.setAttribute('aria-expanded', 'false');
      }

      /**
       * 1) Remove expanded category header state if a link in level 2 list is active
       * or if the category header is already active.
       * 2) In any other case, toggle the expanded state of the category header and its sublist.
       */
      if (isLinkTarget) {
        if (
          (!isLinkCurrent && isLevel1Expanded && isLevel2Expanded)
          || isLinkCurrent
        ) {
          // 1
          link.setAttribute('aria-current', 'false');
          level1ListItem?.setAttribute('aria-expanded', 'false');
          level2List?.setAttribute('aria-expanded', 'false');
        } else {
          // 2
          link.setAttribute('aria-current', 'true');
          level1ListItem?.setAttribute('aria-expanded', 'true');
          level2List?.setAttribute('aria-expanded', 'true');
        }
      }
    }
  });
}

/**
 * Set the current page link as active.
 * The current page link is determined by comparing the `href`
 * attribute of each link with the current pathname.
 * The comparison is done without the trailing slash to ensure uniformity.
 */
function setInitialState() {
  const path = window.location.pathname.replace(/\/$/, '');
  const links = [...mainNavWrapper.querySelectorAll('a')];

  mainNavWrapper.setAttribute('aria-expanded', 'false');

  links.forEach((link) => {
    const level1ListItem = link.closest('.main-nav__list-level-1-item');
    const level2List = level1ListItem?.querySelector('.main-nav__list-level-2');
    const categoryHeaderLink = level1ListItem?.querySelector('.main-nav__category-header');

    // Remove trailing slash from the href attribute
    const href = link.getAttribute('href').replace(/\/$/, '');

    /**
     * Set the current page link as active.
     */
    if (href === path) {
      if (isOverviewPageLink(link)) {
        link.setAttribute('aria-current', 'true');
      } else if (isLevel2ListLink(link)) {
        /**
         * Set the current page link as active
         */
        link.setAttribute('aria-current', 'true');
        level1ListItem?.setAttribute('aria-expanded', 'false');
        level2List?.setAttribute('aria-expanded', 'false');
        categoryHeaderLink?.setAttribute('aria-current', 'false');

        /**
         * Set the category header as active if the main nav is collapsed.
         */
        if (mainNavWrapper.getAttribute('aria-expanded') === 'false') {
          categoryHeaderLink?.setAttribute('aria-current', 'true');
        }
      }
    }
  });
}

/**
 * Reset the main navigation to its initial (empty and clean) state.
 */
function resetMainNav() {
  mainNavWrapper.setAttribute('aria-expanded', 'false');
  level1ListItems.forEach((item) => item.setAttribute('aria-expanded', 'false'));
  level2Lists.forEach((list) => list.setAttribute('aria-expanded', 'false'));
  categoryHeaderLinks.forEach((link) => link.setAttribute('aria-current', 'false'));
}

function registerMainNavLinkClickEvents() {
  // delegate the event down to the links
  mainNavWrapper.addEventListener('click', (event) => {
    const target = event.target.closest('a');
    if (target) { handleMainNavLinkClick(event); }
  });
}

/**
 * Update the state of the main navigation.
 * @param expand {boolean} The state to set the main navigation to.
 * @param event {Event|PointerEvent|KeyboardEvent} Event that triggered the state update.
 */
function updateMainNavState(expand, event) {
  const links = [...mainNavWrapper.querySelectorAll('a')];

  if (body.getAttribute('data-mobile') === 'true') {
    mainNavWrapper.setAttribute('aria-expanded', 'true');
  } else {
    mainNavWrapper.setAttribute('aria-expanded', expand ? 'true' : 'false');
  }

  /**
   * Handle the pointerenter event on the main navigation wrapper.
   * @param linkState {Object} The state of the link.
   */
  function pointerenterHandler(linkState) {
    const {
      link,
      level1ListItem,
      level2List,
      categoryHeaderLink,
    } = linkState;

    if (isCategoryHeaderLink(link)) {
      if (link.getAttribute('aria-current') === 'true') {
        categoryHeaderLink?.setAttribute('aria-current', 'false');
      }
    } else if (isOverviewPageLink(link)) {
      if (link.getAttribute('aria-current') === 'true') {
        categoryHeaderLink?.setAttribute('aria-current', 'true');
      }
    } else if (isLevel2ListLink(link)) {
      if (link.getAttribute('aria-current') === 'true') {
        level1ListItem?.setAttribute('aria-expanded', 'true');
        level2List?.setAttribute('aria-expanded', 'true');
        categoryHeaderLink?.setAttribute('aria-current', 'false');
      }
    }
  }

  /**
   * Handle the pointerleave and blur events on the main navigation wrapper.
   * @param linkState {Object} The state of the link.
   */
  function pointerleaveAndBlurHandler(linkState) {
    const {
      link,
      level1ListItem,
      level2List,
      categoryHeaderLink,
    } = linkState;

    if (isCategoryHeaderLink(link)) {
      if (link.getAttribute('aria-current') === 'true') {
        level1ListItem?.setAttribute('aria-expanded', 'false');
        level2List?.setAttribute('aria-expanded', 'false');
        categoryHeaderLink?.setAttribute('aria-current', 'false');
      }
    } else if (isOverviewPageLink(link)) {
      if (link.getAttribute('aria-current') === 'false') {
        setInitialState();
      }
    } else if (isLevel2ListLink(link)) {
      if (link.getAttribute('aria-current') === 'true') {
        level1ListItem?.setAttribute('aria-expanded', 'false');
        level2List?.setAttribute('aria-expanded', 'false');
        categoryHeaderLink?.setAttribute('aria-current', 'true');
      }
    }
  }

  links.forEach((link) => {
    const level1ListItem = link.closest('.main-nav__list-level-1-item');
    const level2List = level1ListItem?.querySelector('.main-nav__list-level-2');
    const categoryHeaderLink = level1ListItem?.querySelector('.main-nav__category-header');
    const linkState = {
      link,
      level1ListItem,
      level2List,
      categoryHeaderLink,
    };

    if (body.getAttribute('data-mobile') === 'false') {
      if (event.type === 'pointerenter') {
        pointerenterHandler(linkState);
      } else if (event.type === 'pointerleave' || event.type === 'blur') {
        pointerleaveAndBlurHandler(linkState);
      }
    }
  });
}

/**
 * Consolidated update the state of the main navigation helper.
 * @param expand {boolean} The state to set the main navigation to.
 * @param event {Event|PointerEvent|KeyboardEvent} Event that triggered the state update.
 */
function updateNavState(expand, event) {
  isExpanded = expand;
  updateMainNavState(expand, event);
}

/**
 * Handle the pointerenter event on the main navigation wrapper.
 * @param event {PointerEvent} The pointerenter event.
 */
function handlePointerenterEvent(event) {
  isPointerInside = true;
  updateNavState(true, event);
}

/**
 * Handle the pointerleave event on the main navigation wrapper.
 * Checks if the `relatedTarget` of the event (the element the mouse pointer is moving to)
 * is not a child of `mainNavWrapper`.
 * Delay is used to ensure that focus can return or another pointerenter can occur.
 * @param event {PointerEvent} The pointerleave event.
 */
function handlePointerleaveEvent(event) {
  isPointerInside = false;
  if (!mainNavWrapper.contains(event.relatedTarget)) {
    setTimeout(() => {
      if (!isPointerInside) {
        updateNavState(false, event);
      }
    }, 100);
  }
}

/**
 * Handle the blur event on the main navigation wrapper.
 * @param event {KeyboardEvent|PointerEvent} The blur event.
 */
function handleBlurEvent(event) {
  if (!mainNavWrapper.contains(event.relatedTarget) && !isPointerInside) {
    updateNavState(false, event);
  }
}

/**
 * Handle the focus event on the main navigation wrapper.
 * @param event {KeyboardEvent} The focus event.
 */
function handleFocusEvent(event) {
  updateNavState(true, event);
}

/**
 * General interaction handler for pointer (mouse) and keyboard events.
 * 1. Check if pointerleave/blur is going to an element outside the nav wrapper.
 * 2. On pointerenter/focus within the nav, keep the nav expanded.
 * @param event {Event|PointerEvent|KeyboardEvent} The event.
 */
function handleInteraction(event) {
  switch (event.type) {
    case 'pointerenter':
      handlePointerenterEvent(event);
      break;
    case 'focus':
      handleFocusEvent(event);
      break;
    case 'pointerleave':
      handlePointerleaveEvent(event);
      break;
    case 'blur':
      handleBlurEvent(event);
      break;
    default:
      break;
  }
}

/**
 * Prevent the default click behavior when the nav wrapper is expanded and clicked on.
 * Ensure the nav stays expanded unless a link is specifically clicked.
 * @param event {Event} The click event.
 */
function handleNavWrapperClick(event) {
  if (event.target === mainNavWrapper) {
    event.preventDefault();
    event.stopPropagation();
    if (!isExpanded) {
      updateNavState(true, event);
    }
  }
}

/**
 * Handle the escape key to collapse the main navigation and remove the focus from all links.
 * @param event {KeyboardEvent} The keyboard event.
 */
function handleEscapeKey(event) {
  if (isPointerInside) return;

  if (event.key === 'Escape') {
    updateNavState(false, event);
    mainNavLinks.forEach((link) => link.blur());
  }
}

function addPointerEvents() {
  mainNavWrapper.addEventListener('pointerenter', handleInteraction);
  mainNavWrapper.addEventListener('pointerleave', handleInteraction);
  mainNavWrapper.addEventListener('click', handleNavWrapperClick, true);
}

function removePointerEvents() {
  mainNavWrapper.removeEventListener('pointerenter', handleInteraction);
  mainNavWrapper.removeEventListener('pointerleave', handleInteraction);
  mainNavWrapper.removeEventListener('click', handleNavWrapperClick, true);
}

/**
 * Register keyboard events for the main navigation wrapper.
 */
function registerKeyboardEvents() {
  const categoryHeaders = [...mainNavWrapper.querySelectorAll('.main-nav__category-header')];
  categoryHeaders.forEach((link) => {
    link.addEventListener('focus', handleInteraction);
    link.addEventListener('blur', handleInteraction);
  });
  document.addEventListener('keydown', handleEscapeKey);
}

/**
 * Create a list item with a link (subentries).
 * @param item The item to be used for creating the list item link.
 * @param breadcrumbsParts
 * @returns {Element} The list item link.
 */
function createListItemLink(item, breadcrumbsParts) {
  const listItem = li();
  const link = a(
    {
      href: item.path,
    },
    `${breadcrumbsParts.slice(1).join(', ')}`,
  );
  listItem.appendChild(link);

  return listItem;
}

/**
 * Create a category header: li + a.
 * @param categoryName The name of the category.
 * @param item The item to be used for creating the category header.
 * @param isOverviewPage {boolean} Whether the category is an overview page.
 * @returns {Element} The category header.
 */
function createCategoryHeaderListItem(categoryName, item, isOverviewPage) {
  const listItem = li({ class: 'main-nav__list-level-1-item' });
  const category = convertStringToKebabCase(categoryName);

  const linkAttributes = {
    'aria-current': 'false',
    class: 'main-nav__category-header',
    href: isOverviewPage ? `${item.path}` : '#',
    'data-category': category,
    title: isOverviewPage ? `Go to ${categoryName}` : `Expand/Collapse ${categoryName}`,
  };

  if (!isOverviewPage) {
    linkAttributes.tabIndex = '0';
  } else {
    linkAttributes['data-overview'] = 'true';
  }

  const link = a(linkAttributes);

  const icon = span(
    { class: 'icon main-nav__category-header-icon' },
    img({
      'data-icon-name': category,
      src: `${window.hlx.codeBasePath}/icons/${category}.svg`,
      alt: `${categoryName} Icon`,
      loading: 'lazy',
    }),
  );

  const label = span(
    { class: 'main-nav__category-header-label' },
    categoryName,
  );

  link.append(icon, label);
  listItem.appendChild(link);

  return listItem;
}

function addSublistIconToCategoryHeader(categoryHeaderListItem) {
  if (!categoryHeaderListItem) return;

  categoryHeaderListItem.setAttribute('data-has-sublist', 'true');

  const arrowIcon = span(
    { class: 'icon main-nav__category-header-arrow' },
    img({
      'data-icon-name': 'slim-arrow-right',
      src: `${window.hlx.codeBasePath}/icons/slim-arrow-right.svg`,
      alt: '',
      loading: 'lazy',
    }),
  );

  const link = categoryHeaderListItem.querySelector('a');
  if (link) {
    link.appendChild(arrowIcon);
  }
}

/**
 * Create a sublist.
 * @returns {Element} The sublist (as an unordered list).
 */
function createSublist() {
  return ul({
    class: [
      'main-nav__list',
      'main-nav__list-level-2',
    ],
    'aria-expanded': 'false',
  });
}

/**
 * Create the main navigation structure with sublists for each category.
 * @param queryIndexData {Array} The data to be used for creating the navigation.
 * @returns {Element} The main navigation container.
 */
function createMainNav(queryIndexData) {
  const mainNavContainer = div({ class: ['main-nav__container'] });
  const mainSection = div({ class: ['main-nav__section', 'main-nav__section-main'] });
  const mainList = ul({ class: ['main-nav__list', 'main-nav__list-level-1', 'main-nav__list-main'] });
  const utilitySection = div({ class: ['main-nav__section', 'main-nav__section-utility'] });
  const utilityList = ul({ class: ['main-nav__list', 'main-nav__list-level-1', 'main-nav__list-utility'] });
  let categoryHeaderListItem = null;
  let sublist = null;

  // Append the main and utility lists to the main and utility sections respectively
  mainSection.appendChild(mainList);
  utilitySection.appendChild(utilityList);

  /**
   * Create a new data structure that groups the items by category.
   * The category name is the first part of the `breadcrumbs` column.
   * The `if` statements checks if the accumulator object already has a key for the category.
   */
  const itemsByCategory = queryIndexData.reduce((acc, item) => {
    const categoryName = item.breadcrumbs.split(VALUE_SEPARATOR)[0];
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(item);
    return acc;
  }, {});

  /**
   * Iterate over the new category items data structure to create the navigation structure.
   */
  Object.entries(itemsByCategory).forEach(([categoryName, items]) => {
    // Choose the correct top-level list based on category
    const targetList = (['Learning', 'Community', 'Support'].includes(categoryName)) ? utilityList : mainList;
    const isOverviewPage = ['UI Elements', 'Page Types'].includes(categoryName);
    const hasSublistItems = items.length > 1;
    categoryHeaderListItem = createCategoryHeaderListItem(categoryName, items[0], isOverviewPage);

    if (!isOverviewPage) {
      sublist = createSublist();
      categoryHeaderListItem.appendChild(sublist);

      items.forEach((item) => {
        // Split the `breadcrumbs` column into single parts (arrays)
        const breadcrumbsParts = item.breadcrumbs.split(VALUE_SEPARATOR);
        const hasMultipleBreadcrumbs = breadcrumbsParts.length > 1;

        if (hasMultipleBreadcrumbs) {
          sublist.appendChild(createListItemLink(item, breadcrumbsParts));
        }
      });

      if (hasSublistItems) {
        addSublistIconToCategoryHeader(categoryHeaderListItem);
      }
    }

    targetList.appendChild(categoryHeaderListItem);
  });

  // Append the main (and utility) section to the container
  mainNavContainer.appendChild(mainSection);

  // Append the utility section only if it contains items
  if (utilityList.childNodes.length > 0) {
    mainNavContainer.appendChild(utilitySection);
  }

  return mainNavContainer;
}

function addMediaQueryHandler() {
  function changeHandler() {
    if (mediaQueryLists.XL.matches) {
      addPointerEvents();
      resetMainNav();
      setInitialState();
    } else if (mediaQueryLists.L.matches) {
      addPointerEvents();
      resetMainNav();
      setInitialState();
    } else if (mediaQueryLists.M.matches) {
      addPointerEvents();
      resetMainNav();
      setInitialState();
    } else if (mediaQueryLists.S.matches) {
      removePointerEvents();
      resetMainNav();
      setInitialState();
    } else if (mediaQueryLists.XS.matches) {
      removePointerEvents();
      resetMainNav();
      setInitialState();
    }
  }

  // Add event listeners to the media query lists
  Object.values(mediaQueryLists).forEach((mql) => mql.addEventListener('change', changeHandler));
  // Call the change handler once
  changeHandler();
}

function getSitePlatform() {
  const path = window.location.pathname;

  if (path.includes('fiori-design-web')) {
    return 'web';
  }
  if (path.includes('fiori-design-ios')) {
    return 'ios';
  }
  if (path.includes('fiori-design-android')) {
    return 'android';
  }
  return null;
}

export default async function init(wrapper) {
  const platform = getSitePlatform();
  if (platform) {
    const mainNavQueryIndex = await ffetch(QUERY_INDEX_URL).sheet(platform).all();
    const mainNav = createMainNav(mainNavQueryIndex);

    if (mainNav) {
      wrapper.append(mainNav);
    }
  }
  mainNavWrapper = document.querySelector('.design-system-main-nav-wrapper');
  mainNavLinks = [...mainNavWrapper.querySelectorAll('a')];
  level1ListItems = mainNavWrapper.querySelectorAll('.main-nav__list-level-1-item');
  level2Lists = mainNavWrapper.querySelectorAll('.main-nav__list-level-2');
  categoryHeaderLinks = mainNavWrapper.querySelectorAll('.main-nav__category-header');

  registerKeyboardEvents();
  setInitialState();
  registerMainNavLinkClickEvents();
  addMediaQueryHandler();
}
