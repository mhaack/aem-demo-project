/* eslint-disable no-param-reassign */
import {
  getMetadata, fetchPlaceholders, readBlockConfig, toCamelCase,
} from '../../scripts/aem.js';
import { ul } from '../../scripts/dom-builder.js';
import {
  fetchTagList,
  toTitleCase,
  formatDate,
  getParameterMap,
  buildCardDisplayAuthor,
  fetchAuthorList,
  lookupAuthors,
  getContentTypeFromArticle,
} from '../../scripts/utils.js';
import ffetch from '../../scripts/ffetch.js';
import Filters from '../../libs/filters/filters.js';
import PictureCard from '../../libs/pictureCard/pictureCard.js';
import Pages from '../../libs/pages/pages.js';

function getPictureCard(article, placeholders, tags, author) {
  try {
    const contentType = tags[toCamelCase(getContentTypeFromArticle(article))];
    const {
      image, path, title, priority, cardUrl,
    } = article;
    const tagLabel = placeholders[toCamelCase(priority)] || '';
    const link = cardUrl !== '0' ? cardUrl : path;
    let info = `Updated on ${formatDate(article.publicationDate * 1000)}`;
    if (article.cardC2A && article.cardC2A !== '' && article.cardC2A !== '0') {
      info = article.cardC2A;
    }
    return new PictureCard(title, link, contentType.label, info, author, image, tagLabel);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error creating card', error);
    return null;
  }
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

function getTagFilter(entry, params) {
  const nonFilterParams = ['page', 'sort', 'order', 'limit', 'month-year'];
  let filterTags = [];
  params.forEach((value, key) => {
    if (!nonFilterParams.includes(key)) {
      filterTags.push(value);
    }
  });
  filterTags = filterTags.flat();
  return filterTags.every((item) => JSON.parse(entry.tags).includes(item));
}

function getDateFilter(entry, params) {
  const dateRange = params.get('month-year');
  if (!dateRange) return true;
  const publicationDate = new Date(entry.publicationDate * 1000);
  const dateString = `${publicationDate.getUTCFullYear()}/${(publicationDate.getUTCMonth() + 1).toString().padStart(2, '0')}`;
  return dateRange.find((date) => date === dateString);
}

function getFilter(tags, params) {
  if (params.size === 0) return (entry) => getPathFilter(entry, tags);
  return (entry) => getDateFilter(entry, params) && getTagFilter(entry, params);
}

async function getArticles(tags, startPage = 1, batchSize = 6) {
  const params = getParameterMap();
  const filter = getFilter(tags, params);
  return ffetch(`${window.hlx.codeBasePath}/articles-index.json`, 'sapContentHubArticles')
    .filter(filter)
    .paginate(batchSize, startPage);
}

function renderCards(articles, placeholders, tags, authorIndex) {
  const cardList = ul({ class: 'card-items' });
  articles.forEach((article) => {
    const authors = lookupAuthors(article.author, authorIndex);
    const displayAuthor = buildCardDisplayAuthor(authors);
    const card = getPictureCard(article, placeholders, tags, displayAuthor);
    if (card) cardList.append(card.render());
  });
  return cardList;
}

function registerHandler(block, tags, filters, pages, placeholders, articleStream, authorIndex) {
  ['sap:itemSelect', 'sap:itemClose'].forEach((e) => {
    window.addEventListener(e, async () => {
      articleStream = await getArticles(tags);
      articleStream.next().then((cursor) => {
        block.querySelector('.card-items').remove();
        const cards = renderCards(cursor.value.results, placeholders, tags, authorIndex);
        filters.updateResults(cursor.value.total);
        block.append(cards);
        pages.updatePages(cursor.value.pages, 1);
      });
    });
  });
  window.addEventListener('sap:pageChange', (e) => {
    articleStream.next({ direction: e.detail.direction }).then((cursor) => {
      block.querySelector('.card-items')?.remove();
      const cards = renderCards(cursor.value.results, placeholders, tags, authorIndex);
      block.append(cards);
      pages.updatePages(cursor.value.pages);
    });
  });
}

function getMonthRange(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const months = [];
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  while (start <= end) {
    const month = monthNames[start.getUTCMonth()];
    months.push({
      label: `${month} ${start.getUTCFullYear()}`,
      value: `${start.getUTCFullYear()}/${(start.getUTCMonth() + 1).toString().padStart(2, '0')}`,
    });
    start.setUTCMonth(start.getUTCMonth() + 1);
  }

  return months.reverse();
}

export default async function decorateBlock(block) {
  const tags = await fetchTagList();
  const filterList = Object.entries(readBlockConfig(block)).map(([key, value]) => {
    if (key === 'date-range') {
      const dates = value.split('to');
      return { name: 'Month/Year', items: getMonthRange(dates[0].trim(), dates[1].trim()) };
    }
    const items = value
      .split(',')
      .flatMap((item) => {
        if (item.endsWith('/*')) {
          const prefix = toCamelCase(item);
          const filteredEntries = Object.entries(tags)
            .filter(([tagKey]) => tagKey.startsWith(prefix))
            .reduce(
              // eslint-disable-next-line no-unused-vars
              (acc, [tagKey, tagValue]) => [...acc, { label: tagValue.label, value: tagValue.key }],
              [],
            );
          return filteredEntries;
        }
        const tag = tags[toCamelCase(item.trim())];
        return tag ? { label: tag.label, value: tag.key } : null;
      })
      .filter((item) => item !== null);
    return { name: toTitleCase(key), items };
  });
  block.textContent = '';
  const filters = new Filters(filterList);
  block.append(filters.render());
  const placeholders = await fetchPlaceholders();
  const authorIndex = await fetchAuthorList();
  const urlParams = new URLSearchParams(window.location.search);
  const page = +urlParams.get('page') || 1;
  const articleStream = await getArticles(tags, page);
  const cursor = await articleStream.next();
  const cardList = renderCards(cursor.value.results, placeholders, tags, authorIndex);
  filters.updateResults(cursor.value.total);
  block.append(cardList);
  const pages = new Pages(block, cursor.value.pages, page);
  pages.render();
  registerHandler(block, tags, filters, pages, placeholders, articleStream, authorIndex);
}
