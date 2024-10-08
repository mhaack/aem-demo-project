import { decorateIcons, fetchPlaceholders } from '../../scripts/aem.js';
import { mediaQueryLists } from '../../scripts/config-ds.js';

function addCarouselMediaQueryHandler(block) {
  const container = block.querySelector('.carousel-slides-container');
  const rows = block.querySelectorAll('.carousel-slide');
  function mediaQueryChangeHandler() {
    const firstRowWidth = rows[0]?.offsetWidth ?? 0;
    const totalLength = firstRowWidth * rows.length;
    const containerLength = container.offsetWidth;
    if (totalLength <= containerLength) {
      block.classList.add('carousel-no-scroll');
    } else {
      block.classList.remove('carousel-no-scroll');
    }
  }
  Object.values(mediaQueryLists)
    .forEach((mql) => mql.addEventListener('change', mediaQueryChangeHandler));
  mediaQueryChangeHandler();
}

function updateActiveSlide(slide) {
  const block = slide.closest('.carousel');
  const slideIndex = parseInt(slide.dataset.slideIndex, 10);
  block.dataset.activeSlide = slideIndex;

  const slides = block.querySelectorAll('.carousel-slide');

  slides.forEach((aSlide, idx) => {
    aSlide.setAttribute('aria-hidden', idx !== slideIndex);
    aSlide.querySelectorAll('a').forEach((link) => {
      if (idx !== slideIndex) {
        link.setAttribute('tabindex', '-1');
      } else {
        link.removeAttribute('tabindex');
      }
    });
  });

  const indicators = block.querySelectorAll('.carousel-slide-indicator');
  indicators.forEach((indicator, idx) => {
    if (idx !== slideIndex) {
      indicator.querySelector('button').classList.remove('active-dot');
    } else {
      indicator.querySelector('button').classList.add('active-dot');
    }
  });
}

function showSlide(block, slideIndex = 0) {
  const slides = block.querySelectorAll('.carousel-slide');
  let realSlideIndex = slideIndex < 0 ? slides.length - 1 : slideIndex;
  if (slideIndex >= slides.length) realSlideIndex = 0;
  const activeSlide = slides[realSlideIndex];

  activeSlide
    .querySelectorAll('a')
    .forEach((link) => link.removeAttribute('tabindex'));
  block.querySelector('.carousel-slides').scrollTo({
    top: 0,
    left: activeSlide.offsetLeft,
    behavior: 'smooth',
  });
}

function handleKeyboardNavigation(event, block) {
  const prevButton = block.querySelector('.slide-prev');
  const nextButton = block.querySelector('.slide-next');

  switch (event.key) {
    case 'ArrowLeft':
      prevButton.click();
      break;
    case 'ArrowRight':
      nextButton.click();
      break;
    case 'Enter':
    case ' ':
      event.target.click();
      break;
    default:
      return;
  }

  event.preventDefault();
}

function bindEvents(block) {
  const slideIndicators = block.querySelector('.carousel-slide-indicators');
  const carouselSlides = block.querySelectorAll('.carousel-slide');

  if (!slideIndicators) return;
  if (!carouselSlides) return;
  slideIndicators.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', (e) => {
      const slideIndicator = e.currentTarget.parentElement;
      showSlide(block, parseInt(slideIndicator.dataset.targetSlide, 10));
    });
    button.addEventListener('focus', () => {
      block.dataset.keyboardFocused = 'true';
    });
    button.addEventListener('blur', () => {
      block.dataset.keyboardFocused = 'false';
    });
  });

  block.querySelector('.slide-prev').addEventListener('click', () => {
    showSlide(block, parseInt(block.dataset.activeSlide, 10) - 1);
  });

  block.querySelector('.slide-next').addEventListener('click', () => {
    showSlide(block, parseInt(block.dataset.activeSlide, 10) + 1);
  });

  // Add keyboard event listener to the whole block
  block.addEventListener('keydown', (event) => handleKeyboardNavigation(event, block));

  const slideObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) updateActiveSlide(entry.target);
      });
    },
    { threshold: 0.5 },
  );
  block.querySelectorAll('.carousel-slide').forEach((slide) => {
    slideObserver.observe(slide);
  });
}

function createSlide(row, slideIndex, carouselId) {
  const slide = document.createElement('li');
  slide.dataset.slideIndex = slideIndex;
  slide.setAttribute('id', `carousel-${carouselId}-slide-${slideIndex}`);
  slide.classList.add('carousel-slide');

  row.querySelectorAll(':scope > div').forEach((column, colIdx) => {
    column.classList.add(
      `carousel-slide-${colIdx === 0 ? 'image' : 'content'}`,
    );
    slide.append(column);
  });

  const labeledBy = slide.querySelector('h1, h2, h3, h4, h5, h6');
  if (labeledBy) {
    slide.setAttribute('aria-labelledby', labeledBy.getAttribute('id'));
  }

  return slide;
}

let carouselId = 0;
export default async function decorate(block) {
  carouselId += 1;
  block.setAttribute('id', `carousel-${carouselId}`);
  const rows = block.querySelectorAll(':scope > div');
  const isSingleSlide = rows.length < 2;

  const placeholders = await fetchPlaceholders();

  block.setAttribute('role', 'region');
  block.setAttribute(
    'aria-roledescription',
    placeholders.carousel || 'Carousel',
  );

  const container = document.createElement('div');
  container.classList.add('carousel-slides-container');

  const slidesWrapper = document.createElement('ul');
  slidesWrapper.classList.add('carousel-slides');
  block.prepend(slidesWrapper);

  let slideIndicators;
  if (!isSingleSlide) {
    const slideIndicatorsNav = document.createElement('nav');
    slideIndicatorsNav.setAttribute(
      'aria-label',
      placeholders.carouselSlideControls || 'Carousel Slide Controls',
    );
    slideIndicators = document.createElement('ol');
    slideIndicators.classList.add('carousel-slide-indicators');

    // previous slide btn
    const previousSlideButton = document.createElement('button');
    previousSlideButton.type = 'button';
    previousSlideButton.classList.add('slide-prev');
    previousSlideButton.ariaLabel = placeholders.previousSlide || 'Previous Slide';
    previousSlideButton.innerHTML = '<span class="icon icon-slim-arrow-left-blue"></span>';
    slideIndicatorsNav.append(previousSlideButton);

    // indicators
    slideIndicatorsNav.append(slideIndicators);

    // next slide btn
    const nextSlideButton = document.createElement('button');
    nextSlideButton.type = 'button';
    nextSlideButton.classList.add('slide-next');
    nextSlideButton.ariaLabel = placeholders.nextSlide || 'Next Slide';
    nextSlideButton.innerHTML = '<span class="icon icon-slim-arrow-right-blue"></span>';
    slideIndicatorsNav.append(nextSlideButton);
    block.append(slideIndicatorsNav);
  }

  rows.forEach((row, idx) => {
    const slide = createSlide(row, idx, carouselId);
    slidesWrapper.append(slide);

    if (slideIndicators) {
      const indicator = document.createElement('li');
      indicator.classList.add('carousel-slide-indicator');
      indicator.dataset.targetSlide = idx;
      indicator.innerHTML = '<button type="button"><span class="icon icon-dot"></span></button>';
      slideIndicators.append(indicator);
    }
    row.remove();
  });

  container.append(slidesWrapper);
  block.prepend(container);

  if (!isSingleSlide) {
    bindEvents(block);
  }

  addCarouselMediaQueryHandler(block);

  decorateIcons(block);
}
