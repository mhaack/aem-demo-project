import {
  fetchPlaceholders, getMetadata, toCamelCase,
} from '../../scripts/aem.js';
import { ul } from '../../scripts/dom-builder.js';
import PictureCard from '../../libs/pictureCard/pictureCard.js';
import {
  formatDate,
  fetchPages,
  getContentType,
  fetchTagList,
  buildCardDisplayProfile,
  getAuthorMetadata,
  lookupProfiles,
  fetchProfiles,
} from '../../scripts/utils.js';

function getPictureCard(article, placeholders, tags, author, eager) {
  const tagLabel = placeholders[toCamelCase(getMetadata('priority', article))] || '';
  const url = getMetadata('card-url', article) || new URL(getMetadata('og:url', article)).pathname;
  const info = getMetadata('card-c2a', article) || `Updated on ${formatDate(getMetadata('published-time', article))}`;

  const contentType = tags[toCamelCase(getContentType(article))];

  return new PictureCard(
    getMetadata('og:title', article),
    url,
    contentType?.label || '',
    info,
    author,
    getMetadata('og:image', article),
    tagLabel,
    getMetadata('og:description', article),
    eager,
  );
}

export default async function decorateBlock(block) {
  const horizontal = block.classList.contains('horizontal');
  const links = Array.from(block.querySelectorAll('a')).map((link) => new URL(link.href).pathname);
  if (links.length > 0) {
    const articles = await fetchPages(links);
    articles.sort(
      (a, b) => new Date(getMetadata('published-time', b)) - new Date(getMetadata('published-time', a)),
    );
    const placeholders = await fetchPlaceholders();
    const tags = await fetchTagList();
    const authorIndex = await fetchProfiles();

    const cardList = ul();
    articles.forEach(async (article) => {
      const authors = lookupProfiles(getAuthorMetadata(article), authorIndex);
      const displayAuthor = buildCardDisplayProfile(authors);
      const card = getPictureCard(
        article,
        placeholders,
        tags,
        displayAuthor,
        article === articles[0],
      );
      cardList.append(card.render(horizontal));
    });
    block.append(cardList);
  }
  block.querySelector('div').remove();
}
