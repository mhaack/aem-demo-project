/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console, class-methods-use-this */

const RC_FIELDS = [
  'tags',
  'authors',
  'content-type',
  'limit',
  'info',
  'page-size',
  'sort',
  'excluded-articles',
  'date-range',
  'topic',
  'topic-label',
  'industry',
  'industry-label',
  'sap-event',
  'sap-event-label',
  'other-event',
  'other-event-label',
];

const createBlock = (document, { name, variants = [], cells: data }) => {
  const headerRow = variants.length ? [`${name} (${variants.join(', ')})`] : [name];
  let blockRows = data;
  if (!Array.isArray(data)) {
    blockRows = Object.entries(data).map(([key, value]) => {
      let colItems = [];
      if (Array.isArray(value)) {
        colItems = value.map((v) => {
          const p = document.createElement('p');
          p.innerHTML = v;
          return p;
        });
      } else {
        colItems = [value];
      }
      return [key, colItems];
    });
  }
  return WebImporter.DOMUtils.createTable([headerRow, ...blockRows], document);
};

const getDocumentMetadata = (name, document) => {
  const attr = name && name.includes(':') && !name.includes('twitter:')  ? 'property' : 'name';
  const meta = [...document.head.querySelectorAll(`meta[${attr}="${name}"]`)]
    .map((m) => m.content)
    .join(', ');
  return meta || '';
};

const makeAEMPath = (link) => {
  if (link.href.startsWith('http://localhost:3001')) {
    const newLink = new URL(link);
    newLink.pathname = `/content/sapdx/countries/en_us${newLink.pathname}`;
    link.href = newLink.pathname;
    //link.href = `/content/sapdx/countries/en_us${link.href.substring(21)}`;
    //link.textContent = link.getAttribute('href');
  }
  return link;
};

