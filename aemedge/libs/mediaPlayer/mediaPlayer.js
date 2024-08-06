import('@udex/webcomponents/dist/MediaPlayer.js');

const SAP_DAM_DOMAIN = 'dam.sap.com';

export default class MediaPlayer {
  /**
   * @param {string} link
   * @param {HTMLPictureElement} [placeholder]
   * @param {HTMLTrackElement[]} subtitles
   * @param {number} aspectRatio
   */
  constructor(link, placeholder, subtitles = [], aspectRatio = 0.5625) {
    this.placeholder = placeholder;
    this.subtitles = subtitles;
    this.link = link;
    this.aspectRatio = aspectRatio;
    this.playerConfig = this.getPlayerConfig();
  }

  /**
   * @private
   * @return {{'aspect-ratio'?: string, width?: string, source: string, type?: string}}
   */
  getPlayerConfig() {
    const youtubeId = this.link.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/,
    );
    if (youtubeId) {
      return {
        width: '100%',
        'aspect-ratio': '16:9',
        source: `https://www.youtube-nocookie.com/embed/${youtubeId[1]}?rel=0&autoplay=1`,
      };
    }

    const vimeoId = this.link.match(/(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(?:video\/)?(.+)/);
    if (vimeoId) {
      return {
        width: '100%',
        'aspect-ratio': '16:9',
        source: `https://player.vimeo.com/video/${vimeoId[1]}?dnt=1&autoplay=1`,
      };
    }

    if (this.link.indexOf(SAP_DAM_DOMAIN) > -1) {
      return {
        source: this.link,
        type: this.link.indexOf('.m3u8') > -1 ? 'application/x-mpegURL' : 'video/mp4',
        'aspect-ratio': '16:9',
      };
    }

    return {
      source: this.link,
    };
  }

  /**
   * @return {HTMLElement}
   */
  render() {
    const player = document.createElement('udex-media-player');
    if (this.placeholder) {
      player.setAttribute('poster', this.placeholder.querySelector('img').src);
    }

    Object.keys(this.playerConfig).forEach((key) => {
      player.setAttribute(key, this.playerConfig[key]);
    });

    // if subtitles exist, append them to the player
    if (this.subtitles) {
      this.subtitles.forEach((track) => {
        player.appendChild(track);
      });
    }

    return player;
  }
}
