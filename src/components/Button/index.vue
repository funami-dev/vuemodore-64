<template>
  <Root
    :type="type"
    :variant="variant"
    :block="block"
    :disabled="disabled"
    :aria-disabled="String(disabled)"
    @click="onClick"
  >
    <slot></slot>
  </Root>
</template>
<script>
import styled from 'vue-styled-components';
import { color, V64_FONT } from '../../styles/theme';

const VARIANTS = ['primary', 'secondary', 'danger'];

// On a real C64 a highlighted character is drawn by swapping fore- and
// background colour, so every variant is just a pair of theme colours that get
// inverted on hover.
const foreground = (props) => {
  if (props.variant === 'secondary') return color('lightgrey')(props);
  if (props.variant === 'danger') return color('red')(props);
  return color('primary')(props);
};

const Root = styled('button', {
  variant: String,
  block: Boolean,
})`
  font-family: ${V64_FONT};
  font-size: 1em;
  text-transform: uppercase;
  display: ${props => (props.block ? 'block' : 'inline-block')};
  width: ${props => (props.block ? '100%' : 'auto')};
  padding: 0.5em 1em;
  cursor: pointer;
  border-radius: 0;
  border: 2px solid ${foreground};
  color: ${foreground};
  background: ${color('secondary')};
  transition: none;

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    color: ${color('secondary')};
    background: ${foreground};
    outline: none;
  }

  &:active:not(:disabled) {
    transform: translate(2px, 2px);
  }

  &:disabled {
    color: ${color('grey')};
    border-color: ${color('grey')};
    cursor: not-allowed;
  }
`;

export default {
  name: 'V64Button',
  components: {
    Root,
  },
  props: {
    /** Visual weight of the button. */
    variant: {
      type: String,
      default: 'primary',
      validator: value => VARIANTS.includes(value),
    },
    /** Native button type, so the component works inside a `<form>`. */
    type: {
      type: String,
      default: 'button',
      validator: value => ['button', 'submit', 'reset'].includes(value),
    },
    /** Stretches the button across the full width of its container. */
    block: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick(event) {
      if (this.disabled) return;
      /**
       * Fired when the button is activated.
       * @event click
       * @type {MouseEvent}
       */
      this.$emit('click', event);
    },
  },
};
</script>
