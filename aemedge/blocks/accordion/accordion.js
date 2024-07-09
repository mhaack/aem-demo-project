/*
 * Accordion Block
 * Recreate an accordion
 * https://www.hlx.live/developer/block-collection/accordion
 */

import {
  domEl, p, span, div,
} from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';
import Button from '../../libs/button/button.js';

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
  function getPreviousElementSibling(previousElement, selector) {
    return previousElement && previousElement.classList.contains(selector)
      ? previousElement
      : null;
  }
  // Create Accordion Header
  const accordionHeaderContainer = getPreviousElementSibling(block.parentElement.previousElementSibling, 'default-content-wrapper');

  const headerDiv = div({ class: 'accordion-header' });
  const headerEl = accordionHeaderContainer?.querySelector('h2:last-child, h3:last-child');
  if (headerEl) {
    headerEl.classList.add('header-text');
    headerDiv.append(headerEl);
    if (accordionHeaderContainer.children.length === 0) {
      accordionHeaderContainer.remove();
    }
  }

  // Accordion bulk-toggle functionality
  const hasExpandAll = block.classList.contains('expand-all');
  if (hasExpandAll) {
    const expandAll = new Button('Expand All', null, 'tertiary', 'large').render();
    headerDiv.append(expandAll);

    expandAll.addEventListener('click', () => {
      const isExpanded = expandAll.querySelector('span').textContent === 'Collapse All';
      expandAll.querySelector('span').textContent = isExpanded ? 'Expand All' : 'Collapse All';
      block.querySelectorAll('details').forEach((details) => {
        details.open = !isExpanded;
      });
    });
  }
  block.prepend(headerDiv);

  decorateIcons(block);
}
