<template>
  <Root :variant="variant" :role="role" :block="block">
    <Sign aria-hidden="true">{{ sign }}</Sign>
    <Message>
      <Headline v-if="title">{{ title }}</Headline>
      <slot></slot>
    </Message>
    <Close v-if="dismissible" type="button" aria-label="Dismiss" @click="$emit('dismiss')">
      x
    </Close>
  </Root>
</template>
<script>
import styled from 'vue-styled-components';
import { color, V64_FONT } from '../../styles/theme';

// A C64 answered a bad command with `?SYNTAX  ERROR`, so each variant leads
// with the character that machine would have used.
const VARIANTS = {
  info: { sign: '*', key: 'primary' },
  success: { sign: '*', key: 'green' },
  warning: { sign: '!', key: 'yellow' },
  error: { sign: '?', key: 'red' },
};

const tone = props => color(VARIANTS[props.variant].key)(props);

const Root = styled('div', { variant: String, block: Boolean })`
  font-family: ${V64_FONT};
  display: ${props => (props.block ? 'flex' : 'inline-flex')};
  width: ${props => (props.block ? '100%' : 'auto')};
  align-items: flex-start;
  padding: 0.5em 0.75em;
  border: 2px solid ${tone};
  background: ${color('secondary')};
  color: ${tone};
`;

const Sign = styled.span`
  flex: 0 0 auto;
  margin-right: 0.5em;
`;

const Message = styled.div`
  flex: 1 1 auto;
`;

const Headline = styled.div`
  text-transform: uppercase;
  margin-bottom: 0.25em;
`;

const Close = styled.button`
  font-family: ${V64_FONT};
  font-size: 1em;
  line-height: 1;
  flex: 0 0 auto;
  margin-left: 0.75em;
  padding: 0 0.25em;
  border: none;
  border-radius: 0;
  cursor: pointer;
  background: transparent;
  color: inherit;

  &:hover,
  &:focus {
    outline: none;
    background: currentColor;
    color: ${color('secondary')};
  }
`;

export default {
  name: 'V64Alert',
  components: {
    Root,
    Sign,
    Message,
    Headline,
    Close,
  },
  props: {
    variant: {
      type: String,
      default: 'info',
      validator: value => Object.keys(VARIANTS).includes(value),
    },
    title: {
      type: String,
      default: '',
    },
    /** Shows a dismiss button, which emits `dismiss`. */
    dismissible: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    sign() {
      return VARIANTS[this.variant].sign;
    },
    role() {
      // Errors and warnings interrupt; the other two wait their turn.
      return ['error', 'warning'].includes(this.variant) ? 'alert' : 'status';
    },
  },
};
</script>
