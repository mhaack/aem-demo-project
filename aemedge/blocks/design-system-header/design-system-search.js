import {
  button,
  fieldset,
  form,
  input,
  span,
} from '../../scripts/dom-builder.js';

/**
 * Add the search form.
 * TODO: Search implementation is WIP
 * @param mastheadSearch {HTMLElement} The search section.
 */
function addSearchForm(mastheadSearch) {
  const searchForm = form({
    action: '/search',
    class: 'search-form',
    id: 'search-form',
    name: 'search-form',
    method: 'get',
  });

  const searchInput = fieldset({
    class: 'search-form-fieldset search-form-fieldset-input',
  }, input({
    class: 'search-input',
    id: 'search-input',
    name: 'q',
    placeholder: 'Search',
    type: 'search',
  }));

  // TODO: Reset button and voice search button (Frontify)
  // TODO: Reset button only visible when input is not empty (+ aria-hidden)
  // const searchFormButtons = fieldset({
  //   class: 'search-form-fieldset search-form-fieldset-buttons',
  // }, button({
  //   class: 'search-form-btn search-form-reset-btn',
  //   label: 'Reset',
  //   type: 'reset',
  //   onclick: () => {
  //     document.getElementById('search-input').focus();
  //   },
  // }, span({
  //   class: 'icon icon-x',
  // })), button({
  //   class: 'search-form-btn search-form-submit-btn',
  //   label: 'Voice Search',
  //   type: 'submit',
  // }, span({
  //   class: 'icon icon-microphone',
  // })), button({
  //   class: 'search-form-btn search-form-submit-btn',
  //   label: 'Search',
  //   type: 'submit',
  // }, span({
  //   class: 'icon icon-search',
  // })));

  const searchFormButtons = fieldset({
    class: 'search-form-fieldset search-form-fieldset-buttons',
  }, button({
    class: 'search-form-btn search-form-submit-btn',
    label: 'Search',
    type: 'submit',
  }, span({
    class: 'icon icon-search',
  })));

  searchForm.appendChild(searchInput);
  searchForm.appendChild(searchFormButtons);
  mastheadSearch.appendChild(searchForm);
}

export default async function init(block, mastheadSearch) {
  addSearchForm(mastheadSearch);
}
