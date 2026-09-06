<template>
  <Root
    :role="label ? 'img' : 'presentation'"
    :aria-label="label || null"
    :size="size"
    :columns="width"
  >
    <Pixel v-for="(bit, index) in bits" :key="index" :on="bit" :tone="color" aria-hidden="true" />
  </Root>
</template>
<script>
import styled from 'vue-styled-components';
import { color as themeColour } from '../../styles/theme';

const Root = styled('span', { size: String, columns: Number })`
  display: inline-grid;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  width: ${props => props.size};
  line-height: 0;
`;

// An empty `tone` falls through to the theme, so the icon matches its
// surroundings unless a colour is asked for explicitly.
const Pixel = styled('span', { on: Boolean, tone: String })`
  width: 100%;
  padding-bottom: 100%;
  background: ${(props) => {
    if (!props.on) return 'transparent';
    return props.tone || themeColour('primary')(props);
  }};
`;

export default {
  name: 'V64PixelIcon',
  components: {
    Root,
    Pixel,
  },
  props: {
    /**
     * The sprite, as rows of characters. A space or a `.` is an empty pixel and
     * anything else is a lit one, so a shape can be drawn readably in source.
     */
    rows: {
      type: Array,
      required: true,
      validator: value => value.length > 0,
    },
    /** CSS colour of the lit pixels. Empty follows the theme. */
    color: {
      type: String,
      default: '',
    },
    /** CSS size of the whole icon. */
    size: {
      type: String,
      default: '2em',
    },
    /** Accessible name. Without one the icon is treated as decoration. */
    label: {
      type: String,
      default: '',
    },
  },
  computed: {
    width() {
      return Math.max(...this.rows.map(row => row.length));
    },
    /**
     * Flattens the rows into one lit/unlit value per grid cell, padding short
     * rows so a ragged sprite still lines up.
     *
     * @returns {boolean[]} one entry per pixel, row by row
     */
    bits() {
      return this.rows.reduce((bits, row) => {
        const padded = row.padEnd(this.width, ' ');
        return bits.concat([...padded].map(character => character !== ' ' && character !== '.'));
      }, []);
    },
  },
};
</script>
