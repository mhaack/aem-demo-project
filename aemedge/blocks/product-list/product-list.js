import { createOptimizedPicture } from '../../scripts/aem.js';
import { applyLayout } from '../../scripts/utils.js';

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

  applyLayout(block, ul);
  block.append(ul);
}
