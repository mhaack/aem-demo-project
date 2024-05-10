export default function decorate(block) {
  const linkDiv = block.querySelector(':scope > div:last-child');
  const href = linkDiv.querySelector('a')?.href;
  linkDiv.parentElement.removeChild(linkDiv);

  const observer = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      observer.disconnect();
      if (block.classList.contains('embed-is-loaded')) {
        return;
      }

      block.innerHTML = `<iframe
      src="${new URL(href).href}"
       scrolling="no"
        frameborder="0"
      ></iframe>`;
      block.classList.add('embed-is-loaded');
    }
  });
  observer.observe(block);
}
