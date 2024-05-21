import { div, nav } from '../../scripts/dom-builder.js';
import { buildBlock } from '../../scripts/aem.js';

function setAnatomyRequirementStatus() {
  const requirements = document.querySelectorAll('.web-component ol:has(li > em + strong) em');
  requirements.forEach((requirement) => {
    const status = requirement.textContent.toLowerCase();
    requirement.setAttribute('data-requirement-status', status);
  });
}

async function decorate(doc) {
  const main = doc.querySelector('main');
  const mainNavContainer = nav();
  main.parentNode.insertBefore(mainNavContainer, main);

  main.append(div(buildBlock('design-system-toc', '')));

  setAnatomyRequirementStatus();
}

decorate(document);
