import {
  a, li, nav, ol, p,
} from '../../scripts/dom-builder.js';

/**
 * Create a list of h2 elements for each section element.
 * @param dataNames The data-name attributes of the section elements
 * @returns {*[]} The list of h2 elements for each section element (array with a key)
 */
function createDsTocList(dataNames) {
  const tocLists = [];

  const processH2Elements = (selector) => {
    const h2Elements = document.querySelectorAll(selector);
    const h2Arr = Array.from(h2Elements).map((h2) => ({
      id: h2.getAttribute('id'),
      text: h2.textContent,
    }));
    return h2Arr;
  };

  if (dataNames.length === 0) {
    tocLists.push({ default: processH2Elements('h2') });
  }

  dataNames.forEach((dataName) => {
    const selector = `.section[data-name="${dataName}"] h2`;
    tocLists.push({ [dataName]: processH2Elements(selector) });
  });

  return tocLists;
}

/**
 * Get the data-name attribute from each section element and collect them in an array.
 * @param sections The section elements
 * @returns {*[]} The data-name attributes as an array
 */
function getDataNames(sections) {
  let dataNames = [];
  sections.forEach((section) => {
    const dataName = section.getAttribute('data-name');
    if (dataName) {
      dataNames.push(dataName);
    }
  });

  // Remove the duplicates
  dataNames = [...new Set(dataNames)];
  return dataNames;
}

/**
 * Scroll to the content when a TOC link is clicked, but does not change the URL hash in the
 * address bar (to keep page tabs working).
 * Also set the aria-current attribute to the clicked link and remove it from the others.
 * @param e The event object
 */
function updateTocAndScrollToContent(e) {
  const targetElement = document.getElementById(e.target.hash.substring(1));

  // Do not change the URL hash in the address bar
  e.preventDefault();

  document.querySelectorAll('.ds-toc-link').forEach((link) => {
    link.removeAttribute('aria-current');
  });
  e.target.setAttribute('aria-current', 'true');

  window.scrollTo({
    top: targetElement.offsetTop,
    behavior: 'smooth',
  });
}

/**
 * Create a list item element with an anchor element.
 * @param h2 The h2 element
 * @returns {Element} The list item element
 */
function createListItem(h2) {
  const listItem = li();
  const listItemLink = a(
    {
      class: 'ds-toc-link',
      href: `#${h2.id}`,
      onclick: (e) => { updateTocAndScrollToContent(e); },
    },
    h2.text,
  );

  listItem.appendChild(listItemLink);
  return listItem;
}

/**
 * Create a list element with list item elements.
 * @param dataName
 * @param h2s
 * @returns {Element}
 */
function createToc(dataName, h2s) {
  const list = ol(
    {
      class: 'ds-toc-list',
      'data-toc-list': dataName,
    },
  );

  h2s.forEach((h2) => {
    const listItem = createListItem(h2);
    list.appendChild(listItem);
  });

  return list;
}

/**
 * Retrieves the current hash value from the URL.
 * @returns {string} The current hash value.
 */
function getCurrentHash() {
  const sections = document.querySelectorAll('.section[data-name]');
  const dataNames = getDataNames(sections);
  const tocLists = createDsTocList(dataNames);
  const hashExists = dataNames.includes(window.location.hash.substring(1));
  let currentHash = '';

  if (!hashExists) {
    tocLists.some((list) => {
      const [dataName, h2s] = Object.entries(list)[0];
      return h2s.some((h2) => {
        if (h2.id === window.location.hash.substring(1)) {
          currentHash = dataName;
          return true;
        }
        return false;
      });
    });
  } else {
    currentHash = window.location.hash.substring(1);
  }

  return currentHash;
}

function updateToc(lists) {
  const currentHash = getCurrentHash();

  lists.forEach((list) => {
    const listDataName = list.getAttribute('data-toc-list');
    if (listDataName === currentHash) {
      list.setAttribute('aria-hidden', 'false');
    } else {
      list.setAttribute('aria-hidden', 'true');
    }
  });

  if (currentHash === '' && lists.length > 0) {
    lists[0].setAttribute('aria-hidden', 'false');
  }
}

/**
 * Initialize the TOC list by setting the aria-hidden attribute to true for all lists except the
 * first one.
 * Additionally, listen for hash changes and show the list with the corresponding
 * data-toc-list attribute.
 * @param block The block element
 */
function initTocList(block) {
  const lists = block.querySelectorAll('.ds-toc-list');
  updateToc(lists);

  window.addEventListener('hashchange', () => {
    updateToc(lists);
  });
}

export default async function decorate(block) {
  const tocNav = nav({
    class: 'ds-toc-nav',
    role: 'navigation',
    'aria-label': 'TOC Navigation',
    'aria-labelledby': 'ds-toc-heading',
  }, p({
    id: 'ds-toc-heading',
    class: 'ds-toc-heading',
  }, 'On this page'));

  let sections = document.querySelectorAll('.section[data-name]');
  if (sections.length === 0) {
    sections = document.querySelectorAll('h2');
  }
  const dataNames = getDataNames(sections);
  const tocLists = createDsTocList(dataNames);

  tocLists.forEach((tocList) => {
    const [dataName, h2s] = Object.entries(tocList)[0];
    const toc = createToc(dataName, h2s);
    tocNav.appendChild(toc);
  });

  block.replaceChildren(tocNav);

  initTocList(block);
}
