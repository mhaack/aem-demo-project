import { div } from '../../scripts/dom-builder.js';
import { buildBlock } from '../../scripts/aem.js';

function initDsTocBlock(main) {
  main.append(div(buildBlock('design-system-toc', '')));
}

async function decorate(doc) {
  const main = doc.querySelector('main');
  initDsTocBlock(main);
}

decorate(document);
