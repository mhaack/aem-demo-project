import { decorateIcons, getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../../scripts/scripts.js';
import { div, span } from '../../scripts/dom-builder.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  block.textContent = '';

  // load footer fragment
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);
  const backToTop = span(
    {
      class: ['icon', 'icon-back-to-top'],
    },
  );

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.body.append(div({ class: 'ta-consent', id: 'teconsent' }));
  const cookiePrefsLink = footer.querySelector('a[href$="#cookiepreferences"]');
  if (cookiePrefsLink) {
    cookiePrefsLink.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector('div.ta-consent a');
      if (target) {
        target.click();
      }
    });
  }

  footer.append(backToTop);
  decorateIcons(footer);
  block.append(footer);
}
