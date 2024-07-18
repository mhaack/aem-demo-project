import '@udex/webcomponents/dist/HeroBanner.js';
import {
  a, div, p, span,
} from '../../scripts/dom-builder.js';
import { fetchPlaceholders, getMetadata, toCamelCase } from '../../scripts/aem.js';
import {
  fetchAuthors,
  fetchTagList,
  formatDate,
  getAuthorMetadata,
  getContentType,
  getMetadataOverride,
  getTagLink,
  lookupProfiles,
  toTitleCase,
  isNewsPage,
  isArticle,
} from '../../scripts/utils.js';
import Tag from '../../libs/tag/tag.js';
import Avatar from '../../libs/avatar/avatar.js';

function calculateInitials(name) {
  const nameParts = name.split(' ');
  let initials = '';
  nameParts.forEach((part) => {
    initials += part.charAt(0).toUpperCase();
  });
  return initials;
}

function buildAuthorEl(author) {
  const renderLink = author.path && author.path.indexOf('/people/') === -1;
  if (renderLink) {
    return a({ class: 'media-blend__author', href: author.path }, author.name);
  }
  return span({ class: 'media-blend__author' }, author.name);
}

function decorateMetaInfo(authors) {
  const infoBlockWrapper = span({ class: 'media-blend__info-block' });
  if (authors.length > 0) {
    const authorEl = span({ class: 'media-blend__authors' });
    if (authors.length === 1) {
      const avatarImage = Avatar.fromAuthorEntry(authors[0]).getImage();
      if (avatarImage) {
        const avatar = document.createElement('udex-avatar');
        avatar.setAttribute('size', 'XS');
        avatar.setAttribute('initials', calculateInitials(authors[0].name));
        avatar.setAttribute('color-scheme', 'Neutral');
        avatar.append(avatarImage.querySelector('img'));
        infoBlockWrapper.prepend(avatar);
      }
      authorEl.append(buildAuthorEl(authors[0]));
    } else {
      authors.forEach((author) => {
        if (author) {
          authorEl.append(buildAuthorEl(author));
        }
      });
    }
    infoBlockWrapper.append(authorEl);
  }

  const lastUpdate = getMetadata('modified-time')
    ? getMetadata('modified-time')
    : getMetadata('published-time');
  if (lastUpdate) {
    const lastUpdatePrefix = isNewsPage()
      ? 'Published on'
      : 'Updated on';
    infoBlockWrapper.append(
      span({ class: 'media-blend__date' }, `${lastUpdatePrefix} ${formatDate(lastUpdate)}`),
    );
  }

  const readingTime = getMetadataOverride('twitter:data2');
  if (readingTime) {
    infoBlockWrapper.append(span({ class: 'media-blend__read-time' }, readingTime));
  }

  return infoBlockWrapper;
}

function replacePlaceholderText(elem, tags) {
  if (elem && (elem.innerText.includes('[page]') || elem.innerText.includes('[author]'))) {
    // find the first tag in tags which matches the path in topics-path or news-path
    let h1TitleTag;
    Object.keys(tags).forEach((tag) => {
      const tagData = tags[tag];
      if (
        tagData['topic-path'] === window.location.pathname
        || tagData['news-path'] === window.location.pathname
      ) {
        h1TitleTag = tagData;
      }
    });
    elem.innerHTML = elem.innerHTML.replace('[page]', h1TitleTag?.label || '');
    let author = getMetadata('author');
    if (!author) {
      const path = window.location.pathname;
      if (path.startsWith('/author/')) {
        author = toTitleCase(path.replace('/author/', ''));
      }
    }
    elem.innerHTML = elem.innerHTML.replace('[author]', author || '');
  }
  return elem;
}

function buildEyebrow(content) {
  return p({ class: 'media-blend__intro-text' }, content);
}

function findFirstTag(tags) {
  const articleTags = getMetadata('article:tag');
  const tagsLiEL = articleTags
    .split(', ')
    .filter((articleTag) => {
      const tag = tags[toCamelCase(articleTag)];
      return tag && !tag.key.startsWith('content-type/') && (tag['topic-path'] || tag['news-path']);
    })
    .map((articleTag) => {
      const tag = tags[toCamelCase(articleTag)];
      return new Tag(tag.label, getTagLink(tag, document.location.pathname));
    });
  return tagsLiEL[0];
}

/**
 * loads and decorates the hero
 * @param {Element} block The hero block element
 */
