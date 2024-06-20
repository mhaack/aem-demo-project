import { getMetadata, toCamelCase, toClassName } from './aem.js';
import { div } from './dom-builder.js';
import ffetch from './ffetch.js';

export const fioriWebRootUrl = '/design-system/fiori-design-web/';

// Match author names and Ph.D. titles
const authorTitleRegex = /[^,]+(?:,\s*Ph\.?D\.?)?/gi;

export function compareVersions(a, b) {
  if (a === 'latest') {
    if (b === 'latest') {
      return 0;
    }
    return 1;
  }
  if (b === 'latest') {
    return -1;
  }

  const aParts = a.split('-');
  const bParts = b.split('-');

  for (let i = 0; i < Math.min(aParts.length, bParts.length); i += 1) {
    const aNum = parseInt(aParts[i], 10);
    const bNum = parseInt(bParts[i], 10);

    if (aNum < bNum) {
      return -1;
    }
    if (aNum > bNum) {
      return 1;
    }
  }

  return aParts.length - bParts.length;
}

export async function getVersionList() {
  const versionList = await ffetch(`${fioriWebRootUrl}metadata.json`)
    .filter((row) => row.version && row.version !== 'latest')
    .map((row) => row.version)
    .all();
  versionList.sort(compareVersions);

  return versionList;
}

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

function getContentTypeFromArticle(article) {
  const tags = Array.isArray(article.tags) ? article.tags : JSON.parse(article.tags);
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
  return `/author/${toClassName(author.trim())}`;
}

function getAuthorMetadata(doc) {
  const authorMeta = getMetadata('author', doc);

  const matches = authorMeta.match(authorTitleRegex);
  const authorNames = matches?.map((match) => match.trim());
  if (!authorNames || authorNames.length === 0) {
    return '';
  }

  return authorNames;
}

function buildCardDisplayProfile(profiles) {
  if (!profiles || profiles.length === 0) {
    return null;
  }
  if (profiles.length === 1) {
    return profiles[0];
  }
  const firstProfile = { ...profiles[0] };
  firstProfile.name = `${firstProfile.name} + more`;
  return firstProfile;
}

async function fetchProfiles() {
  return ffetch(
    `${window.hlx.codeBasePath}/profiles-index.json`,
    'sapContentHubProfilesEntries',
  ).all();
}

async function fetchAuthors() {
  return ffetch(
    `${window.hlx.codeBasePath}/profiles-index.json`,
    'sapContentHubAuthorEntries',
  ).sheet('authors').all();
}

/**
 * Fetches author information based on the provided author names.
 * @param {string|string[]} authors - The author name(s) to fetch information for.
 * @returns {Promise<Object[]>} - A promise that resolves to an array of author objects.
 */
function lookupProfiles(profilesKeys, profileIndex) {
  if (
    !profilesKeys
    || profilesKeys === '0'
    || (Array.isArray(profilesKeys) && profilesKeys.length === 1 && profilesKeys[0] === '')
  ) {
    return [];
  }

  const profileKeys = Array.isArray(profilesKeys)
    ? profilesKeys
    : profilesKeys.match(authorTitleRegex).map((match) => match.trim());
  return profileKeys.map((profileName) => {
    const cachedProfile = sessionStorage.getItem(`profile-${toClassName(profileName)}`);
    let profileEntry = cachedProfile ? JSON.parse(cachedProfile) : null;
    if (!profileEntry) {
      [profileEntry] = profileIndex.filter(
        (entry) => entry.name === profileName || entry.path === profileName,
      );
      if (!profileEntry) {
        profileEntry = { name: profileName, path: buildAuthorUrl(profileName) };
      }
      sessionStorage.setItem(`profile-${toClassName(profileName)}`, JSON.stringify(profileEntry));
    }
    return profileEntry;
  });
}

function getConfig(key) {
  const config = sessionStorage.getItem('config-ch');
  return config ? JSON.parse(config)[key] : null;
}

/**
 * Converts a given string to "kebab case" making all letters lowercase and replacing all
 * whitespaces with dashes.
 * @param {string} str - The input string to be converted.
 * @returns {string} The string in kebab case format.
 */
function convertStringToKebabCase(str) {
  return str.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Retrieves the content of metadata tags. Accommodates "twitter:" metadata names which are handled
 * differently by the product source code.
 * @param {string} name The metadata name (or property)
 * @param {Document} doc Document object to query for metadata. Defaults to the window's document
 * @returns {string} The metadata value(s)
 */
function getMetadataOverride(name, doc = document) {
  const attr = name.includes(':') && !name.startsWith('twitter:') ? 'property' : 'name';
  const meta = [...doc.head.querySelectorAll(`meta[${attr}="${name}"]`)]
    .map((m) => m.content)
    .join(', ');
  return meta || '';
}

export {
  buildAuthorUrl,
  buildCardDisplayProfile,
  containerize,
  convertStringToKebabCase,
  extractFieldValue,
  fetchProfiles,
  fetchAuthors,
  fetchPages,
  fetchTagList,
  formatDate,
  getAuthorMetadata,
  getConfig,
  getContentType,
  getContentTypeFromArticle,
  getParameterMap,
  getTagLink,
  lookupProfiles,
  toTitleCase,
  getMetadataOverride,
};
