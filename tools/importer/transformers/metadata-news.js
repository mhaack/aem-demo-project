/* eslint-disable prefer-destructuring */
/* global WebImporter */

// eslint-disable-next-line no-unused-vars
const createMetadata = (main, document, html, params, urlStr) => {
  const meta = {};

  const title = document.querySelector('title');
  if (title) {
    meta.Title = title.textContent.replace(/[\n\t]/gm, '').replace(/ \| .*/gm, '');
  }

  const keywords = document.querySelector('[name="keywords"]');
  if (keywords) {
    meta.keywords = keywords.content;
  }

  const desc = document.querySelector('[name="description"]');
  if (desc) {
    meta.Description = desc.content;
  }

  const ogTitle = document.querySelector('[property="og:title"]');
  if (ogTitle && ogTitle.content !== meta.Title) {
    meta['og:title'] = ogTitle.content;
  }

  const ogDesc = document.querySelector('[property="og:description"]');
  if (ogDesc && ogDesc.content !== meta.Description) {
    if (!meta.Description) {
      meta.Description = ogDesc.content;
    } else {
      meta['og:description'] = ogDesc.content;
    }
  }

  const img = document.querySelector('[property="og:image"]');
  if (img && img.content) {
    const el = document.createElement('img');
    const imgUrl = new URL(img.content);
    el.src = imgUrl.pathname;
    meta.Image = el;
  }
  const published = document.querySelector('[property="article:published_time"]');
  if (published) {
    const date = new Date(published.content);
    meta['Published Time'] = date.toISOString().split('T')[0];
  }
  const modified = document.querySelector('[property="article:modified_time"]');
  if (modified) {
    const date = new Date(modified.content);
    meta['Modified Time'] = date.toISOString().split('T')[0];
  }

  if (meta.Title && html.originalURL.indexOf('/author') > 0) {
    meta.Author = meta.Title.replace(/[^a-zA-Z\s]+.*/, '').trim();
  }

  if (!meta.Author) {
    // author extraction fro video pages
    const entryMeta = document.querySelector('article.sap-tv div.meta');
    if (entryMeta) {
      const parseInfo = (str) => ({
        timestamp: new Date(str.match(/\b\w+ \d{1,2}, \d{4}/)[0]).toISOString(),
        linkText: str.match(/<a href="[^"]*" title="[^"]*" rel="[^"]*">([^<]*)<\/a>/)[1],
      });
      const info = parseInfo(entryMeta.querySelector('p.entry-meta').innerHTML);
      meta.Author = info.linkText;
      if (!meta['Published Time']) {
        meta['Published Time'] = info.timestamp.split('T')[0];
      }
      entryMeta.remove();
    }
  }

  if (meta.Title && html.originalURL.indexOf('/author') > 0) {
    meta.Author = meta.Title.replace(/[^a-zA-Z\s]+.*/, '').trim();
  }

  const author = [...document.querySelectorAll('.c-hero-post__content .c-entry-author a')]
    .map((el) => el.textContent)
    .join(', ');
  if (author) {
    meta.Author = author;
  }

  const hotStory = document.querySelector('.c-hero-post__content .c-entry-hot-story');
  if (hotStory) {
    meta.Priority = 'hot-topic';
  }
  const twitterLabel1 = document.querySelector('[name="twitter:label1"]');
  if (twitterLabel1) {
    meta['twitter:label1'] = twitterLabel1.content;
  }
  const twitterData1 = document.querySelector('[name="twitter:data1"]');
  if (twitterData1) {
    meta['twitter:data1'] = twitterData1.content;
  }
  const twitterLabel2 = document.querySelector('[name="twitter:label2"]');
  if (twitterLabel2) {
    meta['twitter:label2'] = twitterLabel2.content;
  }
  const twitterData2 = document.querySelector('[name="twitter:data2"]');
  if (twitterData2) {
    meta['twitter:data2'] = twitterData2.content;
  }

  // add tags, topics, content types etc based on mapping tables
  const articleContent = document.querySelector(
    'section#main > article.post, section#main > article.sap-tv',
  );
  if (document.mappingTable && articleContent) {
    const types = [...articleContent.classList]
      .filter((className) => className.startsWith('sapn-type-'))
      .map((className) => className.replace('sapn-type-', ''));

    if (types?.length > 0) {
      // eslint-disable-next-line prefer-destructuring
      document.articleType = types[0];
    } else if (articleContent.classList.contains('type-sap-tv')) {
      document.articleType = 'video';
      types.push('video');
    }

    // TODO currently additional tags are not mapped as they are not present in the mapping table
    const tagging = new Set();

    // map categories to topics
    const categories = [...articleContent.classList]
      .filter((className) => className.startsWith('category-'))
      .filter((className) => className !== 'category-industries')
      .map((className) => className.replace('category-', ''));
    if (categories?.length > 0) {
      document.mappingTable.topic.data
        .filter((entry) => categories.includes(entry.path))
        .forEach((topic) => {
          if (topic['action:map'].length > 0) {
            tagging.add(topic['action:map']);
          } else {
            tagging.add(`topics/${topic.path}`);
          }
        });
    }

    // map types to content types
    if (types?.length > 0) {
      document.mappingTable.type.data
        .filter((entry) => entry.path === types[0])
        .forEach((typeEntry) => {
          if (typeEntry['action:map'].length > 0) {
            tagging.add(typeEntry['action:map']);
          } else {
            tagging.add(`content-type/${typeEntry.path}`);
          }
        });
    }

    // map tags
    const tags = [...articleContent.classList]
      .filter((className) => className.startsWith('tag-'))
      .map((className) => className.replace('tag-', ''));
    if (tags?.length > 0) {
      document.mappingTable.tag.data
        .filter((entry) => tags.includes(entry.path))
        .forEach((tag) => {
          if (tag['action:map'].length > 0) {
            tagging.add(tag['action:map']);
          } else {
            tagging.add(`news-tag/${tag.path}`);
          }
        });
    }

    meta.Tags = [...tagging].join(', ');
  }

  const block = WebImporter.Blocks.getMetadataBlock(document, meta);
  block.id = 'metadata';
  main.append(block);

  return meta;
};

export default createMetadata;
