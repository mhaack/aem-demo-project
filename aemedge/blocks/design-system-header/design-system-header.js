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
import { decorateIcons, getMetadata, loadCSS } from '../../scripts/aem.js';
import { mediaQueryLists } from '../../scripts/config-ds.js';
import { camelToKebab, getSiteHomePath } from '../../scripts/ds-scripts.js';

const LANDING_ZONE_LABEL = 'Design System';
const LANDING_ZONE_LABEL_MOBILE = 'SAP Design System';
const LANDING_ZONE_MENU_GROUP_PRODUCTS_URLS = [
  {
    web: {
      title: 'Web',
      titleShort: 'Web',
      url: '/design-system/fiori-design-web/',
      segment: 'fiori-design-web',
      jouleAiUrl: '/internal/fiori-design-web/',
    },
  },
  {
    ios: {
      title: 'iOS',
      titleShort: 'iOS',
      url: '/design-system/fiori-design-ios/',
      segment: 'fiori-design-ios',
      jouleAiUrl: '/internal/fiori-design-ios/',
    },
  },
  {
    android: {
      title: 'Android',
      titleShort: 'Android',
      url: '/design-system/fiori-design-android/',
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
const body = document.querySelector('body');
let mainNavElements;

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
 *
 * @param array The array to remove empty strings from.
 * @returns {*} The array without empty strings.
 */
function removeEmptyStringsFromArray(array) {
  return array.filter((item) => item !== '');
}

/**
 * Add the "Design System Main Navigation" (Side Navigation) to the block.
 *
 * @param block The block to add the main navigation to.
 */
function addDesignSystemMainNav(block) {
  const template = getMetadata('template');
  if (template !== 'landing-page') {
    loadCSS(`${window.hlx.codeBasePath}/blocks/design-system-header/design-system-main-nav.css`);
    const mainNavWrapper = nav({ class: 'design-system-main-nav-wrapper' });
    block.append(mainNavWrapper);
    initDsMainNav(mainNavWrapper);
  }
}

function resetDesignSystemMainNav() {
  if (getMetadata('template') !== 'landing-page') {
    if (body.getAttribute('data-mobile') === 'true') {
      mainNavElements.mainNavButton.setAttribute('aria-pressed', 'false');
      mainNavElements.mainNavWrapper.setAttribute('aria-expanded', 'false');
      mainNavElements.mainNavOverlay.setAttribute('aria-hidden', 'true');
      mainNavElements.mainNavWrapper.style.display = 'none';
      mainNavElements.mastheadAreas.setAttribute('data-mobile-search', 'false');
      mainNavElements.mastheadExploreSearchButton.setAttribute('aria-pressed', 'false');
    } else {
      mainNavElements.mainNavWrapper.setAttribute('aria-expanded', 'false');
      mainNavElements.mainNavOverlay.setAttribute('aria-hidden', 'true');
      mainNavElements.mainNavWrapper.style.display = 'block';
      mainNavElements.mastheadBrand.setAttribute('aria-hidden', 'false');
      mainNavElements.mastheadLandingZone.setAttribute('aria-hidden', 'false');
      mainNavElements.mastheadAreas.setAttribute('data-mobile-search', 'false');
      mainNavElements.mastheadExploreSearchButton.setAttribute('aria-pressed', 'false');
    }
  }
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
    'aria-label': 'SAP',
    href: (window.location.pathname === '/design-system/') ? 'https://www.sap.com/' : getSiteHomePath(),
    role: 'banner',
    title: 'SAP',
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
    const menuNavMobile = target.closest('.explore-menu-nav-mobile');
    const buttons = menuNavMobile.querySelectorAll('button');
    const currentGroup = target.parentElement;
    const navGroups = {
      designSystem: menuNavMobile.querySelector('.explore-menu-nav-mobile-group-design-system'),
      implementationDocumentation: menuNavMobile.querySelector('.explore-menu-nav-mobile-group-implementation-documentation'),
      relatedSites: menuNavMobile.querySelector('.explore-menu-nav-mobile-group-related-sites'),
    };

    target.setAttribute('aria-pressed', target.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');

    /**
     * If the button is pressed, show the group container and hide all other group containers.
     * Since the links are only "not visible" in the mobile view, they should
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
      'aria-label': LANDING_ZONE_LABEL_MOBILE,
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
    if (className === 'explore-menu-nav-mobile' && (groupName !== 'products' && groupName !== 'websites')) {
      groupTitle = button({
        'aria-label': groupObj.title,
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

    if (container.classList.contains('explore-menu-nav-mobile')) {
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

    const template = getMetadata('template');

    const betaButton = div({
      class: 'landing-zone-part landing-zone-beta',
    }, a({
      class: 'landing-zone-beta-btn',
      href: '/design-system/beta',
    }, 'BETA'));

    mastheadLandingZone.appendChild(landingZoneAreaLabel);
    if (template !== 'landing-page') {
      mastheadLandingZone.appendChild(landingZoneAreaLinks);
    }
    mastheadLandingZone.appendChild(betaButton);
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
      'aria-label': currentLandingZone,
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
 * @returns {Element} The Explore Menu.
 * @param exploreZones {object} The Explore Zones.
 */
function generateExploreMenu(exploreZones) {
  const exploreAreaZones = {
    jouleAiZone: exploreZones.querySelector('.explore-joule-ai'),
    // notifactionsZone: exploreZone.querySelector('.explore-notifications'), // TODO: MVP Q2
    avatarZone: exploreZones.querySelector('.explore-avatar'),
  };

  /**
   * Handle the close button state.
   * Sets the visual and ARIA states for the menu button, close button, and explore zones.
   * @param menuBtn {object} The menu button.
   * @param closeBtn {object} The close button.
   * @param exploreNav {object} The explore navigation.
   */
  function handleCloseBtnState(menuBtn, closeBtn, exploreNav) {
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-pressed', 'false');
    exploreNav.setAttribute('aria-expanded', 'false');
    closeBtn.style.display = 'none';
    mainNavElements.mastheadBrand.setAttribute('aria-hidden', 'false');
    mainNavElements.mastheadLandingZone.setAttribute('aria-hidden', 'false');
    mainNavElements.mastheadExplore.setAttribute('aria-expanded', 'false');
    mainNavElements.mastheadExploreZones.setAttribute('aria-expanded', 'false');
    mainNavElements.mastheadAreas.setAttribute('data-mobile-search', 'false');
    mainNavElements.mastheadAreas.setAttribute('data-explore-menu', 'false');

    Object.values(exploreAreaZones).forEach((zone) => {
      zone.removeAttribute('style');
    });
  }

  const exploreMenuContainer = div({
    class: 'explore-menu',
  });

  const exploreMenuButton = button({
    'aria-label': 'Menu',
    class: 'masthead-btn explore-btn explore-menu-btn',
    title: 'Menu',
    type: 'button',
    onclick: (e) => {
      resetDesignSystemMainNav();
      const menuBtn = e.currentTarget;
      const isPressed = menuBtn.getAttribute('aria-pressed') === 'true';
      const closeBtn = menuBtn.nextSibling;
      const exploreNav = menuBtn.nextSibling.nextSibling;
      const isExploreNavExpanded = exploreNav?.getAttribute('aria-expanded') === 'true';
      const mastheadAreas = exploreZones?.closest('.masthead-areas');
      const mastheadLandingZone = mastheadAreas?.querySelector('.masthead-area-landing-zone');
      const mastheadExplore = mastheadAreas?.querySelector('.masthead-area-explore');

      mainNavElements.mastheadAreas.setAttribute('data-explore-menu', (!isPressed).toString());

      // Set masthead states
      if (
        (mediaQueryLists.XS.matches || mediaQueryLists.S.matches)
        && !mediaQueryLists.M.matches
      ) {
        mastheadLandingZone.setAttribute('aria-hidden', (!isPressed).toString());
      }

      // Set zone states
      exploreZones.setAttribute('aria-expanded', (!isPressed).toString());
      mastheadExplore.setAttribute('aria-expanded', (!isPressed).toString());

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
        Object.values(exploreAreaZones).forEach((zone) => {
          zone.style.display = 'block';
        });
      } else {
        Object.values(exploreAreaZones).forEach((zone) => {
          zone.removeAttribute('style');
        });
      }

      // Set flyout state
      exploreNav.setAttribute('aria-expanded', (!isExploreNavExpanded).toString());

      // On every click outside the button (but not the menu), close the dropdown
      document.addEventListener('click', (event) => {
        if (!event.target.closest('.explore-menu-btn') && !event.target.closest('.explore-menu-nav')) {
          handleCloseBtnState(menuBtn, closeBtn, exploreNav);
        }
      });

      // Close the search form when the explore menu is opened
      mainNavElements.mastheadAreas.setAttribute('data-mobile-search', 'false');
      mainNavElements.mastheadExploreSearchButton.setAttribute('aria-pressed', 'false');
    },
  }, span({
    class: 'label',
  }, 'Menu'), span({
    class: 'icon icon-menu',
  }));

  const exploreMenuButtonClose = button({
    'aria-label': 'Close Menu',
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

  const exploreMenuNav = nav({
    'aria-expanded': 'false',
    class: 'explore-menu-nav',
  });

  const exploreMenuNavDesktopContainer = div({
    class: 'explore-menu-nav-desktop',
  });

  const exploreMenuNavMobileContainer = div({
    class: 'explore-menu-nav-mobile',
  });

  function generateExploreNav() {
    generateExploreNavLists(EXPLORE_MENU_URLS, 'explore-menu-nav', exploreMenuNavDesktopContainer);
    exploreMenuNav.appendChild(exploreMenuNavDesktopContainer);
  }

  function generateExploreNavMobile() {
    generateExploreNavLists(LANDING_ZONE_MENU_GROUPS, 'explore-menu-nav-mobile', exploreMenuNavMobileContainer);
    generateExploreNavLists(EXPLORE_MENU_URLS, 'explore-menu-nav-mobile', exploreMenuNavMobileContainer);

    const exploreSAP = div({
      class: [
        'explore-menu-nav-mobile-group',
        'explore-menu-nav-mobile-group-explore-sap',
      ],
    }, button({
      'aria-label': 'Explore SAP',
      'aria-pressed': 'false',
      class: 'explore-menu-nav-mobile-group-title-btn',
    }, span({
      class: 'label',
    }, 'Explore SAP'), span({
      class: 'icon',
    })));

    exploreMenuNavMobileContainer.appendChild(exploreSAP);
    exploreMenuNav.appendChild(exploreMenuNavMobileContainer);
  }

  exploreMenuContainer.appendChild(exploreMenuButton);
  exploreMenuContainer.appendChild(exploreMenuButtonClose);
  generateExploreNav();
  generateExploreNavMobile();
  exploreMenuContainer.appendChild(exploreMenuNav);

  return exploreMenuContainer;
}

function addExploreZone(mastheadExplore) {
  const exploreZones = div({
    class: 'masthead-area-explore-zones',
  });

  const search = div({
    class: 'explore-search',
  }, button({
    'aria-label': 'Search',
    'aria-pressed': 'false',
    class: 'masthead-btn explore-btn explore-search-btn',
    title: 'Search',
    type: 'button',
    onclick: (e) => {
      const isPressed = e.currentTarget.getAttribute('aria-pressed') === 'true';
      e.currentTarget.setAttribute('aria-pressed', (!isPressed).toString());
      mainNavElements.mastheadAreas.setAttribute('data-mobile-search', (!isPressed).toString());
    },
  }, span({
    class: 'label',
  }, 'Search'), span({
    class: 'icon icon-search',
  })));

  const jouleAi = div({
    class: 'explore-joule-ai',
  }, button({
    'aria-label': 'Joule AI',
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

  // TODO: MVP Q2
  // const notifications = div({
  //   class: 'explore-notifications',
  // }, button({
  //   'aria-label': 'Notifications',
  //   class: 'masthead-btn explore-btn explore-notifications-btn',
  //   title: 'Notifications',
  //   type: 'button',
  //   onclick: (e) => {
  //     const isPressed = e.currentTarget.getAttribute('aria-pressed') === 'true';
  //     e.currentTarget.setAttribute('aria-pressed', (!isPressed).toString());
  //   },
  // }, span({
  //   class: 'label',
  // }, 'Notifications'), span({
  //   class: 'icon icon-notifications',
  // })));

  const avatar = div({
    class: 'explore-avatar',
  }, button({
    'aria-label': 'User Profile',
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

  exploreZones.appendChild(search);
  exploreZones.appendChild(jouleAi);
  // exploreZone.appendChild(notifications); // TODO: MVP Q2
  exploreZones.appendChild(avatar);
  const menu = generateExploreMenu(exploreZones);
  exploreZones.appendChild(menu);
  mastheadExplore.appendChild(exploreZones);
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

  const mastheadAreas = div({
    class: 'masthead-areas',
    'data-mobile-search': 'false',
    'data-explore-menu': 'false',
  });

  const mainNavButton = button({
    'aria-label': 'Open Main Navigation',
    class: 'masthead-btn main-nav-btn',
    title: 'Open Main Navigation',
    type: 'button',
    onclick: (e) => {
      const target = e.currentTarget;
      const header = target.closest('.design-system-header');
      const mainNavWrapper = header?.querySelector('.design-system-main-nav-wrapper');
      const mainNavOverlay = target.nextElementSibling;
      const isPressed = target.getAttribute('aria-pressed') === 'true';
      target.setAttribute('aria-pressed', (!isPressed).toString());
      mainNavOverlay.setAttribute('aria-hidden', isPressed.toString());
      mainNavWrapper.setAttribute('aria-expanded', (!isPressed).toString());
      mainNavWrapper.style.display = isPressed ? 'none' : 'block';
    },
  }, span({
    class: 'label',
  }, 'Open Main Navigation'), span({
    class: 'icon icon-menu-expand',
  }));

  const mainNavOverlay = div({
    class: 'main-nav-overlay',
    'aria-hidden': 'true',
  });

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
  if (getMetadata('template') !== 'landing-page') {
    mastheadBrand.append(mainNavButton);
  }
  mastheadBrand.append(mainNavOverlay);
  addBrand(mastheadBrand);
  addLandingZone(mastheadLandingZone);
  addDesignSystemSearch(block, mastheadSearch);
  if (getMetadata('template') !== 'landing-page') {
    addExploreZone(mastheadExplore);
  }

  mastheadAreas.append(
    mastheadBrand,
    mastheadLandingZone,
    mastheadSearch,
    mastheadExplore,
  );
  mastheadNav.append(mastheadAreas);
  block.append(mastheadNav);
}

function addMediaQueryHandler() {
  function mediaQueryChangeHandler() {
    let breakpoint = '';

    if (mediaQueryLists.XL.matches) {
      breakpoint = 'XL';
      body.setAttribute('data-mobile', 'false');
      body.setAttribute('data-mq', 'xl');
    } else if (mediaQueryLists.L.matches) {
      breakpoint = 'L';
      body.setAttribute('data-mobile', 'false');
      body.setAttribute('data-mq', 'l');
    } else if (mediaQueryLists.M.matches) {
      breakpoint = 'M';
      body.setAttribute('data-mobile', 'false');
      body.setAttribute('data-mq', 'm');
    } else if (mediaQueryLists.S.matches) {
      breakpoint = 'S';
      body.setAttribute('data-mobile', 'true');
      body.setAttribute('data-mq', 's');
    } else if (mediaQueryLists.XS.matches) {
      breakpoint = 'XS';
      body.setAttribute('data-mobile', 'true');
      body.setAttribute('data-mq', 'xs');
    }

    if (breakpoint) {
      resetDesignSystemMainNav();
    }
  }

  // Add event listeners to the media query lists
  Object.values(mediaQueryLists)
    .forEach((mql) => mql.addEventListener('change', mediaQueryChangeHandler));
  // Call the change handler once
  mediaQueryChangeHandler();
}

export default async function decorate(block) {
  await generateMasthead(block);
  addDesignSystemMainNav(block);

  mainNavElements = {
    dsHeader: document.querySelector('.design-system-header'),
    mainNavWrapper: block.querySelector(':scope .design-system-main-nav-wrapper'),
    mainNavOverlay: block.querySelector(':scope .main-nav-overlay'),
    mastheadAreas: block.querySelector(':scope .masthead-areas'),
    mastheadBrand: block.querySelector(':scope .masthead-area-brand'),
    mastheadLandingZone: block.querySelector(':scope .masthead-area-landing-zone'),
    mastheadSearch: block.querySelector(':scope .masthead-area-search'),
    mastheadSearchForm: block.querySelector(':scope .masthead-area-search .search-form'),
    mastheadExplore: block.querySelector(':scope .masthead-area-explore'),
    mastheadExploreZones: block.querySelector(':scope .masthead-area-explore-zones'),
    mainNavButton: block.querySelector(':scope .masthead-area .main-nav-btn'),
    mastheadExploreSearchButton: block.querySelector(':scope .masthead-area .explore-search-btn'),
  };

  await addMediaQueryHandler();
}
