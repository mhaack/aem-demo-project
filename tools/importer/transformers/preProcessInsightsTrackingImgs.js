/**
 * Clean up AEM DM image source to get the bigger resolution images.
 * @param {HTMLElement} main - The main element containing the images.
 */
export default function cleanUpTrackingImgs(main, document) {
  document.querySelectorAll('body > img').forEach((img) => {
    const styles = img.getAttribute('style');
    if (styles && styles.indexOf('display: none;') !== -1) {
      img.remove();
    }
  });
}
