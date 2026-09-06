/**
 * Expands a list of options into `{ value, label, disabled }` objects.
 *
 * Every component that takes an `options` array accepts plain strings and
 * numbers for the common case where value and label are the same, so they all
 * normalise through here rather than each rolling its own.
 *
 * @param {Array} options raw options as passed by the consumer
 * @returns {Array<{value: *, label: string, disabled: boolean}>} normalised options
 */
export default function normaliseOptions(options) {
  return options.map((option) => {
    if (option !== null && typeof option === 'object') return option;
    return { value: option, label: String(option) };
  });
}
