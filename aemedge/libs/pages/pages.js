/* eslint-disable class-methods-use-this */
import {
  p, div, span, label, button,
} from '../../scripts/dom-builder.js';
import Button from '../button/button.js';

const DESKTOP_PAGE_RANGE_LIMIT = 10;
const MOBILE_PAGE_RANGE_LIMIT = 5;
const isDesktop = window.matchMedia('(min-width: 1280px)');

export default class Pages {
  /**
   * @type {HTMLElement}
   */
  element;

  /**
   * @type {HTMLElement}
   */
  pageNumbers;

  /**
   * @type {HTMLElement}
   */
  pageArrowsLabel;

  /**
   * @type {HTMLElement}
   */
  nextArrow;

  /**
   * @type {HTMLElement}
   */
  previousArrow;

  /**
   * @param {HTMLElement} block
   * @param {number} totalPages
   * @param {number} currentPage
   * @param {string} prefix
   * @param {boolean} shouldUpdateUrl
   */
  constructor(block, totalPages, currentPage = 1, prefix = '', shouldUpdateUrl = false) {
    this.block = block;
    this.id = prefix ? `${prefix}-${block.getAttribute('data-block-name')}` : block.getAttribute('data-block-name');
    this.totalPages = totalPages;
    this.currentPage = currentPage;
    this.pageKey = prefix ? `${prefix}-page` : 'page';
    this.shouldUpdateUrl = shouldUpdateUrl;
  }

  /**
   * @private
   * @param {string} [direction]
   */
  getPageChangeEvent(direction) {
    return new CustomEvent('sap:pageChange', {
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
  }

  /**
   * @private
   * @param {string} icon
   * @param {boolean} isDisabled
   */
  getActionButton(icon, isDisabled) {
    const actionButton = new Button(
      '',
      icon,
      'tertiary',
      'large',
      null,
      true,
    ).render(isDisabled);
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
      actionButton.dispatchEvent(this.getPageChangeEvent(direction));
    });
    return actionButton;
  }

  /**
   * Calculate the first visible page number.
   *
   * We're always trying to center the current page in the page numbers list if possible.
   * Min start page should always be 1, max should be totalPages + 1 - pageRangeLimit
   *
   * e.g. for totalPages = 11, pageRangeLimit = 5
   *
   * Min start page = 1, max start page = 11 + 1 - 5 = 7
   *
   * | current page     | start page   | page numbers  | current page - (pageRangeLimit / 2) |
   * | :--------------- | :----------  | :------------ | :---------------------------------- |
   * | 1                | 1            | [1] 2 3 4 5   | -1                                  |
   * | 2                | 1            | 1 [2] 3 4 5   | 0                                   |
   * | 3                | 1            | 1 2 [3] 4 5   | 1                                   |
   * | 4                | 2            | 2 3 [4] 5 6   | 2                                   |
   * | ...              | ...          | ...           | ...                                 |
   * | 8                | 6            | 6 7 [8] 9 10  | 6                                   |
   * | 9                | 7            | 7 8 [9] 10 11 | 7                                   |
   * | 10               | 7            | 7 8 9 [10] 11 | 8                                   |
   * | 11               | 7            | 7 8 9 10 [11] | 9                                   |
   *
   * @private
   */
  calcStartPageNumber(pageRangeLimit) {
    return Math.max(
      1,
      Math.min(
        this.totalPages + 1 - pageRangeLimit,
        this.currentPage - Math.floor(pageRangeLimit / 2),
      ),
    );
  }

  /**
   * Calculate the latest visible page number.
   *
   * We're always trying to center the current page in the page numbers list if possible.
   * Max end page should be total pages, min end page should be start page + page range limit + 1.
   *
   * e.g. for totalPages = 11, pageRangeLimit = 5
   *
   * Max end page = 11
   *
   * | start page     | end page | page numbers | start page + page range limit - 1 |
   * | :------------- | :------- | :----------- | :-------------------------------- |
   * | 1              | 5        | 1 2 3 4 5    | 5                                 |
   * | 2              | 6        | 2 3 4 5 6    | 6                                 |
   * | 3              | 7        | 3 4 5 6 7    | 7                                 |
   * | 4              | 8        | 4 5 6 7 8    | 8                                 |
   * | 5              | 9        | 5 6 7 8 9    | 9                                 |
   * | 6              | 10       | 7 8 9 10 11  | 10                                |
   * | 7              | 11       | 7 8 9 10 11  | 11                                |
   *
   * @private
   */
  calcEndPageNumber(pageRangeLimit, startPage) {
    return Math.min(this.totalPages, startPage + pageRangeLimit - 1);
  }

