/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import {
  fetchPlaceholders, getMetadata, readBlockConfig, toCamelCase, toClassName,
} from '../../scripts/aem.js';
import { ul } from '../../scripts/dom-builder.js';
import {
  addColClasses,
  isNewsPage,
  addColClassesForCount,
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
} from '../../scripts/utils.js';
import ffetch from '../../scripts/ffetch.js';
import Filters from '../../libs/filters/filters.js';
import Card from '../../libs/card/card.js';
import PictureCard from '../../libs/pictureCard/pictureCard.js';
import Pages from '../../libs/pages/pages.js';
import Button from '../../libs/button/button.js';
import Carousel from '../../libs/carousel/carousel.js';

function getPictureCard(article, placeholders, tags, author) {
  try {
    const contentType = tags[toCamelCase(getContentTypeFromArticle(article))];
    const {
      image, path, title, priority, cardUrl,
    } = article;
    const tagLabel = placeholders[toCamelCase(priority)] || '';
    const link = cardUrl !== '0' ? cardUrl : path;
    const infoUpdatedLabel = isNewsPage() || path.startsWith('/news/') ? 'Published on' : (placeholders.updatedOn || 'Updated on');
    let info = `${infoUpdatedLabel} ${formatDate(article.publicationDate * 1000)}`;
    if (article.cardC2A && article.cardC2A !== '' && article.cardC2A !== '0') {
      info = article.cardC2A;
    }
    return new PictureCard(title, link, contentType?.label || '', info, author, image, tagLabel);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error creating card', error);
    return null;
  }
}

function getCard(article, tags) {
  const contentType = tags[toCamelCase(getContentTypeFromArticle(article))];
  const { path, title } = article;
  const infoUpdatedLabel = isNewsPage() || path.startsWith('/news/') ? 'Published on' : 'Updated on';
  let info = `${infoUpdatedLabel} ${formatDate(article.publicationDate * 1000)}`;
  if (article.cardC2A && article.cardC2A !== '' && article.cardC2A !== '0') {
    info = article.cardC2A;
  }
  return new Card(title, path, contentType?.label || '', info);
}

function matchTags(entry, config) {
  if (!config.tags) return true;
  return config.tags.some((item) => JSON.parse(entry.tags).some((tag) => tag.startsWith(item.trim())));
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
  return filterTags.every((item) => JSON.parse(entry.tags).includes(item));
}

function getDateFilter(entry, params, id) {
  const dateRange = params.get(`${id}-date-range`);
  if (!dateRange) return true;
  const publicationDate = new Date(entry.publicationDate * 1000);
  const dateString = `${publicationDate.getUTCFullYear()}/${(publicationDate.getUTCMonth() + 1).toString().padStart(2, '0')}`;
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

async function getArticles(tags, editorConfig, nonFilterParams, id, startPage = 1, batchSize = 6) {
  const params = getParameterMap();
  const path = window.location.pathname;
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

function renderCards(articles, placeholders, tags, authorIndex, textOnly, carousel, pageSize, totalCount, horizontal, userConfig) {
  const cards = articles.map((article) => {
    const authors = lookupProfiles(article.author, authorIndex);
    const displayAuthor = buildCardDisplayProfile(authors);
    if (textOnly) {
      return getCard(article, tags).render();
    }
    if (carousel) {
      return getPictureCard(article, placeholders, tags, displayAuthor).render(true);
    }
    return getPictureCard(article, placeholders, tags, displayAuthor)
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

function addPaginationClasses(cardList, pageSize) {
  if (getMetadata('template') === 'hub-l2') {
    addColClassesForCount(cardList, pageSize, LIST_LAYOUT_CONFIG_L2);
  } else {
    addColClassesForCount(cardList, pageSize, LIST_LAYOUT_CONFIG);
  }
}

function addLayoutClasses(cardList, carousel, textOnly, horizontal, moreThanOnePage, userConfig, pageSize) {
  // Apply column layout classes
  if (!carousel && !textOnly && !horizontal && (moreThanOnePage || Object.keys(userConfig).length > 0)) {
    addPaginationClasses(cardList, pageSize);
  } else if (!carousel && !textOnly && getMetadata('template') === 'hub-l2') {
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
) {
  block.addEventListener('sap:filterChange', async () => {
    articleStream = await getArticles(tags, editorConfig, nonFilterParams, id, 1, pageSize);
    articleStream.next().then((cursor) => {
      block.querySelector('.card-items')?.remove();
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
      block.append(cards);
      if (pages) pages.updatePages(cursor.value.pages, 1);
    });
  });
  block.addEventListener('sap:pageChange', (e) => {
    articleStream.next({ direction: e.detail.direction }).then((cursor) => {
      block.querySelector('.card-items')?.remove();
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
      block.append(cards);
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
 * @return {{userConfig: {[id: string]: {id: string, name: string, items: {id: string, label: string, value: string}[]}}, editorConfig: {[id: string]: string[]}}}
 */
function getFilterConfig(block, tags, id, placeholders) {
  const configKeys = ['tags', 'authors', 'content-type', 'limit', 'info', 'page-size', 'excluded-articles'];
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
      const dates = value.split('to');
      const filterId = `${id}-date-range`;
      userConfig[filterId] = {
        id: filterId,
        name: 'Month/Year',
        items: getMonthRange(dates[0].trim(), dates[1].trim(), filterId),
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
              (acc, [, tagValue]) => [...acc, { label: tagValue.label, value: tagValue.key, id: filterId }],
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
  window.sapResourceCenterCount = window.sapResourceCenterCount ? window.sapResourceCenterCount + 1 : 1;
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
  const page = +urlParams.get(`${id}-page`) || 1;
  const nonFilterParams = [
    `${id}-page`,
    `${id}-sort`,
    `${id}-order`,
    `${id}-limit`,
  ];
  const articleStream = await getArticles(tags, editorConfig, nonFilterParams, id, page, pageSize);
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
  );

  if (Object.keys(userConfig).length > 0 && !carousel) {
    filters = new Filters(
      userConfig,
      placeholders,
      nonFilterParams,
      id,
    );
    block.append(filters.render());
    filters.updateResults(block, cursor.value.total);
  }
  block.append(cardList);
  if (!carousel && moreThanOnePage && cursor.value.pages <= 2 && Object.keys(userConfig).length === 0) {
    const btnLabel = placeholders.showMore || 'Show More';
    const viewBtn = new Button(
      btnLabel,
      'icon-slim-arrow-right',
      'secondary',
      { xs: 'medium', m: 'large' },
    ).render();
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
    pages = new Pages(block, cursor.value.pages, page, id);
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
  );
}
