import { decorateButtons } from '../../scripts/aem.js';

export default async function decorate(block) {

  if (block.childElementCount === 2) {
    const img = block.firstElementChild.querySelector('img');
    if (img) {
      block.lastElementChild.firstElementChild.before(img.closest('div'));
      block.firstElementChild.remove();
    }
  }

  decorateButtons(block);
}
