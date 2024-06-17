import('@udex/webcomponents/dist/MediaPlayer.js');

const getPlayerConfig = (link) => {
  const youtubeId = link.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/,
  );
  if (youtubeId) {
    return {
      width: '640',
      height: '360',
      source: `https://www.youtube-nocookie.com/embed/${youtubeId[1]}?rel=0&autoplay=1`,
    };
  }

  const vimeoId = link.match(/(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com)\/(?:video\/)?(.+)/);
  if (vimeoId) {
    return {
      width: '640',
      height: '360',
      source: `https://player.vimeo.com/video/${vimeoId[1]}?dnt=1&autoplay=1`,
    };
  }

  if (link.indexOf('dam.sap.com') > -1) {
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

  block.append(player);
}
