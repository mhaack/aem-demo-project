import { addAuthorProfiles } from '../author-profiles/author-profiles.js';
import { fetchAuthorList, getAuthorMetadata, lookupAuthors } from '../../scripts/utils.js';

export default async function decorate(block) {
  const authorNames = getAuthorMetadata();
  const authorIndex = await fetchAuthorList();
  const authors = lookupAuthors(authorNames, authorIndex);

  if (authors && authors.length > 0) {
    block.classList.add('author-profiles');
    block.classList.remove('author-profile');
    addAuthorProfiles(block, authors);
  }
}
