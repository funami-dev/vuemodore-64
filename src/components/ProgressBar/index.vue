<template>
  <Root
    :block="block"
    role="progressbar"
    :aria-label="label || null"
    :aria-valuemin="indeterminate ? null : 0"
    :aria-valuemax="indeterminate ? null : max"
    :aria-valuenow="indeterminate ? null : value"
  >
    <TopLine v-if="label || showValue">
      <span v-if="label">{{ label }}</span>
      <Readout v-if="showValue && !indeterminate">{{ percentage }}%</Readout>
    </TopLine>
    <Bar>
      <Sweep v-if="indeterminate" aria-hidden="true" />
      <Cells v-else aria-hidden="true">{{ bar }}</Cells>
    </Bar>
  </Root>
</template>
<script>
import styled from 'vue-styled-components';
import { color, V64_FONT } from '../../styles/theme';

const FILLED = '█';
const EMPTY = '·';

const Root = styled('div', { block: Boolean })`
  font-family: ${V64_FONT};
  display: ${props => (props.block ? 'block' : 'inline-block')};
  width: ${props => (props.block ? '100%' : 'auto')};
  color: ${color('primary')};
`;

const TopLine = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5em;
  text-transform: uppercase;
`;

const Readout = styled.span`
  margin-left: 1em;
`;

const Bar = styled.div`
  position: relative;
  overflow: hidden;
  border: 2px solid ${color('primary')};
  background: ${color('secondary')};
  padding: 0.25em;
`;

const Cells = styled.div`
  white-space: nowrap;
  color: ${color('green')};
`;

// While loading from tape the C64 flashed its border in stripes; with no
// progress to report the bar does the same instead of pretending to know one.
const Sweep = styled.div`
  @keyframes v64-sweep {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(400%);
    }
  }
  height: 1em;
  width: 25%;
  background: repeating-linear-gradient(
    90deg,
    ${color('green')} 0 0.5em,
    ${color('primary')} 0.5em 1em
  );
  animation: v64-sweep 1.6s linear infinite;
`;

export default {
  name: 'V64ProgressBar',
  components: {
    Root,
    TopLine,
    Readout,
    Bar,
    Cells,
    Sweep,
  },
  props: {
    /** Current progress, clamped into `0..max`. */
    value: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
      validator: value => value > 0,
    },
    /** Width of the bar in characters. */
    cells: {
      type: Number,
      default: 20,
      validator: value => value > 0,
    },
    label: {
      type: String,
      default: '',
    },
    /** Prints the progress as a percentage next to the label. */
    showValue: {
      type: Boolean,
      default: false,
    },
    /** Runs an endless animation for work of unknown length. */
    indeterminate: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ratio() {
      const ratio = this.value / this.max;
      if (Number.isNaN(ratio)) return 0;
      return Math.min(Math.max(ratio, 0), 1);
    },
    percentage() {
      return Math.round(this.ratio * 100);
    },
    bar() {
      const filled = Math.round(this.ratio * this.cells);
      return FILLED.repeat(filled) + EMPTY.repeat(this.cells - filled);
    },
  },
};
</script>
