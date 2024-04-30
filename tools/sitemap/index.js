/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */

import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';
import { createGzip } from 'zlib';
import async from 'async';
import chainFunction from 'stream-chain';
import parserFunction from 'stream-json/Parser.js';
import streamArrayFunction from 'stream-json/streamers/StreamArray.js';
import pickFunction from 'stream-json/filters/Pick.js';
import { SitemapStream, streamToPromise, xmlLint } from 'sitemap';
import { ReadableWebToNodeStream } from 'readable-web-to-node-stream';
import log4js from 'log4js';
import DeDuplicator from './transformers/deDuplicator.js';
import Filter from './transformers/filter.js';

const { chain } = chainFunction;
const { parser } = parserFunction;
const { pick } = pickFunction;
const { streamArray } = streamArrayFunction;
const logger = log4js.getLogger();
logger.level = 'info';

const formatDate = (value) => {
  try {
    return new Date(value * 1000).toISOString().split('T')[0];
  } catch (error) {
    logger.error('error while parsing date', value, error);
    return '';
  }
};

const addHttpsPrefix = (url) => {
  if (url.startsWith('https://')) {
    return url;
  }
  return `https://${url}`;
};

const validateXml = (siteMapPath) => {
  xmlLint(createReadStream(siteMapPath)).then(
    () => logger.info('sitemap valid:', siteMapPath),
    ([err, stderr]) => logger.error('sitemap xml is invalid', stderr, err),
  );
};

const getSiteMapStream = (siteMapPath, domain) => {
  const sitemap = new SitemapStream({ hostname: addHttpsPrefix(domain) });
  const writeStream = createWriteStream(siteMapPath);
  sitemap.pipe(writeStream);
  sitemap.pipe(createGzip());
  return sitemap;
};

const buildSiteMap = async (domain, url, sitemapName, transformers) => {
  const response = await fetch(url);
  const responseStream = new ReadableWebToNodeStream(response.body);
  const siteMapPath = resolve('../../', 'aemedge', `sitemap-${sitemapName}.xml.gz`);
  const sitemap = getSiteMapStream(siteMapPath, domain);
  const pipeline = chain([
    responseStream,
    parser(),
    pick({ filter: 'data' }),
    streamArray(),
    ...transformers,
    sitemap,
  ]);
  streamToPromise(pipeline).then((sm) => {
    if (logger.level === 'debug') {
      logger.debug('sitemap generated', sm.toString());
    }
    logger.info('sitemap generated successfully at', siteMapPath);
    validateXml(siteMapPath);
  });
  pipeline.on(
    'error',
    (e) => e.code === 'EPIPE' || logger.error('error occurred while streaming data', e),
  );
};

const buildTopicsSiteMap = async (config) => {
  const { domain, 'index.endpoint': endpoint, 'article.index.path': indexPath } = config;
  const deDuplicator = new DeDuplicator();
  try {
    const transformers = [
      (data) => {
        const { value } = data;
        return JSON.parse(value.topics);
      },
      deDuplicator,
      (data) => ({ url: `/topics/${data}`, changefreq: 'weekly' }),
    ];
    buildSiteMap(domain, `${endpoint}${indexPath}`, 'topics', transformers);
  } catch (error) {
    logger.error('error while generating sitemap for topics', error);
  }
};

const buildTagsSiteMap = async (config) => {
  const { domain, 'index.endpoint': endpoint, 'article.index.path': indexPath } = config;
  const deDuplicator = new DeDuplicator();
  try {
    const transformers = [
      (data) => {
        const { value } = data;
        return JSON.parse(value.tags);
      },
      deDuplicator,
      (data) => ({ url: `/tags/${data}`, changefreq: 'weekly' }),
    ];
    buildSiteMap(domain, `${endpoint}${indexPath}`, 'tags', transformers);
  } catch (error) {
    logger.error('error while generating sitemap for tags', error);
  }
};

const buildPagesSiteMap = async (config) => {
  const {
    domain,
    'index.endpoint': endpoint,
    'query.index.path': indexPath,
    'sitemap.page.templates': pageTemplates,
  } = config;
  const templates = pageTemplates.split(',');
  const filter = new Filter((data) => templates.includes(data.value.template));
  const mappingFn = (data) => ({
    url: data.path,
    changefreq: 'weekly',
    lastmod: formatDate(data.lastModified),
  });
  try {
    buildSiteMap(domain, `${endpoint}${indexPath}`, 'pages', [
      filter,
      (data) => mappingFn(data.value),
    ]);
  } catch (error) {
    logger.error('error while generating sitemap for pages', error);
  }
};

const buildNewsSitemap = (config) => {
  const filter = new Filter((data) => data.value.path.startsWith('/news/'));
  const mappingFn = (item) => {
    const newsItem = {
      url: item.path,
      news: {
        publication: {
          name: item.author,
          language: 'en',
        },
        publication_date: formatDate(item.lastModified),
        title: item.title,
        keywords: JSON.parse(item.topics)[0],
      },
    };
    const contentType = item['content-type'].split(',');
    if (contentType.includes('press-release')) newsItem.genres = 'PressRelease';
    if (contentType.includes('blog')) newsItem.genres = 'Blog';
    return newsItem;
  };
  try {
    const { domain, 'index.endpoint': endpoint, 'article.index.path': indexPath } = config;
    buildSiteMap(domain, `${endpoint}${indexPath}`, 'news', [
      filter,
      (data) => mappingFn(data.value),
    ]);
  } catch (error) {
    logger.error('error while generating sitemap for news', error);
  }
};

(async () => {
  const configAccumulator = (config, data, callback) => {
    const { Key: key, Value: value } = data;
    config[key] = value;
    callback(null, config);
  };

  try {
    const response = await fetch('https://main--builder-prospect--sapudex.hlx.page/aemedge/config.json');
    const configResponse = await response.json();
    const config = await async.reduce(configResponse.data, {}, configAccumulator);
    const taskQueue = async.cargoQueue(
      (tasks, callback) => {
        for (let i = 0; i < tasks.length; i += 1) {
          logger.info(`executing ${tasks[i].name}`);
        }
        callback(config);
      },
      4,
      4,
    );

    taskQueue.push({ name: 'buildTopicsSiteMap' }, buildTopicsSiteMap);
    taskQueue.push({ name: 'buildTagsSiteMap' }, buildTagsSiteMap);
    taskQueue.push({ name: 'buildNewsSitemap' }, buildNewsSitemap);
    taskQueue.push({ name: 'buildPagesSiteMap' }, buildPagesSiteMap);
  } catch (err) {
    logger.error('sitemap generation aborted', err);
  }
})();
