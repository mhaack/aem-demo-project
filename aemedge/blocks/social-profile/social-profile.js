export default function decorate(block) {
  block.querySelectorAll('a').forEach((link) => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    link.setAttribute('aria-label', link.querySelector('[data-icon-name]')?.getAttribute('data-icon-name'));

    if (link.href.indexOf('mailto:') === 0) {
      link.setAttribute('target', '_self');
      link.href = `mailto:subject=${encodeURIComponent(document.title)}&body=${encodeURIComponent(window.location.href)}&source=social-atw-mailto`;
    }
  });
}
