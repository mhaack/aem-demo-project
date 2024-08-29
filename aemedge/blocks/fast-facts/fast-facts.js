import {
  div, li, span, ul,
} from '../../scripts/dom-builder.js';

export default async function decorateBlock(block) {
  const oddCount = block.childElementCount % 2 !== 0;
  const factsList = ul({ class: `fast-facts__items ${oddCount ? 'odd-count' : 'even-count'}` });
  [...block.children].forEach((row) => {
    const eyebrow = row.querySelector('h6')?.textContent || '';
    const factMain = row.querySelector('h4')?.textContent || '';
    const factUnit = row.querySelector('h4 + h5')?.textContent || '';
    const headline = row.querySelector('strong')?.textContent || '';
    const text = row.querySelector('p:not(:has(strong)):not(.button-container)')?.textContent || '';
    const link = row.querySelector('.button-container') || '';
    if (link) {
      link.classList.add('fast-facts__item__link');
    }

    const hasDetails = headline || text || eyebrow;

    const liEl = li(
      { class: 'fast-facts__item' },
      factMain ? div(
        { class: 'fast-facts__item__fact' },
        span({ class: 'fast-facts__item__fact-main' }, factMain),
        span({ class: 'fast-facts__item__fact-unit' }, factUnit),
      ) : '',
      hasDetails ? div(
        { class: 'fast-facts__item__details' },
        eyebrow ? div({ class: 'fast-facts__item__eyebrow' }, eyebrow) : '',
        headline ? div({ class: 'fast-facts__item__headline' }, headline) : '',
        text ? div({ class: 'fast-facts__item__text' }, text) : '',
      ) : '',
      link,
    )
    moveInstrumentation(row, liEl);
    row.remove();
    factsList.append(liEl);
  });
  block.append(factsList);
}
