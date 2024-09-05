import { createOptimizedPicture, toClassName } from '../../scripts/aem.js';
import { div, domEl } from '../../scripts/dom-builder.js';
import { applyLayout, capitalize } from '../../scripts/utils.js';
import MediaPlayer from '../../libs/mediaPlayer/mediaPlayer.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

/**
 * Decorate Cards (colors) variant.
 * Add color preview div to each card and manipulate color code elements.
 * @param block {HTMLElement}
 */
function decorateColorsVariant(block) {
  if (!block.classList.contains('colors')) {
    return;
  }

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
      const colorPreview = div({
        class: `cards-card-color-preview${isWhite ? ' --white' : ''}`,
        style: `background-color: ${bgColor}`,
      });
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

function handleMediaPlayer(childDiv) {
  childDiv.classList.add('cards-card-media');
  const placeholder = childDiv.querySelector('picture');
  const link = childDiv.querySelector('a').href;
  const player = new MediaPlayer(link, placeholder);
  childDiv.textContent = '';
  childDiv.append(player.render());
}

function handlePictureAndBackground(childDiv, bodyStyleProperties) {
  // remove wrapping <p> from <picture>
  const pictureEl = childDiv.querySelector('picture');
  const pictureElParent = pictureEl.parentElement;
  pictureEl.parentElement.parentElement.insertBefore(pictureEl, pictureElParent);
  pictureElParent.remove();

  const backgroundColourTokenEl = childDiv.querySelector('p:nth-child(2)');
  if (backgroundColourTokenEl && backgroundColourTokenEl.textContent) {
    const backgroundColourToken = toClassName(backgroundColourTokenEl.textContent.trim());
    const styleKey = `--udexColor${capitalize(backgroundColourToken.replace('background-', ''))}`;
    childDiv.style.backgroundColor = bodyStyleProperties.getPropertyValue(styleKey);
    childDiv.classList.add('cards-card-image', 'cards-card-image--has-background');
    backgroundColourTokenEl.remove();
  }
}

export default function decorate(block) {
  const styleProperties = getComputedStyle(document.body);
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('cards-card');
    while (row.firstElementChild) cardDiv.append(row.firstElementChild);
    [...cardDiv.children].forEach((childDiv, index) => {
      if (childDiv.querySelector('picture') && childDiv.querySelector('a')) {
        handleMediaPlayer(childDiv);
      } else if (childDiv.querySelector('a') && index === 0) {
        handleMediaPlayer(childDiv);
      } else if (childDiv.children.length === 1 && childDiv.querySelector('picture')) {
        childDiv.classList.add('cards-card-image');
      } else if (childDiv.children.length === 2 && childDiv.querySelector('picture')) {
        handlePictureAndBackground(childDiv, styleProperties);
      } else {
        childDiv.classList.add('cards-card-body');
      }
    });
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.append(cardDiv);
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img
    .closest('picture')
    .replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  applyLayout(block, ul);

  block.append(ul);

  decorateColorsVariant(block);
}
