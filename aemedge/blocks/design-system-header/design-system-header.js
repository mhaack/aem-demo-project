import {
  a,
  button,
  div,
  iframe,
  li,
  nav,
  p,
  span,
  ul,
} from '../../scripts/dom-builder.js';
import initDsMainNav from './design-system-main-nav.js';
import initDsSearch from './design-system-search.js';
import {
  decorateIcons,
  loadCSS,
} from '../../scripts/aem.js';
import { mediaQueryLists } from '../../scripts/config-ds.js';

const LANDING_ZONE_LABEL = 'Design System';
const LANDING_ZONE_LABEL_MOBILE = 'SAP Design System';

const LANDING_ZONE_MENU_GROUP_PRODUCTS_URLS = [
  {
    web: {
      title: 'SAP Fiori for Web',
      titleShort: 'Web',
      url: 'https://experience.sap.com/internal/fiori-design-web/',
      segment: 'fiori-design-web',
      jouleAiUrl: '/internal/fiori-design-web/',
    },
  },
  {
    ios: {
      title: 'SAP Fiori for iOS',
      titleShort: 'iOS',
      url: 'https://experience.sap.com/internal/fiori-design-ios/',
      segment: 'fiori-design-ios',
      jouleAiUrl: '/internal/fiori-design-ios/',
    },
  },
  {
    android: {
      title: 'SAP Fiori for Android',
      titleShort: 'Android',
      url: 'https://experience.sap.com/internal/fiori-design-android/',
      segment: 'fiori-design-android',
      jouleAiUrl: '/internal/fiori-design-android/',
    },
  },
];

const LANDING_ZONE_MENU_GROUP_WEBSITES_URLS = [
  {
    designSystem: {
      title: 'All SAP.com sites',
      url: 'https://sap.frontify.com/hub/141',
    },
  },
];

const LANDING_ZONE_MENU_GROUPS = [
  {
    products: {
      title: 'For SAP Products',
      urls: LANDING_ZONE_MENU_GROUP_PRODUCTS_URLS,
    },
  },
  {
    websites: {
      title: 'For SAP.com Sites',
      urls: LANDING_ZONE_MENU_GROUP_WEBSITES_URLS,
    },
  },
];

let JOULE_AI_URL_PARAM = null;

const EXPLORE_MENU_URLS = [
  {
    implementationDocumentation: {
      title: 'Implementation Documentation',
      urls: [
        {
          title: 'SAP UI5 documentation',
          url: 'https://openui5nightly.hana.ondemand.com/topic',
        },
        {
          title: 'SAP Web Components documentation',
          url: 'https://sap.github.io/ui5-webcomponents/',
        },
        {
          title: 'Fundamentals Library documentation',
          url: '', // TODO: MVP Q2
        },
      ],
    },
  },
  {
    relatedSites: {
      title: 'Related Sites',
      urls: [
        {
          title: 'sap.com/design',
          url: 'https://www.sap.com/design.html',
        },
        {
          title: 'SAP Brand Portal',
          url: 'https://brand.sap.com/',
        },
        {
          title: 'Explore SAP',
          url: '', // TODO: MVP Q2
        },
      ],
    },
  },
];

/**
 * Remove empty strings from an array.
 * e.g., If the array is ['a', '', 'b'], the result will be ['a', 'b'].
 * (If a given `pathname` ends with a slash `/`, the last segment is an empty string)
 * @param array The array to remove empty strings from.
 * @returns {*} The array without empty strings.
 */
function removeEmptyStringsFromArray(array) {
  return array.filter((item) => item !== '');
}

/**
 * Convert camelCase to kebab-case.
 * @param str The string to convert.
 * @returns {*} The converted string.
 */
function camelToKebab(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2') // Handle lowercase followed by uppercase
    .replace(/([a-zA-Z])([0-9])/g, '$1-$2') // Handle letters followed by numbers
    .replace(/([0-9])([a-zA-Z])/g, '$1-$2') // Handle numbers followed by letters
    .toLowerCase();
}

