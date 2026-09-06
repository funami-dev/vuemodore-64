<template>
  <Root :variant="variant"><slot>{{ label }}</slot></Root>
</template>
<script>
import styled from 'vue-styled-components';
import { color, V64_FONT } from '../../styles/theme';

const VARIANTS = ['default', 'success', 'warning', 'danger'];

const TONES = {
  default: 'primary',
  success: 'green',
  warning: 'yellow',
  danger: 'red',
};

// Inverted characters, the way the C64 highlighted a word inside a line.
const Root = styled('span', { variant: String })`
  font-family: ${V64_FONT};
  display: inline-block;
  padding: 0 0.5em;
  text-transform: uppercase;
  white-space: nowrap;
  background: ${props => color(TONES[props.variant])(props)};
  color: ${color('secondary')};
`;

export default {
  name: 'V64Badge',
  components: {
    Root,
  },
  props: {
    /** Text of the badge. The default slot takes precedence. */
    label: {
      type: [String, Number],
      default: '',
    },
    variant: {
      type: String,
      default: 'default',
      validator: value => VARIANTS.includes(value),
    },
  },
};
</script>
