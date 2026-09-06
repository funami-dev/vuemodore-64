<template>
  <Cap :wide="wide"><slot>{{ label }}</slot></Cap>
</template>
<script>
import styled from 'vue-styled-components';
import { color, V64_FONT } from '../../styles/theme';

// A keycap from the C64's own keyboard: square, chunky, with the shadow that
// made the beige keys look moulded.
const Cap = styled('kbd', { wide: Boolean })`
  font-family: ${V64_FONT};
  font-size: 0.9em;
  display: inline-block;
  min-width: ${props => (props.wide ? '4em' : '2em')};
  padding: 0.25em 0.5em;
  text-align: center;
  text-transform: uppercase;
  border: 2px solid ${color('primary')};
  border-radius: 0;
  box-shadow: 2px 2px 0 ${color('primary')};
  background: ${color('secondary')};
  color: ${color('primary')};
`;

export default {
  name: 'V64Key',
  components: {
    Cap,
  },
  props: {
    /** Text on the cap. The default slot takes precedence. */
    label: {
      type: String,
      default: '',
    },
    /** For the long keys: space, return, shift. */
    wide: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
