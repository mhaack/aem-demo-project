import {
  fetchPlaceholders, getMetadata, loadCSS, toCamelCase,
} from '../../scripts/aem.js';
import { ul } from '../../scripts/dom-builder.js';
import PictureCard from '../../libs/pictureCard/pictureCard.js';
import {
  formatDate,
  fetchPages,
  getContentType,
  fetchTagList,
  fetchAuthors,
  buildCardDisplayAuthor,
  getAuthorMetadata,
} from '../../scripts/utils.js';

function getPictureCard(article, placeholders, tags, author, eager) {
  const tagLabel = placeholders[toCamelCase(getMetadata('priority', article))] || '';
  const path = new URL(getMetadata('og:url', article));
  const info = `Updated on ${formatDate(getMetadata('published-time', article))}`;
  const contentType = tags[toCamelCase(getContentType(article))];

  return new PictureCard(
    getMetadata('og:title', article),
    path.pathname,
    contentType.label,
    info,
    author,
    getMetadata('og:image', article),
    tagLabel,
    getMetadata('og:description', article),
    eager,
  );
}

export default async function decorateBlock(block) {
  loadCSS(`${window.hlx.codeBasePath}/libs/pictureCard/pictureCard.css`);
  const horizontal = block.classList.contains('horizontal');
  const links = Array.from(block.querySelectorAll('a')).map((link) => new URL(link.href).pathname);
  if (links.length > 0) {
    const articles = await fetchPages(links);
    articles.sort(
      (a, b) => new Date(getMetadata('published-time', b)) - new Date(getMetadata('published-time', a)),
    );
    const placeholders = await fetchPlaceholders();
    const tags = await fetchTagList();
    const cardList = ul();

    // eslint-disable-next-line no-restricted-syntax
    for (const article of articles) {
      // eslint-disable-next-line no-await-in-loop
      const authors = await fetchAuthors(getAuthorMetadata(article));
      const displayAuthor = buildCardDisplayAuthor(authors);
      const card = getPictureCard(
        article,
        placeholders,
        tags,
        displayAuthor,
        article === articles[0],
      );
      cardList.append(card.render(horizontal, true));
    }
    block.append(cardList);
  }
  block.querySelector('div').remove();
}
