<template>
  <Root :disabled="disabled">
    <Native
      :id="id"
      type="checkbox"
      :checked="checked"
      :disabled="disabled"
      :value="value"
      @change="onChange"
    />
    <Box aria-hidden="true">{{ checked ? 'x' : ' ' }}</Box>
    <LabelText v-if="label || $slots.default"><slot>{{ label }}</slot></LabelText>
  </Root>
</template>
<script>
import styled from 'vue-styled-components';
import { color, V64_FONT } from '../../styles/theme';
import uid from '../../utils/uid';

// The box is a plain text `[x]`, exactly how a C64 BASIC program would have
// drawn a checkbox on the character grid.
const Box = styled.span`
  &:before {
    content: '[';
  }
  &:after {
    content: ']';
  }
`;

const Root = styled('label', { disabled: Boolean })`
  font-family: ${V64_FONT};
  display: inline-flex;
  align-items: baseline;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  color: ${props => (props.disabled ? color('grey')(props) : color('primary')(props))};
  user-select: none;
`;

// The native input stays in the DOM but invisible: screen readers and keyboard
// users get the real control, everyone else sees the character box.
const Native = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;

  &:focus + span {
    color: ${color('green')};
  }
`;

const LabelText = styled.span`
  margin-left: 0.5em;
`;

export default {
  name: 'V64Checkbox',
  components: {
    Root,
    Native,
    Box,
    LabelText,
  },
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    /** Bound with `v-model`. */
    checked: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    /** Native value attribute, useful when the box is part of a `<form>`. */
    value: {
      type: [String, Number],
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      id: uid('v64-checkbox'),
    };
  },
  methods: {
    onChange(event) {
      /**
       * Fired when the box is ticked or unticked (`v-model`).
       * @event change
       * @type {boolean}
       */
      this.$emit('change', event.target.checked);
    },
  },
};
</script>
