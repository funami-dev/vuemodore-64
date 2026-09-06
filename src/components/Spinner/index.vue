<template>
  <Root role="status" :aria-label="label || 'Loading'">
    <Frames aria-hidden="true">{{ frame }}</Frames>
    <Note v-if="label">{{ label }}</Note>
  </Root>
</template>
<script>
import styled from 'vue-styled-components';
import { color, V64_FONT } from '../../styles/theme';

const FRAMES = ['|', '/', '-', '\\'];

const Root = styled.div`
  font-family: ${V64_FONT};
  display: inline-flex;
  align-items: baseline;
  color: ${color('primary')};
`;

const Frames = styled.span`
  width: 1ch;
  user-select: none;
`;

const Note = styled.span`
  margin-left: 0.5em;
  text-transform: uppercase;
`;

export default {
  name: 'V64Spinner',
  components: {
    Root,
    Frames,
    Note,
  },
  props: {
    /** Read out by screen readers and printed next to the spinner. */
    label: {
      type: String,
      default: '',
    },
    /** Milliseconds per frame. */
    speed: {
      type: Number,
      default: 120,
      validator: value => value > 0,
    },
  },
  data() {
    return {
      index: 0,
      timer: null,
    };
  },
  computed: {
    frame() {
      return FRAMES[this.index % FRAMES.length];
    },
  },
  mounted() {
    this.timer = setInterval(this.advance, this.speed);
  },
  beforeDestroy() {
    // Without this the interval keeps the component alive after it is gone.
    clearInterval(this.timer);
  },
  methods: {
    advance() {
      this.index += 1;
    },
  },
};
</script>
