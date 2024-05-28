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

function setActiveLink(nav, selected) {
  const selectedLabel = selected.querySelector('span');

  const links = nav.querySelectorAll('.toc li');
  links.forEach((link) => {
    const anchor = link.querySelector('a');
    const linkHash = anchor?.hash;
    const isH3 = anchor?.classList.contains('toc__h3-link');
    const linkMatch = linkHash === window.location.hash;
    if (linkMatch) {
      selectedLabel.innerHTML = anchor.innerText;
      link.setAttribute('aria-current', 'true');
      if (isH3) {
        expand(link.closest('.toc__list-item.parent'));
      } else if (link.classList.contains('parent')) {
        expand(link);
      }
    } else {
      link.setAttribute('aria-current', 'false');
      collapse(link);
    }
  });
}

function buildListItemLink(header) {
  return a({
    href: `#${header.id}`,
    class: `toc__${header.tagName.toLowerCase()}-link`,
  }, header.innerText);
}

function buildListItemContent(header) {
  return div(
    { class: 'toc__list-item__content' },
    span({ class: 'toc__list-item__spacer' }),
    buildListItemLink(header),
  );
}

function buildListItem(header, subheaders) {
  const hasSubheaders = subheaders && subheaders.length > 0;
  return li(
    { class: `toc__list-item ${hasSubheaders ? 'parent' : ''}` },
    buildListItemContent(header),
    hasSubheaders ? ol(
      { class: 'toc__list' },
      ...subheaders.map(
        (subheader) => li(
          { class: 'toc__list-item' },
          buildListItemContent(subheader),
        ),
      ),
    ) : '',
  );
}

function buildList(headers) {
  const tocList = ol({ class: 'toc__list', id: 'toc' });
  let currentParentHeader;
  let subheaders = [];
  headers.forEach((header, index) => {
    const isH2 = header.tagName === 'H2';
    if (isH2 && currentParentHeader) {
      tocList.appendChild(buildListItem(currentParentHeader, subheaders));
      currentParentHeader = header;
      subheaders = [];
    } else if (isH2) {
      currentParentHeader = header;
      subheaders.forEach((subheader) => tocList.appendChild(buildListItem(subheader, [])));
      subheaders = [];
    } else {
      subheaders.push(header);
    }
    if (index === headers.length - 1) {
      if (currentParentHeader) {
        tocList.appendChild(buildListItem(currentParentHeader, subheaders));
      } else {
        subheaders.forEach((subheader) => tocList.appendChild(buildListItem(subheader, [])));
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

export default async function decorate(block) {
  const mainContent = document.querySelectorAll(
    'main > .section:not(.hero-container, .toc-container, .section[data-location="sidebar"], .section[data-location="document-footer"]) .default-content-wrapper',
  );
  const headers = mainContent ? Array.from(mainContent).reduce((acc, currentSection) => {
    acc.push(...currentSection.querySelectorAll('h2, h3'));
    return acc;
  }, []) : [];
  if (headers.length > 0) {
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
      buildList(headers),
    );
    block.append(tocElement);

    setActiveLink(selected, tocElement);
    addClickHandlerToSelectedItem(selected);
    addClickHandlerToDocument(tocElement, selected);
    addEscKeyHandler(tocElement, selected);
    addFocusOutHandler(tocElement, selected);

    window.addEventListener('hashchange', setActiveLink);
  }
}
