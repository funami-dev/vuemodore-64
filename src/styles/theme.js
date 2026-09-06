/**
 * The 16 colours of the original Commodore 64 VIC-II chip.
 *
 * Every component of the library draws from this palette only, which is what
 * gives the design system its authentic look. Consumers may override single
 * entries through the `theme` prop of `V64Page` (see `V64_THEME` below).
 */
export const V64_PALETTE = {
  black: 'rgb(0, 0, 0)',
  white: 'rgb(255, 255, 255)',
  red: 'rgb(136, 0, 0)',
  cyan: 'rgb(170, 255, 238)',
  purple: 'rgb(204, 68, 204)',
  green: 'rgb(0, 204, 85)',
  blue: 'rgb(0, 0, 170)',
  yellow: 'rgb(238, 238, 119)',
  orange: 'rgb(221, 136, 85)',
  brown: 'rgb(102, 68, 0)',
  lightred: 'rgb(255, 119, 119)',
  darkgrey: 'rgb(51, 51, 51)',
  grey: 'rgb(119, 119, 119)',
  lightgreen: 'rgb(170, 255, 102)',
  lightblue: 'rgb(0, 136, 255)',
  lightgrey: 'rgb(187, 187, 187)',
};

/**
 * Semantic theme of the design system.
 *
 * `primary` is the light blue the C64 printed its characters in, `secondary`
 * the darker blue of the screen itself -- the two colours you see when a real
 * machine boots up.
 */
export const V64_THEME = {
  primary: 'rgb(168, 159, 253)',
  secondary: 'rgb(78, 47, 225)',
  green: V64_PALETTE.green,
  lightgrey: V64_PALETTE.lightgrey,
  grey: V64_PALETTE.grey,
  red: V64_PALETTE.lightred,
  yellow: V64_PALETTE.yellow,
  black: V64_PALETTE.black,
};

/**
 * The character ROM of the C64 rendered every glyph in an 8x8 cell, so the
 * whole system is monospaced. `C64 PRO MONO` is the faithful web font, the rest
 * are fallbacks for machines that do not have it installed.
 */
export const V64_FONT = `'C64 PRO MONO', 'C64 PRO', 'Courier New', 'Lucida Console', Courier,
  MENLO, MONACO, monospace`;

/**
 * Resolves a theme colour inside a styled-component template.
 *
 * Components are usable standalone, so we cannot rely on a `ThemeProvider`
 * being present -- without one `props.theme` is empty and every colour would
 * render as `undefined`. Falling back to `V64_THEME` keeps them working
 * anywhere while still honouring an overridden theme when there is one.
 *
 * @param {string} key name of the colour in the theme
 * @returns {function} interpolation for a styled-component template literal
 */
export const color = key => props => (props.theme && props.theme[key]) || V64_THEME[key];

export default V64_THEME;
