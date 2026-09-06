<template>
  <Root :block="block" role="log" aria-live="polite">
    <Row v-for="(line, index) in printed" :key="index">{{ line }}</Row>
    <Row v-if="showPrompt">
      <span>{{ prompt }}</span><Blink v-if="!typing" aria-hidden="true">{{ cursor }}</Blink>
    </Row>
  </Root>
</template>
<script>
import styled from 'vue-styled-components';
import { color, V64_FONT } from '../../styles/theme';

const CURSOR = '▋';

const Root = styled('div', { block: Boolean })`
  font-family: ${V64_FONT};
  display: ${props => (props.block ? 'block' : 'inline-block')};
  width: ${props => (props.block ? '100%' : 'auto')};
  padding: 1em;
  background: ${color('secondary')};
  color: ${color('primary')};
`;

const Row = styled.div`
  white-space: pre-wrap;
  word-break: break-word;
  min-height: 1.2em;
`;

const Blink = styled.span`
  @keyframes v64-blink {
    50% {
      opacity: 0;
    }
  }
  animation: v64-blink 1.4s step-start 0s infinite;
`;

export default {
  name: 'V64Terminal',
  components: {
    Root,
    Row,
    Blink,
  },
  props: {
    /** Lines to print, one after another. */
    lines: {
      type: Array,
      default: () => [],
    },
    /** Types the lines out character by character instead of printing at once. */
    typewriter: {
      type: Boolean,
      default: false,
    },
    /** Milliseconds per character while typing. */
    speed: {
      type: Number,
      default: 40,
    },
    /** Text in front of the cursor on the last line. */
    prompt: {
      type: String,
      default: 'READY.',
    },
    showPrompt: {
      type: Boolean,
      default: true,
    },
    block: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      cursor: CURSOR,
      typedLines: [],
      lineIndex: 0,
      charIndex: 0,
      timer: null,
    };
  },
  computed: {
    typing() {
      return this.typewriter && this.lineIndex < this.lines.length;
    },
    printed() {
      return this.typewriter ? this.typedLines : this.lines;
    },
  },
  watch: {
    lines: 'restart',
    typewriter: 'restart',
  },
  mounted() {
    this.restart();
  },
  beforeDestroy() {
    this.stop();
  },
  methods: {
    restart() {
      this.stop();
      this.typedLines = [];
      this.lineIndex = 0;
      this.charIndex = 0;
      if (this.typewriter && this.lines.length) this.timer = setInterval(this.tick, this.speed);
    },
    stop() {
      if (this.timer) clearInterval(this.timer);
      this.timer = null;
    },
    /**
     * Reveals one more character, moving to the next line when one is done.
     */
    tick() {
      const line = this.lines[this.lineIndex];
      if (line === undefined) {
        this.stop();
        /**
         * Fired once every line has been typed out.
         * @event done
         */
        this.$emit('done');
        return;
      }

      this.charIndex += 1;
      this.$set(this.typedLines, this.lineIndex, line.slice(0, this.charIndex));

      if (this.charIndex >= line.length) {
        this.lineIndex += 1;
        this.charIndex = 0;
      }
    },
  },
};
</script>
