/* global WebImporter */

const rewriteNewsUrls = (main, document) => {
  // get all relative SAP insights URLs of the content area
  main.querySelectorAll('a[href^="//www.sap.com/insights"][target="_self"]').forEach((aEl) => {
    if (document.mappingTable) {
      const oldUrl = `https:${aEl.getAttribute('href')}`;
      const data = document.mappingTable.find((n) => n.URL === oldUrl);
      if (data) {
        const newUrl = new URL(data['NEW URL']);
        newUrl.hostname = 'main--builder-prospect-prod--sapudex.hlx.page';
        newUrl.pathname = WebImporter.FileUtils.sanitizePath(newUrl.pathname.replace(/\.html$/, '').replace(/\/$/, ''));
        aEl.href = newUrl.toString();
      }
    }
  });

  // get all URLs without a protocol and add https
  main.querySelectorAll('a[href^="//"]').forEach((aEl) => {
    aEl.href = `https:${aEl.getAttribute('href')}`;
  });
};

export default rewriteNewsUrls;
