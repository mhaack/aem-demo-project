/* eslint-disable no-param-reassign */
import {
  getMetadata, fetchPlaceholders, readBlockConfig, toCamelCase,
} from '../../scripts/aem.js';
import { ul } from '../../scripts/dom-builder.js';
import {
  extractFieldValue,
  fetchTagList,
  toTitleCase,
  formatDate,
  getParameterMap,
} from '../../scripts/utils.js';
import ffetch from '../../scripts/ffetch.js';
import Filters from '../../libs/filters/filters.js';
import PictureCard from '../../libs/pictureCard/pictureCard.js';
import Pages from '../../libs/pages/pages.js';

function getPictureCard(article, placeholders) {
  const type = extractFieldValue(article, 'tags', 'content-type');
  const {
    image, path, title, priority,
  } = article;
  const tagLabel = placeholders[toCamelCase(priority)] || '';
  const info = `Updated on ${formatDate(article.publicationDate * 1000)}`;
  return new PictureCard(title, path, type, info, null, image, tagLabel);
}

function getPathFilter(entry, tags) {
  const location = window.location.pathname;
  if (location.startsWith('/author/') > 0) {
    return entry.author === getMetadata('author');
  }
  // check if location match is valid tag /topics/.* or /news/.*
  if (location.match(/\/topics\/.*|\/news\/.*/) && tags) {
    let matchedTag;
    Object.keys(tags).forEach((tag) => {
      const tagData = tags[tag];
      if (location.includes(tagData['topic-path']) || location.includes(tagData['news-path'])) {
        matchedTag = tagData;
      }
    });

    return entry.tags.includes(matchedTag.key);
  }
  return true;
}

function getTagFilter(entry, filterTags) {
  return filterTags.every((item) => JSON.parse(entry.tags).includes(item));
}

function getFilter(tags, filterTags) {
  if (filterTags.length > 0) {
    return (entry) => getTagFilter(entry, filterTags);
  }
  return (entry) => getPathFilter(entry, tags);
}

async function getArticles(tags, startPage = 1, batchSize = 6) {
  const nonFilterParams = ['page', 'sort', 'order', 'limit'];
  const filterTags = [];
  getParameterMap().forEach((value, key) => {
    if (!nonFilterParams.includes(key)) {
      filterTags.push(value);
    }
  });
  const filter = getFilter(tags, filterTags.flat());
  return ffetch(`${window.hlx.codeBasePath}/articles-index.json`, 'sapContentHubArticles')
    .filter(filter)
    .paginate(batchSize, startPage);
}

function renderCards(articles, placeholders) {
  const cardList = ul({ class: 'card-items' });
  articles.forEach((article) => {
    const card = getPictureCard(article, placeholders);
    cardList.append(card.render());
  });
  return cardList;
}

function registerHandler(block, tags, filters, pages, placeholders, articleStream) {
  ['sap:itemSelect', 'sap:itemClose'].forEach((e) => {
    window.addEventListener(e, async () => {
      articleStream = await getArticles(tags);
      articleStream.next().then((cursor) => {
        block.querySelector('.card-items').remove();
        const cards = renderCards(cursor.value.results, placeholders);
        filters.updateResults(cursor.value.total);
        block.append(cards);
        pages.updatePages(cursor.value.pages, 1);
      });
    });
  });
  window.addEventListener('sap:pageChange', (e) => {
    articleStream.next({ direction: e.detail.direction }).then((cursor) => {
      block.querySelector('.card-items').remove();
      const cards = renderCards(cursor.value.results, placeholders);
      block.append(cards);
      pages.updatePages(cursor.value.pages);
    });
  });
}

export default async function decorateBlock(block) {
  const tags = await fetchTagList();
  const filterList = Object.entries(readBlockConfig(block)).map(([key, value]) => {
    const items = value.split(',').map((item) => {
      const tag = tags[toCamelCase(item.trim())];
      return { label: tag.label, value: tag.key };
    });
    return { name: toTitleCase(key), items };
  });
  block.textContent = '';
  const filters = new Filters(filterList);
  block.append(filters.render());
  const placeholders = await fetchPlaceholders();
  const urlParams = new URLSearchParams(window.location.search);
  const page = +urlParams.get('page') || 1;
  const articleStream = await getArticles(tags, page);
  const cursor = await articleStream.next();
  const cardList = renderCards(cursor.value.results, placeholders);
  filters.updateResults(cursor.value.total);
  block.append(cardList);
  const pages = new Pages(block, cursor.value.pages, page);
  pages.render();
  registerHandler(block, tags, filters, pages, placeholders, articleStream);
}
