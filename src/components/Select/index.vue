<template>
  <V64FormField :label="label" :error="error" :hint="hint" :block="block">
    <template slot-scope="field">
      <Shell :disabled="disabled" :invalid="field.invalid">
        <Native
          :id="field.id"
          :value="value"
          :disabled="disabled"
          :aria-invalid="String(field.invalid)"
          :aria-describedby="field.describedBy"
          @change="onChange"
        >
          <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
          <option
            v-for="option in normalisedOptions"
            :key="String(option.value)"
            :value="option.value"
            :disabled="option.disabled"
          >
            {{ option.label }}
          </option>
        </Native>
        <Arrow aria-hidden="true">▼</Arrow>
      </Shell>
    </template>
  </V64FormField>
</template>
<script>
import styled from 'vue-styled-components';
import V64FormField from '../FormField/index.vue';
import { color, V64_FONT } from '../../styles/theme';
import normaliseOptions from '../../utils/normaliseOptions';

// The arrow is a character of its own, so the native dropdown indicator is
// switched off and replaced by one that matches the character grid.
const Shell = styled('div', { disabled: Boolean, invalid: Boolean })`
  position: relative;
  display: flex;
  align-items: center;
  background: ${color('secondary')};
  border: 2px solid
    ${(props) => {
    if (props.disabled) return color('grey')(props);
    if (props.invalid) return color('red')(props);
    return color('primary')(props);
  }};

  &:focus-within {
    border-color: ${color('green')};
  }
`;

const Native = styled.select`
  font-family: ${V64_FONT};
  font-size: 1em;
  width: 100%;
  padding: 0.5em 2em 0.5em 0.5em;
  border: none;
  border-radius: 0;
  appearance: none;
  -webkit-appearance: none;
  color: ${color('primary')};
  background: transparent;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:disabled {
    color: ${color('grey')};
    cursor: not-allowed;
  }

  option {
    color: ${color('primary')};
    background: ${color('secondary')};
  }
`;

const Arrow = styled.span`
  position: absolute;
  right: 0.5em;
  pointer-events: none;
  color: ${color('primary')};
`;

export default {
  name: 'V64Select',
  components: {
    V64FormField,
    Shell,
    Native,
    Arrow,
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    /** Selected value, bound with `v-model`. */
    value: {
      type: [String, Number],
      default: '',
    },
    /**
     * Options to render. Plain strings and numbers are expanded into
     * `{ value, label }`, so the common case stays short.
     */
    options: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    /** Shown as a disabled first entry while nothing is selected. */
    placeholder: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
    hint: {
      type: String,
      default: '',
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
    normalisedOptions() {
      return normaliseOptions(this.options);
    },
  },
  methods: {
    onChange(event) {
      /**
       * Fired when another entry is picked (`v-model`).
       * @event change
       * @type {string}
       */
      this.$emit('change', event.target.value);
    },
  },
};
</script>
