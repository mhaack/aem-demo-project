import { div, span } from '../../scripts/dom-builder.js';
import Button from '../../libs/button/button.js';

let lightboxCount = 0;

export default function decorate(block) {
  lightboxCount += 1;
  const id = lightboxCount;
  const picture = block.querySelector('picture');
  const modalContent = [
    div({ class: 'lightbox-modal__header' }),
    div(
      { class: 'lightbox-modal__header__caption' },
      block.querySelector('em')?.textContent || '',
    ),
    div(
      { class: 'lightbox-modal__content' },
      div(
        { class: 'lightbox-modal__content__image-container' },
        picture.cloneNode(true),
      ),
    ),
  ];

  const enlargeButtonHTML = new Button('Enlarge', 'icon-zoom-in', 'secondary', 'medium').render();
  if (picture.nextSibling.nodeType === Node.TEXT_NODE) {
    const spanWrapper = span();
    spanWrapper.append(picture.nextSibling.cloneNode());
    picture.parentElement.replaceChild(spanWrapper, picture.nextSibling);
  }
  picture.parentElement.insertBefore(enlargeButtonHTML, picture.nextElementSibling);
  let modal;
  enlargeButtonHTML.addEventListener('click', async () => {
    if (!modal) {
      const { default: getModal } = await import(`${window.hlx.codeBasePath}/blocks/modal/modal.js`);
      modal = await getModal(`lightbox-modal-${id}`, () => modalContent);
      modal.classList.add('lightbox-modal');
    }
    modal.showModal();
  });
}