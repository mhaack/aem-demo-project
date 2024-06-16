import { div } from '../../scripts/dom-builder.js';
import {
  buildBlock,
  loadCSS,
} from '../../scripts/aem.js';

function initBlock(main, blockName) {
  main.append(div(buildBlock(blockName, '')));
}

async function decorate(doc) {
  loadCSS(`${window.hlx.codeBasePath}/templates/web-component/web-component.css`);
  const main = doc.querySelector('main');
  initBlock(main, 'deep-link');
}

decorate(document);
