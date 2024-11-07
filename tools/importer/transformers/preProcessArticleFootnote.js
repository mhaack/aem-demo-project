export default function preProcessArticleFootnote(main, document) {
  const hrLine = document.querySelector('section#main > article div.entry-content hr');
  if (hrLine && !hrLine.parentElement.classList.contains('callout')) {
    const previous = hrLine.previousElementSibling;
    if (previous && previous.tagName === 'P' && previous.classList.contains('lead')) return;
    const wrapper = document.createElement('div');
    wrapper.classList.add('footnote-wrapper');
    let siblingElement = hrLine.nextElementSibling;
    while (siblingElement) {
      const current = siblingElement;
      if (current.tagName === 'DIV' && current.classList.contains('cta-banner')) break;
      wrapper.append(current.cloneNode(true));
      siblingElement = current.nextElementSibling;
      current.remove();
    }

    if (wrapper.children.length > 0) {
      hrLine.replaceWith(wrapper);
    }
  }
}
