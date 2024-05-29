import { getMetadata } from './aem.js';

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
function decorateSpans(main) {
  const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    decorateTextNode(walker.currentNode);
  }
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

export {
  decorateSpans,
  filterInternalExternalData,
};
