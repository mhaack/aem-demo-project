/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-unresolved
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export class TagBasket extends LitElement {
  static properties = {
    selectedTags: { type: Array },
  };

  static styles = css`
    .container {
      display: block;
      margin: 10px
    }
    .container sp-button {
      margin-top: 10px;
      width: fit-content;
    }
    .container sp-tags {
      display: block;
    }
  `;

  onCopy() {
    const tags = this.selectedTags.map((tag) => tag.key).join(', ');
    navigator.clipboard.writeText(tags);
    this.getRootNode().host.dispatchEvent(new CustomEvent('Toast', { detail: { message: 'Copied Tags' } }));
  }

  renderCopyButton(enabled = false) {
    return html` <sp-button @click="${this.onCopy}" ?disabled="${!enabled}"> Copy </sp-button> `;
  }

  render() {
    if (this.selectedTags !== undefined && this.selectedTags.length > 0) {
      return html`
        <div class="container">
          <sp-tags>
            ${this.selectedTags.map((tag) => html`<sp-tag key="${tag.key}">${tag.label}(${tag.key})</sp-tag>`)}
          </sp-tags>
          ${this.renderCopyButton(true)}
        </div>
      `;
    }
    return html`<div class="container">${this.renderCopyButton()}</div>`;
  }
}

customElements.define('tagger-basket', TagBasket);