/**
 * Add the "Design System Main Navigation" (Side Navigation) to the block.
 * @param block The block to add the main navigation to.
 */
function addDesignSystemMainNav(block) {
  loadCSS(`${window.hlx.codeBasePath}/blocks/design-system-header/design-system-main-nav.css`);
  const mainNavWrapper = nav({ class: 'design-system-main-nav-wrapper' });
  block.append(mainNavWrapper);
  initDsMainNav(mainNavWrapper);
}

/**
 * Add the "Design System Search" to the block.
 * @param block The block to add the search to.
 * @param mastheadSearch The search section.
 */
function addDesignSystemSearch(block, mastheadSearch) {
  loadCSS(`${window.hlx.codeBasePath}/blocks/design-system-header/design-system-search.css`);
  initDsSearch(block, mastheadSearch);
}

/**
 * Add the brand logo.
 * @param mastheadBrand {HTMLElement} The brand section.
 */
function addBrand(mastheadBrand) {
  const brandLogo = div({ class: 'masthead-logo' }, a({
    href: '/',
    title: 'SAP',
    'aria-label': 'SAP',
  }, span({ class: 'icon icon-sap-logo' })));
  mastheadBrand.prepend(brandLogo);
  decorateIcons(brandLogo);
}

/**
 * Generate the Explore Navigation items.
 * @param jsonObj {object} The JSON object containing the navigation items.
 * @param className {string} The class name for the navigation items.
 * @param container {HTMLElement} The container to append the navigation items to.
 */
