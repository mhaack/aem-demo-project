const articleTable = (main, document) => {
  // insights
  // sample: https://www.sap.com/insights/research/capacity-capture-a-new-approach-to-discovering-business-value.html#categories-of-capacity-capture-in-action
  main.querySelectorAll('div[data-component-name="Table"]').forEach((tableWrapper) => {
    const table = tableWrapper.querySelector('table');

    // get number of columns
    const numCols = table.rows[0]
      ? [...table.rows[0].cells].reduce((cols, cell) => cols + cell.colSpan, 0)
      : 0;

    // fix thead vs tbody
    if (table.tHead) {
      table.tHead.className = '';
      table.tHead.style = undefined;
    }

    // create block table head row
    const tr = table.insertRow(0);
    const th = document.createElement('th');
    th.textContent = 'Table';
    th.setAttribute('colspan', numCols);
    tr.append(th);
    tableWrapper.replaceWith(table);
  });
};

export default articleTable;
