/* global WebImporter */

import { createBlock } from "./utils.js";

const articleIntro = (main, document) => {
  // news
  main.querySelectorAll('p.has-large-font-size').forEach((p) => {
    const block = createBlock(document, {
      name: 'Text Large',
      cells: [[p.cloneNode(true)]],
    });
    p.replaceWith(block);
  });

  // news
  const firstLead = main.querySelector('section#main > article p.lead');
  if (firstLead) {
    const block = createBlock(document, {
      name: 'Text Large',
      cells: [[firstLead.cloneNode(true)]],
    });

    firstLead.replaceWith(block);
  }
};
export default articleIntro;
