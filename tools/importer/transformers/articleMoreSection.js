/* global WebImporter */

const NEWSLETTER_FILTER = /\b(subscribe|newsletter)\b/i;

const wrapInParagraph = (element, document) => {
  const paragraph = document.createElement('p');
  paragraph.append(element);
  return paragraph;
};

const transformMoreSection = (main, document) => {
  // news
  const moreSection = main.querySelector('div#more-posts');
  if (moreSection) {
    const moreSectionCards = moreSection.querySelector('section.more-posts');
    if (moreSectionCards) {
      moreSection.querySelector('h3')?.remove();

      const area = document.articleType === 'blog' ? 'blog' : 'news';

      const fragmentLink = document.createElement('a');
      fragmentLink.href = `https://main--builder-prospect-prod--sapudex.hlx.page/fragments/${area}/article-read-more`;
      fragmentLink.textContent = fragmentLink.href;

      if (area === 'news') {
        const newsletterFragmentLink = document.createElement('a');
        newsletterFragmentLink.href = 'https://main--builder-prospect-prod--sapudex.hlx.page/fragments/news/newsletter-subscription';
        newsletterFragmentLink.textContent = newsletterFragmentLink.href;
        main.querySelector('div#more-posts').append(newsletterFragmentLink);
      }

      const docFooterMetadata = [['Section Metadata'], ['location', 'document-footer']];
      const docFooterMetaTable = WebImporter.DOMUtils.createTable(docFooterMetadata, document);
      docFooterMetaTable.id = 'document-footer';

      moreSectionCards.innerHTML = '';
      moreSectionCards.append(
        document.createElement('hr'),
        wrapInParagraph(fragmentLink, document),
      );
      moreSection.append(docFooterMetaTable);
    }
  }

  // insights
  main.querySelectorAll('div.section').forEach((readMoreWrapper) => {
    if (readMoreWrapper.querySelector('h2')?.textContent.indexOf('Further reading') > -1) {
      const container = document.createElement('div');

      const detailsFragmentLink = document.createElement('a');
      detailsFragmentLink.href = 'https://main--builder-prospect-prod--sapudex.hlx.page/fragments/insights/article-details';
      detailsFragmentLink.textContent = detailsFragmentLink.href;
      container.append(
        wrapInParagraph(detailsFragmentLink, document),
        document.createElement('hr'),
      );

      const readmoreFragmentLink = document.createElement('a');
      readmoreFragmentLink.href = 'https://main--builder-prospect-prod--sapudex.hlx.page/fragments/insights/article-read-more';
      readmoreFragmentLink.textContent = readmoreFragmentLink.href;
      container.append(wrapInParagraph(readmoreFragmentLink, document));

      // insights newsletter
      main.querySelectorAll('div.section').forEach((newsletterWrapper) => {
        if (newsletterWrapper.querySelector('h2')?.textContent.match(NEWSLETTER_FILTER)) {
          const newsletterFragmentLink = document.createElement('a');
          newsletterFragmentLink.href = 'https://main--builder-prospect-prod--sapudex.hlx.page/fragments/insights/newsletter-subscription';
          newsletterFragmentLink.textContent = newsletterFragmentLink.href;
          newsletterWrapper.remove();
          container.append(wrapInParagraph(newsletterFragmentLink, document));
        }
      });

      const docFooterMetadata = [['Section Metadata'], ['location', 'document-footer']];
      const docFooterMetaTable = WebImporter.DOMUtils.createTable(docFooterMetadata, document);
      docFooterMetaTable.id = 'document-footer';
      container.append(docFooterMetaTable);
      readMoreWrapper.replaceWith(container);
    }
  });
};
export default transformMoreSection;
