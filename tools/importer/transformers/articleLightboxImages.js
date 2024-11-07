/* global WebImporter */
// If image has Click to Enlarge as the caption
// transform it into a Lightbox table
const transformLightboxImages = (main, document) => {
  main.querySelectorAll('figure.wp-block-image').forEach((figure) => {
    const block = [['Lightbox'], [figure.innerHTML]];
    const table = WebImporter.DOMUtils.createTable(block, document);
    figure.replaceWith(table);
  });
};
export default transformLightboxImages;
