import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const link = block.querySelector('a');
  const picture = createOptimizedPicture(link, link.nextElementSibling?.textContent, true);
  link.replaceWith(picture);
}
