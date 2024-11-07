/* global WebImporter */

import { getAEMJson } from './utils.js';

// eslint-disable-next-line no-unused-vars
export default function articleCollections(main, document) {
  if (document.mappingTable && document.tagData) {
    document
      .querySelectorAll('div[data-component="NavigationChapters"]')
      .forEach((collectionNavWrapper) => {
        if (main.querySelector('table#article-collection')) {
          // some pages have multiple NavigationChapters but only one should be transformed
          collectionNavWrapper.remove();
          return;
        }

        const navJsonPath = collectionNavWrapper.getAttribute('data-model');
        if (navJsonPath) {
          const navJson = getAEMJson(navJsonPath);
          const cells = [['Collection']];
          navJson?.items?.forEach((item) => {
            const link = document.createElement('a');
            link.textContent = item.title;

            const oldUrl = `https:${item.path}`;
            const wrapper = document.createElement('div');
            const data = document.mappingTable.find((n) => n.URL === oldUrl);
            if (data) {
              const contentTypeTag = data['Content Type action:mapped'];
              if (contentTypeTag) {
                const tag = document.tagData.find((n) => n.key === contentTypeTag);
                if (tag) {
                  const eyebrow = document.createElement('h6');
                  eyebrow.textContent = tag.label;
                  wrapper.append(eyebrow);
                }
              }

              const newUrl = new URL(data['NEW URL']);
              newUrl.hostname = 'main--builder-prospect-prod--sapudex.hlx.page';
              newUrl.pathname = WebImporter.FileUtils.sanitizePath(
                newUrl.pathname.replace(/\.html$/, '').replace(/\/$/, ''),
              );
              link.href = newUrl.toString();
              wrapper.append(link);
            } else {
              link.href = item.path;
              wrapper.append(link);
            }
            cells.push([wrapper]);
          });

          collectionNavWrapper.remove();
          const docFooter = main.querySelector('table#document-footer');
          if (docFooter) {
            const entryPoint = docFooter.parentElement.querySelector('hr');
            if (entryPoint) {
              const container = document.createElement('div');
              container.id = 'sidebar';
              const heading = document.createElement('h4');
              heading.textContent = 'Read more in this series';

              const table = WebImporter.DOMUtils.createTable(cells, document);
              table.id = 'article-collection';

              const sidebarMetadata = [['Section Metadata'], ['location', 'sidebar']];
              const sidebarMetaTable = WebImporter.DOMUtils.createTable(sidebarMetadata, document);

              container.append(document.createElement('hr'), heading, table, sidebarMetaTable);
              entryPoint.before(container);
            }
          }
        }
      });
  }

  // clean up headlines
  document.querySelectorAll('h2').forEach((heading) => {
    if (heading.textContent === 'More in this series') {
      heading.remove();
    }
  });
}
