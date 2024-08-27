import { div, span } from '../../scripts/dom-builder.js';
import Button from '../../libs/button/button.js';
import { buildModalContent } from '../../scripts/utils.js';

let lightboxCount = 0;

export default function decorate(block) {
  lightboxCount += 1;
  const id = lightboxCount;
  const picture = block.querySelector('picture');
  const modalContent = buildModalContent(
    null,
    block.querySelector('em')?.textContent || '',
    div(
      { class: 'lightbox-modal__image-container' },
      picture.cloneNode(true),
    ),
  );

  const enlargeButtonHTML = new Button(
    'Enlarge',
    'icon-zoom-in',
    'secondary',
    { xs: 'medium', m: 'large' },
  ).render();
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
      modal = await getModal(`lightbox-modal-${id}`, () => modalContent, null, 'lightbox');
      modal.classList.add('lightbox-modal');
      block.appendChild(modal);
    }
    modal.showModal();
  });
}
