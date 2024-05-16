import { loadCSS } from '../../scripts/aem.js';
import Profile from '../../libs/profile/profile.js';
import { fetchAuthors } from '../../scripts/utils.js';

function addAuthorProfiles(block, authors) {
  if (authors && authors.length) {
    const multipleProfiles = authors.length > 1;
    authors.forEach((authorEntry) => {
      block.append(Profile.fromAuthorEntry(authorEntry).renderCard(multipleProfiles));
    });
    if (multipleProfiles) {
      block.classList.add(`elems${authors.length}`);
    } else {
      block.classList.add('vertical');
    }
  } else {
    block.parentNode.remove();
  }
}

export default async function decorateBlock(block) {
  loadCSS(`${window.hlx.codeBasePath}/blocks/author-profile/author-profile.css`);
  const keys = [];
  block.querySelectorAll('a').forEach((link) => {
    keys.push(new URL(link.href).pathname);
  });
  block.innerHTML = '';

  const authors = await fetchAuthors(keys);
  addAuthorProfiles(block, authors);
}

export { addAuthorProfiles };
