import { div } from '../../scripts/dom-builder.js';
import { buildBlock } from '../../scripts/aem.js';

function initBlock(main, blockName) {
  main.append(div(buildBlock(blockName, '')));
}

async function decorate(doc) {
  const main = doc.querySelector('main');
  initBlock(main, 'design-system-toc');
  initBlock(main, 'deep-link');
}

decorate(document);
