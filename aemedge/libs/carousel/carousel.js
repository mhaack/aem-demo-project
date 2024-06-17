import { div, span, ul } from '../../scripts/dom-builder.js';
import Button from '../button/button.js';

const DATA_INDEX_KEY = 'data-carousel-index';

export default class Carousel {
  constructor(items) {
    this.items = [...items] || [];
    this.totalItems = this.items.length;
  }

  /**
   * @private
   */
  renderDots() {
    const dots = [];
    for (let i = 0; i < this.totalItems; i += 1) {
      dots.push(span({ class: 'carousel__dot', [DATA_INDEX_KEY]: i }));
    }
    return div({ class: 'carousel__dots' }, ...dots);
  }

  /**
   * @private
   * @param {Set} visibleItemIndices
   * @param {HTMLButtonElement} prev
   * @param {HTMLButtonElement} next
   * @param {HTMLButtonElement} prevArrow
   * @param {HTMLButtonElement} nextArrow
   * @param {HTMLElement} dots
   */
  renderList(visibleItemIndices, prev, next, prevArrow, nextArrow, dots) {
    const list = ul({ class: 'carousel__list' }, ...this.items);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = Number(entry.target.getAttribute(DATA_INDEX_KEY));
        if (entry.isIntersecting) {
          visibleItemIndices.add(index);
        } else {
          visibleItemIndices.delete(index);
        }

        const activeDot = dots.querySelector('.carousel__dot.active');
        activeDot?.classList.remove('active');

        const maxVisibleIndex = Math.max(...visibleItemIndices);
        const dot = dots.querySelector(`.carousel__dot[${DATA_INDEX_KEY}='${maxVisibleIndex}']`);
        dot?.classList.add('active');

        prev.querySelector('button').disabled = visibleItemIndices.has(0);
        next.querySelector('button').disabled = visibleItemIndices.has(this.totalItems - 1);
        prevArrow.querySelector('button').disabled = visibleItemIndices.has(0);
        nextArrow.querySelector('button').disabled = visibleItemIndices.has(this.totalItems - 1);
      });
    }, {
      root: list,
      threshold: 0.5,
    });
    this.items.forEach((item, index) => {
      item.setAttribute(DATA_INDEX_KEY, index);
      observer.observe(item);
    });
    return list;
  }

  /**
   * @private
   * @param {Set} visibleItemIndices
   */
  static getPrevIndex(visibleItemIndices) {
    const minVisibleIndex = Math.min(...visibleItemIndices);
    return Math.max((minVisibleIndex - 1), 0);
  }

  /**
   * @private
   * @param {Set} visibleItemIndices
   */
  getNextIndex(visibleItemIndices) {
    const maxVisibleIndex = Math.max(...visibleItemIndices);
    return Math.min((maxVisibleIndex + 1), this.totalItems - 1);
  }

  render() {
    if (this.totalItems > 0) {
      const visibleItemIndices = new Set([]);

      const scrollToPrev = () => {
        const prevItem = this.items[Carousel.getPrevIndex(visibleItemIndices)];
        prevItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      };

      const scrollToNext = () => {
        const nextItem = this.items[this.getNextIndex(visibleItemIndices)];
        nextItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'end' });
      };

      const prev = new Button(
        'Previous',
        'icon-slim-arrow-left',
        'secondary',
        'large',
        null,
        true,
      ).render();
      prev.addEventListener('click', scrollToPrev);
      const next = new Button(
        'Next',
        'icon-slim-arrow-right',
        'secondary',
        'large',
        null,
        true,
      ).render();
      next.addEventListener('click', scrollToNext);

      const prevArrow = new Button(
        'Previous',
        'icon-slim-arrow-left',
        'tertiary',
        'large',
        null,
        true,
      ).render();
      prevArrow.addEventListener('click', scrollToPrev);
      const nextArrow = new Button(
        'Next',
        'icon-slim-arrow-right',
        'tertiary',
        'large',
        null,
        true,
      ).render();
      nextArrow.addEventListener('click', scrollToNext);

      const dots = this.renderDots();

      return div(
        { class: 'carousel' },
        div({ class: 'carousel__button-controls' }, prev, next),
        this.renderList(visibleItemIndices, prev, next, prevArrow, nextArrow, dots),
        div({ class: 'carousel__arrow-controls' }, prevArrow, dots, nextArrow),
      );
    }

    return null;
  }
}
