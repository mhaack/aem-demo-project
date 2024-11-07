// eslint-disable-next-line no-unused-vars
export default function preProcessAuthorH1(main, document, html, params, url) {
  document.authorProfileH1 = document.querySelector('h1.c-heading');
}
