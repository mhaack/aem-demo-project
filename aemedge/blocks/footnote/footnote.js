import { div } from '../../scripts/dom-builder.js';
import { getMetadata } from '../../scripts/aem.js';
import { formatDate } from '../../scripts/utils.js';

export default async function decorateBlock(block) {
  const meta = [
    getMetadata('published-time') ? `Published on ${formatDate(getMetadata('published-time'))}` : null,
    getMetadata('modified-time') ? `Updated on ${formatDate(getMetadata('modified-time'))}` : null,
  ];
  block.firstElementChild.append(div(meta.filter(Boolean).join('. ')));
}
