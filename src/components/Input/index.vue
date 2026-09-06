<template>
  <Wrapper :block="block">
    <FieldLabel v-if="label" :for="id">{{ label }}</FieldLabel>
    <Field
      :id="id"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      :invalid="Boolean(error)"
      :aria-invalid="String(Boolean(error))"
      :aria-describedby="error ? `${id}-error` : null"
      @input="onInput"
      @change="onChange"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    />
    <Error v-if="error" :id="`${id}-error`" role="alert">{{ error }}</Error>
  </Wrapper>
</template>
<script>
import styled from 'vue-styled-components';
import { color, V64_FONT } from '../../styles/theme';
import uid from '../../utils/uid';
import domValue from '../../utils/domValue';

const Wrapper = styled('div', { block: Boolean })`
  font-family: ${V64_FONT};
  display: ${props => (props.block ? 'block' : 'inline-block')};
  width: ${props => (props.block ? '100%' : 'auto')};
  color: ${color('primary')};
`;

const FieldLabel = styled.label`
  display: block;
  margin-bottom: 0.5em;
  text-transform: uppercase;
  cursor: pointer;
`;

const Field = styled('input', { invalid: Boolean })`
  font-family: ${V64_FONT};
  font-size: 1em;
  width: 100%;
  padding: 0.5em;
  border-radius: 0;
  border: 2px solid ${props => (props.invalid ? color('red')(props) : color('primary')(props))};
  color: ${color('primary')};
  background: ${color('secondary')};
  caret-color: ${color('primary')};

  &::placeholder {
    color: ${color('grey')};
  }

  &:focus {
    outline: none;
    border-color: ${color('green')};
  }

  &:disabled {
    color: ${color('grey')};
    border-color: ${color('grey')};
    cursor: not-allowed;
  }
`;

const Error = styled.div`
  margin-top: 0.5em;
  color: ${color('red')};
  text-transform: uppercase;
`;

export default {
  name: 'V64Input',
  components: {
    Wrapper,
    FieldLabel,
    Field,
    Error,
  },
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    /** Bound with `v-model`. */
    value: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
      validator: value => ['text', 'password', 'email', 'number', 'search', 'tel'].includes(value),
    },
    /** Message shown below the field; also switches the field to its error colours. */
    error: {
      type: String,
      default: '',
    },
    maxlength: {
      type: [String, Number],
      default: null,
    },
    block: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      id: uid('v64-input'),
    };
  },
  methods: {
    onInput(payload) {
      /**
       * Fired on every keystroke, carries the new value (`v-model`).
       * @event input
       * @type {string}
       */
      this.$emit('input', domValue(payload));
    },
    onChange(payload) {
      this.$emit('change', domValue(payload));
    },
  },
};
</script>
