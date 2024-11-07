/* global WebImporter */

// sample https://www.sap.com/insights/research/does-your-business-have-a-talent-for-sustainability.html

// eslint-disable-next-line no-unused-vars
export default function articleFastFacts(main, document) {
  document.querySelectorAll('div[class*="SeveralBoxes__isFastFact--"]').forEach((keyFact) => {
    const content = keyFact.closest('div[data-component-name="UniversalLayout"]');
    if (content) {
      const cells = [['Fast Facts']];

      content.querySelectorAll('div[class*="SeveralBoxes__isFastFact--"]').forEach((item) => {
        const factName = item.querySelector('span[class*="FastFactContent__factName--"]');
        const wrapper = document.createElement('div');
        const factNameWrapper = document.createElement('h4');
        factNameWrapper.textContent = factName.textContent;
        wrapper.append(factNameWrapper);

        const factUnit = item.querySelector('span[class*="FastFactContent__factUnit--"]');
        if (factUnit) {
          const factUnitWrapper = document.createElement('h5');
          factUnitWrapper.textContent = factUnit.textContent;
          wrapper.append(factUnitWrapper);
        }

        const factContent = item.querySelector('div[class^="Body__root--"]');
        if (factContent) {
          if (factContent.querySelector('h5')) {
            const factContentH5 = factContent.querySelector('h5');
            const factContentWrapper = document.createElement('p');
            factContentWrapper.textContent = factContent.querySelector('h5').textContent;
            factContentH5.replaceWith(factContentWrapper);
          }
          wrapper.append(factContent);
        }

        cells.push([wrapper]);
      });

      const table = WebImporter.DOMUtils.createTable(cells, document);
      content.replaceWith(table);
    }
  });
}
