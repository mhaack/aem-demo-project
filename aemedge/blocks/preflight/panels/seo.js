import { html, signal, useEffect } from '../../../libs/preact/htm-preact.js';

const DEF_ICON = 'purple';
const DEF_DESC = 'Checking...';
const pass = 'green';
const fail = 'red';
const limbo = 'orange';

const h1Result = signal({ icon: DEF_ICON, title: 'H1 count', description: DEF_DESC });
const titleResult = signal({ icon: DEF_ICON, title: 'Title size', description: DEF_DESC });
const canonResult = signal({ icon: DEF_ICON, title: 'Canonical', description: DEF_DESC });
const descResult = signal({ icon: DEF_ICON, title: 'Meta description', description: DEF_DESC });
const bodyResult = signal({ icon: DEF_ICON, title: 'Body size', description: DEF_DESC });
const linksResult = signal({ icon: DEF_ICON, title: 'Links', description: DEF_DESC });
const pubDateResult = signal({ icon: DEF_ICON, title: 'Publication Date', description: DEF_DESC });

function checkH1s() {
  const h1s = document.querySelectorAll('h1');
  const result = { ...h1Result.value };
  if (h1s.length === 1) {
    result.icon = pass;
    result.description = 'Only one H1 on the page.';
  } else {
    result.icon = fail;
    if (h1s.length > 1) {
      result.description = 'Reason: More than one H1 on the page.';
    } else {
      result.description = 'Reason: No H1 on the page.';
    }
  }
  h1Result.value = result;
  return result.icon;
}

async function checkTitle() {
  const titleSize = document.title.replace(/\s/g, '').length;
  const result = { ...titleResult.value };
  if (titleSize < 15) {
    result.icon = fail;
    result.description = 'Reason: Title size is too short.';
  } else if (titleSize > 70) {
    result.icon = fail;
    result.description = 'Reason: Title size is too long.';
  } else {
    result.icon = pass;
    result.description = 'Title size is good.';
  }
  titleResult.value = result;
  return result.icon;
}

async function checkCanon() {
  const canon = document.querySelector("link[rel='canonical']");
  const result = { ...canonResult.value };
  const { href } = canon;

  try {
    const resp = await fetch(href, { method: 'HEAD' });
    if (!resp.ok) {
      result.icon = fail;
      result.description = 'Reason: Error with canonical reference.';
    }
    if (resp.ok) {
      if (resp.status >= 300 && resp.status <= 308) {
        result.icon = fail;
        result.description = 'Reason: Canonical reference redirects.';
      } else {
        result.icon = pass;
        result.description = 'Canonical referenced is valid.';
      }
    }
  } catch (e) {
    result.icon = limbo;
    result.description = 'Canonical cannot be crawled.';
  }
  canonResult.value = result;
  return result.icon;
}

async function checkDescription() {
  const metaDesc = document.querySelector('meta[name="description"]');
  const result = { ...descResult.value };
  if (!metaDesc) {
    result.icon = fail;
    result.description = 'Reason: No meta description found.';
  } else {
    const descSize = metaDesc.content.replace(/\s/g, '').length;
    if (descSize < 50) {
      result.icon = fail;
      result.description = 'Reason: Meta description too short.';
    } else if (descSize > 150) {
      result.icon = fail;
      result.description = 'Reason: Meta description too long.';
    } else {
      result.icon = pass;
      result.description = 'Meta description is good.';
    }
  }
  descResult.value = result;
  return result.icon;
}

function checkPublishedDate() {
  const pubDate = document.querySelector('meta[name="published-time"]');
  const result = { ...pubDateResult.value };
  if (!pubDate) {
    result.icon = fail;
    result.description = 'Reason: No published date metadata found.';
  } else {
    const publishedDate = new Date(pubDate.content);
    if (!publishedDate) {
      result.icon = fail;
      result.description = 'Reason: Published date is not a valid date.';
    } else {
      result.icon = pass;
      result.description = 'Published date is good.';
    }
  }
  pubDateResult.value = result;
  return result.icon;
}

async function checkBody() {
  const result = { ...bodyResult.value };
  const { length } = document.documentElement.innerText;

  if (length > 100) {
    result.icon = pass;
    result.description = 'Body content has a good length.';
  } else {
    result.icon = fail;
    result.description = 'Reson: Not enough content.';
  }
  bodyResult.value = result;
  return result.icon;
}

async function checkLinks() {
  const result = { ...linksResult.value };
  const links = document.querySelectorAll('a[href^="/"]');

  let badLink;
  links.forEach(async (link) => {
    const resp = await fetch(link.href, { method: 'HEAD' });
    if (!resp.ok) badLink = true;
  });

  if (badLink) {
    result.icon = fail;
    result.description = 'Reason: There are one or more broken links.';
  } else {
    result.icon = pass;
    result.description = 'Links are valid.';
  }
  linksResult.value = result;
  return result.icon;
}

function SeoItem({ icon, title, description }) {
  return html`
    <div class=seo-item>
      <div class="result-icon ${icon}"></div>
      <div class=seo-item-text>
        <p class=seo-item-title>${title}</p>
        <p class=seo-item-description>${description}</p>
      </div>
    </div>`;
}

async function getResults() {
  checkH1s();
  checkTitle();
  await checkCanon();
  checkDescription();
  checkBody();
  checkPublishedDate();
  await checkLinks();
}

export default function Panel() {
  useEffect(() => { getResults(); }, []);

  return html`
      <div class=seo-columns>
        <div class=seo-column>
          <${SeoItem} icon=${h1Result.value.icon} title=${h1Result.value.title} description=${h1Result.value.description} />
          <${SeoItem} icon=${titleResult.value.icon} title=${titleResult.value.title} description=${titleResult.value.description} />       
          <${SeoItem} icon=${descResult.value.icon} title=${descResult.value.title} description=${descResult.value.description} />
          <${SeoItem} icon=${bodyResult.value.icon} title=${bodyResult.value.title} description=${bodyResult.value.description} />
        </div>
        <div class=seo-column>
          <${SeoItem} icon=${pubDateResult.value.icon} title=${pubDateResult.value.title} description=${pubDateResult.value.description} />
          <${SeoItem} icon=${linksResult.value.icon} title=${linksResult.value.title} description=${linksResult.value.description} />
          <${SeoItem} icon=${canonResult.value.icon} title=${canonResult.value.title} description=${canonResult.value.description} />
        </div>
    </div>`;
}
