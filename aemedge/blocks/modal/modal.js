import { decorateIcons, loadCSS } from '../../scripts/aem.js';
import {
  button, div, domEl, span,
} from '../../scripts/dom-builder.js';

/**
 * Creates a modal with id modalId, or if that id already exists, returns the existing modal.
 * To show the modal, call `modal.showModal()`.
 * @param modalId
 * @param createContent Callback called when the modal is first opened; should return html string
 * for the modal content
 * @param {'text-only' | 'lightbox'} [type]
 * @param [addEventListeners] Optional callback called when the modal is first opened;
 * should add event listeners to body if needed
 * @returns {Promise<HTMLElement>} The <dialog> element, after loading css
 */
export default async function getModal(modalId, createContent, addEventListeners, type) {
  await loadCSS(`${window.hlx.codeBasePath}/blocks/modal/modal.css`);

  let dialog = document.getElementById(modalId);
  if (!dialog) {
    const content = createContent?.() || [];
    const dialogContent = div({ class: 'modal__content' }, ...(Array.isArray(content) ? content : [content]));

    const closeButton = button(
      { class: 'modal__content__close-button', 'aria-label': 'Close', type: 'button' },
      span({ class: 'icon icon-close' }),
    );
    decorateIcons(closeButton);
    closeButton.addEventListener('click', () => dialog.close());

    const modalTypeClass = `modal--${type}` || '';
    dialog = domEl('dialog', { id: modalId, class: `modal ${modalTypeClass}` }, dialogContent, closeButton);

    // close dialog on clicks outside the dialog. https://stackoverflow.com/a/70593278/79461
    dialog.addEventListener('click', (event) => {
      const dialogDimensions = dialog.getBoundingClientRect();
      if (event.clientX < dialogDimensions.left || event.clientX > dialogDimensions.right
        || event.clientY < dialogDimensions.top || event.clientY > dialogDimensions.bottom) {
        dialog.close();
      }
    });

    addEventListeners?.(dialog);
  }

  return dialog;
}
