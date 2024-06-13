import { div } from '../../scripts/dom-builder.js';
import { buildBlock } from '../../scripts/aem.js';
import { mediaQueryLists } from '../../scripts/config-ds.js';

const body = document.querySelector('body');

function addMediaQueryHandler() {
  function changeHandler() {
    if (mediaQueryLists.XL.matches) {
      body.setAttribute('data-mobile', 'false');
    } else if (mediaQueryLists.L.matches) {
      body.setAttribute('data-mobile', 'false');
    } else if (mediaQueryLists.M.matches) {
      body.setAttribute('data-mobile', 'false');
    } else if (mediaQueryLists.S.matches) {
      body.setAttribute('data-mobile', 'true');
    } else if (mediaQueryLists.XS.matches) {
      body.setAttribute('data-mobile', 'true');
    }
  }

  Object.values(mediaQueryLists).forEach((mql) => mql.addEventListener('change', changeHandler));
  changeHandler();
}

function initBlock(main, blockName) {
  main.append(div(buildBlock(blockName, '')));
}

async function decorate(doc) {
  const main = doc.querySelector('main');
  initBlock(main, 'design-system-toc');
  initBlock(main, 'deep-link');
  addMediaQueryHandler();
}

decorate(document);
