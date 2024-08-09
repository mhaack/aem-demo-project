/* eslint-disable class-methods-use-this */
/* eslint-disable no-restricted-syntax */
// eslint-disable-next-line import/no-unresolved
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import { loadTags } from './data.js';
import AppModel from './model.js';
import { createTag } from './utils/dom.js';

class Tagger extends LitElement {
  static properties = {
    theme: undefined,
  };

  static styles = css`
    * {
      box-sizing: border-box;
    }

    sp-theme {
      height: 100%;
    }

    main {
      background-color: var(--spectrum-global-color-gray-100);
      color: var(--spectrum-global-color-gray-800);
      height: 100%;
      overflow: hidden;
      position: relative;
      display: flex;
      flex-direction: column;
    }

    main .container {
      position: relative;
      height: calc(100% - 52px);
      overflow-y: auto;
      overflow-x: hidden;
    }

    .tables-container {
      height: 700px;
      margin: 10px;
      overflow-y: auto;
    }

    .toast-container {
      display: flex;
      justify-content: center;
      z-index: 100;
    }

    .toast-container sp-toast {
      max-width: 600px;
      min-width: 200px;
      margin: 0 auto;
    }

    sp-toast {
      position: absolute;
      width: 90%;
      bottom: 10px;
    }

    sp-split-view {
      height: 100%;
    }
  `;

  async connectedCallback() {
    super.connectedCallback();
    this.getTheme();
    AppModel.init();

    window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
      this.theme = e.matches ? 'dark' : 'light';
    });

    // Set the context
    AppModel.appStore.context = this.config;
    await loadTags();

    // init empty selection
    this.selectedTags = new Map();

    const navContainer = this.renderRoot?.querySelector('.nav-container');
    const contentContainer = this.renderRoot?.querySelector('.content .tables-container');

    // init nav
    const nav = createTag('tagger-nav');
    navContainer.append(nav);
    nav.addEventListener('TagGroupSelected', (e) => {
      this.updateTagTables(contentContainer, e.detail.category);
    });

    // init tag tables
    const tables = createTag('tagger-content');
    contentContainer.append(tables);
    tables.addEventListener('TagSelected', (e) => {
      const { category, tags } = e.detail;
      this.selectedTags.set(category, tags);
      this.updateBasket();
    });

    // toast handler
    this.addEventListener('Toast', (e) => {
      const toastContainer = this.renderRoot.querySelector('.toast-container');
      const toast = createTag('sp-toast', { open: true, variant: e.detail.variant ?? 'positive', timeout: 200 });
      toast.textContent = e.detail.message ?? 'Done';
      toastContainer.append(toast);

      toast.addEventListener('close', () => {
        toastContainer?.removeChild(toast);
      });
    });
  }

  updateBasket() {
    const allTags = AppModel.appStore.context.tags;
    const selectedTags = [];

    this.selectedTags.forEach((tags) => {
      tags.forEach((tag) => {
        const t = allTags.find((filterTag) => filterTag.key === tag);
        selectedTags.push(t);
      });
    });

    const basket = this.renderRoot?.querySelector('.content .basket');
    basket.firstElementChild.selectedTags = selectedTags;
  }

  updateTagTables(contentContainer, categoryKey) {
    const tables = contentContainer.firstElementChild;
    tables.shadowRoot.querySelectorAll('tagger-table').forEach((table) => {
      const tableId = table.getAttribute('category');
      if (tableId !== categoryKey) {
        table.style.display = 'none';
      } else {
        table.style.display = 'block';
      }
    });
  }

  getTheme() {
    this.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  render() {
    return html`
      <sp-theme theme="spectrum" color=${this.theme} scale="medium">
        <main>
          <tagger-header></tagger-header>
          <sp-divider size="s" dir="ltr" role="separator"></sp-divider>
          <sp-split-view primary-size="200" dir="ltr" splitter-pos="200" resizable>
            <div class="menu">
              <div class="nav-container"></div>
            </div>
            <div class="content">
              <div class="tables-container"></div>
              <sp-divider size="s" dir="ltr" role="separator"></sp-divider>
              <div class="basket">
                <tagger-basket></tagger-basket>
              </div>
            </div>
          </sp-split-view>
          <div class="toast-container"></div>
        </main>
      </sp-theme>
    `;
  }
}

customElements.define('sidekick-tagger', Tagger);
