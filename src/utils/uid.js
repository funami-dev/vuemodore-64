let count = 0;

/**
 * Returns an id that is unique for the lifetime of the page.
 *
 * Form controls need one to tie a `<label>` to its input; hard coding it would
 * break as soon as a component is rendered twice on the same page.
 *
 * @param {string} prefix readable prefix, usually the component name
 * @returns {string} unique id
 */
export default function uid(prefix = 'v64') {
  count += 1;
  return `${prefix}-${count}`;
}
