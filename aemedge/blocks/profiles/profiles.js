import { a, div } from '../../scripts/dom-builder.js';
import { fetchProfiles, getAuthorMetadata, lookupProfiles } from '../../scripts/utils.js';
import Avatar from '../../libs/avatar/avatar.js';
import { getMetadata, fetchPlaceholders, toCamelCase } from '../../scripts/aem.js';

function renderProfiles(block, profiles, linkText, stacked = false) {
  if (profiles && profiles.length) {
    const multipleProfiles = profiles.length > 1;
    const portraitMode = multipleProfiles && !stacked;
    profiles.forEach((profile) => {
      const renderLink = profile.path && profile.path.indexOf('/people/') === -1;
      const cardContent = div(
        { class: portraitMode ? 'profile portrait' : 'profile' },
        new Avatar(
          profile.name,
          profile.title,
          profile.description,
          renderLink ? profile.path : '',
          profile.image,
          portraitMode,
        ).renderDetails(portraitMode ? 'flexible-big' : '', false, linkText),
      );

      if (renderLink) {
        block.append(a({ class: 'plink', href: profile.path, 'aria-label': 'Read more' }, cardContent));
      } else {
        block.append(cardContent);
      }
    });
    if (multipleProfiles && !stacked) {
      block.classList.add(`elems${profiles.length}`);
    } else {
      block.classList.add('stacked');
    }
  } else {
    block.parentNode.remove();
  }
}

export default async function decorateBlock(block) {
  let keys = [];
  // use configured profile links
  block.querySelectorAll('a').forEach((link) => {
    keys.push(new URL(link.href).pathname);
  });

  // use author metadata if no links are configured (on L3 pages)
  if (!keys.length) {
    keys = getAuthorMetadata();
  }
  block.innerHTML = '';

  const stackedLayout = getMetadata('template') === 'article';
  const profileIndex = await fetchProfiles();
  const profiles = lookupProfiles(keys, profileIndex);
  const placeholders = await fetchPlaceholders();
  const linkText = placeholders[toCamelCase('Profile Link')] || 'Link';
  renderProfiles(block, profiles, linkText, stackedLayout);
}
