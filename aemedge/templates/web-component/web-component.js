import { div, nav } from '../../scripts/dom-builder.js';
import { buildBlock } from '../../scripts/aem.js';

function setAnatomyRequirementStatus() {
  const requirements = document.querySelectorAll('.web-component ol:has(li > em + strong) em');
  requirements.forEach((requirement) => {
    const status = requirement.textContent.toLowerCase();
    requirement.setAttribute('data-requirement-status', status);
  });
}

/**
 * Mark the last section in each category with a data-position attribute.
 * This is used to style the last section differently.
 */
function markFirstAndLastInSectionCategory() {
  const namedSections = Array.from(document.querySelectorAll('div.section[data-name]'));
  const sectionsByName = new Map();

  // Group the sections by their data-name attribute
  namedSections.forEach((section) => {
    const name = section.getAttribute('data-name');
    if (!sectionsByName.has(name)) {
      sectionsByName.set(name, []);
    }
    sectionsByName.get(name).push(section);
  });

  // Mark the first and last section in each category
  sectionsByName.forEach((sections) => {
    if (sections.length > 0) {
      const firstSection = sections[0];
      firstSection.setAttribute('data-position', 'first');
      const lastSection = sections[sections.length - 1];
      lastSection.setAttribute('data-position', 'last');
    }
  });
}

async function decorate(doc) {
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

  main.append(div(buildBlock('design-system-toc', '')));

  setAnatomyRequirementStatus();

  markFirstAndLastInSectionCategory();
}

decorate(document);
