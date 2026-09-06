<template>
  <V64FormField :label="label" :error="error" :hint="hint" :block="block">
    <template v-if="maxlength" slot="suffix">{{ remaining }}</template>
    <template slot-scope="field">
      <Field
        :id="field.id"
        :value="value"
        :rows="rows"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxlength"
        :invalid="field.invalid"
        :aria-invalid="String(field.invalid)"
        :aria-describedby="field.describedBy"
        @input="onInput"
        @change="onChange"
      />
    </template>
  </V64FormField>
</template>
<script>
import styled from 'vue-styled-components';
import V64FormField from '../FormField/index.vue';
import { color, V64_FONT } from '../../styles/theme';
import domValue from '../../utils/domValue';

const Field = styled('textarea', { invalid: Boolean })`
  font-family: ${V64_FONT};
  font-size: 1em;
  width: 100%;
  padding: 0.5em;
  border-radius: 0;
  resize: vertical;
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
  name: 'V64Textarea',
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
      type: String,
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
    rows: {
      type: Number,
      default: 4,
    },
    error: {
      type: String,
      default: '',
    },
    hint: {
      type: String,
      default: '',
    },
    /** Also turns on the remaining-character count next to the label. */
    maxlength: {
      type: Number,
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
  computed: {
    remaining() {
      return this.maxlength - String(this.value).length;
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
