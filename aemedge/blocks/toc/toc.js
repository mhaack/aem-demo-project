import {
  h2, ol, li, span, a, div, button, nav as navBuilder,
} from '../../scripts/dom-builder.js';
import { fetchPlaceholders, getMetadata, toCamelCase } from '../../scripts/aem.js';

function collapse(collapsable) {
  if (collapsable) {
    collapsable.setAttribute('aria-expanded', 'false');
  }
}

function expand(expandable) {
  if (expandable) {
    expandable.setAttribute('aria-expanded', 'true');
  }
}

function buildListItemLink(heading) {
  return a({
    href: `#${heading.id}`,
    class: `toc__${heading.tagName.toLowerCase()}-link`,
  }, heading.innerText);
}

function buildListItemContent(heading) {
  return div(
    { class: 'toc__list-item__content' },
    span({ class: 'toc__list-item__spacer' }),
    buildListItemLink(heading),
  );
}

function buildListItem(heading, subheadings) {
  const hasSubheadings = subheadings && subheadings.length > 0;
  return li(
    { class: `toc__list-item ${hasSubheadings ? 'parent' : ''}` },
    buildListItemContent(heading),
    hasSubheadings ? ol(
      { class: 'toc__list' },
      ...subheadings.map(
        (subheading) => li(
          { class: 'toc__list-item' },
          buildListItemContent(subheading),
        ),
      ),
    ) : '',
  );
}

function buildList(headings) {
  const tocList = ol({ class: 'toc__list', id: 'toc' });
  let currentParentHeading;
  let subheadings = [];
  headings.forEach((heading, index) => {
    const isH2 = heading.tagName === 'H2';
    if (isH2 && currentParentHeading) {
      tocList.appendChild(buildListItem(currentParentHeading, subheadings));
      currentParentHeading = heading;
      subheadings = [];
    } else if (isH2) {
      currentParentHeading = heading;
      subheadings.forEach((subheading) => tocList.appendChild(buildListItem(subheading, [])));
      subheadings = [];
    } else {
      subheadings.push(heading);
    }
    if (index === headings.length - 1) {
      if (currentParentHeading) {
        tocList.appendChild(buildListItem(currentParentHeading, subheadings));
      } else {
        subheadings.forEach((subheading) => tocList.appendChild(buildListItem(subheading, [])));
      }
    }
  });
  return tocList;
}

function addClickHandlerToSelectedItem(selected) {
  selected.addEventListener('click', () => {
    const listHidden = selected.getAttribute('aria-expanded') === 'false';
    if (listHidden) {
      expand(selected);
    } else {
      collapse(selected);
    }
  });
}

function addClickHandlerToDocument(tocElement, selected) {
  document.addEventListener('click', (event) => {
    const isClickInsideTOC = tocElement.contains(event.target);
    if (!isClickInsideTOC) {
      collapse(selected);
    }
  });
}

function addEscKeyHandler(tocElement, selected) {
  tocElement.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      collapse(selected);
    }
  });
}

function addFocusOutHandler(tocElement, selected) {
  tocElement.addEventListener('focusout', (event) => {
    const leavingParent = !tocElement.contains(event.relatedTarget);

    if (leavingParent) {
      collapse(selected);
    }
  });
}

/**
 * @private
 * @param {HTMLElement} tocElement
 * @param {HTMLElement[]} headings
 * @param {HTMLElement} selected
 */
function addScrollHandler(tocElement, headings, selected) {
  const links = Array.from(tocElement.querySelectorAll('li'));

  if (!headings || !links || headings.length === 0 || links.length === 0) {
    return;
  }

  const linkDetails = Array.from(links).map((link) => {
    const anchor = link.querySelector('a');
    const closestParent = link.closest('.toc__list-item.parent');
    return {
      anchor,
      closestParent,
      link,
      isParent: link.classList.contains('parent'),
    };
  });

  const selectedLabel = selected.querySelector('span');

  const throttle = (callbackFn, limit) => {
    let wait = false;
    return () => {
      if (!wait) {
        callbackFn.call();
        wait = true;
        setTimeout(() => {
          wait = false;
        }, limit);
      }
    };
  };

  const cleanup = (activeLinkDetail) => {
    linkDetails.forEach((linkDetail) => {
      if (activeLinkDetail && linkDetail === activeLinkDetail) {
        return;
      }
      const { link, closestParent, isParent } = linkDetail;
      link.setAttribute('aria-current', 'false');
      if (isParent) {
        collapse(link);
      }
      if (closestParent !== activeLinkDetail) {
        collapse(closestParent);
      }
    });
  };

  window.addEventListener('scroll', throttle(() => {
    // Headings have scroll margin of 40px, allow 1px grace
    const boundary = Math.ceil(window.scrollY + 41);
    const { scrollTop } = document.documentElement;

    for (let i = headings.length - 1; i >= 0; i -= 1) {
      if (boundary >= Math.floor(headings[i].getBoundingClientRect().top + scrollTop)) {
        const linkDetail = linkDetails[i];
        cleanup(linkDetail);

        const {
          anchor, link, closestParent, isParent,
        } = linkDetail;
        link.setAttribute('aria-current', 'true');
        selectedLabel.innerHTML = anchor.innerText;

        expand(closestParent);
        if (isParent) {
          expand(link);
        }
        break;
      }
    }
  }, 150));
}

export default async function decorate(block) {
  /*
  Exclude content in hero, TOC, sidebar, and doc footer.

  Ignore .default-content-wrapper elements that are not direct children of sections as these could
  be part of a block.

  Ignore headings that are not direct children of .default-content-wrapper as these could be part
  of a block.
  */
  const mainSections = document.querySelectorAll('main > .section:not(.hero-container, .toc-container, [data-location="sidebar"], [data-location="document-footer"], [data-location="document-header"])');
  const fragmentSections = Array.from(mainSections).reduce((acc, currentSection) => {
    acc.push(...currentSection.querySelectorAll('.section'));
    return acc;
  }, []);
  const headings = [...Array.from(mainSections), ...Array.from(fragmentSections)]
    .reduce((acc, currentSection) => {
      acc.push(...currentSection.querySelectorAll(':scope > .default-content-wrapper > :is(h2, h3)'));
      return acc;
    }, []);
  if (headings.length > 0) {
    const placeholders = await fetchPlaceholders();
    const heading = getMetadata('toc-heading') || placeholders[toCamelCase('toc-heading')];
    const selected = button({
      class: 'toc__selected', 'aria-expanded': 'false', 'aria-haspopup': 'true', 'aria-controls': 'toc', 'aria-label': 'Table of Contents',
    }, span(heading));
    const tocElement = navBuilder(
      {
        class: 'toc', role: 'navigation', 'aria-label': 'In page',
      },
      h2(heading),
      selected,
      buildList(headings),
    );
    block.append(tocElement);

    addClickHandlerToSelectedItem(selected);
    addClickHandlerToDocument(tocElement, selected);
    addEscKeyHandler(tocElement, selected);
    addFocusOutHandler(tocElement, selected);
    addScrollHandler(tocElement, headings, selected);
  }
}
