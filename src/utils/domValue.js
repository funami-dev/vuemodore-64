/**
 * Reads the value out of an `input`/`change` payload.
 *
 * A plain `<input>` hands over the DOM event, while a styled input replaces the
 * `input` listener internally and hands over the value itself. Components need
 * to work either way, so they funnel every payload through here.
 *
 * @param {Event|string|number} payload what the listener received
 * @returns {string|number} the current value of the control
 */
export default function domValue(payload) {
  if (payload && payload.target) return payload.target.value;
  return payload;
}
