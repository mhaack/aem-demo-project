import { decorateIcons } from '../../scripts/aem.js';
import {
  div, span, a,
} from '../../scripts/dom-builder.js';

const SOCIAL_CONFIGS = [
  {
    name: 'facebook',
    link: 'https://www.facebook.com/SAP',
  },
  {
    name: 'twitter',
    link: 'https://twitter.com/sap',
  },
  {
    name: 'youtube',
    link: 'https://www.youtube.com/user/SAP',
  },
  {
    name: 'linkedin',
    link: 'https://www.linkedin.com/company/sap',
  },
  {
    name: 'instagram',
    link: 'https://www.instagram.com/sap/',
  },
  {
    name: 'email',
    link: 'mailto:?body=https%3A%2F%2Fwww.sap.com%2Findex.html%3Fsource%3Dsocial-atw-mailto',
  },
];
export default async function decorate(block) {
  if (block.querySelectorAll(':scope > div').length === 0) {
    SOCIAL_CONFIGS.forEach((config) => {
      block.append(div(
        {},
        div(
          {},
          a(
            {
              href: config.link || '#',
              'aria-label': `Link to SAP ${config.name}`,
            },
            span(
              {
                class: ['icon', `icon-${config.name}`],
              },
            ),
          ),
        ),
      ));
    });
  }

  if (block.closest('main')) decorateIcons(block);
}
