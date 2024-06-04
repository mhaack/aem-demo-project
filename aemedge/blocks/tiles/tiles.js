import { createOptimizedPicture } from '../../scripts/aem.js';
import {
  a, div, li, ul,
} from '../../scripts/dom-builder.js';

export default function decorate(block) {
  const listElement = ul();
  [...block.children].forEach((row) => {
    const cardDiv = div({ class: 'tile' });
    while (row.firstElementChild) {
      cardDiv.append(row.firstElementChild);
    }
    [...cardDiv.children].forEach((child) => {
      if (child.children.length === 1 && child.querySelector('picture')) {
        child.className = 'tile-image';
      } else {
        child.className = 'tile-body';
      }
    });
    const listItemElement = li(cardDiv);
    if (cardDiv.children.length > 0) {
      const cardLink = cardDiv
        .children[cardDiv.children.length - 1]
        ?.querySelector('a');
      if (cardLink !== null) {
        const linkParent = cardLink.parentNode;
        const linkContent = cardLink.childNodes;
        [...linkContent].forEach((node) => {
          linkParent.insertBefore(node, cardLink);
        });
        linkParent.removeChild(cardLink);
        linkParent.normalize();
        const linkDiv = div(
          { class: 'tile-link' },
          a({ href: cardLink.href }, cardDiv),
        );
        listItemElement.append(linkDiv);
      }
    }
    listElement.append(listItemElement);
  });
  listElement
    .querySelectorAll('img')
    .forEach((img) => img
      .closest('picture').replaceWith(
        createOptimizedPicture(
          img.src,
          img.alt,
          false,
          [{ width: '750' }],
        ),
      ));
  block.textContent = '';
  block.classList.add(`elems${listElement.children.length}`);
  if (listElement.children.length > 8) {
    block.classList.add('elems9plus');
  }
  block.append(listElement);
}
