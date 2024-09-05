/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import {
  fetchPlaceholders,
  getMetadata,
  readBlockConfig,
  toCamelCase,
  toClassName,
} from '../../scripts/aem.js';
import { ul } from '../../scripts/dom-builder.js';
import {
  addColClasses,
  isNewsPage,
  buildCardDisplayProfile,
  fetchAuthors,
  fetchTagList,
  formatDate,
  getContentTypeFromArticle,
  getParameterMap,
  LIST_LAYOUT_CONFIG,
  LIST_LAYOUT_CONFIG_L2,
  lookupProfiles,
  toTitleCase,
  getPathFromUrl,
  applyLayout,
} from '../../scripts/utils.js';
import ffetch from '../../scripts/ffetch.js';
import Filters, { defaultSort } from '../../libs/filters/filters.js';
import Card from '../../libs/card/card.js';
import PictureCard from '../../libs/pictureCard/pictureCard.js';
import Pages from '../../libs/pages/pages.js';
import Button from '../../libs/button/button.js';
import Carousel from '../../libs/carousel/carousel.js';

function getReadingTime(article) {
  const readingTime = article?.readingTime || '';
  return readingTime !== '0' ? readingTime : '';
}

function getInfo(article, author, infoType, placeholders) {
  if (article.cardC2A && article.cardC2A !== '' && article.cardC2A !== '0') {
    return article.cardC2A;
  }
  if (infoType[0] === 'publicationDate' || infoType[0] === 'authorAndPublicationDate') {
    const infoUpdatedLabel = placeholders.publishedOn || 'Published on';
    return `${infoUpdatedLabel} ${formatDate(article.publicationDate * 1000)}`;
  }
  if (infoType[0] === 'author') {
    return author?.title || '';
  }
  if (infoType[0] === 'readingTime' || infoType[0] === 'authorAndReadingTime') {
    return getReadingTime(article);
  }

  if (isNewsPage(article.path)) {
    return `${placeholders.publishedOn || 'Published on'} ${formatDate(article.publicationDate * 1000)}`;
  }
  return `${placeholders.updatedOn || 'Updated on'} ${formatDate(article.lastModified * 1000)}`;
}

function getPictureCard(article, config, placeholders, tags, author) {
  try {
    const contentType = tags[toCamelCase(getContentTypeFromArticle(article))];
    const {
      image, path, title, priority, cardUrl,
    } = article;
    const tagLabel = placeholders[toCamelCase(priority)] || '';
    const link = cardUrl !== '' ? cardUrl : path;
    const infoType = config.info || 'authorAndUpdated';
    let info = getInfo(article, author, infoType, placeholders);
    if (article.cardC2A && article.cardC2A !== '' && article.cardC2A !== '0') {
      info = article.cardC2A;
    }
    // author details shouldnt be shown in those cases
    if (infoType[0] === 'readingTime' || infoType[0] === 'publicationDate' || infoType[0] === 'updated') {
      author = '';
    }
    return new PictureCard(title, link, contentType?.label || '', info, author, image, tagLabel);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error creating card', error);
    return null;
  }
}

function getCard(article, tags, placeholders) {
  const contentType = tags[toCamelCase(getContentTypeFromArticle(article))];
  const { path, title } = article;
  let info = `${placeholders.updatedOn || 'Updated on'} ${formatDate(article.lastModified * 1000)}`;
  if (isNewsPage(article.path)) {
    info = `${placeholders.publishedOn || 'Published on'} ${formatDate(article.publicationDate * 1000)}`;
  }
  if (article.cardC2A && article.cardC2A !== '' && article.cardC2A !== '0') {
    info = article.cardC2A;
  }
  return new Card(title, path, contentType?.label || '', info);
}

function matchTags(entry, config) {
  if (!config.tags) return true;
  return config.tags.some((item) => entry.tags.some((tag) => tag.startsWith(item.trim())));
}

function matchAuthors(entry, config) {
  if (!config.authors) return true;
  const authors = entry.author.split(',');
  return config.authors.some((item) => authors.includes(item.trim()));
}

function matchContentType(entry, config) {
  if (!config['content-type']) return true;
  const contentType = getContentTypeFromArticle(entry);
  if (!contentType) return false;
  return config['content-type'].some(
    (item) => item.trim() === contentType.replace('content-type/', ''),
  );
}

function getEditorFilter(config) {
  return (entry) => matchTags(entry, config) && matchAuthors(entry, config) && matchContentType(entry, config);
}

