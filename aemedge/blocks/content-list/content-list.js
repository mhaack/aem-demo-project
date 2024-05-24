import {
  readBlockConfig, fetchPlaceholders, toCamelCase,
} from '../../scripts/aem.js';
import ffetch from '../../scripts/ffetch.js';
import { ul, h3 } from '../../scripts/dom-builder.js';
import PictureCard from '../../libs/pictureCard/pictureCard.js';
import Card from '../../libs/card/card.js';
import Button from '../../libs/button/button.js';
import {
  formatDate,
  extractFieldValue,
  buildCardDisplayAuthor,
  lookupAuthors,
  fetchAuthorList,
  fetchTagList,
  getContentTypeFromArticle,
} from '../../scripts/utils.js';

function matchTags(entry, config) {
  if (!config.tags) return true;
  return config.tags.some((item) => JSON.parse(entry.tags)
    .some((tag) => tag.startsWith(item.trim())));
}

function matchAuthors(entry, config) {
  if (!config.authors) return true;
  const authors = entry.author.split(',');
  return config.authors.some((item) => authors.includes(item.trim()));
}

function matchContentType(entry, config) {
  if (!config['content-type']) return true;
  return config['content-type'].some((item) => item.trim() === extractFieldValue(entry, 'tags', 'content-type'));
}

function getFilter(config) {
  return (entry) => matchTags(entry, config)
    && matchAuthors(entry, config)
    && matchContentType(entry, config);
}

function getInfo(article, config) {
  const { info = ['publicationDate'] } = config;
  if (article.cardC2A && article.cardC2A !== '' && article.cardC2A !== '0') {
    return article.cardC2A;
  }
  if (info[0] === 'publicationDate') {
    return `Updated on ${formatDate(article.publicationDate * 1000)}`;
  }
  if (info[0] === 'author') {
    return article.author;
  }
  if (info[0] === 'reading-time') {
    return ''; // TODO - Needs implementation
  }
  return '';
}

function getPictureCard(article, config, placeholders, tags, author) {
  const contentType = tags[toCamelCase(getContentTypeFromArticle(article))];
  const {
    image, path, title, priority, cardUrl,
  } = article;
  const tagLabel = placeholders[toCamelCase(priority)] || '';
  const info = getInfo(article, config);
  const link = cardUrl !== '0' ? cardUrl : path;
  return new PictureCard(title, link, contentType.label, info, author, image, tagLabel);
}

function getCard(article, config, tags) {
  const contentType = tags[toCamelCase(getContentTypeFromArticle(article))];
  const { path, title } = article;
  const info = getInfo(article, config);
  return new Card(title, path, contentType.label, info);
}

export default async function decorateBlock(block) {
  const textOnly = block.classList.contains('text-only');
  const config = Object.fromEntries(
    Object.entries(readBlockConfig(block)).map(([key, value]) => [key, value.split(',')]),
  );
  let heading;
  if ('heading' in config) {
    heading = h3({ class: 'heading' }, config.heading[0]);
  }
  const filter = getFilter(config);
  const limit = config.limit ? +config.limit[0] + 1 : -1;
  let articleStream = await ffetch(`${window.hlx.codeBasePath}/articles-index.json`, 'sapContentHubArticles')
    .filter((entry) => entry.path !== window.location.pathname)
    .filter(filter)
    .limit(limit)
    .slice(0, limit - 1)
    .all();
  const placeholders = await fetchPlaceholders();
  const tags = await fetchTagList();
  const authorIndex = await fetchAuthorList();
  const itemCount = articleStream.length;
  let viewBtn;
  if (itemCount > 10 && itemCount < 20) {
    articleStream = articleStream.slice(0, 10); // only show first 10, rest will be paginated
    viewBtn = new Button('Show More', 'icon-slim-arrow-right', 'secondary', 'large');
  }

  const cardList = ul({ class: 'card-items' });
  articleStream.forEach((article) => {
    let card;
    const authors = lookupAuthors(article.author, authorIndex);
    const displayAuthor = buildCardDisplayAuthor(authors);
    if (textOnly) {
      card = getCard(article, config, tags);
    } else {
      card = getPictureCard(article, config, placeholders, tags, displayAuthor);
    }
    cardList.append(card.render());
  });
  block.textContent = '';
  if (heading) block.append(heading);
  block.append(cardList);
  if (viewBtn) block.append(viewBtn.render());
}
