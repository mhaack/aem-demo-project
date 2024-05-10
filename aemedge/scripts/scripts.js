import {
  buildBlock,
  decorateBlock,
  decorateBlocks,
  decorateButtons,
  decorateIcons,
  decorateTemplateAndTheme,
  getMetadata,
  readBlockConfig,
  loadBlock,
  loadBlocks,
  loadCSS,
  loadSideNav,
  sampleRUM,
  toClassName,
  toCamelCase,
} from './aem.js';

const LCP_BLOCKS = ['hero']; // add your LCP blocks to the list
const TEMPLATE_LIST = {
  article: 'article',
  'hub-l2': 'hub',
  'hub-l1': 'hub',
  'web-component': 'web-component',
};

/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
  try {
    if (!window.location.hostname.includes('localhost')) sessionStorage.setItem('fonts-loaded', 'true');
  } catch (e) {
    // do nothing
  }
}

async function decorateTemplates(main) {
  try {
    const template = toClassName(getMetadata('template'));
    const templates = Object.keys(TEMPLATE_LIST);
    if (templates.includes(template)) {
      const templateName = TEMPLATE_LIST[template];
      loadCSS(`${window.hlx.codeBasePath}/templates/${templateName}/${templateName}.css`);
      const mod = await import(`${window.hlx.codeBasePath}/templates/${templateName}/${templateName}.js`);
      if (mod.default) {
        await mod.default(main);
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Template decoration failed', error);
  }
}

function capitalize(name) {
  return toClassName(name)
    .replace(/-(\w)/g, (_, letter) => letter.toUpperCase())
    .replace(/^\w/, (firstLetter) => firstLetter.toUpperCase());
}

async function waitForLCP(lcpBlocks) {
  const block = document.querySelector('.block');
  const hasLCPBlock = block && lcpBlocks.includes(block.dataset.blockName);
  if (hasLCPBlock) await loadBlock(block);

  document.body.style.display = null;
  const lcpCandidate = document.querySelector('main img');

  await new Promise((resolve) => {
    const computedStyle = lcpCandidate ? getComputedStyle(lcpCandidate) : {};
    if (
      lcpCandidate
      && !lcpCandidate.complete
      && !!computedStyle.display
      && computedStyle.display !== 'none'
    ) {
      lcpCandidate.setAttribute('loading', 'eager');
      lcpCandidate.addEventListener('load', resolve);
      lcpCandidate.addEventListener('error', resolve);
    } else {
      resolve();
    }
  });
}

/**
 * Decorates all sections in a container element.
 * @param {Element} main The container element
 */
function decorateSections(main) {
  const styleProperties = getComputedStyle(document.body);
  main.querySelectorAll(':scope > div').forEach((section) => {
    const wrappers = [];
    let defaultContent = false;
    [...section.children].forEach((e) => {
      if (e.tagName === 'DIV' || !defaultContent) {
        const wrapper = document.createElement('div');
        wrappers.push(wrapper);
        defaultContent = e.tagName !== 'DIV';
        if (defaultContent) wrapper.classList.add('default-content-wrapper');
      }
      wrappers[wrappers.length - 1].append(e);
    });
    wrappers.forEach((wrapper) => section.append(wrapper));
    section.classList.add('section');
    section.dataset.sectionStatus = 'initialized';
    section.style.display = 'none';

    // Process section metadata
    const sectionMeta = section.querySelector('div.section-metadata');
    if (sectionMeta) {
      const meta = readBlockConfig(sectionMeta);
      Object.keys(meta).forEach((key) => {
        if (key === 'style') {
          const styles = meta.style
            .split(',')
            .filter((style) => style)
            .map((style) => toClassName(style.trim()));
          styles.forEach((style) => {
            if (style.startsWith('background-')) {
              const styleKey = `--udexColor${capitalize(style.replace('background-', ''))}`;
              const styleValue = styleProperties.getPropertyValue(styleKey);
              section.style.backgroundColor = styleValue;
              const colorRange = +styleKey.at(styleKey.length - 1);
              const backgroundClass = colorRange > 5 ? 'background-dark' : 'background-light';
              section.classList.add(backgroundClass);
            } else {
              section.classList.add(style);
            }
            if (style.startsWith('column-section')) section.classList.add('column-section');
          });
        } else {
          section.dataset[toCamelCase(key)] = meta[key];
        }
      });
      sectionMeta.parentNode.remove();
    }
  });
}

/**
 * Decorates image links in a specified container by replacing
 * the picture elements with anchor elements.
 * @param {Element} main - The container element
 */
function decorateImageLinks(main) {
  main.querySelectorAll('p picture').forEach((picture) => {
    const linkElement = picture.nextElementSibling;
    if (linkElement && linkElement.tagName === 'A' && linkElement.href.startsWith('https://www.linkedin.com/posts/')) {
      const linkURL = linkElement.href;

      /**
       * The new anchor element to replace the picture element.
       * @type {HTMLAnchorElement}
       */
      const newLink = Object.assign(document.createElement('a'), {
        target: '_blank',
        rel: 'noopener',
        href: linkURL,
      });
      while (picture.firstChild) {
        newLink.appendChild(picture.firstChild);
      }
      picture.parentNode.replaceChild(newLink, picture);
      linkElement.remove();
    }
  });
}

/**
 * Decorates fragment links, replacing them with a placeholder,
 * which is processed later in decorateFragments.
 * This separate step ensures that the fragment links do not become buttons in decorateButtons
 * @param {Element} main The container element
 */
function decorateFragmentLinks(main) {
  const links = main.querySelectorAll('a');
  [...links].forEach((link) => {
    const path = link.getAttribute('href');
    if (path && path.startsWith('/') && path.includes('/fragments/')) {
      const fragmentLinkPlaceHolder = document.createElement('span');
      fragmentLinkPlaceHolder.className = 'fragment-link';
      fragmentLinkPlaceHolder.innerHTML = path;
      link.replaceWith(fragmentLinkPlaceHolder);
    }
  });
}

/**
 * Declare the decorateFragments method, since it's already used in decorateMain
 */
let decorateFragments;

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export async function decorateMain(main, shouldDecorateTemplates = true) {
  // hopefully forward compatible button decoration
  decorateFragmentLinks(main);
  decorateButtons(main);
  decorateIcons(main);
  decorateImageLinks(main);
  if (shouldDecorateTemplates) {
    await decorateTemplates(main);
  }
  decorateSections(main);
  decorateBlocks(main);
  decorateFragments(main);
}

/**
 * Loads a fragment.
 * @param {string} path The path to the fragment
 * @returns {HTMLElement} The root element of the fragment
 */
export async function loadFragment(path) {
  if (path && path.startsWith('/')) {
    const resp = await fetch(`${path}.plain.html`);
    if (resp.ok) {
      const main = document.createElement('main');
      main.innerHTML = await resp.text();

      // reset base path for media to fragment base
      const resetAttributeBase = (tag, attr) => {
        main.querySelectorAll(`${tag}[${attr}^="./media_"]`).forEach((elem) => {
          elem[attr] = new URL(elem.getAttribute(attr), new URL(path, window.location)).href;
        });
      };
      resetAttributeBase('img', 'src');
      resetAttributeBase('source', 'srcset');

      await decorateMain(main, false);
      await loadBlocks(main);
      return main;
    }
  }
  return null;
}

/**
 * Replace a link placeholder with a corresponding fragment, loaded asynchronously.
 * @param {Element} link The link placeholder, which has the URL in its innerHTML
 */
async function replaceLinkPlaceHolderWithFragment(link) {
  const path = link.innerHTML;
  const fragment = await loadFragment(path);
  if (fragment) {
    const fragmentSection = fragment.querySelector(':scope .section');
    if (fragmentSection) {
      link.closest('.section').classList.add(...fragmentSection.classList);
      let nodeToReplace = link;
      while (nodeToReplace.parentNode.tagName !== 'DIV' && nodeToReplace.childNodes.length === 1) {
        nodeToReplace = nodeToReplace.parentNode;
      }
      nodeToReplace.parentNode.classList.add('fragment-container');
      nodeToReplace.replaceWith(...fragment.childNodes);
    }
  }
}

/**
 * Decorates fragments
 * @param {Element} main The container element
 */
decorateFragments = function decorateFragmentsFunction(main) {
  const links = main.querySelectorAll('span.fragment-link');
  [...links].forEach(async (link) => {
    replaceLinkPlaceHolderWithFragment(link);
  });
};

function setSAPTheme() {
  const sapTheme = getMetadata('saptheme', document) || 'sap_glow';
  if (sapTheme) {
    const head = document.querySelector('head');
    const ui5ThemeScript = document.createElement('script');
    ui5ThemeScript.setAttribute('data-ui5-config', '');
    ui5ThemeScript.setAttribute('type', 'application/json');
    ui5ThemeScript.textContent = `{"theme": "${sapTheme}"}`;
    head.append(ui5ThemeScript);
  }
}

function initSidekick() {
  const preflightListener = async () => {
    const section = document.createElement('div');
    const wrapper = document.createElement('div');
    section.appendChild(wrapper);
    const preflightBlock = buildBlock('preflight', '');
    wrapper.appendChild(preflightBlock);
    decorateBlock(preflightBlock);
    await loadBlock(preflightBlock);
    const { default: getModal } = await import(`${window.hlx.codeBasePath}/blocks/modal/modal.js`);
    const customModal = await getModal('dialog-modal', () => section.innerHTML, (modal) => {
      modal.querySelector('button[name="close"]')?.addEventListener('click', () => modal.close());
    });
    customModal.showModal();
  };

  const sk = document.querySelector('helix-sidekick');
  if (sk) {
    sk.addEventListener('custom:preflight', preflightListener); // TODO change to preflight
  } else {
    document.addEventListener('sidekick-ready', () => {
      const oAddedSidekick = document.querySelector('helix-sidekick');
      oAddedSidekick.addEventListener('custom:preflight', preflightListener);
    }, { once: true });
  }
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  setSAPTheme();
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    await decorateMain(main);
    document.body.classList.add('appear');
    await waitForLCP(LCP_BLOCKS);
  }

  try {
    /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
    if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
      loadFonts();
    }
  } catch (e) {
    // do nothing
  }
}

