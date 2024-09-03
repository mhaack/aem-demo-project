import { decorateIcons } from '../../scripts/aem.js';
import {
  div, span, a,
} from '../../scripts/dom-builder.js';

export default function decorate(block) {
  const encodeLink = encodeURIComponent(window.location.href);
  const encodeTitle = encodeURIComponent(document.title);

  const SOCIAL_CONFIGS = [
    {
      name: 'Facebook',
      icon: 'facebook',
      link: `http://www.facebook.com/sharer.php?u=${encodeLink}&t=${encodeTitle}`,
    },
    {
      name: 'X',
      icon: 'x',
      link: `https://x.com/intent/tweet?url=${encodeLink}`,
    },
    {
      name: 'LinkedIn',
      icon: 'linkedin',
      link: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeLink}`,
    },
    {
      name: 'email',
      icon: 'email',
      link: `mailto:?body=${encodeLink}&subject=${encodeTitle}&source=social-atw-mailto`,
    },
  ];

  if (block.querySelector(':scope > div')?.textContent?.trim() === '') {
    SOCIAL_CONFIGS.forEach((config) => {
      block.append(div(
        {},
        div(
          {},
          a(
            {
              href: config.link || '#',
              'aria-label': `Share on ${config.name}`,
              target: '_blank',
              rel: 'noopener noreferrer',
            },
            span(
              {
                class: ['icon', `icon-${config.icon}`],
              },
            ),
          ),
        ),
      ));
    });
  }
  decorateIcons(block);
}
