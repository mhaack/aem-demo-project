import { addColClasses, LIST_LAYOUT_CONFIG } from '../../scripts/utils.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'review-cards-card';
    while (row.firstElementChild) cardDiv.append(row.firstElementChild);
    [...cardDiv.children].forEach((childDiv) => {
      childDiv.className = 'review-cards-card-body';
    });
    const li = document.createElement('li');
    li.append(cardDiv);
    ul.append(li);
  });
  addColClasses(block, ul, LIST_LAYOUT_CONFIG);

  block.append(ul);
}
