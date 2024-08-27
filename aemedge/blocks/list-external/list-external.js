import { span } from '../../scripts/dom-builder.js';
import { readBlockConfig } from '../../scripts/aem.js';
import ffetch from '../../scripts/ffetch.js';
import Card from '../../libs/card/card.js';
import Pages from '../../libs/pages/pages.js';

function getBlockId() {
  window.sapListExternalCount = window.sapListExternalCount ? window.sapListExternalCount + 1 : 1;
  return `le-${window.sapListExternalCount}`;
}

/**
 * @param link {Element} The link element
 */
function moveLinkTextNodeToSpan(link) {
  Array.from(link.childNodes).forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
      const spanElement = span();
      const textNode = node.cloneNode(true);
      spanElement.appendChild(textNode);
      link.replaceChild(spanElement, node);
    }
  });
}

function decorateStatic(block) {
  [...block.children].forEach((entry) => {
    const link = entry.querySelector('div a.button');
    if (link) {
      moveLinkTextNodeToSpan(link);
    }
  });
}

function registerHandler(stream, block, pages) {
  block.addEventListener('sap:pageChange', (e) => {
    stream.next({ direction: e.detail.direction }).then((cursor) => {
      block.querySelectorAll('.card').forEach((card) => card.remove());
      cursor.value.results.forEach((entry) => {
        const card = new Card(entry.Title, entry.URL, `Read Media on ${entry.Source}`, entry.Date);
        block.append(card.renderExternalCard());
      });
      pages.updatePages(cursor.value.pages);
    });
  });
}

export default async function decorate(block) {
  const id = getBlockId();
  const isDynamic = block.classList.contains('dynamic');
  if (!isDynamic) {
    decorateStatic(block);
    return;
  }
  const config = readBlockConfig(block);
  block.textContent = '';
  const urlParams = new URLSearchParams(window.location.search);
  const page = +urlParams.get(`${id}-page`) || 1;
  const stream = await ffetch(config.source, 'sapContentHubArticles')
    .filter((entry) => entry.Title && entry.URL && entry.Source)
    .paginate(config.limit || 6, page);
  stream.next().then((cursor) => {
    cursor.value.results.forEach((entry) => {
      const linkTitle = entry.Source
        ? `${config['reading-label']} ${entry.Source}`
        : config['reading-label'];
      const card = new Card(entry.Title, entry.URL, linkTitle, entry.Date);
      block.append(card.renderExternalCard());
    });
    if (cursor.value.pages > 1) {
      const pages = new Pages(block, cursor.value.pages, page, id, true);
      pages.render();
      registerHandler(stream, block, pages);
    }
  });
}
