<template>
  <Root :block="block">
    <Titlebar v-if="title || $slots.title">
      <slot name="title">{{ title }}</slot>
      <Close v-if="closable" type="button" aria-label="Close" @click="$emit('close')">x</Close>
    </Titlebar>
    <Inner :padded="padded"><slot></slot></Inner>
    <Bottom v-if="$slots.footer"><slot name="footer"></slot></Bottom>
  </Root>
</template>
<script>
import styled from 'vue-styled-components';
import { color, V64_FONT } from '../../styles/theme';

// A window the way GEOS drew them: a solid border, a title bar in inverted
// colours, and square corners throughout.
const Root = styled('section', { block: Boolean })`
  font-family: ${V64_FONT};
  display: ${props => (props.block ? 'block' : 'inline-block')};
  width: ${props => (props.block ? '100%' : 'auto')};
  border: 2px solid ${color('primary')};
  background: ${color('secondary')};
  color: ${color('primary')};
`;

const Titlebar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.25em 0.5em;
  text-transform: uppercase;
  background: ${color('primary')};
  color: ${color('secondary')};
`;

const Close = styled.button`
  font-family: ${V64_FONT};
  font-size: 1em;
  line-height: 1;
  margin-left: 1em;
  padding: 0 0.25em;
  border: none;
  border-radius: 0;
  cursor: pointer;
  background: ${color('secondary')};
  color: ${color('primary')};

  &:hover,
  &:focus {
    outline: none;
    background: ${color('red')};
  }
`;

const Inner = styled('div', { padded: Boolean })`
  padding: ${props => (props.padded ? '1em' : '0')};
`;

const Bottom = styled.div`
  padding: 0.5em 1em;
  border-top: 2px solid ${color('primary')};
`;

export default {
  name: 'V64Panel',
  components: {
    Root,
    Titlebar,
    Close,
    Inner,
    Bottom,
  },
  props: {
    /** Title bar text. Use the `title` slot when it needs markup. */
    title: {
      type: String,
      default: '',
    },
    /** Shows a close button in the title bar, which emits `close`. */
    closable: {
      type: Boolean,
      default: false,
    },
    /** Pads the body. Turn off to let a table or list sit flush to the border. */
    padded: {
      type: Boolean,
      default: true,
    },
    block: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
