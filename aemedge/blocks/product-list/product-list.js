import { createOptimizedPicture, getMetadata } from '../../scripts/aem.js';
import { addColClasses, LIST_LAYOUT_CONFIG, LIST_LAYOUT_CONFIG_L2 } from '../../scripts/utils.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'product-list-card-image';
      else div.className = 'product-list-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture')?.replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '100' }])));
  block.textContent = '';

  const template = getMetadata('template');
  if (template === 'hub-l2') {
    addColClasses(block, ul, LIST_LAYOUT_CONFIG_L2);
  } else {
    addColClasses(block, ul, LIST_LAYOUT_CONFIG);
  }

  block.append(ul);
}