function toClassName(name) {
  return typeof name === 'string'
    ? name
      .toLowerCase()
      .replace(/[^0-9a-z]/gi, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
    : '';
}

const getMetadata = (document) => {
  const meta = {};

  const title = document.querySelector('title');
  if (title) {
    meta.Title = title.textContent.replace(/[\n\t]/gm, '');
  }

  const desc = getDocumentMetadata('description', document);
  if (desc) {
    meta.Description = desc;
  }

  const img = getDocumentMetadata('og:image', document);
  if (img && img.indexOf('default-meta-image.png') === -1) {
    const el = document.createElement('img');
    el.src = img;
    meta.Image = el;

    const imgAlt = getDocumentMetadata('og:image:alt', document);
    if (imgAlt) {
      el.alt = imgAlt;
    }
  }

  const ogtitle = getDocumentMetadata('og:title', document);
  if (ogtitle && ogtitle !== meta.Title) {
    if (meta.Title) {
      meta['_og_title'] = ogtitle;
    } else {
      meta.Title = ogtitle;
    }
  }

  const ogdesc = getDocumentMetadata('og:description', document);
  if (ogdesc && ogdesc !== meta.Description) {
    if (meta.Description) {
      meta['_og_description'] = ogdesc;
    } else {
      meta.Description = ogdesc;
    }
  }

  const ttitle = getDocumentMetadata('twitter:title', document);
  if (ttitle && ttitle !== meta.Title && ttitle !== ogtitle) {
    if (meta.Title) {
      meta['_twitter_title'] = ttitle;
    } else {
      meta.Title = ttitle;
    }
  }

  const tdesc = getDocumentMetadata('twitter:description', document);
  if (tdesc && tdesc !== meta.Description && tdesc !== ogdesc) {
    if (meta.Description) {
      meta['_twitter_description'] = tdesc;
    } else {
      meta.Description = tdesc;
    }
  }

  const timg = getDocumentMetadata('twitter:image', document);
  if (timg && timg !== img) {
    const el = document.createElement('img');
    el.src = timg;
    meta['_twitter_image'] = el;

    const imgAlt = getDocumentMetadata('twitter:image:alt', document);
    if (imgAlt) {
      el.alt = imgAlt;
    }
  }

  const author = getDocumentMetadata('author', document);
  if (author) {
    meta.author = author;
  }

  const tags = getDocumentMetadata('article:tag', document);
  if (tags) {
    meta.tags = tags;
  }

  const publishedTime = getDocumentMetadata('published-time', document);
  if (publishedTime) {
    meta['published-time'] = publishedTime;
  }

  const modifiedTime = getDocumentMetadata('modified-time', document);
  if (modifiedTime) {
    meta['modified-time'] = modifiedTime;
  }

  const toc = getDocumentMetadata('toc', document);
  if (toc) {
    meta.toc = toc;
  }

  const cardC2A = getDocumentMetadata('card-c2a', document);
  if (cardC2A) {
    meta['card-c2a'] = cardC2A;
  }

  const cardUrl = getDocumentMetadata('card-url', document);
  if (cardUrl) {
    meta['card-url'] = cardUrl;
  }

  let sideNav = getDocumentMetadata('sidenav', document);
  if (sideNav) {
    if (sideNav.indexOf('hlx.page') > 0) {
      sideNav =
        'https://main--builder-prospect-aem-prod--sapudex.aem.page' +
        sideNav.substring(sideNav.indexOf('hlx.page') + 8, sideNav.length);
    }
    meta['sidenav'] = sideNav;
  }

  const template = getDocumentMetadata('template', document);
  if (template && template !== 'article') {
    meta['Template'] = template;
  }

  const name = getDocumentMetadata('name', document);
  if (name) {
    meta['Name'] = name;
  }

  const td1 = getDocumentMetadata('twitter:data1', document);
  if (td1) {
    meta['_twitter_data1'] = td1;
  }

  const tl1 = getDocumentMetadata('_twitter_label1', document);
  if (tl1) {
    meta['_twitter_label1'] = tl1;
  }

  const td2 = getDocumentMetadata('twitter:data2', document);
  if (td2) {
    meta['_twitter_data2'] = td2;
  }

  const tl2 = getDocumentMetadata('twitter:label2', document);
  if (tl2) {
    meta['_twitter_label2'] = tl2;
  }

  return meta;
};

const cleanUpHeadings = (main, document) => {
  main.querySelectorAll('h2, h3, h4').forEach((heading) => {
    // remove all inner elements
    heading.textContent = heading.textContent;
  });
};

const transformHero = (main, document) => {
  main.querySelectorAll('main div.hero').forEach((hero) => {
    const row = document.createElement('div');
    const cell1 = document.createElement('div');
    row.append(cell1);

    const firstRow = hero.querySelector('div');
    if (firstRow) {
      if (!firstRow.querySelector('h6')) {
        const h6 = document.createElement('h6');
        h6.textContent = '&nbsp;';
        firstRow.querySelector('h1').before(h6);
      }

      // move background image to the first row
      if (firstRow.childElementCount === 2 && firstRow.lastElementChild.querySelector('img')) {
        const img = firstRow.lastElementChild.querySelector('img');
        firstRow.lastElementChild.remove();
        cell1.append(img);
      }
    }

    hero.insertBefore(row, hero.firstChild);

    // hero allone in a section logic
    const heroSection = hero.parentElement;

    if (
      heroSection.childElementCount === 2 &&
      heroSection.lastElementChild.classList.contains('section-metadata')
    ) {
      // we have only here and metadata
      return;
    }

    if (heroSection.childElementCount > 1) {
      // hero is not alone in a section
      hero.after(document.createElement('hr'));
    }
  });
};

const transformPromo = (main, document) => {
  main.querySelectorAll('main div.promo').forEach((promo) => {
    // change layout to 2 rows
    const firstRow = promo.querySelector('div');
    if (firstRow.childElementCount === 2) {
      const row2 = document.createElement('div');
      row2.append(firstRow.lastElementChild);
      firstRow.after(row2);
    } else {
      const row = document.createElement('div');
      const cell1 = document.createElement('div');
      row.append(cell1);
      firstRow.before(row);
    }

    // fix promo title
    const h3Title = promo.querySelector('h3');
    if (h3Title) {
      const h2Title = document.createElement('h2');
      h2Title.textContent = h3Title.textContent;
      h3Title.replaceWith(h2Title);
    }

    const lastRowCell = promo.lastElementChild.firstElementChild;
    // add dummy h2 if not present
    const h2Title = promo.querySelector('h2');
    if (!h2Title) {
      const h2Title = document.createElement('h2');
      h2Title.textContent = '&nbsp;';;
      lastRowCell.firstElementChild.before(h2Title);
    }

    // add dummy h4 if not present
    if (!lastRowCell.querySelector('h4')) {
      const h4 = document.createElement('h4');
      h4.textContent = '&nbsp;';
      lastRowCell.querySelector('h2').before(h4);
    }
  });
};

const transformQuote = (main, document) => {
  main.querySelectorAll('main div.quote').forEach((quote) => {
    if (quote.childElementCount === 1) {
      const row = document.createElement('div');
      const cell1 = document.createElement('div');
      row.append(cell1);
      quote.append(row);
    }
    if (quote.childElementCount === 2 && quote.querySelector('div:last-child a')) {
      const firstRow = quote.querySelector('div');
      const row = document.createElement('div');
      const cell1 = document.createElement('div');
      row.append(cell1);
      firstRow.after(row);
    }
    // if (quote.childElementCount === 3) {
    //   const row = document.createElement('div');
    //   const cell1 = document.createElement('div');
    //   if (quote.querySelector('img')) {
    //     cell1.append(quote.querySelector('img'));
    //   }
    //   row.append(cell1);
    //   quote.lastElementChild.after(row);
    // }
  });
};

const transformFastFacts = (main, document) => {
  main.querySelectorAll('main div.fast-facts').forEach((quote) => {
    for (const row of quote.children) {
      const newRow = document.createElement('div');
      const cell1 = document.createElement('div');
      const number = document.createElement('h3');
      number.textContent = row.querySelector('h4')?.textContent;
      const unit = document.createElement('p');
      unit.textContent = row.querySelector('h5')?.textContent;
      cell1.append(number, unit);

      const cell2 = document.createElement('div');
      const eyebrow = document.createElement('h6');
      eyebrow.textContent = '&nbsp;';
      const oldEyebrow = row.querySelector('h6');
      if (oldEyebrow) {
        eyebrow.textContent = oldEyebrow.textContent;
        oldEyebrow.remove();
      }
      const title = document.createElement('h3');
      title.textContent = '&nbsp;';
      const oldTitle = row.querySelector('p>strong');
      if (oldTitle) {
        title.textContent = oldTitle.textContent;
        oldTitle.parentElement.remove();
      }
      cell2.append(eyebrow, title);
      cell2.append(row.querySelector('p'));

      const cell3 = document.createElement('div');
      if (row.querySelector('a')) {
        cell3.append(row.querySelector('a'));
      }
      newRow.append(cell1, cell2, cell3);
      row.replaceWith(newRow);
    }
  });
};

const transformTable = (main, document) => {
  main.querySelectorAll('main div.table').forEach((table) => {
    const columns = table.firstElementChild.childElementCount;

    // add dummy row for the filter value
    const filterRow = document.createElement('div');
    const filterCell = document.createElement('div');
    filterCell.textContent = columns === 1 ? 'table-1-column' : `table-${columns}-columns`;
    filterRow.append(filterCell);
    table.firstElementChild.before(filterRow);

    // for (const row of table.children) {
    //   const cell1 = document.createElement('div');
    //   cell1.textContent = 'key-value';
    //   row.firstElementChild.before(cell1);
    //   console.log(row.outerHTML);
    // }
  });
};

const transformTiles = (main, document) => {
  main.querySelectorAll('main div.tiles').forEach((titles) => {
    // extract the link from title
    titles.querySelectorAll('a').forEach((link) => {
      const cell = link.closest('div');

      if (link.closest('h2, h3, h4, h5')) {
        const heading = link.closest('h2, h3, h4, h5');
        const p = document.createElement('p');
        p.textContent = heading.textContent;
        const headingLink = heading.querySelector('a');
        if (headingLink) {
          cell.append(p, headingLink);
          heading.remove();
        }
      } else {
        const p = document.createElement('p');
        p.textContent = link.textContent;
        link.before(p);
      }

      
    });
  });
};

const transformProfiles = (main, document) => {
  main.querySelectorAll('main div.profiles').forEach((profiles) => {
    // wrap the profile links in a div
    profiles.querySelectorAll('a').forEach((link, index) => {
      link = makeAEMPath(link);
      link.textContent = link.getAttribute('href');
      if (index > 0) {
        const row = document.createElement('div');
        const cell = document.createElement('div');
        cell.append(link);
        row.append(cell);
        profiles.append(row);
      }
    });
  });
};

const transformFeaturedArticles = (main, document) => {
  main.querySelectorAll('main div.featured-articles > div').forEach((featuredArticles) => {
    const rows = [];
    featuredArticles.querySelectorAll('a').forEach((link) => {
      const row = document.createElement('div');
      const cell = document.createElement('div');
      const pEl = document.createElement('p');
      pEl.append(link);
      cell.append(pEl);
      row.append(cell);
      rows.push(row);
      link = makeAEMPath(link);
      link.textContent = link.getAttribute('href');
    });

    const block = featuredArticles.parentElement;
    block.innerHTML = '';
    block.append(...rows);
  });
};

const transformResourceCenter = (main, document) => {
  main.querySelectorAll('main div.resource-center').forEach((rc) => {
    // resort the rows based on the RC_FIELDS
    const rows = [];
    RC_FIELDS.forEach((field) => {
      let newRow = document.createElement('div');
      const cell1 = document.createElement('div');
      const cell2 = document.createElement('div');
      cell1.textContent = field;
      cell2.textContent = '';
      newRow.append(cell1, cell2);
      [...rc.children].forEach((row) => {
        if (toClassName(row.firstElementChild.textContent) === field) {
          row.firstElementChild.textContent = toClassName(row.firstElementChild.textContent);
          newRow = row
        } 
      });
      rows.push(newRow);
    });

    rc.innerHTML = '';
    rc.append(...rows);
  });
};

const transformContent = (main, document) => {
  const sections = [...main.querySelectorAll('main > div')];
  sections.forEach((section, index) => {
    const sectionBreack = document.createElement('hr');
    if (index < sections.length - 1) {
      section.append(sectionBreack);
    }

    const blocks = [...section.querySelectorAll('div[class]')];
    blocks.forEach((block) => {
      let blockName = block.classList.item(0);
      const blockVariants = [...block.classList].slice(1);

      const rows = [];
      [...block.children].forEach((div) => {
        const columns = [...div.children];

        // for section-metadata block, the key column should be lowercased
        if (blockName === 'section-metadata') {
          columns[0].textContent = columns[0].textContent.toLowerCase();
        }

        rows.push(columns);
      });

      // special case for table blocks
      if (blockName === 'table') {
        const rowCount = rows[1].length
        if (rowCount > 1) {
          blockName = `table-col-${rowCount}`;
        }
      }

      const hlxBlock = createBlock(document, {
        name: blockName,
        variants: blockVariants,
        cells: rows,
      });
      block.replaceWith(hlxBlock);
    });
  });
};

const transformFragmentURLs = (main, document) => {
  const fragments = [...main.querySelectorAll('a[href^="/fragments/"]')];
  fragments.forEach((fragment) => {
    const rows = [];
    const link = makeAEMPath(fragment).cloneNode(true);
    link.textContent = link.getAttribute('href');
    const row = document.createElement('div');
    row.append(link);
    rows.push(row);
    const embedBlock = createBlock(document, { name: 'fragment', cells: [rows] });
    fragment.parentElement.replaceWith(embedBlock);
  });
};

const transformLinkCollection = (main, document) => {
  main.querySelectorAll('main div.collection').forEach((collection) => {
    collection.querySelectorAll('a').forEach((link) => {
      link = makeAEMPath(link);
    });
  });
};

const cleanUpMediabusImages = (main) => {
  const images = [...main.querySelectorAll('img')];
  images.forEach((img) => {
    if (img.src.includes('media')) {
      img.src = img.src.substring(0, img.src.indexOf('?'));
    }
  });
};

const fixSAPURLs = (main) => {
  const CONTENTHUB_KNOWN_PATHS = ['/blogs', '/research', '/resources', '/design', '/content/sapdx', '/topics',];
  const links = [...main.querySelectorAll('a')];
  links.forEach((link) => {
    if (link.hostname === 'localhost') {
      if (CONTENTHUB_KNOWN_PATHS.some((path) => link.pathname.startsWith(path))) {
        // do nothing on known paths
        return;
      }    
      link.href = 'https://www.sap.com' + link.pathname;
      console.log(link.href);
    }
  });
}

export default {
  preprocess: ({ document, url, html, params }) => {
    const main = document.body;
    transformTiles(main, document);
  },

  /**
   * Apply DOM operations to the provided document and return
   * the root element to be then transformed to Markdown.
   * @param {HTMLDocument} document The document
   * @param {string} url The url of the page imported
   * @param {string} html The raw html (the document is cleaned up during preprocessing)
   * @param {object} params Object containing some parameters given by the import process.
   * @returns {HTMLElement} The root element to be transformed
   */
  transformDOM: ({
    // eslint-disable-next-line no-unused-vars
    document,
    url,
    html,
    params,
  }) => {
    // define the main element: the one that will be transformed to Markdown
    const main = document.body;

    // attempt to remove non-content elements
    WebImporter.DOMUtils.remove(main, ['header', 'footer', 'noscript']);

    cleanUpHeadings(main, document);
    transformHero(main, document);
    transformPromo(main, document);
    transformQuote(main, document);
    transformFastFacts(main, document);
    transformTable(main, document);
    transformProfiles(main, document);
    transformFeaturedArticles(main, document);
    transformLinkCollection(main, document);
    transformResourceCenter(main, document);
    transformContent(main, document);
    transformFragmentURLs(main, document);

    const metadata = getMetadata(document);
    const metadataBlock = createBlock(document, {
      name: 'Metadata',
      cells: metadata,
    });
    main.append(metadataBlock);

    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
    cleanUpMediabusImages(main);
    fixSAPURLs(main);
    WebImporter.rules.convertIcons(main, document);

    return main;
  },

  /**
   * Return a path that describes the document being transformed (file name, nesting...).
   * The path is then used to create the corresponding Word document.
   * @param {HTMLDocument} document The document
   * @param {string} url The url of the page imported
   * @param {string} html The raw html (the document is cleaned up during preprocessing)
   * @param {object} params Object containing some parameters given by the import process.
   * @return {string} The path
   */
  generateDocumentPath: ({
    // eslint-disable-next-line no-unused-vars
    document,
    url,
    html,
    params,
  }) => {
    let p = new URL(url).pathname;
    if (p.endsWith('/')) {
      p = `${p}index`;
    }
    return decodeURIComponent(p)
      .toLowerCase()
      .replace(/\.html$/, '')
      .replace(/[^a-z0-9/]/gm, '-');
  },
};
