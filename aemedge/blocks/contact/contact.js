import { decorateIcons } from '../../scripts/aem.js';
import { a, div, span } from '../../scripts/dom-builder.js';

export default async function decorate(block) {
  const beforeContact = div(
    { title: 'SAP' },
    a(
      {
        class: ['logo-lang-picker'],
        href: 'https://sap.com',
        title: 'SAP',
        'aria-label': 'SAP',
      },
      span({ class: 'icon icon-sap-logo' }),
    ),
  );
  block.parentNode.prepend(beforeContact);
  decorateIcons(block);
}
