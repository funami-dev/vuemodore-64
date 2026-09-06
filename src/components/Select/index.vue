<template>
  <Root :block="block">
    <FieldLabel v-if="label" :for="id">{{ label }}</FieldLabel>
    <Shell :disabled="disabled">
      <Native :id="id" :value="value" :disabled="disabled" @change="onChange">
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
  </Root>
</template>
<script>
import styled from 'vue-styled-components';
import { color, V64_FONT } from '../../styles/theme';
import uid from '../../utils/uid';

const Root = styled('div', { block: Boolean })`
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

// The arrow is a character of its own, so the native dropdown indicator is
// switched off and replaced by one that matches the character grid.
const Shell = styled('div', { disabled: Boolean })`
  position: relative;
  display: flex;
  align-items: center;
  border: 2px solid ${props => (props.disabled ? color('grey')(props) : color('primary')(props))};
  background: ${color('secondary')};

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
    Root,
    FieldLabel,
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
      id: uid('v64-select'),
    };
  },
  computed: {
    normalisedOptions() {
      return this.options.map((option) => {
        if (option !== null && typeof option === 'object') return option;
        return { value: option, label: String(option) };
      });
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
