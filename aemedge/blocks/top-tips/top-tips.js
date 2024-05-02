import { decorateIcons } from '../../scripts/aem.js';
import { div, h3, span } from '../../scripts/dom-builder.js';

/**
 * Formats a string to be more readable by capitalizing the first letter of each word.
 * @param str The string to format
 * @returns {*} The formatted string
 */
function getReadableBlockName(str) {
  const parts = str.split('-');
  const formattedParts = parts.map((part) => part.charAt(0)
    .toUpperCase() + part.slice(1));
  return formattedParts.join(' ');
}

export default async function decorate(block) {
  const content = block.querySelector('div:nth-child(1)');
  const blockName = block.getAttribute('data-block-name');
  const blockHeadline = getReadableBlockName(blockName);
  const headline = div({
    class: 'default-content-wrapper',
  }, h3(
    {
      id: blockName,
    },
    blockHeadline,
  ));
  const lightBulb = span(
    {
      class: ['icon', 'icon-lightbulb'],
    },
  );

  content.prepend(headline);
  block.append(lightBulb);
  decorateIcons(block);
}
