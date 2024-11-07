const rewriteNewsUrls = (main) => {
  // get all relative URLs of the content area
  main.querySelectorAll('div#content a[href^="/"').forEach((aEl) => {
    if (aEl.pathname.startsWith('/tags/')) {
      aEl.pathname = aEl.pathname.replace('/tags/', '/topics/');
    }

    // remove trailing slash
    if (aEl.pathname.endsWith('/')) {
      aEl.pathname = aEl.pathname.slice(0, -1);
    }

    // prepend with /news
    if (aEl.pathname.startsWith('/20')) {
      aEl.pathname = `/news${aEl.pathname}`;
    }
  });

  // rewrite all importer relative URLs to the correct domain
  [...main.querySelectorAll('div#content a')].forEach((aEl) => {
    const href = aEl.getAttribute('href');
    if (href?.startsWith('http://localhost:3001')) {
      const u = new URL(aEl.pathname, 'https://main--builder-prospect-prod--sapudex.hlx.page');
      aEl.href = u.toString();
    }
  });
};

export default rewriteNewsUrls;
