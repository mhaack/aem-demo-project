import { addAuthorProfiles } from '../author-profiles/author-profiles.js';
import { fetchAuthorList, getAuthorMetadata, lookupAuthors } from '../../scripts/utils.js';

export default async function decorate(block) {
  const authorNames = getAuthorMetadata();
  const authorIndex = await fetchAuthorList();
  let authors = lookupAuthors(authorNames, authorIndex);

  authors = authors.filter((author) => author.image);

  if (authors && authors.length > 0) {
    block.classList.add('author-profiles');
    block.classList.remove('author-profile');
    addAuthorProfiles(block, authors);
  }
}
