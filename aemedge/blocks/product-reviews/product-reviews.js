import Pages from '../../libs/pages/pages.js';
import {
  a, button, div, domEl, span,
} from '../../scripts/dom-builder.js';
import Button from '../../libs/button/button.js';
import { fetchPlaceholders } from '../../scripts/aem.js';
import { buildModalContent, formatDate, getConfig } from '../../scripts/utils.js';
import '@udex/webcomponents/dist/RatingIndicator.js';

const REVIEWS_PER_PAGE = 3;
const REVIEW_MAX_CHAR_COUNT = 200;
const G2_LINK_FALLBACK = 'You’re about to be redirected to G2 to share your feedback. Click “Continue” to proceed. Your feedback is valuable to us.';

/**
 * @param {string} endpoint
 * @param {string} productId
 * @param {number} pageNumber
 * @param {number} pageSize
 * @return {Promise<Response>}
 */
async function fetchReviews(endpoint, productId, pageNumber, pageSize = REVIEWS_PER_PAGE) {
  return fetch(`${endpoint}?filter%5Bproduct_id%5D=${productId}&page%5Bsize%5D=${pageSize}&page%5Bnumber%5D=${pageNumber}`);
}

/**
 * @param {{name: string, company: string, title: string}} user
 * @return {string}
 */
function buildAuthorText({ name, title, company }) {
  const authorParts = [];
  if (name) {
    authorParts.push(name);
  }
  if (title) {
    authorParts.push(title);
  }
  if (company) {
    authorParts.push(company);
  }
  return authorParts.join(', ');
}

/**
 * @param {string} text
 * @param {number} charCount
 * @param {number} charCountLimit
 * @return {string}
 */
function getTruncatedText(text, charCount, charCountLimit) {
  if (charCount > charCountLimit) {
    return '';
  }
  if (charCount + text.length > charCountLimit) {
    return `${text.substring(0, Math.max(0, charCountLimit - charCount))}...`;
  }
  return text;
}

/**
 * @param {{[key: string]: {text: string, value: string}}} answers
 * @param {string} [url]
 * @param {{[key: string]: string}} placeholders
 * @return {Element}
 */
function buildReviewText(answers, url, placeholders) {
  const truncatedReviewText = [];
  const reviewText = [];
  let charCount = 0;
  const reviewTextEl = div({ class: 'product-reviews__reviews__review__text' });

  Object.values(answers).forEach(({ text, value }) => {
    const truncatedQuestionText = getTruncatedText(text, charCount, REVIEW_MAX_CHAR_COUNT);
    const truncatedAnswerText = getTruncatedText(
      value,
      charCount + text.length,
      REVIEW_MAX_CHAR_COUNT,
    );
    if (truncatedQuestionText) {
      truncatedReviewText.push(
        div({ class: 'product-reviews__reviews__review__text__content__question' }, truncatedQuestionText),
      );
    }
    if (truncatedAnswerText) {
      truncatedReviewText.push(
        div({ class: 'product-reviews__reviews__review__text__content__answer' }, truncatedAnswerText),
      );
    }
    reviewText.push(
      div({ class: 'product-reviews__reviews__review__text__content__question' }, text),
      div({ class: 'product-reviews__reviews__review__text__content__answer' }, value),
    );
    charCount += text.length + value.length;
  }, '');
  const fullReviewTextEl = div({ class: 'product-reviews__reviews__review__text__content' }, ...reviewText);
  const truncatedReviewTextEl = div({ class: 'product-reviews__reviews__review__text__content--truncated' }, ...truncatedReviewText);

  if (charCount > REVIEW_MAX_CHAR_COUNT) {
    const lessButton = button({
      class: 'product-reviews__reviews__review__text__less',
      'aria-label': 'Show less',
      title: 'Show less',
      type: 'button',
    }, 'Less');
    const moreButton = button({
      class: 'product-reviews__reviews__review__text__more',
      'aria-label': 'Show more',
      title: 'Show more',
      type: 'button',
    }, 'More');
    lessButton.addEventListener('click', () => {
      reviewTextEl.classList.add('truncated');
    });
    moreButton.addEventListener('click', () => {
      reviewTextEl.classList.remove('truncated');
    });

    reviewTextEl.classList.add('truncated');
    reviewTextEl.append(truncatedReviewTextEl);
    reviewTextEl.append(moreButton);
    reviewTextEl.append(fullReviewTextEl);
    reviewTextEl.append(url ? a({ href: url, class: 'product-reviews__reviews__review__text__link' }, placeholders.productReviewG2LinkLabel || 'Read this review on G2.com') : '');
    reviewTextEl.append(lessButton);
  } else {
    reviewTextEl.append(fullReviewTextEl);
  }

  return reviewTextEl;
}

/**
 * @param {{
 *  attributes: {
 *    star_rating: number,
 *    title: string,
 *    answers: {[key: string]: {text: string, value: string}},
 *    published_at: number,
 *    user: {name: string, company: string, title: string}
 *  }
 * }[]} data
 * @param {{[key: string]: string}} placeholders
 * @return {Element[]}
 */
