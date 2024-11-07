/* global WebImporter */

const articleCallout = (main, document) => {
  // sample https://news.sap.com/2022/03/international-womens-day-2022-change-makers/
  main.querySelectorAll('div.callout').forEach((callout) => {
    callout.before(document.createElement('hr'));

    const sectionMetadataTable = WebImporter.DOMUtils.createTable(
      [['Section Metadata'], ['Style', 'Additional Reading']],
      document,
    );
    callout.after(sectionMetadataTable, document.createElement('hr'));
  });
};

export default articleCallout;
