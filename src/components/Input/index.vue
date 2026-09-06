<template>
  <V64FormField :label="label" :error="error" :hint="hint" :block="block">
    <template slot-scope="field">
      <Field
        :id="field.id"
        :type="type"
        :value="value"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxlength"
        :invalid="field.invalid"
        :aria-invalid="String(field.invalid)"
        :aria-describedby="field.describedBy"
        @input="onInput"
        @change="onChange"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      />
    </template>
  </V64FormField>
</template>
<script>
import styled from 'vue-styled-components';
import V64FormField from '../FormField/index.vue';
import { color, V64_FONT } from '../../styles/theme';
import domValue from '../../utils/domValue';

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

export default {
  name: 'V64Input',
  components: {
    V64FormField,
    Field,
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
      validator: value => ['text', 'password', 'email', 'search', 'tel', 'url'].includes(value),
    },
    /** Message shown below the field; also switches the field to its error colours. */
    error: {
      type: String,
      default: '',
    },
    hint: {
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
