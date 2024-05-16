import { ul } from '../../scripts/dom-builder.js';
import {
  getMetadata, fetchPlaceholders, toCamelCase,
} from '../../scripts/aem.js';
import ffetch from '../../scripts/ffetch.js';
import PictureCard from '../../libs/pictureCard/pictureCard.js';
import {
  buildCardDisplayAuthor, fetchAuthorList, fetchTagList, formatDate,
  lookupAuthors,
} from '../../scripts/utils.js';

function getFilter(pageTags) {
  return (entry) => {
    if (entry.path === window.location.pathname) return false;
    const entryTags = JSON.parse(entry.tags);
    if (Array.isArray(entryTags) && entryTags.length > 0) {
      return pageTags.some((item) => entryTags.includes(item));
    }
    return false;
  };
}

function getPictureCard(article, placeholders, tags, author) {
  const {
    image, path, title, priority,
  } = article;
  const type = JSON.parse(article.tags).find((tag) => tag.trim().toLowerCase().startsWith('content-type'));
  const tagType = tags[toCamelCase(type)];
  const tagLabel = placeholders[toCamelCase(priority)] || '';
  const info = `Updated on ${formatDate(article.publicationDate * 1000)}`;

  return new PictureCard(
    title,
    path,
    tagType ? tagType.label : type,
    info,
    author,
    image,
    tagLabel,
  );
}

export default async function decorateBlock(block) {
  const pageTags = getMetadata('article:tag').split(', ');
  const filter = getFilter(pageTags);
  const limit = 4;
  const articles = await ffetch(`${window.hlx.codeBasePath}/articles-index.json`, 'sapContentHubArticles')
    .filter(filter)
    .limit(limit)
    .slice(0, limit - 1)
    .all();
  const placeholders = await fetchPlaceholders();
  const tags = await fetchTagList();
  const authorIndex = await fetchAuthorList();

  const cardList = ul();
  articles.forEach((article) => {
    const authors = lookupAuthors(article.author, authorIndex);
    const displayAuthor = buildCardDisplayAuthor(authors);
    const card = getPictureCard(
      article,
      placeholders,
      tags,
      displayAuthor,
    );
    cardList.append(card.render());
  });
  block.append(cardList);
}
