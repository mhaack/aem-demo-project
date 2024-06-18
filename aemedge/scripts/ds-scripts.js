import { buildBlock, decorateBlock, getMetadata } from './aem.js';

const encodeHTML = (str) => str.replace(/[\u00A0-\u9999<>&]/g, (i) => `&#${i.charCodeAt(0)};`);

/**
 * converts text with attributes to <span> elements with given attributes.
 * eg: [text]{color="red" class="highlight"} => <span color="red" class="highlight">text</span>
 * @param {string} inputStr
 */
const text2html = (inputStr) => {
  if (!inputStr) return inputStr;
  const regex = /\[([^[\]]+)\]{([^}]+)}/g;
  return inputStr.replace(regex, (match, text, attrs) => {
    const encodedText = encodeHTML(text);

    let modifiedAttrs = attrs
      .split(/\s+(?=(?:[^"]*"[^"]*")*[^"]*$)/g) // match spaces only if not within quotes
      .map((attr) => attr.split('='));

    const allValid = modifiedAttrs.every(
      ([key, value]) => key !== undefined && value !== undefined,
    );
    if (!allValid) return match;

    modifiedAttrs = modifiedAttrs
      .map(([key, value]) => `${key}="${encodeHTML(value.replace(/"/g, ''))}"`)
      .join(' ');
    // Construct the HTML equivalent
    return `<span ${modifiedAttrs}>${encodedText}</span>`;
  });
};

/**
 * decorates a text node with inline attributes to a span element
 * @param {Node} node
 */
function decorateTextNode(node) {
  const { textContent } = node;
  if (textContent.includes('[') && textContent.includes(']{')) {
    const span = document.createElement('span');
    span.innerHTML = text2html(textContent);
    window.requestAnimationFrame(() => {
      node.replaceWith(span);
    });
  }
}

/**
 * helper - walkes the DOM and replaces text nodes with spans if they have inline-attributes
 * @param {HTMLElement} main
 */
export function decorateSpans(main) {
  const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    decorateTextNode(walker.currentNode);
  }
}

function decorateLiveExamples(element) {
  element.querySelectorAll('a').forEach((link) => {
    const { href, textContent } = link;
    // deprecated prod live example, to remove on full import
    const qaPrefix = 'https://www-qa.sap.com/design-system/live-examples/';
    const prodPrefix = 'https://www.sap.com/design-system/live-examples/';
    if (href === textContent && (href.startsWith(prodPrefix) || href.startsWith(qaPrefix))) {
      const embedBlock = buildBlock('live-example-embed', [[link.cloneNode()]]);

      link.parentElement.replaceWith(embedBlock);
      decorateBlock(embedBlock);
    }
  });
}

function filterInternalExternalData(main) {
  let isExternal = new URLSearchParams(window.location.search).has('external');
  if (getMetadata('access') === 'internal') {
    isExternal = false;
  }
  if (isExternal) {
    document.body.classList.add('external');
    const internalOnlyRegex = /\[internal_only](.*?)\[\/internal_only]/gs;
    const externalOnlyRegex = /\[external_only]|\[\/external_only]/gs;
    main.innerHTML = main.innerHTML.replace(internalOnlyRegex, '').replace(externalOnlyRegex, '');
    main.querySelectorAll('[data-visibility="internal_only"]').forEach((elem) => elem.remove());
  } else {
    document.body.classList.add('internal');
    const internalOnlyRegex = /\[external_only](.*?)\[\/external_only]/gs;
    const externalOnlyRegex = /\[internal_only]|\[\/internal_only]/gs;
    main.innerHTML = main.innerHTML.replace(internalOnlyRegex, '').replace(externalOnlyRegex, '');
    main.querySelectorAll('[data-visibility="external_only"]').forEach((elem) => elem.remove());
  }
}

/**
 * Convert camelCase to kebab-case.
 * @param str The string to convert.
 * @returns {*} The converted string.
 */
export function camelToKebab(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2') // Handle lowercase followed by uppercase
    .replace(/([a-zA-Z])([0-9])/g, '$1-$2') // Handle letters followed by numbers
    .replace(/([0-9])([a-zA-Z])/g, '$1-$2') // Handle numbers followed by letters
    .toLowerCase();
}

export function decorateDesignSystemSite(main) {
  filterInternalExternalData(main);
  decorateLiveExamples(main);
}
