import {
  fetchPlaceholders,
  getMetadata,
  toCamelCase,
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
  fetchProfiles,
  applyLayout,
} from '../../scripts/utils.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

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
  const url = getMetadata('card-url', article) || (getMetadata('og:url', article).startsWith('https://') ? new URL(getMetadata('og:url', article)).pathname : getMetadata('og:url', article));
  const infoUpdatedLabel = isNewsPage() ? 'Published on' : (placeholders.updatedOn || 'Updated on');
  const info = getMetadata('card-c2a', article) || `${infoUpdatedLabel} ${formatDate(getMetadata('published-time', article))}`;

  const contentType = tags[toCamelCase(getContentType(article))];

  /**
   * If the article is a Document and has a hero block with a custom description,
   * use that as the description.
   * Otherwise, use the `og:description` metadata.
   */
  let description = getMetadata('og:description', article);
  if (article instanceof Document) {
    const heroDescription = article.querySelector('main div.hero h1 + p');
    if (heroDescription) {
      description = heroDescription.textContent;
    }
  }

  return new PictureCard(
    getMetadata('og:title', article),
    url,
    contentType?.label || '',
    info,
    author,
    getMetadata('og:image', article),
    tagLabel,
    description,
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

    // eslint-disable-next-line no-inner-declarations
    async function getArticle(article) {
      const authors = lookupProfiles(getAuthorMetadata(article), authorIndex);
      const displayAuthor = buildCardDisplayProfile(authors);
      const card = getPictureCard(
        article,
        placeholders,
        tags,
        displayAuthor,
        article === articles[0],
      );

      const cardEL = card.render(horizontal || articles.length === 1);
      cardEL.setAttribute('data-aue-model', 'card');
      cardEL.setAttribute('data-aue-label', 'Card');
      cardEL.setAttribute('data-aue-type', 'component');
      cardList.append(cardEL);
    }

    articles.forEach(getArticle);

    applyLayout(cardList, cardList);
    block.innerHTML = '';
    block.append(cardList);
  }
}
