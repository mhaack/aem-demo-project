import Avatar from '../../libs/avatar/avatar.js';
import { fetchProfiles, lookupProfiles } from '../../scripts/utils.js';

export default async function decorate(block) {
  const quoteText = block.querySelector(':scope > div:first-of-type > div');
  const quoteAuthor = block.querySelector(':scope > div:nth-of-type(2) > div');
  const quoteLink = block.querySelector(':scope > div:nth-of-type(3) > div');
  const isSmall = block.classList.contains('small');
  quoteText.classList.add('col', 'content');
  quoteText.parentNode.classList.add('qt');
  if (quoteAuthor) {
    quoteAuthor.classList.add('col', 'content');
    quoteAuthor.parentNode.classList.add('qs');
    const authorIndex = await fetchProfiles();
    const authorEntry = lookupProfiles(quoteAuthor.textContent, authorIndex)?.[0];
    if (authorEntry && authorEntry.image) {
      const avatar = Avatar.fromAuthorEntry(authorEntry).render(isSmall ? 'medium' : 'big', true);
      block.insertBefore(avatar, quoteText.parentNode);
    }
  }
  if (quoteLink) {
    quoteLink.classList.add('col', 'content');
    quoteLink.parentNode.classList.add('quote-link');
  }
  if (!quoteLink && !quoteAuthor) {
    quoteText.parentNode.classList.add('qt', 'single-qt');
  }
}
