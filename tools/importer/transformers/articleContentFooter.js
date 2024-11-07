/* global WebImporter */

const AUTHORPROFILE_FILTER = /\b(?:Meet|About) the Author(?:s)?\b/i;

const articleContentFooter = (main, document) => {
  // news footnotes
  const footnoteWrapper = document.querySelector(
    'section#main > article div.entry-content div.footnote-wrapper',
  );
  if (footnoteWrapper) {
    const block = WebImporter.Blocks.createBlock(document, {
      name: 'Footnote',
      cells: [[footnoteWrapper.innerHTML]],
    });
    footnoteWrapper.replaceWith(block);
  }

  // insights footnotes, which are in the "author" section
  // https://www.sap.com/insights/viewpoints/the-business-value-of-sustainability-is-here.html
  main.querySelectorAll('div[data-component="Section"], div[data-component="Reference"]').forEach((sectionWrapper) => {
    if (sectionWrapper.querySelector('h2')?.textContent.match(AUTHORPROFILE_FILTER)) {
      const insightsFootnoteWrapper = sectionWrapper.querySelector('div[data-component-name="TextStandard"] div[class^="TextStandard__content--"]');
      if (insightsFootnoteWrapper) {
        const block = WebImporter.Blocks.createBlock(document, {
          name: 'Footnote',
          cells: [[insightsFootnoteWrapper.innerHTML]],
        });
        sectionWrapper.parentElement.previousElementSibling.append(block);
      }
      sectionWrapper.remove();
    }
  });
};
export default articleContentFooter;
