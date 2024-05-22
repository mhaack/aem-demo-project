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
  dataNames.forEach((dataName) => {
    const h2Elements = document.querySelectorAll(`.section[data-name="${dataName}"] h2`);
    const h2Arr = [];
    h2Elements.forEach((h2) => {
      const h2Id = h2.getAttribute('id');
      const h2Text = h2.textContent;
      h2Arr.push({
        id: h2Id,
        text: h2Text,
      });
    });

    tocLists.push({
      [dataName]: h2Arr,
    });
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
    dataNames.push(dataName);
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

function updateToc(lists) {
  const currentHash = window.location.hash.substring(1);

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

  const sections = document.querySelectorAll('.section[data-name]');
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
