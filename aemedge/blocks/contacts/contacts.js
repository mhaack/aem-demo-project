import ffetch from '../../scripts/ffetch.js';
import { readBlockConfig } from '../../scripts/aem.js';
import { div } from '../../scripts/dom-builder.js';
import Button from '../../libs/button/button.js';
import { getConfig } from '../../scripts/utils.js';

function getContactCard(entry) {
  const {
    Name, Title, Phone, Email,
  } = entry;
  return div(
    { class: 'contact-card' },
    div(
      { class: 'contact-card__details' },
      div({ class: 'contact-card__name' }, Name),
      div({ class: 'contact-card__title' }, Title),
      div({ class: 'contact-card__number' }, Phone),
      div({ class: 'contact-card__email link' }, Email),
    ),
  );
}

export default async function decorate(block) {
  const siteName = window.location.href.replace(window.location.pathname, '');
  const contactsEndpoint = getConfig('contacts');
  const config = readBlockConfig(block);
  block.textContent = '';
  const contactStream = await ffetch(`${siteName}/${contactsEndpoint}.json`, 'sapNewsContacts')
    .filter((entry) => entry.Region === config.region)
    .map((entry) => getContactCard(entry))
    .paginate(6, 1);
  const contactList = div({ class: 'contacts-list' });
  contactStream.next().then((cursor) => {
    cursor.value.results.forEach((contact) => contactList.append(contact));
    block.append(contactList);
    if (cursor.value.hasNext) {
      const viewBtn = new Button(
        'Show More',
        'icon-slim-arrow-right',
        'secondary',
        'large',
      ).render();
      viewBtn.addEventListener('click', () => {
        contactStream.next().then((nextCursor) => {
          nextCursor.value.results.forEach((contact) => contactList.append(contact));
          if (!nextCursor.value.hasNext) {
            viewBtn.remove();
          }
        });
      });
      block.append(div({ class: 'expand' }, viewBtn));
    }
  });
}
