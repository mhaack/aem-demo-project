import MediaPlayer from '../../libs/mediaPlayer/mediaPlayer.js';

const getPlayerSubtitles = (block) => {
  block.firstElementChild.remove();
  if (block.childElementCount > 0) {
    return [...block.children].map((child) => {
      if (child.textContent.trim() === '') return null;
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
  const subtitles = getPlayerSubtitles(block);

  block.textContent = '';
  block.append(new MediaPlayer(link, placeholder, subtitles).render());
}
