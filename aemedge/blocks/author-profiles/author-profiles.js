import { loadCSS } from '../../scripts/aem.js';
import { getAuthorEntries } from '../../scripts/article.js';
import Profile from '../../libs/profile/profile.js';

async function addAuthorProfiles(block, keys) {
  const entries = await getAuthorEntries(keys);
  if (entries && entries.length) {
    const multipleProfiles = keys.length > 1;
    entries.forEach((authorEntry) => {
      block.append(Profile.fromAuthorEntry(authorEntry).renderCard(multipleProfiles));
    });
    if (multipleProfiles) {
      block.classList.add(`elems${keys.length}`);
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
  await addAuthorProfiles(block, keys);
}

export { addAuthorProfiles };
