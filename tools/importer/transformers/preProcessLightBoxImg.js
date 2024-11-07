/**
 * Unwraps lightbox images by replacing the parent anchor element with the image element.
 * @param {HTMLElement} main - The main element containing the images.
 * @param {HTMLDocument} document - The document
 */
export default function unwrapLightboxImages(main, document) {
  main.querySelectorAll('figure.wp-block-image').forEach((figure) => {
    const caption = figure.querySelector('figcaption');
    let captionWrapper;
    if (caption) {
      const captionText = caption.textContent;
      captionWrapper = document.createElement('figcaption');
      const captionTextElem = document.createElement('em');
      captionTextElem.textContent = captionText;
      captionWrapper.appendChild(captionTextElem);
    }
    const img = figure.querySelector('img');
    const parent = img?.parentElement;
    if (
      parent.tagName === 'A'
      && parent.href.match(/\.(jpeg|jpg|gif|png|webp)$/) !== null
    ) {
      parent.replaceWith(img);
      if (captionWrapper) {
        figure.appendChild(captionWrapper);
        caption.remove();
      }
    }
  });

  main.querySelectorAll('div.entry-content a > img').forEach((lightboxImg) => {
    const parent = lightboxImg.parentElement;

    if (parent.tagName === 'A' && parent.href.match(/\.(jpeg|jpg|gif|png|webp)$/) !== null) {
      parent.replaceWith(lightboxImg);
    }
  });
}
