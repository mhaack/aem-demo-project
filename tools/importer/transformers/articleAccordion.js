/* global WebImporter */

const articleAccordion = (main, document) => {
  // insights accordion mapped to accordion or highlighted text or toc
  // https://www.sap.com/insights/what-is-digital-transformation.html
  main.querySelectorAll('div.section.accordion').forEach((accordionWrapper) => {
    const entries = [];
    accordionWrapper.querySelectorAll('div[data-component-name="AccordionItem"]').forEach((entryWrapper) => {
      const entryTitle = entryWrapper.querySelector('[class^="AccordionItemCommon__openerWrapper--"] h2').textContent;
      const entryContent = entryWrapper.querySelector('[class^="AccordionItemCommon__slideAccordion--"]');
      entries.push([entryTitle, entryContent]);
    });

    if (entries.length === 1) {
      const [entryTitle, entryContent] = entries[0];

      // if we have page hash links only we used the toc block
      const links = [...entryContent.querySelectorAll('a')];
      const pageHashLinksOnly = links.every((link) => link.hash && link.hash.startsWith('#') && link.pathname === document.originalURL.pathname);
      if (pageHashLinksOnly) {
        const metaData = main.querySelector('table#metadata');
        const row = metaData.insertRow();
        const key = row.insertCell(0);
        key.textContent = 'TOC';
        const value = row.insertCell(1);
        value.textContent = 'Yes';
        accordionWrapper.remove();
        return;
      }

      // use highlight section for single entry
      const wrapper = document.createElement('div');
      const heading = document.createElement('h3');
      heading.textContent = entryTitle;
      const sectionMetadataTable = WebImporter.DOMUtils.createTable([['Section Metadata'], ['Style', 'Additional Reading']], document);

      wrapper.append(document.createElement('hr'), heading, entryContent, sectionMetadataTable, document.createElement('hr'));
      accordionWrapper.replaceWith(wrapper);
    } else {
      // use accordion block for default case
      const block = [['Accordion'], ...entries];
      const table = WebImporter.DOMUtils.createTable(block, document);
      accordionWrapper.replaceWith(table);
    }
  });
};

export default articleAccordion;
