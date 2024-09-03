import { ul } from '../../scripts/dom-builder.js';
import {
  getMetadata, fetchPlaceholders, toCamelCase,
} from '../../scripts/aem.js';
import ffetch from '../../scripts/ffetch.js';
import PictureCard from '../../libs/pictureCard/pictureCard.js';
import {
  buildCardDisplayProfile, fetchProfiles, fetchTagList, formatDate,
  getConfig,
  getContentType,
  lookupProfiles,
  isNewsPage,
} from '../../scripts/utils.js';

function getPreFilter(filterConfig) {
  // first check by content type tag
  const contentType = getContentType();
  if (contentType && filterConfig.contentTypes && filterConfig.contentTypes[contentType]) {
    const contentTypeFilters = filterConfig.contentTypes[contentType]?.split(',').map((item) => item.trim());
    return (entry) => {
      const entryTags = entry.tags;
      if (Array.isArray(entryTags) && entryTags.length > 0) {
        return contentTypeFilters.some((item) => entryTags.includes(item));
      }
      return false;
    };
  }

  // second check by paths segment
  if (filterConfig.paths) {
    const pathSegment = window.location.pathname.split('/').filter((item) => item !== '')[0];
    if (filterConfig.paths[pathSegment]) {
      const contentTypeFilters = filterConfig.paths[pathSegment].split(',').map((item) => item.trim());
      return (entry) => {
        const entryTags = entry.tags;
        if (Array.isArray(entryTags) && entryTags.length > 0) {
          return contentTypeFilters.some((item) => entryTags.includes(item));
        }
        return false;
      };
    }
  }

  // use default filters
  if (filterConfig.default) {
    const contentTypeFilters = filterConfig.default.split(',').map((item) => item.trim());
    return (entry) => {
      const entryTags = entry.tags;
      if (Array.isArray(entryTags) && entryTags.length > 0) {
        return contentTypeFilters.some((item) => entryTags.includes(item));
      }
      return false;
    };
  }
  return false;
}

function getFilter(pageTags) {
  return (entry) => {
    if (entry.path === window.location.pathname) return false;
    const entryTags = entry.tags;
    if (Array.isArray(entryTags) && entryTags.length > 0) {
      return pageTags.some((item) => entryTags.includes(item));
    }
    return false;
  };
}

function getPictureCard(article, placeholders, tags, author) {
  const {
    image, path, title, priority, cardUrl,
  } = article;
  const type = article.tags.find((tag) => tag.trim().toLowerCase().startsWith('content-type'));
  const tagType = tags[toCamelCase(type)];
  const tagLabel = placeholders[toCamelCase(priority)] || '';
  const link = cardUrl !== '' ? cardUrl : path;
  const infoUpdatedLabel = isNewsPage() ? 'Published on' : (placeholders.updatedOn || 'Updated on');
  let info = `${infoUpdatedLabel} ${formatDate(article.publicationDate * 1000)}`;
  if (article.cardC2A && article.cardC2A !== '' && article.cardC2A !== '0') {
    info = article.cardC2A;
  }

  return new PictureCard(
    title,
    link,
    tagType ? tagType.label : type,
    info,
    author,
    image,
    tagLabel,
  );
}

export default async function decorateBlock(block) {
  const pageTags = getMetadata('article:tag').split(', ');
  const filterConfig = getConfig('filter.l3.related') ? JSON.parse(getConfig('filter.l3.related')) : {};
  const preFilter = getPreFilter(filterConfig);
  const filter = getFilter(pageTags);
  const limit = 4;
  const articles = await ffetch(`${window.hlx.codeBasePath}/articles-index.json`, 'sapContentHubArticles')
    .filter(preFilter)
    .filter((entry) => entry.path !== window.location.pathname)
    .filter(filter)
    .limit(limit)
    .slice(0, limit - 1)
    .all();
  const placeholders = await fetchPlaceholders();
  const tags = await fetchTagList();
  const authorIndex = await fetchProfiles();

  const cardList = ul();
  articles.forEach((article) => {
    const authors = lookupProfiles(article.author, authorIndex);
    const displayAuthor = buildCardDisplayProfile(authors);
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