function generateExploreNavLists(jsonObj, className, container) {
  let groupContainerDs = container.querySelector(`.${className}-group-design-system`);

  /**
   * Handle the title button click event.
   * @param e {Event} The event object.
   */
  function titleButtonClickHandler(e) {
    const target = e.currentTarget;
    const navMobile = target.closest('.explore-nav-mobile');
    const buttons = navMobile.querySelectorAll('button');
    const currentGroup = target.parentElement;
    const navGroups = {
      designSystem: navMobile.querySelector('.explore-nav-mobile-group-design-system'),
      implementationDocumentation: navMobile.querySelector('.explore-nav-mobile-group-implementation-documentation'),
      relatedSites: navMobile.querySelector('.explore-nav-mobile-group-related-sites'),
    };

    target.setAttribute('aria-pressed', target.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');

    /**
     * If the button is pressed, show the group container and hide all other group containers.
     * Due to the fact, that the links are only "not visible" in the mobile view, they should
     * also be not focusable (and vice versa).
     */
    buttons.forEach((btn) => {
      if (btn === target) {
        if (btn.getAttribute('aria-pressed') === 'true') {
          Object.values(navGroups).forEach((group) => {
            if (group !== currentGroup) {
              group.style.display = 'none';
              group.querySelector('button').setAttribute('aria-pressed', 'false');
            } else {
              group.querySelectorAll('a').forEach((link) => {
                link.removeAttribute('tabindex');
              });
            }
          });
        }

        if (btn.getAttribute('aria-pressed') === 'false') {
          Object.values(navGroups).forEach((group) => {
            if (group !== currentGroup) {
              group.style.display = 'block';
            } else {
              group.querySelectorAll('a').forEach((link) => {
                link.setAttribute('tabindex', '-1');
              });
            }
          });
        }
      }
    });
  }

  /**
   * Check if the group container for the design system exists (function is called sometimes twice)
   * to prevent duplicate group containers.
   * If not available, create it.
   */
  if (!groupContainerDs) {
    groupContainerDs = div({
      class: [
        `${className}-group`,
        `${className}-group-design-system`,
      ],
    }, button({
      'aria-pressed': 'false',
      class: `${className}-group-title-btn`,
      onclick: (e) => {
        titleButtonClickHandler(e);
      },
    }, span({
      class: 'label',
    }, LANDING_ZONE_LABEL_MOBILE), span({
      class: 'icon',
    })));
  }

  jsonObj.forEach((menuGroup) => {
    const groupName = Object.keys(menuGroup)[0];
    const groupObj = menuGroup[groupName];

    /**
     * In the mobile view, the group title is a button.
     * In the desktop view, the group title is a simple paragraph.
     */
    let groupTitle;
    if (className === 'explore-nav-mobile' && (groupName !== 'products' && groupName !== 'websites')) {
      groupTitle = button({
        'aria-pressed': 'false',
        class: `${className}-group-title-btn`,
        onclick: (e) => {
          titleButtonClickHandler(e);
        },
      }, span({
        class: 'label',
      }, groupObj.title), span({
        class: 'icon',
      }));
    } else {
      groupTitle = p({
        class: `${className}-group-title`,
      }, groupObj.title);
    }

    const groupList = ul({ class: `${className}-group-list` });

    let tabIndex = null;
    if (mediaQueryLists.M.matches) {
      tabIndex = '0';
    } else if ((mediaQueryLists.XS.matches || mediaQueryLists.S.matches)) {
      tabIndex = '-1';
    }

    /**
     * Add the URLs to the group list.
     */
    groupObj.urls.forEach(
      /**
       * @param {object} urlEntry
       */
      (urlEntry) => {
        const urlEntryName = Object.keys(urlEntry)[0];
        let entry;

        /**
         * Due to different JSON structures, the entry object needs to be handled differently.
         */
        if (
          urlEntryName === 'web'
          || urlEntryName === 'ios'
          || urlEntryName === 'android'
          || urlEntryName === 'designSystem'
        ) {
          entry = urlEntry[Object.keys(urlEntry)[0]];
        } else {
          entry = urlEntry;
        }

        const groupListLink = a({
          class: `${className}-group-list-link`,
          href: entry.url,
          title: entry.title,
          tabindex: tabIndex,
        }, entry.title);

        const groupListItem = li();
        groupListItem.appendChild(groupListLink);
        groupList.appendChild(groupListItem);
      },
    );

    const groupContainer = div({
      class: [
        `${className}-group`,
        `${className}-group-${camelToKebab(groupName)}`,
      ],
    }, groupTitle, groupList);

    /**
     * `products` and `websites` are special Design System groups and need to be appended
     * to the design system group container.
     * All other groups are appended to the main container.
     */
    if (groupName === 'products' || groupName === 'websites') {
      groupContainerDs.appendChild(groupContainer);
      if (className === 'landing-zone') {
        container.appendChild(groupContainer);
      }
    } else {
      container.appendChild(groupContainer);
    }

    if (container.classList.contains('explore-nav-mobile')) {
      container.prepend(groupContainerDs);
    }
  });
}

/**
 * Add the landing zone and links to the landing zones.
 * @param mastheadLandingZone {HTMLElement} The landing zone section.
 */
function addLandingZone(mastheadLandingZone) {
  if (!mastheadLandingZone) { return; }

  const landingZoneNav = nav({
    'aria-expanded': 'false',
    class: 'landing-zone-nav',
  });

  let mastheadLandingZoneAreaLinks = null;

  function generateLandingZoneParts() {
    const landingZoneAreaLabel = div({
      class: 'landing-zone-part landing-zone-part-label',
    }, p(LANDING_ZONE_LABEL));

    const landingZoneAreaLinks = div({
      class: 'landing-zone-part landing-zone-part-links',
    });

    mastheadLandingZone.appendChild(landingZoneAreaLabel);
    mastheadLandingZone.appendChild(landingZoneAreaLinks);
    mastheadLandingZoneAreaLinks = landingZoneAreaLinks;
  }

  /**
   * Get the current landing zone title based on the URL path.
   * Additionally, set the Joule AI URL parameter.
   * @returns {string} The current landing zone title.
   */
  function getCurrentLandingZone() {
    let currentLandingZone = '';
    const pathSegments = removeEmptyStringsFromArray(window.location.pathname.split('/'));

    LANDING_ZONE_MENU_GROUP_PRODUCTS_URLS.forEach((entry) => {
      const platform = Object.keys(entry)[0];
      const details = entry[platform];

      pathSegments.forEach((segment) => {
        if ((details.segment).includes(segment)) {
          currentLandingZone = details.titleShort;
          JOULE_AI_URL_PARAM = details.jouleAiUrl;
        }
      });
    });

    return currentLandingZone;
  }

  function generateCurrentLandingZoneButton() {
    const currentLandingZone = getCurrentLandingZone();
    const currentLandingZoneButton = button({
      'aria-expanded': 'false',
      class: 'landing-zone-current-btn',
      title: currentLandingZone,
      onclick: (e) => {
        const target = e.currentTarget;
        const landingZoneMenu = target.nextSibling;
        const isLandingZoneMenuExpanded = landingZoneMenu.getAttribute('aria-expanded') === 'true';

        target.setAttribute('aria-expanded', (!isLandingZoneMenuExpanded).toString());
        landingZoneMenu.setAttribute('aria-expanded', (!isLandingZoneMenuExpanded).toString());

        // On every click outside the button (but not the menu), close the dropdown
        document.addEventListener('click', (event) => {
          if (!event.target.closest('.landing-zone-current-btn') && !event.target.closest('.landing-zone-nav')) {
            target.setAttribute('aria-expanded', 'false');
            landingZoneMenu.setAttribute('aria-expanded', 'false');
          }
        });
      },
    }, currentLandingZone, span({ class: 'icon' }));

    mastheadLandingZoneAreaLinks.prepend(currentLandingZoneButton);
  }

  function generateLandingZoneMenus() {
    generateExploreNavLists(LANDING_ZONE_MENU_GROUPS, 'landing-zone', landingZoneNav);
    mastheadLandingZoneAreaLinks.appendChild(landingZoneNav);
  }

  generateLandingZoneParts();
  generateCurrentLandingZoneButton();
  generateLandingZoneMenus();
}

/**
 * Add the Joule AI iframe and append it to the `body` (when the Joule AI button is clicked).
 */
function loadJouleAiIframe() {
  const jouleAiIframeContainer = div({
    'aria-hidden': 'true',
    class: 'explore-joule-ai-iframe-container',
    id: 'SAPChatbotContainer',
  }, iframe({
    class: 'explore-joule-ai-iframe',
    id: 'SAPChatbotIFrame',
    src: `https://jonnyive-fioriguidelines-beta12.cfapps.eu12.hana.ondemand.com/?url=${JOULE_AI_URL_PARAM}`,
    height: '600',
    width: '416',
  }));

  document.body.appendChild(jouleAiIframeContainer);

  // eslint-disable-next-line max-len
  // TODO: How to test if the iframe is loaded? (without using setTimeout, temporary solution, `onload` does not work)
  setTimeout(() => {
    // Make sure the iframe is loaded
    const chatbotContainer = document.getElementById('SAPChatbotContainer');
    // const chatbotIframe = document.getElementById('SAPChatbotIFrame');
    const jouleAiButton = document.querySelector('.explore-btn-joule-ai');

    window.addEventListener('message', (e) => {
      try {
        const messageData = JSON.parse(e.data);
        if (messageData.type === 'JouleiFrameClosed') {
          chatbotContainer.classList.remove('open');
          chatbotContainer.setAttribute('aria-hidden', 'true');
          jouleAiButton.setAttribute('aria-pressed', 'false');
        }
      } catch (error) {
        // eslint-disable-next-line max-len
        // TODO: A lot of errors on localhost: Error parsing message data: SyntaxError: JSON.parse: unexpected character at line 1 column 2 of the JSON data, maybe HTTP VS HTTPS?
        // console.error('Error parsing message data:', error);
      }
    });
  }, 10);
}

/**
 * Generate the Explore (additional) Menu and navigation items.
 * @param exploreZone {HTMLElement} The Explore Zone.
 * @returns {Element} The Explore Menu.
 */
function generateExploreMenu(exploreZone) {
  const exploreZones = {
    jouleAiZone: exploreZone.querySelector('.explore-joule-ai'),
    notifactionsZone: exploreZone.querySelector('.explore-notifications'),
    avatarZone: exploreZone.querySelector('.explore-avatar'),
  };

  /**
   * Handle the close button state.
   * Sets the visual and ARIA states for the menu button, close button, and explore zones.
   * @param menuBtn {object} The menu button.
   * @param closeBtn {object} The close button.
   * @param exploreNav {object} The explore navigation.
   */
  function handleCloseBtnState(menuBtn, closeBtn, exploreNav) {
    const mastheadNav = exploreZone?.closest('.design-system-masthead-nav');
    const mastheadBrand = mastheadNav?.querySelector('.masthead-area-brand');
    const mastheadLandingZone = mastheadNav?.querySelector('.masthead-area-landing-zone');
    // const header = mastheadNav?.closest('.design-system-header');
    // const mainNav = header?.querySelector('.design-system-main-nav-wrapper');

    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-pressed', 'false');
    exploreNav.setAttribute('aria-expanded', 'false');
    closeBtn.style.display = 'none';
    mastheadBrand.setAttribute('aria-hidden', 'false');
    mastheadLandingZone.setAttribute('aria-hidden', 'false');

    // Handle Main Navigation states
    // mainNav.setAttribute('aria-expanded', 'false');
    // mainNav.style.display = 'none';

    Object.values(exploreZones).forEach((zone) => {
      zone.removeAttribute('style');
    });
  }

  const exploreMenuContainer = div({
    class: 'explore-menu',
  });

  const exploreMenuButton = button({
    class: 'masthead-btn explore-btn explore-menu-btn',
    title: 'Menu',
    type: 'button',
    onclick: (e) => {
      const menuBtn = e.currentTarget;
      const isPressed = menuBtn.getAttribute('aria-pressed') === 'true';
      const closeBtn = menuBtn.nextSibling;
      const exploreNav = menuBtn.nextSibling.nextSibling;
      const isExploreNavExpanded = exploreNav?.getAttribute('aria-expanded') === 'true';
      const mastheadNav = exploreZone?.closest('.design-system-masthead-nav');
      const mastheadBrand = mastheadNav?.querySelector('.masthead-area-brand');
      const mastheadLandingZone = mastheadNav?.querySelector('.masthead-area-landing-zone');

      // Set masthead states
      if (
        (mediaQueryLists.XS.matches || mediaQueryLists.S.matches)
        && !mediaQueryLists.M.matches
      ) {
        mastheadBrand.setAttribute('aria-hidden', (!isPressed).toString());
        mastheadLandingZone.setAttribute('aria-hidden', (!isPressed).toString());
      }

      // Set zone states
      exploreZone.setAttribute('aria-expanded', (!isPressed).toString());

      // Set button states
      menuBtn.setAttribute('aria-pressed', (!isPressed).toString());
      menuBtn.setAttribute('aria-expanded', (!isExploreNavExpanded).toString());

      // Set close button states
      if (
        !isPressed
        && (mediaQueryLists.XS.matches || mediaQueryLists.S.matches || mediaQueryLists.M.matches)
        && !mediaQueryLists.L.matches
      ) {
        closeBtn.style.display = 'block';
      } else {
        closeBtn.removeAttribute('style');
      }

      // Set explore zone states in M viewport
      if (
        !isPressed
        && (mediaQueryLists.XS.matches || mediaQueryLists.S.matches || mediaQueryLists.M.matches)
      ) {
        Object.values(exploreZones).forEach((zone) => {
          zone.style.display = 'block';
        });
      } else {
        Object.values(exploreZones).forEach((zone) => {
          zone.removeAttribute('style');
        });
      }

      // Set flyout state
      exploreNav.setAttribute('aria-expanded', (!isExploreNavExpanded).toString());

      // On every click outside the button (but not the menu), close the dropdown
      document.addEventListener('click', (event) => {
        if (!event.target.closest('.explore-menu-btn') && !event.target.closest('.explore-nav')) {
          handleCloseBtnState(menuBtn, closeBtn, exploreNav);
        }
      });
    },
  }, span({
    class: 'label',
  }, 'Menu'), span({
    class: 'icon icon-menu',
  }));

  const exploreMenuButtonClose = button({
    class: 'masthead-btn explore-btn explore-menu-close-btn',
    title: 'Close Menu',
    type: 'button',
    onclick: (e) => {
      const closeBtn = e.currentTarget;
      const exploreNav = closeBtn.nextSibling;
      const menuBtn = exploreNav.previousSibling;
      handleCloseBtnState(menuBtn, closeBtn, exploreNav);
    },
  }, span({
    class: 'label',
  }, 'Close Menu'), span({
    class: 'icon icon-close',
  }));

  const exploreNav = nav({
    'aria-expanded': 'false',
    class: 'explore-nav',
  });

  const exploreNavDesktopContainer = div({
    class: 'explore-nav-desktop',
  });

  const exploreNavMobileContainer = div({
    class: 'explore-nav-mobile',
  });

  function generateExploreNav() {
    generateExploreNavLists(EXPLORE_MENU_URLS, 'explore-nav', exploreNavDesktopContainer);
    exploreNav.appendChild(exploreNavDesktopContainer);
  }

  function generateExploreNavMobile() {
    generateExploreNavLists(LANDING_ZONE_MENU_GROUPS, 'explore-nav-mobile', exploreNavMobileContainer);
    generateExploreNavLists(EXPLORE_MENU_URLS, 'explore-nav-mobile', exploreNavMobileContainer);

    const exploreSAP = div({
      class: [
        'explore-nav-mobile-group',
        'explore-nav-mobile-group-explore-sap',
      ],
    }, button({
      'aria-pressed': 'false',
      class: 'explore-nav-mobile-group-title-btn',
    }, span({
      class: 'label',
    }, 'Explore SAP'), span({
      class: 'icon',
    })));

    exploreNavMobileContainer.appendChild(exploreSAP);
    exploreNav.appendChild(exploreNavMobileContainer);
  }

  exploreMenuContainer.appendChild(exploreMenuButton);
  exploreMenuContainer.appendChild(exploreMenuButtonClose);
  generateExploreNav();
  generateExploreNavMobile();
  exploreMenuContainer.appendChild(exploreNav);

  return exploreMenuContainer;
}

function addExploreZone(mastheadExplore) {
  const exploreZone = div({
    class: 'explore-zone',
  });

  const search = div({
    class: 'explore-search',
  }, button({
    class: 'masthead-btn explore-btn explore-search-btn',
    title: 'Search',
    type: 'button',
    onclick: (e) => {
      const isPressed = e.currentTarget.getAttribute('aria-pressed') === 'true';
      e.currentTarget.setAttribute('aria-pressed', (!isPressed).toString());
    },
  }, span({
    class: 'label',
  }, 'Search'), span({
    class: 'icon icon-search',
  })));

  const jouleAi = div({
    class: 'explore-joule-ai',
  }, button({
    class: 'masthead-btn explore-btn explore-joule-ai-btn',
    title: 'Joule AI',
    type: 'button',
    onclick: (e) => {
      // Check if the Joule AI iframe is already loaded
      if (!document.getElementById('SAPChatbotContainer')) {
        loadJouleAiIframe();
      }

      const isPressed = e.currentTarget.getAttribute('aria-pressed') === 'true';
      const chatbotContainer = document.getElementById('SAPChatbotContainer');
      e.currentTarget.setAttribute('aria-pressed', (!isPressed).toString());
      chatbotContainer.setAttribute('aria-hidden', (isPressed).toString());
      chatbotContainer.classList.toggle('open', !isPressed);
    },
  }, span({
    class: 'label',
  }, 'Joule AI'), span({
    class: 'icon icon-joule-ai',
  })));

  const notifications = div({
    class: 'explore-notifications',
  }, button({
    class: 'masthead-btn explore-btn explore-notifications-btn',
    title: 'Notifications',
    type: 'button',
    onclick: (e) => {
      const isPressed = e.currentTarget.getAttribute('aria-pressed') === 'true';
      e.currentTarget.setAttribute('aria-pressed', (!isPressed).toString());
    },
  }, span({
    class: 'label',
  }, 'Notifications'), span({
    class: 'icon icon-notifications',
  })));

  const avatar = div({
    class: 'explore-avatar',
  }, button({
    class: 'masthead-btn explore-btn explore-avatar-btn',
    title: 'User Profile',
    type: 'button',
    onclick: (e) => {
      const isPressed = e.currentTarget.getAttribute('aria-pressed') === 'true';
      e.currentTarget.setAttribute('aria-pressed', (!isPressed).toString());
    },
  }, span({
    class: 'label',
  }, 'User Profile'), span({
    class: 'icon icon-avatar',
  })));

  exploreZone.appendChild(search);
  exploreZone.appendChild(jouleAi);
  exploreZone.appendChild(notifications);
  exploreZone.appendChild(avatar);
  const menu = generateExploreMenu(exploreZone);
  exploreZone.appendChild(menu);
  mastheadExplore.appendChild(exploreZone);
}

/**
 * Generate the Masthead for the block.
 * @returns {Promise<void>}
 */
function generateMasthead(block) {
  const mastheadNav = nav({
    class: 'design-system-masthead-nav',
    id: 'design-system-masthead-nav',
    'aria-label': 'Masthead Navigation',
  });

  const mainNavExpandButton = button({
    class: 'masthead-btn main-nav-expand-btn',
    title: 'Open Main Navigation',
    type: 'button',
    onclick: (e) => {
      const target = e.currentTarget;
      const header = target.closest('.design-system-header');
      const mainNav = header?.querySelector('.design-system-main-nav-wrapper');
      const isPressed = target.getAttribute('aria-pressed') === 'true';
      target.setAttribute('aria-pressed', (!isPressed).toString());
      mainNav.setAttribute('aria-expanded', (!isPressed).toString());
      mainNav.style.display = isPressed ? 'none' : 'block';
    },
  }, span({
    class: 'label',
  }, 'Open Main Navigation'), span({
    class: 'icon icon-menu-expand',
  }));

  const mastheadBrand = div({
    class: 'masthead-area masthead-area-brand',
    'aria-label': 'Brand',
  });

  const mastheadLandingZone = div({
    class: 'masthead-area masthead-area-landing-zone',
    'aria-label': 'Landing Zone',
  });

  const mastheadSearch = div({
    class: 'masthead-area masthead-area-search',
    'aria-label': 'Search',
  });

  const mastheadExplore = div({
    class: 'masthead-area masthead-area-explore',
    'aria-label': 'Explore',
  });

  mastheadBrand.append(mainNavExpandButton);
  addBrand(mastheadBrand);
  addLandingZone(mastheadLandingZone);
  addDesignSystemSearch(block, mastheadSearch);
  addExploreZone(mastheadExplore);

  mastheadNav.append(
    mastheadBrand,
    mastheadLandingZone,
    mastheadSearch,
    mastheadExplore,
  );

  block.append(mastheadNav);
}

/**
 * Add media query handlers.
 * TODO: Remove function if not needed
 */

/* eslint-disable no-unused-vars */
function addMediaQueryHandler() {
  /**
   * Handle the media query changes.
   * TODO: Remove console.log statements and add the actual logic
   */
  function changeHandler() {
    if (mediaQueryLists.XL.matches) {
      console.log('XL');
    } else if (mediaQueryLists.L.matches) {
      console.log('L');
    } else if (mediaQueryLists.M.matches) {
      console.log('M');
    } else if (mediaQueryLists.S.matches) {
      console.log('S');
    } else if (mediaQueryLists.XS.matches) {
      console.log('XS');
    } else {
      console.log('No media query matched');
    }
  }

  // Add event listeners to the media query lists
  Object.values(mediaQueryLists).forEach((mql) => mql.addEventListener('change', changeHandler));
  // Call the change handler once
  changeHandler();
}

export default async function decorate(block) {
  // addMediaQueryHandler();
  await generateMasthead(block);
  addDesignSystemMainNav(block);
}
