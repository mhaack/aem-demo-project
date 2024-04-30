// eslint-disable-next-line import/no-unresolved
import { decorate as decorateBlocks } from 'https://www.hlx.live/tools/sidekick/library/plugins/blocks/blocks.js';
import { addUrlToData } from './utils.js';

export async function decorate(container, data, searchTerm, context) {
  addUrlToData(context, data);
  return decorateBlocks(container, data, searchTerm, context);
}

export default {
  title: 'design-system',
  searchEnabled: false,
};
