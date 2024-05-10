import { containerize } from '../../scripts/utils.js';
import { aside } from '../../scripts/dom-builder.js';
import { getMetadata } from '../../scripts/aem.js';

function decorate(doc) {
  const main = doc.querySelector('main');
  containerize(main, '.hero');
  const template = getMetadata('template');
  const showSideNav = getMetadata('sidenav') !== 'false' && !getMetadata('nav');
  if (template === 'hub-l2' && showSideNav) main.parentNode.insertBefore(aside(), main);
}

decorate(document);
