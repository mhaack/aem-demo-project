/* global WebImporter */

import { getAEMJson } from './utils.js';

function searchVideoData(tree, assetId) {
  const keys = Object.getOwnPropertyNames(tree);
  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    if (key === 'videoModel' && (!assetId || tree[key].assetId === assetId)) {
      return tree[key];
    }
    if (typeof tree[key] === 'object') {
      const result = searchVideoData(tree[key], assetId);
      if (result) {
        return result;
      }
    }
  }
  return null;
}

function getVideoPoster(imgEL) {
  const picture = imgEL.closest('picture');

  // get all sources of the picture element and return the one with the largest resolution
  if (picture) {
    const sources = picture.querySelectorAll('source');
    let largestSource = sources[0];
    sources.forEach((source) => {
      const width = parseInt(source.getAttribute('data-width'), 10);
      const largestWidth = parseInt(largestSource.getAttribute('data-width'), 10);
      if (width > largestWidth) {
        largestSource = source;
      }
    });
    imgEL.src = largestSource.srcset;
  }

  const src = imgEL.src.split('?')[0];
  imgEL.src = src;
  return imgEL;
}

// eslint-disable-next-line no-unused-vars
export default function transformVideo(main, document, html) {
  document.querySelectorAll('div[class^="EmbeddedVideoPlayer__root--"]').forEach((video) => {
    if (video.querySelector('button[class^="PlayIcon__root--"]')) {
      // handle video captions
      video.parentElement.querySelectorAll('p').forEach((elem) => {
        const captionText = elem.textContent.trim();
        elem.parentNode.insertBefore(
          WebImporter.DOMUtils.fragment(document, `<p><em>${captionText}</em></p>`),
          elem,
        );
        elem.remove();
      });
      // get video asset id from link for json search
      const assetId = video.querySelector('a')?.getAttribute('data-asset-id');

      // sample https://www.sap.com/insights/smart-manufacturing-in-the-cloud.html
      // sample https://www.sap.com/insights/viewpoints/how-todays-robotic-processes-will-spark-tomorrows-digital-assistants.html
      // sample with captions https://www.sap.com/insights/benefits-vendor-management-system.html
      // sample with multiple video's https://www.sap.com/insights/viewpoints/sap-insights-ai-predictions.html
      const container = video.closest('div[data-component="Section"]');
      if (container && container.getAttribute('data-model')) {
        const containerJsonPath = container.getAttribute('data-model');
        if (containerJsonPath) {
          const cells = [];

          const jsonData = getAEMJson(containerJsonPath);
          const videoJson = searchVideoData(jsonData, assetId);
          const videoTitle = videoJson.title;
          const videoSource = videoJson.akamaiUrl;
          const videoThumbnail = getVideoPoster(video.querySelector('img'));

          const wrapper = document.createElement('div');
          if (videoThumbnail) {
            wrapper.append(videoThumbnail);
          }

          const titleWrapper = document.createElement('p');
          const href = document.createElement('a');
          href.href = videoSource;
          href.textContent = videoTitle;
          titleWrapper.append(href);
          wrapper.append(titleWrapper);
          cells.push([wrapper]);

          const videoSubtitles = videoJson.subtitles;
          if (videoSubtitles && Array.isArray(videoSubtitles) && videoSubtitles.length > 0) {
            [...videoSubtitles].forEach((subtitle) => {
              const row = [...subtitle.split(';')];
              cells.push(row);
            });
          }

          const block = WebImporter.Blocks.createBlock(document, {
            name: 'Embed',
            cells,
          });
          video.replaceWith(block);
        }
      }
    }
  });
}
