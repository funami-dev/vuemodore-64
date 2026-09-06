<template>
  <Root
    @mouseenter="show"
    @mouseleave="hide"
    @focusin="show"
    @focusout="hide"
  >
    <Trigger :aria-describedby="visible ? id : null"><slot></slot></Trigger>
    <Bubble v-show="visible" :id="id" role="tooltip" :placement="placement">
      <slot name="content">{{ text }}</slot>
    </Bubble>
  </Root>
</template>
<script>
import styled from 'vue-styled-components';
import { color, V64_FONT } from '../../styles/theme';
import uid from '../../utils/uid';

const PLACEMENTS = ['top', 'bottom'];

const Root = styled.span`
  position: relative;
  display: inline-block;
`;

const Trigger = styled.span`
  display: inline-block;
`;

// Kept in the DOM and only hidden, so the id an `aria-describedby` points at
// always resolves.
const Bubble = styled('span', { placement: String })`
  font-family: ${V64_FONT};
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  ${props => (props.placement === 'bottom' ? 'top: calc(100% + 0.5em);' : 'bottom: calc(100% + 0.5em);')}
  z-index: 10;
  padding: 0.25em 0.5em;
  white-space: nowrap;
  border: 2px solid ${color('primary')};
  background: ${color('secondary')};
  color: ${color('primary')};
`;

export default {
  name: 'V64Tooltip',
  components: {
    Root,
    Trigger,
    Bubble,
  },
  props: {
    /** Tooltip text. Use the `content` slot when it needs markup. */
    text: {
      type: String,
      default: '',
    },
    placement: {
      type: String,
      default: 'top',
      validator: value => PLACEMENTS.includes(value),
    },
  },
  data() {
    return {
      id: uid('v64-tooltip'),
      visible: false,
    };
  },
  methods: {
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
  },
};
</script>
