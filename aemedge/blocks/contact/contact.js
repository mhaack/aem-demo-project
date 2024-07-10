import { decorateIcons } from '../../scripts/aem.js';
import { div, span } from '../../scripts/dom-builder.js';

export default async function decorate(block) {
  const beforeContact = div(
    div(
      { class: ['logo-lang-picker'] },
      span({ class: 'icon icon-sap-logo' }),
    ),
  );
  block.parentNode.prepend(beforeContact);
  decorateIcons(block);
}
