/**
 * Clean up AEM DM image source to get the bigger resolution images.
 * @param {HTMLElement} main - The main element containing the images.
 */
export default function cleanUpImgSrc(main) {
  main.querySelectorAll('img').forEach((img) => {
    const picture = img.closest('picture');

    // get all sources of the picture element and return the one with the largest resolution
    if (picture) {
      const sources = picture.querySelectorAll('source');
      let largestSource = sources[0];
      sources.forEach((source) => {
        const width = parseInt(source.getAttribute('data-width'), 10);
        const largestWidth = parseInt(largestSource.getAttribute('data-width'), 10);
        if (width > largestWidth) {
          largestSource = source;
        }
      });
      img.src = largestSource.srcset;
    }

    const src = img.src.split('?')[0];
    img.src = src;
  });
}
