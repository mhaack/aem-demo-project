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

      block.innerHTML = `<div class="figma-embed-container">
      <iframe 
      src="https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(href)}"
       style=""
        width="800" 
        height="450"
        allowfullscreen
      ></iframe>
      </div>`;
      block.classList.add('embed-is-loaded');
    }
  });
  observer.observe(block);
}
