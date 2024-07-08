/* eslint-disable import/no-unresolved */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

import { Feed } from 'feed';
import log4js from 'log4js';
import fs from 'fs-extra';

const siteRoot = 'https://www.sap.com';
const sourceRoot = 'https://main--builder-prospect--sapudex.hlx.live';
const targetRoot = '../../aemedge/feeds';
const logger = log4js.getLogger();
logger.level = 'info';

const getConfig = async () => {
  const response = await fetch(
    'https://main--builder-prospect--sapudex.hlx.page/aemedge/config.json',
  );
  const config = await response.json();
  const keyValueMapping = config.data.reduce((acc, item) => {
    acc[item.Key] = item.Value;
    return acc;
  }, {});
  return keyValueMapping;
};

const getFeed = (info, updateTime) => new Feed({
  title: info.title,
  description: info.description,
  id: info.link,
  link: info.link,
  updated: updateTime,
  generator: 'AEM SAP News feed generator',
  language: info.language || 'en-US',
});

const generateFeedFile = async (feedInfo, articles) => {
  try {
    const feed = getFeed(feedInfo, new Date(articles[0].publicationDate * 1000));
    logger.info('Generating feed for ', feedInfo.targetFile);
    await Promise.all(
      articles.map(async (article) => {
        const resp = await fetch(`${sourceRoot}${article.path}.plain.html`);
        article.content = await resp.text();
      }),
    );
    for (const article of articles) {
      feed.addItem({
        title: article.title,
        id: article.path,
        link: `${siteRoot}${article.path}`,
        content: article.content,
        description: article.description,
        category: JSON.parse(article.tags).map((tag) => ({ name: tag })),
        date: new Date(article.publicationDate * 1000),
      });
    }
    fs.outputFile(feedInfo.targetFile, feed.rss2(), (err) => {
      if (err) {
        logger.error(`error occured while writing to file ${feedInfo.targetFile}`, err);
      }
      logger.info(`Feed generated for ${feedInfo.targetFile}`);
    });
  } catch (error) {
    logger.error(`error occured while generating feed file ${feedInfo.targetFile}`, error);
  }
};

async function fetchResults(feed, key = 'key', offset = 0, limit = 1000, items = {}) {
  const api = new URL(feed);
  api.searchParams.append('offset', JSON.stringify(offset));
  api.searchParams.append('limit', limit);
  const response = await fetch(api, {});
  const result = await response.json();
  result.data.forEach((item) => {
    items[item[key]] = item;
  });
  if (result.offset + result.limit < result.total) {
    // there are more pages
    return fetchResults(feed, key, result.offset + result.limit, limit, items);
  }
  return items;
}

const isValidTag = (tag) => tag
  && ((tag['news-path'] && tag['news-path'] !== '0')
    || (tag['topic-path'] && tag['topic-path'] !== '0'));

const getValidArticles = async (tags, articleIndex) => {
  let validArticles = new Map();
  for (const [key, value] of Object.entries(articleIndex)) {
    const articleTag = JSON.parse(value.tags);
    if (
      key.startsWith('/news/')
      && value.template === 'article'
      && articleTag.some((tag) => isValidTag(tags[tag]))
    ) {
      validArticles.set(key, value);
    }
  }
  validArticles = new Map(
    [...validArticles.entries()].sort(
      (a, b) => new Date(b.publicationDate * 1000) - new Date(a.publicationDate * 1000),
    ),
  );
  return validArticles;
};

const buildMainFeed = async (articles, config) => {
  const feedInfo = {
    title: config['feed.title'] || 'SAP Sponsorships Archives | SAP News Center',
    targetFile: `${targetRoot}/news/feed.xml`,
    siteRoot,
    link: `${siteRoot}/news/feed/`,
    language: 'en-US',
    description: config['feed.description'] || 'Company &#38; Customer Stories &#124; Press Room.',
  };
  await generateFeedFile(feedInfo, [...articles.values()].slice(0, config['feed.maxPosts'] || 30));
};

const buildTopicWiseFeed = async (articleStream, config) => {
  const articlesByTag = Array.from(articleStream.values()).reduce((acc, article) => {
    const tags = JSON.parse(article.tags);
    tags.forEach((tag) => {
      if (!acc[tag]) {
        acc[tag] = [];
      }
      acc[tag].push(article);
    });
    return acc;
  }, {});
  for (const [tag, articles] of Object.entries(articlesByTag)) {
    const feedInfo = {
      title: config['feed.title'] || 'SAP Sponsorships Archives | SAP News Center',
      targetFile: `${targetRoot}/topics/${tag}/feed.xml`,
      siteRoot,
      link: `${siteRoot}/topics/${tag}/feed/`,
      language: 'en-US',
      description:
        config['feed.description'] || 'Company &#38; Customer Stories &#124; Press Room.',
    };
    await generateFeedFile(feedInfo, articles.slice(0, 30));
  }
};

const processFeed = async () => {
  logger.info('Initiating feed generation');
  logger.debug('Fetching tags');
  const tags = await fetchResults(`${sourceRoot}/aemedge/tagging-contenthub.json`);
  logger.debug('Fetching articles');
  const articleIndex = await fetchResults(`${sourceRoot}/aemedge/articles-index.json`, 'path');
  logger.debug('Processing articles');
  const articles = await getValidArticles(tags, articleIndex);
  logger.debug('loading configuration');
  const config = await getConfig();
  if (config['feed.logLevel']) logger.level = config['feed.logLevel'];
  logger.debug('building primary feed');
  await buildMainFeed(articles, config);
  logger.debug('building topic wise feed');
  await buildTopicWiseFeed(articles, config);
  logger.info('Feed generation completed');
};
await processFeed();
