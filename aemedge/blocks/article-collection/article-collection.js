import { p } from '../../scripts/dom-builder.js';

function getType(text) {
  return text?.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function decorate(block) {
  [...block.children].forEach((row) => {
    const eyebrow = row.querySelector('div > div > h6');
    if (eyebrow) {
      eyebrow.parentElement.replaceChild(p({ class: 'eyebrow' }, getType(eyebrow?.textContent)), eyebrow);
    }
  });
}
