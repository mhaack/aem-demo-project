import { div } from '../../scripts/dom-builder.js';
import { buildBlock } from '../../scripts/aem.js';

function setAnatomyRequirementStatus() {
  const requirements = document.querySelectorAll('.web-component ol:has(li > em + strong) em');
  requirements.forEach((requirement) => {
    const status = requirement.textContent.toLowerCase();
    requirement.setAttribute('data-requirement-status', status);
  });
}

function initDsTocBlock(main) {
  main.append(div(buildBlock('design-system-toc', '')));
}

async function decorate(doc) {
  const main = doc.querySelector('main');
  initDsTocBlock(main);
  setAnatomyRequirementStatus();
}

decorate(document);
