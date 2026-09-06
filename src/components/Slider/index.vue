<template>
  <V64FormField :label="label" :error="error" :hint="hint" :block="block">
    <template v-if="showValue" slot="suffix">{{ value }}</template>
    <template slot-scope="field">
      <Range
        :id="field.id"
        type="range"
        :value="value"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-valuenow="value"
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
import { color } from '../../styles/theme';
import domValue from '../../utils/domValue';

// Both engines need their thumb and track styled separately, and neither
// understands the other's selector -- so the rules are spelled out twice
// instead of grouped, otherwise both would be dropped.
const Range = styled.input`
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: 1.5em;
  background: transparent;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  &:focus {
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    height: 0.75em;
    background: ${color('secondary')};
    border: 2px solid ${color('primary')};
  }

  &::-moz-range-track {
    height: 0.75em;
    background: ${color('secondary')};
    border: 2px solid ${color('primary')};
  }

  &::-webkit-slider-thumb {
    appearance: none;
    -webkit-appearance: none;
    width: 0.75em;
    height: 1.25em;
    margin-top: -0.375em;
    border: none;
    border-radius: 0;
    background: ${color('primary')};
  }

  &::-moz-range-thumb {
    width: 0.75em;
    height: 1.25em;
    border: none;
    border-radius: 0;
    background: ${color('primary')};
  }

  &:focus::-webkit-slider-thumb {
    background: ${color('green')};
  }

  &:focus::-moz-range-thumb {
    background: ${color('green')};
  }

  &:disabled::-webkit-slider-thumb {
    background: ${color('grey')};
  }

  &:disabled::-moz-range-thumb {
    background: ${color('grey')};
  }
`;

export default {
  name: 'V64Slider',
  components: {
    V64FormField,
    Range,
  },
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    /** Current value, bound with `v-model`. */
    value: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    step: {
      type: Number,
      default: 1,
    },
    label: {
      type: String,
      default: '',
    },
    /** Prints the current value next to the label. */
    showValue: {
      type: Boolean,
      default: false,
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
  methods: {
    onInput(payload) {
      /**
       * Fired while dragging, carries a number (`v-model`).
       * @event input
       * @type {number}
       */
      this.$emit('input', Number(domValue(payload)));
    },
    onChange(payload) {
      this.$emit('change', Number(domValue(payload)));
    },
  },
};
</script>
