import {
  fetchPlaceholders, getMetadata, toCamelCase,
} from '../../scripts/aem.js';
import { ul } from '../../scripts/dom-builder.js';
import PictureCard from '../../libs/pictureCard/pictureCard.js';
import {
  formatDate,
  fetchPages,
  getConfig,
  getContentType,
  fetchTagList,
  buildCardDisplayProfile,
  getAuthorMetadata,
  lookupProfiles,
  isNewsPage,
  fetchProfiles, addColClasses, LIST_LAYOUT_CONFIG, LIST_LAYOUT_CONFIG_L2,
} from '../../scripts/utils.js';

/**
 * @param {string} publishedTime
 */
function isPriorityExpired(publishedTime) {
  try {
    const publishedDate = new Date(publishedTime);
    const maxDays = getConfig('article.priority.maxDays');
    const expirationDate = new Date(publishedDate.setDate(publishedDate.getDate() + +maxDays));

    return expirationDate < new Date();
  } catch (error) {
    return false;
  }
}

function getTagLabel(article, placeholders) {
  const publishedTime = getMetadata('published-time', article);

  if (isPriorityExpired(publishedTime)) {
    return '';
  }

  return placeholders[toCamelCase(getMetadata('priority', article))] || '';
}

function getPictureCard(article, placeholders, tags, author, eager) {
  const tagLabel = getTagLabel(article, placeholders);
  const url = getMetadata('card-url', article) || new URL(getMetadata('og:url', article)).pathname;
  const infoUpdatedLabel = isNewsPage() ? 'Published on' : (placeholders.updatedOn || 'Updated on');
  const info = getMetadata('card-c2a', article) || `${infoUpdatedLabel} ${formatDate(getMetadata('published-time', article))}`;

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
      cardList.append(card.render(horizontal || articles.length === 1));
    });
    if (getMetadata('template') === 'hub-l2') {
      addColClasses(cardList, cardList, LIST_LAYOUT_CONFIG_L2);
    } else {
      addColClasses(cardList, cardList, LIST_LAYOUT_CONFIG);
    }
    block.append(cardList);
  }
  block.querySelector('div').remove();
}
