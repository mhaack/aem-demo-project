/*
 * Accordion Block
 * Recreate an accordion
 * https://www.hlx.live/developer/block-collection/accordion
 */

import { domEl, p, span } from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';

function hasWrapper(el) {
  return !!el.firstElementChild && window.getComputedStyle(el.firstElementChild).display === 'block';
}

export default function decorate(block) {
  [...block.children].forEach((row) => {
    // decorate accordion item label
    const label = row.children[0];
    const summaryArrow = span({ class: 'icon icon-slim-arrow-right accordion-arrow' });
    const summaryContents = [summaryArrow, ...label.childNodes];
    const summary = domEl(
      'summary',
      { class: 'accordion-item-label' },
      ...(!hasWrapper(label) ? [p(...summaryContents)] : summaryContents),
    );

    // decorate accordion item body
    const body = !hasWrapper(row.children[1]) ? p(row.children[1]) : row.children[1];
    body.className = 'accordion-item-body';

    // decorate accordion item
    const details = domEl(
      'details',
      { class: 'accordion-item' },
      summary,
      body,
    );
    row.replaceWith(details);
  });

  // Accordion bulk-toggle functionality
  const hasExpandAll = block.classList.contains('expand-all');
  if (hasExpandAll) {
    const expandAll = p({ class: 'expand' }, 'Expand all');
    block.parentElement.prepend(expandAll);

    expandAll.addEventListener('click', () => {
      const isExpanded = expandAll.textContent === 'Collapse all';
      expandAll.textContent = isExpanded ? 'Expand all' : 'Collapse all';
      block.querySelectorAll('details').forEach((details) => {
        details.open = !isExpanded;
      });
    });
  }

  decorateIcons(block);
}
