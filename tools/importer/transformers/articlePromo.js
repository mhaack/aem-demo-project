/* global WebImporter */
const NEWSLETTER_FILTER = /\b(subscribe|newsletter)\b/i;

const articlePromo = (main, document) => {
  // news
  const banners = document.querySelectorAll('.wp-block-sap-news-cta-banner');
  banners.forEach((banner) => {
    banner.querySelectorAll('.wp-block-button a').forEach((a) => {
      const wrapper = document.createElement('em');
      a.parentElement.append(wrapper);
      wrapper.append(a);
    });

    banner.querySelectorAll('.cta-banner__title').forEach((title) => {
      const wrapper = document.createElement('h3');
      title.parentElement.append(wrapper);
      wrapper.append(title);
    });

    // empty row for now image
    const row = document.createElement('div');
    const cell = document.createElement('div');
    row.appendChild(cell);

    if (NEWSLETTER_FILTER.test(banner.textContent.toLowerCase())) {
      banner.remove();
      // const newsletterFragmentLink = document.createElement('a');
      // newsletterFragmentLink.href = 'https://main--builder-prospect-prod--sapudex.hlx.page/fragments/news/newsletter-subscription';
      // newsletterFragmentLink.textContent = newsletterFragmentLink.href;
      // main.querySelector('div#more-posts').append(newsletterFragmentLink);
    } else {
      const name = banner.classList.contains('alignleft') ? 'Promo (blue)' : 'Promo';
      const block = [[name], [banner.innerHTML]];
      const table = WebImporter.DOMUtils.createTable(block, document);
      banner.replaceWith(table);
    }
  });
};

export default articlePromo;
