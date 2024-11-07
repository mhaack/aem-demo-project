/* global WebImporter */
const promoHelper = (headline, button) => {
  const heading = document.createElement('h3');
  heading.textContent = headline;
  button.textContent = 'Learn more';

  const strong = document.createElement('strong');
  strong.append(button);

  const container = document.createElement('div');
  container.append(heading, strong);

  return WebImporter.Blocks.createBlock(document, {
    name: 'Promo',
    cells: [[container.outerHTML]],
  });
};

const articleSidebar = (main, document) => {
  const sidebarElements = document.querySelector(
    'section#main > aside div.related-content-container',
  );
  if (sidebarElements) {
    const entryContentDiv = document.querySelector('section#main > article > div.entry-content');
    let contentEntryPoints = [
      ...entryContentDiv.querySelectorAll('h3'),
      ...entryContentDiv.querySelectorAll('h2'),
    ];
    if (contentEntryPoints?.length === 0) {
      // if the document has no headings, use paragraphs as entry points
      contentEntryPoints = [...entryContentDiv.querySelectorAll('p')];
    }

    // move first promo before the first heading in the text
    const firstEntry = sidebarElements.querySelector('ul[data-position="top"] > li');
    if (firstEntry) {
      contentEntryPoints[0].before(
        promoHelper(firstEntry.querySelector('a').textContent, firstEntry.querySelector('a')),
      );
    }

    // move second promo somewhere in the middle of the text
    const middleEntry = sidebarElements.querySelector('ul[data-position="middle"] > li');
    if (middleEntry) {
      if (middleEntry.querySelector('a[href*="sap-news-center-newsletter"]')) {
        middleEntry.remove();
        // const newsletterFragmentLink = document.createElement('a');
        // newsletterFragmentLink.href = 'https://main--builder-prospect-prod--sapudex.hlx.page/fragments/news/newsletter-subscription';
        // newsletterFragmentLink.textContent = newsletterFragmentLink.href;
        // main.querySelector('div#more-posts').append(newsletterFragmentLink);
      } else {
        contentEntryPoints[Math.floor(contentEntryPoints.length / 2)].after(
          promoHelper(middleEntry.querySelector('a').textContent, middleEntry.querySelector('a')),
        );
      }
    }

    const bottomEntry = sidebarElements.querySelector('ul[data-position="bottom"] > li');
    if (bottomEntry) {
      if (bottomEntry.querySelector('a[href*="sap-news-center-newsletter"]')) {
        bottomEntry.remove();
        // const newsletterFragmentLink = document.createElement('a');
        // newsletterFragmentLink.href = 'https://main--builder-prospect-prod--sapudex.hlx.page/fragments/news/newsletter-subscription';
        // newsletterFragmentLink.textContent = newsletterFragmentLink.href;
        // main.querySelector('div#more-posts').append(newsletterFragmentLink);
      } else {
        // keep it in the content as last element
        contentEntryPoints[0]
          .closest('div.entry-content')
          .append(
            promoHelper(bottomEntry.querySelector('a').textContent, bottomEntry.querySelector('a')),
          );
      }
    }
    sidebarElements.remove();
  }
};
export default articleSidebar;
