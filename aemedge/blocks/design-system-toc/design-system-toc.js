import {
  a,
  li,
  nav,
  ol,
  p,
} from '../../scripts/dom-builder.js';

/**
 * Create a list of h2 elements for each section element.
 * @param dataNames The data-name attributes of the section elements
 * @param main
 * @returns {*[]} The list of h2 elements for each section element (array with a key)
 */
let observer;
let navHighlightedByScrollTo = false;
function createDsTocList(dataNames, main) {
  const tocLists = [];
  const processH2Elements = (selector) => {
    const h2Elements = main.querySelectorAll(selector);
    return Array.from(h2Elements).map((h2) => ({
      id: h2.getAttribute('id'),
      text: h2.textContent,
    }));
  };

  if (dataNames.length === 0) {
    tocLists.push({ default: processH2Elements('h2') });
  } else {
    dataNames.forEach((dataName) => {
      const selector = `.section[data-name="${dataName}"] h2`;
      tocLists.push({ [dataName]: processH2Elements(selector) });
    });
  }

  return tocLists;
}

/**
 * Get the data-name attribute from each section element and collect them in an array.
 * @param sections The section elements
 * @returns {*[]} The data-name attributes as an array
 */
function getDataNames(sections) {
  const dataNames = Array.from(sections).map((section) => section.getAttribute('data-name')).filter((dataName, index, self) => dataName && self.indexOf(dataName) === index);
  return dataNames;
}

/**
 * Scroll to the content when a TOC link is clicked, but does not change the URL hash in the
 * address bar (to keep page tabs working).
 * Also set the aria-current attribute to the clicked link and remove it from the others.
 * @param e The event object
 * @param block
 */
function updateTocAndScrollToContent(e, block) {
  const targetElement = document.getElementById(e.target.hash.substring(1));
  // if (targetElement) {
  //   targetElement.scrollIntoView({ behavior: 'smooth' });
  // }
  const elementPosition = targetElement.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - 100;
  const main = block.closest('main');
  const sections = main.querySelectorAll('.section:has(h2)');
  sections.forEach((section) => {
    observer.unobserve(section);
  });
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });

  // Do not change the URL hash in the address bar
  e.preventDefault();

  block.querySelectorAll('.ds-toc-link').forEach((link) => {
    link.removeAttribute('aria-current');
  });
  e.target.setAttribute('aria-current', 'true');
  setTimeout(() => {
    navHighlightedByScrollTo = true;
    sections.forEach((section) => {
      observer.observe(section);
    });
  }, 1000);
}

/**
 * Create a list item element with an anchor element.
 * @param h2 The h2 element
 * @param block
 * @returns {Element} The list item element
 */
function createListItem(h2, block) {
  const listItem = li();
  const listItemLink = a(
    {
      class: 'ds-toc-link',
      href: `#${h2.id}`,
      onclick: (e) => { updateTocAndScrollToContent(e, block); },
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
 * @param block
 * @returns {Element}
 */
function createToc(dataName, h2s, block) {
  const list = ol(
    {
      class: 'ds-toc-list',
      'data-toc-list': dataName,
    },
  );

  h2s.forEach((h2) => {
    const listItem = createListItem(h2, block);
    list.appendChild(listItem);
  });

  return list;
}

/**
 * Retrieves the current hash value from the URL.
 * @returns {string} The current hash value.
 */
function getCurrentHash(block) {
  const main = block.closest('main');
  const sections = main.querySelectorAll('.section[data-name]');
  const dataNames = getDataNames(sections);
  const tocLists = createDsTocList(dataNames, main);
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

/**
 * Update the TOC to show the relevant list based on the current hash.
 * @param block The block element
 * @param lists The list of TOC elements
 */
function updateToc(block, lists) {
  const currentHash = getCurrentHash(block);

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
  updateToc(block, lists);

  window.addEventListener('hashchange', () => {
    updateToc(block, lists);
  });
}

/**
 * Create an IntersectionObserver to update the TOC links based on section visibility.
 * @param block The block element
 */
function createObserver(block) {
  const options = {
    root: null,
    rootMargin: '-40% 0% -40%',
    threshold: 0,
  };

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.querySelector('h2').getAttribute('id');
        const link = block.querySelector(`a[href="#${id}"]`);
        if (navHighlightedByScrollTo) {
          navHighlightedByScrollTo = false;
          return;
        }
        block.querySelectorAll('.ds-toc-link').forEach((linkT) => {
          linkT.removeAttribute('aria-current');
        });
        if (link) {
          link.setAttribute('aria-current', 'true');
        }
      }
    });
  }, options);

  const main = block.closest('main');
  const sections = main.querySelectorAll('.section:has(h2)');
  sections.forEach((section) => {
    observer.observe(section);
  });
}

/**
 * Check if the page is at the top.
 * @returns {boolean} True if the page is at the top, otherwise false.
 */
function isPageAtTop() {
  return window.scrollY === 0;
}

/**
 * Update the TOC on page load, setting the first link as current if the page is at the top.
 * @param block The block element
 */
function updateTocOnPageLoad(block) {
  if (isPageAtTop()) {
    block.querySelectorAll('.ds-toc-link').forEach((linkT) => {
      linkT.removeAttribute('aria-current');
    });
    const firstTocLink = block.querySelector('.ds-toc-link');
    if (firstTocLink) {
      firstTocLink.setAttribute('aria-current', 'true');
    }
  }
}

/**
 * Main function to initialize the TOC block.
 * @param block The block element
 */
export default function decorate(block) {
  const tocNav = nav({
    class: 'ds-toc-nav',
    role: 'navigation',
    'aria-label': 'TOC Navigation',
    'aria-labelledby': 'ds-toc-heading',
  }, p({
    id: 'ds-toc-heading',
    class: 'ds-toc-heading',
  }, 'On this page'));

  const main = block.closest('main');
  let sections = main.querySelectorAll('.section[data-name]');
  if (sections.length === 0) {
    sections = main.querySelectorAll('h2');
  }
  const dataNames = getDataNames(sections);
  const tocLists = createDsTocList(dataNames, main);

  tocLists.forEach((tocList) => {
    const [dataName, h2s] = Object.entries(tocList)[0];
    const toc = createToc(dataName, h2s, block);
    tocNav.appendChild(toc);
  });

  block.replaceChildren(tocNav);

  initTocList(block);
  updateTocOnPageLoad(block);

  let hasBeenCalled = false;
  document.addEventListener('scroll', () => {
    if (!hasBeenCalled) {
      createObserver(block);
      hasBeenCalled = true;
    }
    if (window.scrollY <= 300) {
      updateTocOnPageLoad(block);
    }
  });
}
