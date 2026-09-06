<template>
  <Root :block="block" :aria-label="text">
    <Belt :duration="duration" :paused="paused" aria-hidden="true">
      <Run v-for="n in 2" :key="n">{{ text }}</Run>
    </Belt>
  </Root>
</template>
<script>
import styled from 'vue-styled-components';
import { color, V64_FONT } from '../../styles/theme';

// The demoscene scrolltext: one long line sliding right to left, forever. The
// text is rendered twice so the second copy is already in place when the first
// leaves, which is what makes the loop seamless.
const Root = styled('div', { block: Boolean })`
  font-family: ${V64_FONT};
  display: ${props => (props.block ? 'block' : 'inline-block')};
  width: ${props => (props.block ? '100%' : 'auto')};
  overflow: hidden;
  white-space: nowrap;
  background: ${color('secondary')};
  color: ${color('primary')};
`;

const Belt = styled('div', { duration: Number, paused: Boolean })`
  @keyframes v64-scroll {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }
  display: inline-flex;
  animation: v64-scroll ${props => props.duration}s linear infinite;
  animation-play-state: ${props => (props.paused ? 'paused' : 'running')};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Run = styled.span`
  padding-right: 2em;
`;

export default {
  name: 'V64Scroller',
  components: {
    Root,
    Belt,
    Run,
  },
  props: {
    /** The text that runs across the screen. */
    text: {
      type: String,
      required: true,
    },
    /** Seconds for one full pass. Larger is slower. */
    duration: {
      type: Number,
      default: 20,
      validator: value => value > 0,
    },
    paused: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
