<template>
  <Root role="status" :aria-label="message">
    <Stripes :paused="paused" aria-hidden="true" />
    <Middle>
      <Message>{{ message }}</Message>
      <V64ProgressBar
        v-if="progress !== null"
        :value="progress"
        :cells="cells"
        show-value
      />
      <V64ProgressBar v-else indeterminate :cells="cells" />
    </Middle>
    <Stripes :paused="paused" aria-hidden="true" />
  </Root>
</template>
<script>
import styled from 'vue-styled-components';
import V64ProgressBar from '../ProgressBar/index.vue';
import { color, V64_FONT, V64_PALETTE } from '../../styles/theme';

// The full screen a C64 showed while a tape loaded: the border flashing in
// bands as each block came off the tape.
const Root = styled.div`
  font-family: ${V64_FONT};
  display: flex;
  flex-direction: column;
  min-height: 16em;
  background: ${color('secondary')};
  color: ${color('primary')};
`;

const Stripes = styled('div', { paused: Boolean })`
  @keyframes v64-load {
    to {
      background-position: 0 3em;
    }
  }
  flex: 0 0 auto;
  height: 3em;
  background: repeating-linear-gradient(
    180deg,
    ${V64_PALETTE.lightred} 0 0.5em,
    ${V64_PALETTE.yellow} 0.5em 1em,
    ${V64_PALETTE.lightgreen} 1em 1.5em,
    ${V64_PALETTE.cyan} 1.5em 2em,
    ${V64_PALETTE.purple} 2em 2.5em,
    ${V64_PALETTE.lightblue} 2.5em 3em
  );
  animation: v64-load 0.6s linear infinite;
  animation-play-state: ${props => (props.paused ? 'paused' : 'running')};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Middle = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2em 1em;
  text-align: center;
`;

const Message = styled.div`
  margin-bottom: 1em;
  text-transform: uppercase;
`;

export default {
  name: 'V64LoadingScreen',
  components: {
    Root,
    Stripes,
    Middle,
    Message,
    V64ProgressBar,
  },
  props: {
    message: {
      type: String,
      default: 'Loading',
    },
    /** Progress from 0 to 100. Leave null for work of unknown length. */
    progress: {
      type: Number,
      default: null,
    },
    /** Width of the bar in characters. */
    cells: {
      type: Number,
      default: 24,
    },
    /** Holds the stripes still. */
    paused: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
