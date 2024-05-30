import { createOptimizedPicture } from '../../scripts/aem.js';
import {
  div,
  domEl,
} from '../../scripts/dom-builder.js';

/**
 * Decorate Cards (colors) variant.
 * Add color preview div to each card and manipulate color code elements.
 * @param block {HTMLElement}
 */
function decorateColorsVariant(block) {
  if (!block.classList.contains('colors')) { return; }

  const cards = block.querySelectorAll('.cards-card');

  /**
   * Label eyebrow and title based on the number of paragraphs.
   * @param cardBody {HTMLElement}
   */
  function labelEyebrowAndTitle(cardBody) {
    const paragraphs = cardBody.querySelectorAll('p');
    if (paragraphs.length > 3) {
      cardBody.firstElementChild?.classList.add('cards-card-color-eyebrow');
      cardBody.children[1]?.classList.add('cards-card-color-title');
    } else {
      cardBody.firstElementChild?.classList.add('cards-card-color-title');
    }
  }

  /**
   * Wrap color code in `code` tag and add class to the color element.
   * @param paragraphs {NodeList}
   */
  function wrapColorCode(paragraphs) {
    paragraphs.forEach((p) => {
      const text = p.textContent;
      if (text.startsWith('#')) {
        p.classList.add('cards-card-color-hex');
      } else if (text.startsWith('rgb')) {
        p.classList.add('cards-card-color-rgb');
      } else {
        return;
      }

      const code = domEl('code', text.toUpperCase());
      p.textContent = '';
      p.append(code);
    });
  }

  /**
   * Add color preview div to each card.
   * @param colorsHex {*[]}
   */
  function addColorPreview(colorsHex) {
    colorsHex.forEach((color) => {
      const bgColor = color.textContent;
      const isWhite = bgColor === '#FFFFFF';
      const card = color.closest('.cards-card');
      const colorPreview = div(
        {
          class: `cards-card-color-preview${isWhite ? ' --white' : ''}`,
          style: `background-color: ${bgColor}`,
        },
      );
      card.prepend(colorPreview);
    });
  }

  cards.forEach((card) => {
    const cardBody = card.querySelector('.cards-card-body');
    const paragraphs = cardBody.querySelectorAll('p');
    const colorsHex = [...paragraphs].filter((p) => p.textContent.startsWith('#'));

    labelEyebrowAndTitle(cardBody);
    wrapColorCode(paragraphs);
    addColorPreview(colorsHex);
  });
}

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'cards-card';
    while (row.firstElementChild) cardDiv.append(row.firstElementChild);
    [...cardDiv.children].forEach((childDiv) => {
      if (childDiv.children.length === 1 && childDiv.querySelector('picture')) {
        childDiv.className = 'cards-card-image';
      } else {
        childDiv.className = 'cards-card-body';
      }
    });
    const li = document.createElement('li');
    li.append(cardDiv);
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture')
    .replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.classList.add(`elems${ul.children.length}`);
  if (ul.children.length > 8) {
    block.classList.add('elems9plus');
  }
  block.append(ul);

  decorateColorsVariant(block);
}
