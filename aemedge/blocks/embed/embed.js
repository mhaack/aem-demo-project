import('@udex/webcomponents/dist/MediaPlayer.js');

const SAP_DAM_DOMAIN = 'dam.sap.com';

const getPlayerConfig = (link) => {
  const youtubeId = link.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/,
  );
  if (youtubeId) {
    return {
      width: '100%',
      'aspect-ratio': '16:9',
      source: `https://www.youtube-nocookie.com/embed/${youtubeId[1]}?rel=0&autoplay=1`,
    };
  }

  const vimeoId = link.match(/(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com)\/(?:video\/)?(.+)/);
  if (vimeoId) {
    return {
      width: '100%',
      'aspect-ratio': '16:9',
      source: `https://player.vimeo.com/video/${vimeoId[1]}?dnt=1&autoplay=1`,
    };
  }

  if (link.indexOf(SAP_DAM_DOMAIN) > -1) {
    return {
      source: link,
      type: 'application/x-mpegURL',
      'aspect-ratio': '16:9',
    };
  }

  return {
    source: link,
  };
};

const getPlayerSubtitles = (block) => {
  block.firstElementChild.remove();
  if (block.childElementCount > 0) {
    return [...block.children].map((child) => {
      const track = document.createElement('track');
      track.setAttribute('kind', 'subtitles');
      track.setAttribute('srclang', child.querySelector('div:first-child').textContent);
      track.setAttribute('label', child.querySelector('div:nth-child(2)').textContent);
      track.setAttribute('src', child.querySelector('div:last-child').textContent);
      return track;
    });
  }
  return null;
};

export default function decorate(block) {
  const placeholder = block.querySelector('picture');
  const link = block.querySelector('a').href;
  const playerConfig = getPlayerConfig(link);
  const subtitles = getPlayerSubtitles(block);

  function setPlayerHeight(element) {
    const ratio16by9 = 0.5625;

    if (element) {
      let ratio = ratio16by9;
      const elementRatio = element.getAttribute('aspect-ratio')?.split(':');

      if (elementRatio && elementRatio.length === 2) {
        ratio = elementRatio[1] / elementRatio[0];
      }

      element.setAttribute('height', element.getBoundingClientRect().width * ratio);
    }
  }

  function initPlayerHeight(element) {
    setTimeout(() => setPlayerHeight(element), 100);

    window.addEventListener('resize', () => {
      setPlayerHeight(element);
    });
  }

  block.textContent = '';
  const player = document.createElement('udex-media-player');
  if (placeholder) {
    player.setAttribute('poster', placeholder.querySelector('img').src);
  }

  // for each key in playerConfig, set the attribute on the player
  Object.keys(playerConfig).forEach((key) => {
    player.setAttribute(key, playerConfig[key]);
  });

  // if subtitles exist, append them to the player
  if (subtitles) {
    subtitles.forEach((track) => {
      player.appendChild(track);
    });
  }

  // set element height according to aspect ratio attribute in YouTube and Vimeo videos
  if (player.getAttribute('aspect-ratio') && link.indexOf(SAP_DAM_DOMAIN) === -1) {
    if (player.getAttribute('_allow-iframe-load')) {
      // no poster image, video is shown directly
      initPlayerHeight(player);
    } else {
      // video is shown after clicking on poster image
      const callback = (mutationList) => {
        mutationList.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === '_allow-iframe-load') {
            initPlayerHeight(player);
          }
        });
      };

      // observe video initialisation
      const observer = new MutationObserver(callback);
      observer.observe(player, { attributes: true });
    }
  }

  block.append(player);
}
