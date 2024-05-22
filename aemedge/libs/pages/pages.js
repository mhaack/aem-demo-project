/* eslint-disable class-methods-use-this */
import {
  p, div, span, label,
} from '../../scripts/dom-builder.js';
import { loadCSS } from '../../scripts/aem.js';
import Button from '../button/button.js';

export default class Pages {
  constructor(block, totalPages, currentPage = 1) {
    this.block = block;
    this.id = block.getAttribute('data-block-name');
    this.totalPages = totalPages;
    this.currentPage = currentPage;
  }

  getActionButton(icon, isDisabled) {
    const actionButton = new Button('', icon, 'secondary', 'medium').render(isDisabled);
    actionButton.addEventListener('click', () => {
      let direction = 'forward';
      if (icon === 'icon-slim-arrow-left') {
        direction = 'reverse';
        if (this.currentPage > 1) {
          this.currentPage -= 1;
        }
      } else if (icon === 'icon-slim-arrow-right') {
        if (this.currentPage < this.totalPages) {
          this.currentPage += 1;
        }
      }
      const event = new CustomEvent('sap:pageChange', {
        detail: {
          id: this.id,
          type: 'pages',
          current: this.currentPage,
          total: this.totalPages,
          direction,
        },
        bubbles: true,
        cancelable: true,
      });
      actionButton.dispatchEvent(event);
    });
    return actionButton;
  }

  getElement() {
    return div(
      { class: 'pages' },
      this.getActionButton('icon-slim-arrow-left', this.currentPage === 1),
      p(
        { class: 'page' },
        span({ class: 'current' }, this.currentPage),
        label('of'),
        span({ class: 'total' }, this.totalPages),
      ),
      this.getActionButton('icon-slim-arrow-right', this.currentPage === this.totalPages),
    );
  }

  updatePages(totalPages, currentPage) {
    if (currentPage) this.currentPage = currentPage;
    this.totalPages = totalPages;
    this.block.querySelector('.pages').remove();
    this.block.append(this.getElement());
  }

  render(excludeStyles) {
    if (!excludeStyles) {
      loadCSS(`${window.hlx.codeBasePath}/libs/pages/pages.css`);
    }
    this.block.append(this.getElement());
    this.block.addEventListener('sap:pageChange', (e) => {
      const url = new URL(window.location.href);
      const params = new URLSearchParams(url.search);
      params.set('page', e.detail.current);
      url.search = params.toString();
      window.history.pushState(null, null, url);
      this.block.querySelector('.pages').remove();
      this.block.append(this.getElement());
    });
  }
}