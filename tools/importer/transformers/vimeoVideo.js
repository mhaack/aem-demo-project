/* global WebImporter */
// eslint-disable-next-line no-unused-vars
export default function transformVimeoVideo(main, document, html) {
  const videos = document.querySelectorAll(
    'div.flex-video, figure.is-provider-vimeo, section[data-inpsyde-embed="vimeo-com"]',
  );
  videos.forEach((video) => {
    const link = video.querySelector('a[rel=noreferrer]');

    if (link && link.href.indexOf('vimeo.com') !== -1) {
      const linkWrapper = document.createElement('p');
      const { href } = link;
      linkWrapper.append(href);

      const placeholder = video.querySelector(
        'div[data-inpsyde-embed-preview="vimeo-com"] > img',
      );
      const wrapper = document.createElement('div');
      if (placeholder) {
        wrapper.append(placeholder);
      }
      wrapper.append(linkWrapper);
      const block = [['Embed'], [wrapper]];
      const table = WebImporter.DOMUtils.createTable(block, document);
      video.replaceWith(table);
    }
  });
}
