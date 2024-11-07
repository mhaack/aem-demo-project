/* global WebImporter */
const transformVideoHero = (main, document) => {
  const heading = document.querySelector('section#main > article.sap-tv h1');
  if (heading) {
    const wrapper = document.createElement('div');

    // get hero image from video thumbnail
    const videoThumbnail = document.querySelector('section#main > article.sap-tv > div.flex-video img');
    if (videoThumbnail) {
      wrapper.append(videoThumbnail.cloneNode(true));
    }
    wrapper.append(heading);

    const block = WebImporter.Blocks.createBlock(document, {
      name: 'Hero',
      cells: [[wrapper]],
    });

    main.insertBefore(block, main.firstChild);
  }
};
export default transformVideoHero;