function buildReviews(data, placeholders) {
  return data.map((reviewConfig) => {
    // If we don't have attributes then we can't render anything in the review
    if (!reviewConfig.attributes) {
      return '';
    }

    const {
      star_rating: starRating, title, answers, published_at: publishedAt, url, user,
    } = reviewConfig.attributes;

    return div(
      { class: 'product-reviews__reviews__review' },
      div(
        { class: 'product-reviews__reviews__review__detail' },
        starRating ? domEl(
          'udex-rating-indicator',
          {
            class: 'product-reviews__reviews__review__detail__stars',
            value: starRating,
            readonly: true,
            tabindex: null, // to disable focus via tabbing, as it is not interactive
          },
        ) : '',
        div({ class: 'product-reviews__reviews__review__detail__date' }, publishedAt ? formatDate(publishedAt) : ''),
      ),
      div(
        { class: 'product-reviews__reviews__review__content' },
        div({ class: 'product-reviews__reviews__review__heading' }, title || ''),
        answers ? buildReviewText(answers, url, placeholders) : '',
        div({ class: 'product-reviews__reviews__review__author' }, user ? buildAuthorText(user) : ''),
      ),
    );
  });
}

function buildWriteAReviewModalContent(writeReviewUrl, cancelButton, placeholders) {
  return buildModalContent(
    placeholders.productReviewWriteAReview || 'Write a Review',
    null,
    placeholders.productReviewWriteAReviewModalContent || G2_LINK_FALLBACK,
    [
      new Button('Continue', null, 'primary', 'large', writeReviewUrl).render(),
      cancelButton,
    ],
  );
}

/**
 * @param {number} starRating
 * @param {number} reviewCount
 * @param {string} writeReviewUrl
 * @param {{[key: string]: string}} placeholders
 * @param {HTMLElement} block
 * @return {HTMLElement}
 */
function buildSummary(starRating, reviewCount, writeReviewUrl, placeholders, block) {
  const summaryReviewCountText = reviewCount ? `${reviewCount} ${placeholders.productReviewReviews || 'reviews'}` : '';

  const summaryCta = div(
    { class: 'product-reviews__summary__cta' },
  );
  if (writeReviewUrl) {
    const writeAReviewButton = new Button(placeholders.productReviewWriteAReview || 'Write a Review', null, 'primary', { xs: 'medium', m: 'large' }).render();
    let modal;
    writeAReviewButton.addEventListener('click', async () => {
      if (!modal) {
        const { default: getModal } = await import(`${window.hlx.codeBasePath}/blocks/modal/modal.js`);

        const cancelButton = new Button('Cancel', null, 'secondary', 'large').render();
        cancelButton.addEventListener('click', () => { modal.close(); });
        modal = await getModal('write-a-review-modal', () => buildWriteAReviewModalContent(writeReviewUrl, cancelButton, placeholders), null, 'text-only');
        block.append(modal);
      }
      modal.showModal();
    });

    summaryCta.append(
      span({ class: 'product-reviews__summary__cta__tagline' }, placeholders.productReviewCTATagline || 'Share your thoughts with other customers'),
      writeAReviewButton,
    );
  }

  return div(
    { class: 'product-reviews__summary' },
    div(
      { class: 'product-reviews__summary__rating' },
      span({ class: 'product-reviews__summary__rating__heading' }, starRating || ''),
      starRating ? domEl(
        'udex-rating-indicator',
        {
          class: 'product-reviews__summary__rating__stars',
          value: starRating,
          readonly: true,
          tabindex: null, // to disable focus via tabbing, as it is not interactive
        },
      ) : '',
      span({ class: 'product-reviews__summary__rating__detail' }, summaryReviewCountText),
    ),
    summaryCta,
  );
}

export default async function decorate(block) {
  const productId = block.children[0]?.textContent?.trim();
  const reviewsEndpoint = getConfig('productReviewsEndpoint');
  block.textContent = '';

  // If we don't have a product ID or endpoint then we can't render anything in the block
  if (!productId || !reviewsEndpoint) {
    return;
  }
  const currentPage = 1;
  const apiResponse = await fetchReviews(reviewsEndpoint, productId, currentPage);
  const responseJson = apiResponse.ok ? await apiResponse.json() : {};
  const placeholders = await fetchPlaceholders();
  // Summary
  const { meta, data } = responseJson;

  // If we have neither metadata nor data then we can't render anything in the block
  if (!meta && !data) {
    return;
  }

  const summary = buildSummary(
    meta?.product?.star_rating,
    meta?.product?.review_count,
    meta?.product?.write_review_url,
    placeholders,
    block,
  );
  const reviews = div({ class: 'product-reviews__reviews' }, ...buildReviews(data || [], placeholders));

  let desktopPages = '';
  let mobilePages = '';
  if (meta && meta.record_count > REVIEWS_PER_PAGE) {
    desktopPages = new Pages(block, Math.ceil(meta.record_count / REVIEWS_PER_PAGE), currentPage).render('numeric');
    mobilePages = new Pages(block, Math.ceil(meta.record_count / REVIEWS_PER_PAGE), currentPage).render('arrow');

    block.addEventListener('sap:pageChange', async (e) => {
      const newApiResponse = await fetchReviews(reviewsEndpoint, productId, e.detail.current);
      const newResponseJson = apiResponse.ok ? await newApiResponse.json() : {};
      reviews.textContent = '';

      reviews.append(...buildReviews(newResponseJson.data || [], placeholders));
    });
  }

  block.append(summary);
  block.append(reviews);
  block.append(desktopPages);
  block.append(mobilePages);
}
