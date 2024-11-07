/* global WebImporter */

// often Insight headings are wrapped in strong tag which must be removed

const cleanUpHeadings = (main) => {
  // example: https://www.sap.com/insights/viewpoints/measuring-social-impact-s-in-esg.html
  let tags = [...main.querySelectorAll('h1, h2, h3, h4, h5, h6')];
  for (let i = tags.length - 1; i >= 0; i -= 1) {
    const tag = tags[i];
    if (!tag.closest('table')) {
      tag.querySelectorAll('strong, b, i').forEach((el) => {
        el.replaceWith(WebImporter.DOMUtils.fragment(document, el.innerHTML));
      });
      if (tag.innerHTML === '') {
        tag.remove();
      }
    }
  }

  // change all h4, h5, h6 to h3
  tags = [...main.querySelectorAll('h4, h5, h6')];
  for (let i = tags.length - 1; i >= 0; i -= 1) {
    const tag = tags[i];
    if (!tag.closest('table') && !tag.closest('div#sidebar')) {
      const newTag = document.createElement('h3');
      newTag.innerHTML = tag.innerHTML;
      tag.replaceWith(newTag);
    }
  }

  // change all h3, but only if there are 'o''2'and only the once that are not in a block
  tags = [...main.querySelectorAll('h3')];
  for (let i = tags.length - 1; i >= 0; i -= 1) {
    const tag = tags[i];
    if (!tag.closest('table')) {
      const newTag = document.createElement('h2');
      newTag.innerHTML = tag.innerHTML;
      tag.replaceWith(newTag);
    }
  }
};

export default cleanUpHeadings;
