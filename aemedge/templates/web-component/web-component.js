import { div, nav } from '../../scripts/dom-builder.js';
import { buildBlock } from '../../scripts/aem.js';

function decorate(doc) {
  const main = doc.querySelector('main');
  const mainNavContainer = nav();
  main.parentNode.insertBefore(mainNavContainer, main);

  // get first section and all the others
  const [firstSection, ...otherSections] = main.children;

  const sectionDividers = [
    {
      sectionName: 'Usage',
      firstSectionTitle: 'Intro',
    },
    {
      sectionName: 'Style',
      firstSectionTitle: 'Styles intro',
    },
    {
      sectionName: 'Accessibility',
      firstSectionTitle: 'Accessibility intro',
    },
    {
      sectionName: 'Code',
      firstSectionTitle: 'Code intro',
    },
  ];

  let currentTabName;
  let sectionDividerIndex = 0;

  otherSections.forEach((section) => {
    const sectionTitle = section.querySelector('h2');
    if (sectionTitle.textContent === sectionDividers[sectionDividerIndex].firstSectionTitle) {
      currentTabName = sectionDividers[sectionDividerIndex].sectionName;
      sectionDividerIndex += 1;
    }

    const sectionMetadata = section.querySelector('.section-metadata');
    const nameMetadata = div(div('name'), div(currentTabName));
    if (sectionMetadata) {
      sectionMetadata.append(nameMetadata);
    } else {
      section.append(div({ class: 'section-metadata' }, nameMetadata));
    }
  });

  const pageTabsBlock = buildBlock('page-tabs', [[]]);
  firstSection.append(pageTabsBlock);
}

decorate(document);
