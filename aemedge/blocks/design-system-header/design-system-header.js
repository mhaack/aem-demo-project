import decorateHeader from '../header/header.js';
import { nav } from '../../scripts/dom-builder.js';
import initDsMainNav from './design-system-main-nav.js';
import { loadCSS } from '../../scripts/aem.js';

/**
 * Add the "Design System Main Nav" to the block.
 * @param block The block to add the main navigation to.
 */
function addDsMainNav(block) {
  loadCSS(`${window.hlx.codeBasePath}/blocks/design-system-header/design-system-main-nav.css`);
  const mainNavWrapper = nav({ class: 'design-system-main-nav-wrapper' });
  block.append(mainNavWrapper);
  initDsMainNav(mainNavWrapper);
}

export default async function decorate(block) {
  await decorateHeader(block);
  addDsMainNav(block);
}