export default async function decorate(block) {
  const isAnArticle = isArticle();
  const isMediaBlend = isAnArticle || block.classList.contains('media-blend');
  const tags = await fetchTagList();

  // extract block content
  const hero = document.createElement('udex-hero-banner');
  const heading = block.querySelector('h1');
  const eyebrow = block.querySelector('h6');
  let eyebrowText = eyebrow?.textContent;
  const contentTypeTag = tags[toCamelCase(getContentType())];

  if (!eyebrowText && isAnArticle) {
    // if no eyebrow text is set, use the content type for articles
    eyebrowText = contentTypeTag?.label || getContentType()?.split('/')[1].replace('-', ' ');
  }

  let newEyebrow = '';
  if (eyebrow?.firstElementChild?.tagName.toLowerCase() === 'a') {
    // If author has added a custom link, add appropriate classes for styling
    newEyebrow = buildEyebrow(eyebrow.firstElementChild);
  } else if (eyebrowText && isAnArticle) {
    // If article, add link to parent topics page, and appropriate classes for styling
    const eyeBrowHref = (() => {
      if (contentTypeTag && contentTypeTag['topic-path'] && contentTypeTag['topic-path'] !== '0') return contentTypeTag['topic-path'];
      if (contentTypeTag && contentTypeTag['news-path'] && contentTypeTag['news-path'] !== '0') return contentTypeTag['news-path'];
      return null;
    })();
    newEyebrow = eyeBrowHref
      ? buildEyebrow(a({ href: eyeBrowHref }, eyebrowText))
      : buildEyebrow(eyebrowText);
  } else if (eyebrowText) {
    // Else display simple span or nothing
    newEyebrow = buildEyebrow(eyebrowText);
  }

  const contentSlot = div(
    {
      slot: 'content',
      class: ['hero-banner', 'media-blend__content'],
    },
    newEyebrow,
    replacePlaceholderText(heading, tags),
  );
  hero.append(contentSlot);

  // get images for background
  let picture = block.querySelector(':scope div > div > picture');
  if (picture) {
    if (block.classList.contains('full-background-image')) {
      picture.querySelectorAll('source[type="image/webp"]').forEach((source) => {
        source.srcset = source.srcset.replaceAll('format=webply', 'format=webpll');
      });
    }
    picture.setAttribute('slot', 'backgroundPicture');
    const img = picture.querySelector('img');
    img.classList.add('custom-background-image');
    hero.append(picture);
  }
  picture = block.querySelector(':scope div > div picture');
  if (picture) {
    const additionalContentSlot = div(
      {
        slot: 'additionalContent',
        class: ['hero-banner', 'media-blend__additional-content'],
      },
      picture,
    );
    hero.append(additionalContentSlot);
  }

  // clean up the block before we get the description
  eyebrow?.remove();
  block.querySelectorAll('p').forEach((pEl) => {
    if (!pEl.textContent.trim()) {
      pEl.remove();
    }
  });

  // Add primary tag or news placeholder
  const tagContainer = div({ class: 'media-blend__tags' });
  if (isNewsPage() && isAnArticle) {
    const placeholders = await fetchPlaceholders();
    tagContainer.append(new Tag(placeholders[toCamelCase('SAP News Center')], '/news').render());
  } else {
    const firstTag = findFirstTag(tags);
    if (firstTag) {
      tagContainer.append(firstTag.render());
    }
  }

  // convert all buttons to udex-buttons
  const buttonContainer = div({ class: 'media-blend__buttons' });
  block.querySelectorAll('p.button-container a').forEach((anchor) => {
    const button = document.createElement('udex-button');
    if (anchor.parentElement.nodeName === 'STRONG') button.design = 'Primary';
    if (anchor.parentElement.nodeName === 'EM') button.design = 'Secondary';
    button.textContent = anchor.textContent;

    button.addEventListener('click', () => {
      window.location.href = anchor.href;
    });

    buttonContainer.appendChild(button);
    anchor.closest('p').remove();
  });

  if (block.querySelector(':scope div > div').childElementCount > 0) contentSlot.append(...block.querySelector(':scope div > div').children);

  if (isMediaBlend) {
    if (getMetadata('author')) {
      await import('@udex/webcomponents/dist/Avatar.js');
    }
    const authorIndex = await fetchAuthors();
    const authors = await lookupProfiles(getAuthorMetadata(), authorIndex);
    contentSlot.append(decorateMetaInfo(authors));
  }

  if (tagContainer.children.length > 0) {
    contentSlot.append(tagContainer);
  }

  if (buttonContainer.childElementCount > 0) {
    await import('@udex/webcomponents/dist/Button.js');
    contentSlot.append(buttonContainer);
  }

  block.replaceWith(hero);
}
