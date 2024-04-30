import { Feed } from 'feed';
import fs from 'fs';
import path from 'path';

const siteRoot = 'https://www.sap.com';
const sourceRoot = 'https://main--builder-prospect--sapudex.hlx.page';
const targetRoot = '../../aemedge/feeds';
const maxPosts = 30;

function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

const limit = '1000';

async function createFeed(feed, allPosts) {
  console.log(`found ${allPosts.length} posts - limiting to ${maxPosts}`);

  const newestPost = allPosts
    .map((post) => new Date(post.publicationDate * 1000))
    .reduce((maxDate, date) => (date > maxDate ? date : maxDate), new Date(0));

  const atomFeed = new Feed({
    title: feed.title,
    description: feed.description,
    id: feed.link,
    link: feed.link,
    updated: newestPost,
    generator: 'AEM SAP News feed generator (GitHub action)',
    language: feed.language || 'en-US',
  });

  allPosts.sort((a,b) => new Date(b.date) - new Date(a.date)).filter((item, idx) => idx < maxPosts).forEach((post) => {
    const link = feed.siteRoot + post.path;
    atomFeed.addItem({
      title: post.title,
      id: link,
      link,
      description: post.description,
      content: post.content,
      category: JSON.parse(post.tags).map((tag) => ({ name: tag })),
      date: new Date(post.publicationDate * 1000),
      published: new Date(post.publicationDate * 1000),
    });
  });

  ensureDirectoryExistence(feed.targetFile);
  fs.writeFileSync(feed.targetFile, atomFeed.rss2());
  console.log('wrote file to ', feed.targetFile);
}

async function fetchPosts(feed) {
  let offset = 0;
  const allPosts = [];

  while (true) {
    const api = new URL(feed);
    api.searchParams.append('offset', JSON.stringify(offset));
    api.searchParams.append('limit', limit);
    const response = await fetch(api, {});
    const result = await response.json();

    allPosts.push(...result.data);

    if (result.offset + result.limit < result.total) {
      // there are more pages
      offset = result.offset + result.limit;
    } else {
      break;
    }
  }
  return allPosts;
}

const tagging = await fetchPosts(`${sourceRoot}/aemedge/tagging-contenthub.json`);
const allPosts = await fetchPosts(`${sourceRoot}/aemedge/articles-index.json`);
await Promise.all(allPosts.map(async (post) => {
  const resp = await fetch(`${sourceRoot}${post.path}.plain.html`);
  post.content = await resp.text();
}));

createFeed({
  title: 'SAP Sponsorships Archives | SAP News Center',
  targetFile: `${targetRoot}/news/feed.xml`,
  siteRoot,
  link: `${siteRoot}/news/feed/`,
  language: 'en-US',
  description: 'Company &#38; Customer Stories &#124; Press Room.',
}, allPosts.filter((post) => {
  const { tags } = post;
  if (!tags) return false;
  const parsedTags = JSON.parse(tags);
  return tagging.some((value) => parsedTags.includes(value.key) && value['news-path'] && value['news-path'].length > 0);
})).catch((e) => console.error(e));

const map = new Map();
allPosts.forEach((post) => {
  const { tags } = post;
  if (tags) {
    JSON.parse(tags).forEach((tag) => {
      if (tagging.some((value) => value.key === tag && ((value['news-path'] && value['news-path'].length > 0) || (value['topic-path'] && value['topic-path'].length > 0)))) {
        const entries = map.get(tag) || [];
        entries.push(post);
        map.set(tag, entries);
      }
    });
  }
});

map.forEach((posts, tag) => {
  createFeed({
    title: 'SAP Sponsorships Archives | SAP News Center',
    targetFile: `${targetRoot}/topics/${tag}/feed.xml`,
    siteRoot,
    link: `${siteRoot}/topics/${tag}/feed/`,
    language: 'en-US',
    description: 'Company &#38; Customer Stories &#124; Press Room.',
  }, posts).catch((e) => console.error(e));
});
