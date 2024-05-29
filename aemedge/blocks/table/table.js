import {
  thead, tbody, table, tr,
} from '../../scripts/dom-builder.js';
import { isDesignSystemSite } from '../../scripts/scripts.js';
import { decorateSpans } from '../../scripts/ds-scripts.js';

function buildCell(rowIndex) {
  const cell = rowIndex ? document.createElement('td') : document.createElement('th');
  if (!rowIndex) cell.setAttribute('scope', 'col');
  return cell;
}

export default async function decorate(block) {
  const tableEl = table();
  const theadEl = thead();
  const tbodyEl = tbody();

  const header = !block.classList.contains('no-header');
  if (header) {
    tableEl.append(theadEl);
  }
  tableEl.append(tbodyEl);

  [...block.children].forEach((child, i) => {
    const trEl = tr();
    if (header && i === 0) theadEl.append(trEl);
    else tbodyEl.append(trEl);
    [...child.children].forEach((col) => {
      const cell = buildCell(header ? i : i + 1);
      cell.innerHTML = col.innerHTML;
      trEl.append(cell);
    });
  });

  if (isDesignSystemSite()) {
    if (header) {
      let hasStatusArray = [false, -1];
      tableEl.querySelectorAll('th').forEach((th, i) => {
        if (th.textContent.toLowerCase().trim() === 'status') {
          hasStatusArray = [true, i];
        }
      });

      if (hasStatusArray[0]) {
        tableEl.querySelectorAll('tr').forEach((trow, i) => {
          if (i === 0) return;
          const td = trow.querySelectorAll('td')[hasStatusArray[1]];
          if (td.textContent.toLowerCase().trim() === 'new') {
            td.children[0].classList.add('badge-info');
          }
        });
      }
    }

    decorateSpans(tableEl);
  }

  block.innerHTML = '';
  block.append(tableEl);
}
