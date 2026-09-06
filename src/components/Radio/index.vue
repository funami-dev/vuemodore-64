<template>
  <Root :disabled="disabled">
    <Native
      :id="id"
      type="radio"
      :name="name"
      :value="value"
      :checked="isChecked"
      :disabled="disabled"
      @change="onChange"
    />
    <Dot aria-hidden="true">{{ isChecked ? '*' : ' ' }}</Dot>
    <LabelText v-if="label || $slots.default"><slot>{{ label }}</slot></LabelText>
  </Root>
</template>
<script>
import styled from 'vue-styled-components';
import { color, V64_FONT } from '../../styles/theme';
import uid from '../../utils/uid';

// `(*)` and `( )` -- the same trick as the checkbox, with round brackets.
const Dot = styled.span`
  &:before {
    content: '(';
  }
  &:after {
    content: ')';
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
  name: 'V64Radio',
  components: {
    Root,
    Native,
    Dot,
    LabelText,
  },
  model: {
    prop: 'checkedValue',
    event: 'change',
  },
  props: {
    /** Value this button contributes when it is the selected one. */
    value: {
      type: [String, Number, Boolean],
      required: true,
    },
    /** Currently selected value of the group, bound with `v-model`. */
    checkedValue: {
      type: [String, Number, Boolean],
      default: null,
    },
    label: {
      type: String,
      default: '',
    },
    /** Groups radios together for the browser; defaults to a generated name. */
    name: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      id: uid('v64-radio'),
    };
  },
  computed: {
    isChecked() {
      return this.checkedValue === this.value;
    },
  },
  methods: {
    onChange() {
      /**
       * Fired when this button becomes the selected one (`v-model`).
       * @event change
       * @type {string|number|boolean}
       */
      this.$emit('change', this.value);
    },
  },
};
</script>
