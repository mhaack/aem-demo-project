import { getMetadata, toCamelCase, toClassName } from './aem.js';
import { div } from './dom-builder.js';
import ffetch from './ffetch.js';

function formatDate(inputDate) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options);
  return formattedDate;
}

function isWhitespaceNode(node) {
  return node.nodeName === '#text' && node.textContent.trim().length === 0;
}

function containerize(container, targetClass) {
  const target = container.querySelector(targetClass);
  if (target && target.nextElementSibling) {
    const parent = target.parentElement;
    const sectionMetadata = target.parentElement.querySelector(':scope > .section-metadata');
    const wrapperDiv = div({}, target, sectionMetadata || '');
    container.insertBefore(wrapperDiv, container.firstChild);
    if (
      !parent.hasChildNodes()
      || Array.from(parent.childNodes).every((node) => isWhitespaceNode(node))
    ) {
      parent.remove();
    }
  }
}

function toTitleCase(inputString) {
  const modifiedString = inputString.replace(/-/g, ' ');
  return modifiedString.replace(/(^|\s)([a-z])/g, (match, p1, p2) => p1 + p2.toUpperCase());
}

function getParameterMap() {
  const urlParams = new URLSearchParams(window.location.search);
  const params = new Map();
  urlParams.forEach((value, key) => {
    if (urlParams.getAll(key).length > 1) {
      params.set(key, urlParams.getAll(key));
    } else {
      params.set(key, urlParams.get(key).split(','));
    }
  });
  return params;
}

/**
 * Fetch pages from specified paths and parse into queryable document objects
 * @param paths {string[]}
 * @returns {Promise<Document[]>}
 */
async function fetchPages(paths) {
  return Promise.all(
    paths.map((path) => fetch(path)
      .then((res) => res.text())
      .then((text) => new DOMParser().parseFromString(text, 'text/html'))),
  );
}

/**
 * Tag related helper functions
 */
async function fetchTagList(prefix = 'default') {
  window.tags = window.tags || {};
  if (!window.tags[prefix]) {
    window.tags[prefix] = new Promise((resolve) => {
      fetch(`${prefix === 'default' ? '/aemedge' : prefix}/tagging-contenthub.json`)
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          return {};
        })
        .then((json) => {
          const tags = {};
          json.data
            .filter((tag) => tag.key)
            .forEach((tag) => {
              tags[toCamelCase(tag.key)] = tag;
            });
          window.tags[prefix] = tags;
          resolve(window.tags[prefix]);
        })
        .catch(() => {
          // error loading placeholders
          window.tags[prefix] = {};
          resolve(window.tags[prefix]);
        });
    });
  }
  return window.tags[`${prefix}`];
}

function getContentType(doc = document) {
  const tags = getMetadata('article:tag', doc).split(', ');
  return tags.find((tag) => tag.trim().toLowerCase().startsWith('content-type'));
}

function extractFieldValue(entry, field, prefix) {
  const value = JSON.parse(entry[field])
    .find((item) => item.trim().toLowerCase().startsWith(prefix))
    .split(',');
  return value[0].replace(`${prefix}/`, '');
}

function getTagLink(tag, path) {
  let tagHref = tag['topic-path'];
  if (path.startsWith('/news/') || tagHref === '0') {
    tagHref = tag['news-path'];
  }
  return tagHref;
}

/**
 * Author related helper functions
 */
function buildAuthorUrl(author) {
  return `/author/${toClassName(author.trim()).replaceAll('-', '')}`;
}

const defaultSuffixes = ['PhD', 'Ph.D.']; // TODO
function getAuthorMetadata(doc) {
  const authorNames = getMetadata('author', doc).split(',').map((e) => e.trim());
  if (!authorNames || authorNames.length === 0) {
    return '';
  }

  return authorNames.map((authorName) => {
    let modifiedAuthor = authorName;
    defaultSuffixes.forEach((suffix) => {
      modifiedAuthor = modifiedAuthor.replace(new RegExp(`,*\\s*${suffix}(?=,|$)`, 'g'), '');
    });
    return modifiedAuthor.trim();
  });
}

function buildCardDisplayAuthor(authors) {
  if (!authors || authors.length === 0) {
    return null;
  }
  if (authors.length === 1) {
    return authors[0];
  }
  const firstAuthor = { ...authors[0] };
  firstAuthor.author = `${firstAuthor.author} + more`;
  return firstAuthor;
}

async function fetchAuthorList() {
  return ffetch(
    `${window.hlx.codeBasePath}/authors-index.json`,
    'sapContentHubAuthorEntries',
  ).all();
}

/**
 * Fetches author information based on the provided author names.
 * @param {string|string[]} authors - The author name(s) to fetch information for.
 * @returns {Promise<Object[]>} - A promise that resolves to an array of author objects.
 */
function lookupAuthors(authorsKeys, authorIndex) {
  if (!authorsKeys || authorsKeys === '0' || (Array.isArray(authorsKeys) && authorsKeys.length === 1 && authorsKeys[0] === '')) {
    return [];
  }

  const authorKeys = Array.isArray(authorsKeys) ? authorsKeys : authorsKeys.split(',').map((author) => author.trim());
  return authorKeys.map((authorName) => {
    const cachedAuthor = sessionStorage.getItem(`author-${toClassName(authorName)}`);
    let authorEntry = cachedAuthor ? JSON.parse(cachedAuthor) : null;
    if (!authorEntry) {
      [authorEntry] = authorIndex.filter(
        (entry) => entry.author === authorName || entry.path === authorName,
      );
      if (!authorEntry) {
        authorEntry = { author: authorName, path: buildAuthorUrl(authorName) };
      }
      sessionStorage.setItem(`author-${toClassName(authorName)}`, JSON.stringify(authorEntry));
    }
    return authorEntry;
  });
}

export {
  formatDate,
  containerize,
  fetchPages,
  fetchTagList,
  getContentType,
  extractFieldValue,
  getTagLink,
  toTitleCase,
  getParameterMap,
  buildAuthorUrl,
  getAuthorMetadata,
  fetchAuthorList,
  lookupAuthors,
  buildCardDisplayAuthor,
};
