/* global WebImporter */
const transformHero = (main, document) => {
  // news hero
  const heroNews = document.querySelector('.c-hero');
  if (heroNews) {
    // clean up hero stuff
    heroNews.querySelectorAll('.social-share-list, .c-post-type, .c-entry-meta').forEach((el) => el.remove());

    // map hero content
    const content = heroNews.querySelector('article');

    // unwrap hero image
    const heroImage = content.querySelector('a.c-post-link-wrapper img');
    if (heroImage) {
      heroImage.closest('a').replaceWith(heroImage);
    }

    // empty row for background image
    const row = document.createElement('div');
    const cell = document.createElement('div');
    row.appendChild(cell);

    const block = [['Hero'], [row], [content.innerHTML]];
    const table = WebImporter.DOMUtils.createTable(block, document);
    heroNews.replaceWith(table);
  }
};
export default transformHero;