function getPathFilter(entry, author, matchedPathTags) {
  const path = window.location.pathname;
  if (path.startsWith('/author/')) {
    if (!entry.author || entry.author === '0') return false;
    const authorNames = entry.author.split(',').map((a) => toClassName(a.trim()));
    if (author) return authorNames.includes(toClassName(author));
    return authorNames.includes(path.replace('/author/', ''));
  }
  // check if location match is valid tag /topics/.* or /news/.*
  if (path.match(/\/topics\/.*|\/news\/.*/) && matchedPathTags && matchedPathTags.length > 0) {
    return matchedPathTags.some((tag) => entry.tags.includes(tag.key));
  }
  return true;
}

function getTagFilter(entry, params, nonFilterParams, id) {
  let filterTags = [];
  params.forEach((value, key) => {
    if (!(nonFilterParams.includes(key) || key === `${id}-date-range`) && key.startsWith(id)) {
      filterTags.push(value);
    }
  });
  filterTags = filterTags.flat();
  return filterTags.every((item) => entry.tags.includes(item));
}

function getDateFilter(entry, params, id) {
  const dateRange = params.get(`${id}-date-range`);
  if (!dateRange) return true;
  const publicationDate = new Date(entry.publicationDate * 1000);
  const dateString = `${publicationDate.getUTCFullYear()}/${(publicationDate.getUTCMonth() + 1)
    .toString()
    .padStart(2, '0')}`;
  return dateRange.find((date) => date === dateString);
}

function getUserFilter(params, nonFilterParams, id) {
  return (entry) => getDateFilter(entry, params, id) && getTagFilter(entry, params, nonFilterParams, id);
}

function excludedArticlesFilter(entry, editorConfig) {
  if (editorConfig['excluded-articles'] && editorConfig['excluded-articles'].length > 0) {
    return !editorConfig['excluded-articles'].includes(entry.path);
  }
  return true;
}

async function getArticles(tags, editorConfig, nonFilterParams, id, startPage = 1, batchSize = 6, initialSort = defaultSort) {
  const params = getParameterMap();
  const path = window.location.pathname;
  const sortDirection = params.get(`${id}-sort`)?.[0] || initialSort;

  const sortType = !editorConfig.info || editorConfig.info[0].toLowerCase()?.indexOf('updated') > -1 ? 'modification' : 'publication';

  let author;
  if (path.startsWith('/author/')) {
    author = getMetadata('name');
  }
  const matchedPathTags = Object.values(tags).filter(
    (tag) => path === tag['topic-path'] || path === tag['news-path'],
  );
  return ffetch(`${window.hlx.codeBasePath}/articles-index.json`, 'sapContentHubArticles')
    .filter((entry) => getPathFilter(entry, author, matchedPathTags))
    .filter((entry) => entry.path !== window.location.pathname)
    .filter((entry) => excludedArticlesFilter(entry, editorConfig))
    .filter(getEditorFilter(editorConfig))
    .filter(getUserFilter(params, nonFilterParams, id))
    .limit(editorConfig.limit ? +editorConfig.limit[0] : -1)
    .paginate(batchSize, startPage);
}

function renderCards(articles, placeholders, tags, authorIndex, textOnly, carousel, pageSize, totalCount, horizontal, userConfig, editorConfig) {
  const cards = articles.map((article) => {
    const authors = lookupProfiles(article.author, authorIndex);
    const displayAuthor = buildCardDisplayProfile(authors);
    if (textOnly) {
      return getCard(article, tags, placeholders).render();
    }
    if (carousel) {
      return getPictureCard(article, editorConfig, placeholders, tags, displayAuthor).render(true);
    }
    return getPictureCard(article, editorConfig, placeholders, tags, displayAuthor)
      .render(
        pageSize === 1
        || (Object.keys(userConfig).length === 0 && totalCount === 1)
        || horizontal,
      );
  });
  if (carousel) {
    return new Carousel(cards).render();
  }
  return ul({ class: 'card-items' }, ...cards);
}

function addLayoutClasses(
  cardList,
  carousel,
  textOnly,
  horizontal,
  moreThanOnePage,
  userConfig,
  pageSize,
) {
  // Apply column layout classes
  if (
    !carousel
    && !textOnly
    && !horizontal
    && (moreThanOnePage || Object.keys(userConfig).length > 0)
  ) {
    applyLayout(cardList, pageSize);
  } else if (!carousel && !textOnly && document.querySelector('aside') !== null) {
    addColClasses(cardList, cardList, LIST_LAYOUT_CONFIG_L2);
  } else if (!carousel && !textOnly) {
    addColClasses(cardList, cardList, LIST_LAYOUT_CONFIG);
  }
}

