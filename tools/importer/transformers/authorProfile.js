/* global WebImporter */
const authorProfile = (main, document, html) => {
  if (html.originalURL.indexOf('/author/') > -1) {
    // map author details
    const profileEL = document.querySelector('section#archive-header');
    if (profileEL) {
      const profileImgEL = profileEL.querySelector('.executive-header img');
      const profileDetailsEL = profileEL.querySelector('.executive-header .executive-details');

      const block = [['Columns'], [profileImgEL, profileDetailsEL.innerHTML]];
      const table = WebImporter.DOMUtils.createTable(block, document);
      profileEL.replaceWith(table);
    } else {
      const h1 = document.createElement('h1');
      h1.innerHTML = document.authorProfileH1.innerHTML.replace(/<br>(.*)/g, '<b>$1</b>');
      const block = [['Title Banner (author)'], [h1]];
      const table = WebImporter.DOMUtils.createTable(block, document);
      document.querySelector('body').prepend(table);
    }

    // section with article cards
    const contentEl = document.querySelector('div#primary');
    if (contentEl) {
      contentEl.before(document.createElement('hr'));

      const sectionBlock = [['Section Metadata'], ['styles', 'light-grey']];
      const sectionTable = WebImporter.DOMUtils.createTable(sectionBlock, document);
      contentEl.after(sectionTable);

      const block = [['Article List']];
      const table = WebImporter.DOMUtils.createTable(block, document);
      contentEl.replaceWith(table);
    }
  }
};
export default authorProfile;