  /**
   * @private
   * @param {HTMLElement} numbersContainer
   */
  addPageNumbers(numbersContainer) {
    const pageRangeLimit = isDesktop.matches ? DESKTOP_PAGE_RANGE_LIMIT : MOBILE_PAGE_RANGE_LIMIT;
    const startPage = this.calcStartPageNumber(pageRangeLimit);
    const endPage = this.calcEndPageNumber(pageRangeLimit, startPage);

    for (let i = startPage; i <= endPage; i += 1) {
      const numberButton = button({
        class: 'pages__numbers__number',
        'aria-label': `Show page ${i}`,
        'aria-current': i === this.currentPage,
        title: `Show page ${i}`,
        type: 'button',
      }, span({ class: 'pages__numbers__number__label' }, i));

      numberButton.addEventListener('click', () => {
        this.currentPage = i;
        this.updatePageNumbers();
        numbersContainer.dispatchEvent(this.getPageChangeEvent());
      });
      numbersContainer.append(numberButton);
    }
  }

  /**
   * @private
   * @return {Element}
   */
  buildPageNumbers() {
    const numbersContainer = div({ class: 'pages__numbers' });
    this.addPageNumbers(numbersContainer);
    return numbersContainer;
  }

  /**
   * @private
   * @return {Element}
   */
  buildPageArrowsLabel() {
    return p(
      { class: 'page' },
      span({ class: 'current' }, this.totalPages > 0 ? this.currentPage : 0),
      label('of'),
      span({ class: 'total' }, this.totalPages),
    );
  }

  /**
   * @private
   * @param type {'arrow' | 'numeric'}
   */
  getElement(type) {
    let content;
    if (type === 'numeric') {
      this.pageNumbers = this.buildPageNumbers();
      content = this.pageNumbers;
    } else if (type === 'arrow') {
      this.pageArrowsLabel = this.buildPageArrowsLabel();
      content = this.pageArrowsLabel;
    }

    this.previousArrow = this.getActionButton('icon-slim-arrow-left', this.currentPage === 1);
    this.nextArrow = this.getActionButton('icon-slim-arrow-right', this.currentPage === this.totalPages);

    return div(
      { class: `pages ${type ? `pages--${type}` : ''}` },
      this.previousArrow,
      content,
      this.nextArrow,
    );
  }

  /**
   * @private
   */
  updatePageArrowsLabel() {
    if (this.pageArrowsLabel) {
      const newPageArrowsLabel = this.buildPageArrowsLabel();
      this.pageArrowsLabel.replaceWith(newPageArrowsLabel);
      this.pageArrowsLabel = newPageArrowsLabel;
    }
  }

  /**
   * @private
   */
  updateArrowButtons() {
    this.previousArrow.querySelector('button').disabled = this.currentPage === 1;
    this.nextArrow.querySelector('button').disabled = this.currentPage === this.totalPages;
  }

  /**
   * @private
   */
  updatePageNumbers() {
    if (this.pageNumbers) {
      this.pageNumbers.textContent = '';
      this.addPageNumbers(this.pageNumbers);
    }
  }

  /**
   * @param {number} totalPages
   * @param {number} currentPage
   */
  updatePages(totalPages, currentPage) {
    if (currentPage) this.currentPage = currentPage;
    this.totalPages = totalPages;
    this.updatePageArrowsLabel();
    this.updatePageNumbers();
    this.updateArrowButtons();
  }

  /**
   * @private
   * @param {number} current
   */
  updateUrl(current) {
    if (this.shouldUpdateUrl) {
      const url = new URL(window.location.href);
      const params = new URLSearchParams(url.search);
      params.set(this.pageKey, current.toString());
      url.search = params.toString();
      window.history.pushState(null, null, url);
    }
  }

  /**
   * @param {'arrow' | 'numeric'} type
   * @return {Element}
   */
  render(type = 'arrow') {
    const element = this.getElement(type);
    this.block.append(element);
    this.block.addEventListener('sap:pageChange', (e) => {
      this.updatePages(this.totalPages, e.detail.current);
      this.updateUrl(e.detail.current);
    });
    if (this.pageNumbers) {
      window.addEventListener('resize', () => {
        this.updatePageNumbers();
      });
    }
    return element;
  }
}