function registerHandler(
  block,
  tags,
  filters,
  pages,
  placeholders,
  articleStream,
  authorIndex,
  editorConfig,
  userConfig,
  textOnly,
  carousel,
  nonFilterParams,
  id,
  pageSize,
  horizontal,
  initialSort,
) {
  block.addEventListener('sap:filterChange', async () => {
    articleStream = await getArticles(tags, editorConfig, nonFilterParams, id, 1, pageSize, initialSort);
    articleStream.next().then((cursor) => {
      const cards = renderCards(
        cursor.value.results,
        placeholders,
        tags,
        authorIndex,
        textOnly,
        carousel,
        pageSize,
        cursor.value.total,
        horizontal,
        userConfig,
        editorConfig,
      );
      addLayoutClasses(
        cards,
        carousel,
        textOnly,
        horizontal,
        cursor.value.pages > 1,
        userConfig,
        pageSize,
      );
      if (filters) filters.updateResults(block, cursor.value.total);
      block.querySelector('.card-items').replaceWith(cards);
      if (pages) pages.updatePages(cursor.value.pages, 1);
    });
  });
  block.addEventListener('sap:pageChange', (e) => {
    articleStream.next({ direction: e.detail.direction }).then((cursor) => {
      const cards = renderCards(
        cursor.value.results,
        placeholders,
        tags,
        authorIndex,
        textOnly,
        carousel,
        pageSize,
        cursor.value.total,
        horizontal,
        userConfig,
        editorConfig,
      );
      addLayoutClasses(
        cards,
        carousel,
        textOnly,
        horizontal,
        cursor.value.pages > 1,
        userConfig,
        pageSize,
      );
      block.querySelector('.card-items').replaceWith(cards);
      if (pages) pages.updatePages(cursor.value.pages);
    });
  });
}

function getMonthRange(startDate, endDate, id) {
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
      id,
    });
    start.setUTCMonth(start.getUTCMonth() + 1);
  }

  return months.reverse();
}

/*
  getMonthAmount: returns amount of months from the range
  range examples:
    - range = "month 8" -> 8
    - range = "20 year" -> 240
*/
function getMonthAmount(range) {
  let amount = parseInt(range.replace('year', '').replace('month', '').trim(), 10);
  if (range.includes('year')) {
    amount *= 12;
  }
  return amount;
}

/*
  rangeValue examples:
    - "2023-04-01 to 2024-11-01"
    - "8 Months"
    - "years: 1, months: 2"
*/
function getDateRange(rangeValue, id) {
  let startDate;
  let endDate;

  if (rangeValue.includes('to')) {
    const dates = rangeValue.split('to');
    startDate = dates[0].trim();
    endDate = dates[1].trim();
  } else {
    endDate = new Date();
    startDate = new Date(endDate);

    rangeValue.replaceAll(':', '').replaceAll('s', '').toLowerCase().split(',')
      .map((value) => getMonthAmount(value))
      .filter((value) => value)
      .forEach((months) => {
        startDate.setUTCMonth(startDate.getUTCMonth() - months);
      });
  }

  return getMonthRange(startDate, endDate, id);
}

function cleanupUrlsToPath(urls) {
  if (typeof urls === 'string') {
    return getPathFromUrl(urls) || urls;
  }
  return urls.map((url) => {
    const path = getPathFromUrl(url);
    if (path !== null) {
      return path;
    }
    return url;
  });
}

/**
 * @param block {HTMLElement}
 * @param tags {{[id: string]: {label: string, key: string}}}
 * @param id {string}
 * @param placeholders
 * @return {{userConfig: {[id: string]: {id: string, name: string, items: {id: string, label: string, value: string}[]}}, editorConfig: {[id: string]: string[]}}}
 */
