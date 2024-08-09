/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-unresolved
import { LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import AppModel from '../model.js';
import { createTag } from '../utils/dom.js';

export class TagTables extends LitElement {
  async connectedCallback() {
    super.connectedCallback();
    this.tagCategories = AppModel.appStore.context.categories;

    this.tagCategories.forEach((category) => {
      this.renderRoot?.append(
        createTag('tagger-table', { category: category.key, categoryLabel: category.label, style: 'display: none;' }),
      );
    });
    this.renderRoot.firstChild.style.display = 'block';
  }
}

customElements.define('tagger-content', TagTables);
