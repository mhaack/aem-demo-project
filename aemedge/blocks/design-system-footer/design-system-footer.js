import { decorateIcons, getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../../scripts/scripts.js';

export default async function decorate(block) {
  block.classList.add('footer');

  const footerMeta = getMetadata('footer');
  block.textContent = '';

  const footerPath = footerMeta.footer || '/fiori-design-web/footer';
  const fragment = await loadFragment(footerPath);

  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  decorateIcons(footer);
  block.append(footer);
}