function getFilterConfig(block, tags, id, placeholders) {
  const configKeys = [
    'tags',
    'authors',
    'content-type',
    'limit',
    'info',
    'page-size',
    'sort',
    'excluded-articles',
  ];
  const editorConfig = {};
  const userConfig = {};
  Object.entries(readBlockConfig(block)).forEach(([key, value]) => {
    if (key === 'excluded-articles') {
      editorConfig[key] = cleanupUrlsToPath(value);
      return;
    }
    if (configKeys.includes(key)) {
      editorConfig[key] = value.split(',').map((v) => v.trim());
      return;
    }
    if (key === 'date-range') {
      const filterId = `${id}-date-range`;
      userConfig[filterId] = {
        id: filterId,
        name: 'Month/Year',
        items: getDateRange(value, filterId),
      };
      return;
    }
    const filterId = `${id}-${key}`;
    const items = value
      .split(',')
      .flatMap((item) => {
        if (item.endsWith('/*')) {
          const prefix = toCamelCase(item);
          return Object.entries(tags)
            .filter(([tagKey]) => tagKey.startsWith(prefix))
            .reduce(
              // eslint-disable-next-line no-unused-vars
              (acc, [, tagValue]) => [
                ...acc,
                { label: tagValue.label, value: tagValue.key, id: filterId },
              ],
              [],
            );
        }
        const tag = tags[toCamelCase(item.trim())];
        return tag ? { label: tag.label, value: tag.key, id: filterId } : null;
      })
      .filter((item) => item !== null);
    userConfig[filterId] = {
      id: filterId,
      name: placeholders[toCamelCase(key)] || toTitleCase(key),
      items,
    };
  });
  return { editorConfig, userConfig };
}

function getBlockId() {
  window.sapResourceCenterCount = window.sapResourceCenterCount
    ? window.sapResourceCenterCount + 1
    : 1;
  return `rc-${window.sapResourceCenterCount}`;
}

export default async function decorateBlock(block) {
  const id = getBlockId();
  const textOnly = block.classList.contains('text-only');
  const carousel = block.classList.contains('carousel');
  const horizontal = block.classList.contains('horizontal');
  const tags = await fetchTagList();
  const placeholders = await fetchPlaceholders();
  const { editorConfig, userConfig } = getFilterConfig(block, tags, id, placeholders);
  block.textContent = '';
  let filters;
  let pages;
  const pageSize = Number(editorConfig['page-size']) || 6;
  const authorIndex = await fetchAuthors();
  const urlParams = new URLSearchParams(window.location.search);
  const initialSort = urlParams.get(`${id}-sort`) || (editorConfig.sort && editorConfig.sort[0]) || defaultSort;
  const page = +urlParams.get(`${id}-page`) || 1;
  const nonFilterParams = [`${id}-page`, `${id}-sort`, `${id}-order`, `${id}-limit`];
  const articleStream = await getArticles(tags, editorConfig, nonFilterParams, id, page, pageSize, initialSort);
  const cursor = await articleStream.next();
  const moreThanOnePage = cursor.value.pages > 1;

  const cardList = renderCards(
    cursor.value.results,
    placeholders,
    tags,
    authorIndex,
    textOnly,
    carousel,
    pageSize,
    cursor.value.total,
    horizontal,
    userConfig,
    editorConfig,
  );

  if (Object.keys(userConfig).length > 0 && !carousel) {
    filters = new Filters(userConfig, placeholders, nonFilterParams, id, initialSort);
    block.append(filters.render());
    filters.updateResults(block, cursor.value.total);
  }
  block.append(cardList);
  if (
    !carousel
    && moreThanOnePage
    && cursor.value.pages <= 2
    && Object.keys(userConfig).length === 0
  ) {
    const btnLabel = placeholders.showMore || 'Show More';
    const viewBtn = new Button(btnLabel, 'icon-slim-arrow-right', 'secondary', {
      xs: 'medium',
      m: 'large',
    }).render();
    viewBtn.addEventListener('click', () => {
      articleStream.next().then((nextCursor) => {
        const cards = renderCards(
          nextCursor.value.results,
          placeholders,
          tags,
          authorIndex,
          textOnly,
          carousel,
          pageSize,
          cursor.value.total,
          horizontal,
          userConfig,
          editorConfig,
        );
        Array.from(cards.children).forEach((card) => {
          cardList.append(card);
        });
        if (nextCursor.value.page === nextCursor.value.pages) {
          viewBtn.remove();
        }
      });
    });
    block.append(viewBtn);
  }
  if (!carousel && (cursor.value.pages > 2 || Object.keys(userConfig).length > 0)) {
    pages = new Pages(block, cursor.value.pages, page, id, true);
    pages.render();
  }

  addLayoutClasses(cardList, carousel, textOnly, horizontal, moreThanOnePage, userConfig, pageSize);

  registerHandler(
    block,
    tags,
    filters,
    pages,
    placeholders,
    articleStream,
    authorIndex,
    editorConfig,
    userConfig,
    textOnly,
    carousel,
    nonFilterParams,
    id,
    pageSize,
    horizontal,
    initialSort,
  );
}
