import { addAuthorProfiles } from '../author-profiles/author-profiles.js';
import { fetchAuthors, getAuthorMetadata } from '../../scripts/utils.js';

export default async function decorate(block) {
  const authorNames = getAuthorMetadata();
  const authors = await fetchAuthors(authorNames);

  if (authors && authors.length > 0) {
    block.classList.add('author-profiles');
    block.classList.remove('author-profile');
    addAuthorProfiles(block, authors);
  }
}
