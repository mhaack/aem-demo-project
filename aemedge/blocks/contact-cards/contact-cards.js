import ffetch from '../../scripts/ffetch.js';
import { getMetadata, readBlockConfig } from '../../scripts/aem.js';
import { div } from '../../scripts/dom-builder.js';
import Button from '../../libs/button/button.js';
import {
  getConfig, addColClasses, LIST_LAYOUT_CONFIG_L2, LIST_LAYOUT_CONFIG, addColClassesForCount,
} from '../../scripts/utils.js';

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

function getOrigin() {
  const { location } = window;
  return location.href === 'about:srcdoc' ? window.parent.location.origin : location.origin;
}

export default async function decorate(block) {
  const template = getMetadata('template');
  const pageSize = 6;
  const siteName = getOrigin();
  const contactsEndpoint = getConfig('contacts');
  const config = readBlockConfig(block);
  block.textContent = '';
  const contactStream = await ffetch(`${siteName}/${contactsEndpoint}.json`, 'sapNewsContacts')
    .filter((entry) => entry.Region === config.region)
    .map((entry) => getContactCard(entry))
    .paginate(pageSize, 1);
  const contactList = div({ class: 'contact-cards-list' });
  const cursor = await contactStream.next();
  cursor.value.results.forEach((contact) => contactList.append(contact));
  block.append(contactList);

  if (cursor.value.pages > 1) {
    const viewBtn = new Button(
      'Show More',
      'icon-slim-arrow-right',
      'secondary',
      'large',
    ).render();
    viewBtn.addEventListener('click', () => {
      contactStream.next().then((nextCursor) => {
        nextCursor.value.results.forEach((contact) => contactList.append(contact));
        if (nextCursor.value.page === nextCursor.value.pages) {
          viewBtn.remove();
        }
      });
    });
    block.append(div({ class: 'expand' }, viewBtn));

    if (template === 'hub-l2') {
      addColClassesForCount(block, pageSize, LIST_LAYOUT_CONFIG_L2);
    } else {
      addColClassesForCount(block, pageSize, LIST_LAYOUT_CONFIG);
    }
  } else if (cursor.value.pages === 1) {
    if (template === 'hub-l2') {
      addColClasses(block, contactList, LIST_LAYOUT_CONFIG_L2);
    } else {
      addColClasses(block, contactList, LIST_LAYOUT_CONFIG);
    }
  }
}
