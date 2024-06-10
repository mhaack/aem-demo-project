/* eslint-disable max-len */
/**
 * The breakpoints object for the design system.
 * @type {{S: string, XL: string, XS: string, L: string, M: string}}
 */
export const breakpoints = {
  XS: '(max-width: 639px)',
  S: '(min-width: 640px)',
  M: '(min-width: 980px)',
  L: '(min-width: 1280px)',
  XL: '(min-width: 1600px)',
};

/**
 * The media query lists for the design system breakpoints.
 * @type {{XS: MediaQueryList, S: MediaQueryList, M: MediaQueryList, L: MediaQueryList, XL: MediaQueryList}}
 */
export const mediaQueryLists = {
  XS: window.matchMedia(breakpoints.XS),
  S: window.matchMedia(breakpoints.S),
  M: window.matchMedia(breakpoints.M),
  L: window.matchMedia(breakpoints.L),
  XL: window.matchMedia(breakpoints.XL),
};