function isDesignSystemSite() {
  return document.body.classList.contains('design-system');
}

/**
 * Loads a block named 'header' into header
 * @param {Element} header header element
 * @returns {Promise}
 */
async function loadHeader(header) {
  const headerBlock = buildBlock((isDesignSystemSite()) ? 'design-system-header' : 'header', '');
  header.append(headerBlock);
  decorateBlock(headerBlock);
  return loadBlock(headerBlock);
}

/**
 * Loads a block named 'footer' into footer
 * @param footer footer element
 * @returns {Promise}
 */
async function loadFooter(footer) {
  const footerBlock = buildBlock(isDesignSystemSite() ? 'design-system-footer' : 'footer', '');
  footer.append(footerBlock);
  decorateBlock(footerBlock);
  return loadBlock(footerBlock);
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  initSidekick();
  const main = doc.querySelector('main');
  await loadBlocks(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadHeader(doc.querySelector('header'));
  loadSideNav(doc.querySelector('aside'));
  loadFooter(doc.querySelector('footer'));

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadFonts();

  sampleRUM('lazy');
  sampleRUM.observe(main.querySelectorAll('div[data-block-name]'));
  sampleRUM.observe(main.querySelectorAll('picture > img'));
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

async function initDataLayer() {
  window.adobeDataLayer = [];
  const loginStatus = window.sessionStorage.getItem('loginStatus') === 'logY' ? 'yes' : 'no';
  window.adobeDataLayer.push({
    event: 'globalDL',
    site: {
      country: 'glo',
      name: 'sap',
    },
    user: {
      type: 'visitor',
      loginStatus,
    },
  });
  const relpath = window.location.pathname.substring(1);
  window.adobeDataLayer.push({
    event: 'pageView',
    page: {
      country: 'glo',
      language: 'en',
      name: window.location.pathname,
      section: relpath.indexOf('/') > 0 ? relpath.substring(0, relpath.indexOf('/')) : relpath,
      url: window.location.href,
      referrer: document.referrer,
      title: document.querySelector('title').textContent.replace(/[\n\t]/gm, ''),
    },
    user: {
      type: 'visitor',
      loginStatus,
    },
  });
}

initDataLayer();
loadPage();
