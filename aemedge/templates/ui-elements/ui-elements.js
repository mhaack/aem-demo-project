import { loadCSS } from '../../scripts/aem.js';

export default function decorate() {
  loadCSS(`${window.hlx.codeBasePath}/templates/web-component/web-component.css`);
}
