<template>
  <Root :color="color"><slot></slot></Root>
</template>
<script>
import styled from 'vue-styled-components';
import { color as themeColor, V64_FONT } from '../../styles/theme';

// A `pre` keeps the whitespace of BASIC listings intact, which is the whole
// point of printing text on this machine.
const Root = styled('pre', { color: String })`
  font-family: ${V64_FONT};
  margin: 16px 0;
  /* A bare pre element never wraps, so one long paragraph widens the whole
     page. pre-wrap keeps the spaces and line breaks a listing depends on
     while still letting prose break at the edge of its container. */
  white-space: pre-wrap;
  word-break: break-word;
  color: ${props => props.color || themeColor('primary')(props)};
`;

export default {
  name: 'V64Text',
  components: {
    Root,
  },
  props: {
    /** Overrides the theme colour, e.g. with an entry of `V64_PALETTE`. */
    color: {
      type: String,
      default: '',
    },
  },
};
</script>
