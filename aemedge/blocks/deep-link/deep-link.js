import { decorateIcons } from '../../scripts/aem.js';
import { a, span } from '../../scripts/dom-builder.js';

export default function decorate() {
  const headings = document.querySelectorAll('.section .default-content-wrapper > h2, .section .default-content-wrapper > h3, .section .default-content-wrapper > h4');

  function getElementTopPosition(element, headerSelector = 'header') {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const header = document.querySelector(headerSelector);
    const headerHeight = header ? header.offsetHeight : 0;
    return rect.top + scrollTop - headerHeight;
  }

  function handleChainLinkClick(event, href) {
    event.preventDefault();
    const target = event.currentTarget;
    const currentHeadingEl = target.closest('h2') || target.closest('h3') || target.closest('h4');

    window.scrollTo({
      top: getElementTopPosition(currentHeadingEl),
      behavior: 'smooth',
    });

    if (target) {
      const url = new URL(href);
      navigator.clipboard.writeText(url.href);
      window.history.pushState({}, '', url.href);
    }
  }

  headings.forEach((heading) => {
    const id = heading.getAttribute('id');
    const anchorEl = a({
      href: `#${id}`,
      class: 'deep-link',
      onclick: (event) => handleChainLinkClick(event, anchorEl.href),
    });
    heading.append(anchorEl);

    const chainLinkIcon = span({
      class: 'icon icon-chain-link',
      title: 'Copy to Clipboard',
    });
    anchorEl.append(chainLinkIcon);
    decorateIcons(heading);
  });
}
