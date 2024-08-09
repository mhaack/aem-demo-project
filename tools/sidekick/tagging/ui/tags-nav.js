/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-unresolved
import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import AppModel from '../model.js';

export class Header extends LitElement {
  async connectedCallback() {
    super.connectedCallback();

    this.tagCategories = AppModel.appStore.context.categories;
  }

  onClick(e) {
    const categoryItem = e.target;
    if (this.selectedItem) {
      this.selectedItem.removeAttribute('selected');
    }
    categoryItem.setAttribute('selected', true);
    this.selectedItem = categoryItem;
    this.dispatchEvent(new CustomEvent('TagGroupSelected', { bubbles: true, detail: { category: categoryItem.value } }));
  }

  render() {
    return html`
      <sp-sidenav>
        ${this.tagCategories.map((category) => html`
          <sp-sidenav-item label="${category.label}" value="${category.key}" @click="${this.onClick}">
            <sp-icon-view-all-tags slot="icon" size="s"></sp-icon-view-all-tags>
          </sp-sidenav-item>
        `)}
      </sp-side-nav>`;
  }
}

customElements.define('tagger-nav', Header);
