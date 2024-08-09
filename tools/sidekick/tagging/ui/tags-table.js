/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-unresolved
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import AppModel from '../model.js';

export class TagTable extends LitElement {
  static properties = {
    category: { type: String },
    categoryLabel: { type: String },
    tags: { type: Array },
    filter: { type: String },
    selected: { type: Array },
  };

  static styles = css`
    .tag-table {
      height: 500px;
      margin: 10px;
    }
    .search {
      padding: 10px 10px;
    }

    .search sp-search {
      width: 100%;
    }
  `;

  constructor() {
    super();

    if (this.tags === undefined) {
      this.tags = AppModel.appStore.context.tags;
    }
    this.displayTags = this.tags;
  }

  onChange(e) {
    this.getRootNode().host.dispatchEvent(new CustomEvent('TagSelected', { bubbles: true, detail: { category: this.category, tags: e.target.selected } }));
    this.requestUpdate();
  }

  onSearchInput(e) {
    const filter = e.target.value;
    if (filter && filter.length > 2) {
      this.filter = filter;
    } else {
      this.filter = '';
    }
  }

  render() {
    const displayTags = this.tags.filter((tag) => tag.key.startsWith(this.category));
    displayTags.forEach((tag) => {
      if (this.filter && !tag.label.toLowerCase().includes(this.filter.toLowerCase())) {
        tag.style = 'display: none;';
      } else {
        tag.style = '';
      }
    });
    const selectMode = displayTags[0]?.selection === 'single' ? 'single' : 'multiple';
    const selected = this.selected || [];

    return html`
      <div class="search" @input=${this.onSearchInput}>
        <sp-search placeholder="Search ${this.categoryLabel} tags"></sp-search>
      </div>
      <sp-table id="table-${this.category}" scroller="true" selects="${selectMode}" selected="${JSON.stringify(selected)}" @change="${this.onChange}">
        <sp-table-head>
          <sp-table-head-cell>Tag</sp-table-head-cell>
          <sp-table-head-cell>Key</sp-table-head-cell>
        </sp-table-head>
        <sp-table-body>
        ${displayTags.map((tag) => html`
            <sp-table-row value="${tag.key}" style="${tag.style}">
                <sp-table-cell>${tag.label}</sp-table-cell>
                <sp-table-cell>${tag.key}</sp-table-cell>
            </sp-table-row>`)}
        </sp-table-body>
      </sp-table>
    `;
  }
}

customElements.define('tagger-table', TagTable);
