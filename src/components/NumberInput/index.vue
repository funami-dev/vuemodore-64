<template>
  <V64FormField :label="label" :error="error" :hint="hint" :block="block">
    <template slot-scope="field">
      <Row>
        <StepButton
          type="button"
          aria-label="Decrease"
          :disabled="disabled || atMin"
          @click="step(-1)"
        >
          -
        </StepButton>
        <Field
          :id="field.id"
          type="number"
          :value="value"
          :min="min"
          :max="max"
          :step="stepSize"
          :disabled="disabled"
          :invalid="field.invalid"
          :aria-invalid="String(field.invalid)"
          :aria-describedby="field.describedBy"
          @input="onInput"
        />
        <StepButton
          type="button"
          aria-label="Increase"
          :disabled="disabled || atMax"
          @click="step(1)"
        >
          +
        </StepButton>
      </Row>
    </template>
  </V64FormField>
</template>
<script>
import styled from 'vue-styled-components';
import V64FormField from '../FormField/index.vue';
import { color, V64_FONT } from '../../styles/theme';
import domValue from '../../utils/domValue';

const Row = styled.div`
  display: flex;
  align-items: stretch;
`;

const StepButton = styled.button`
  font-family: ${V64_FONT};
  font-size: 1em;
  width: 2em;
  border: 2px solid ${color('primary')};
  border-radius: 0;
  cursor: pointer;
  background: ${color('secondary')};
  color: ${color('primary')};

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    outline: none;
    background: ${color('primary')};
    color: ${color('secondary')};
  }

  &:disabled {
    color: ${color('grey')};
    border-color: ${color('grey')};
    cursor: not-allowed;
  }
`;

const Field = styled('input', { invalid: Boolean })`
  font-family: ${V64_FONT};
  font-size: 1em;
  width: 100%;
  min-width: 4em;
  padding: 0.5em;
  text-align: center;
  border-radius: 0;
  border: 2px solid ${props => (props.invalid ? color('red')(props) : color('primary')(props))};
  border-left: none;
  border-right: none;
  color: ${color('primary')};
  background: ${color('secondary')};

  &:focus {
    outline: none;
    border-color: ${color('green')};
  }

  &:disabled {
    color: ${color('grey')};
    cursor: not-allowed;
  }
`;

export default {
  name: 'V64NumberInput',
  components: {
    V64FormField,
    Row,
    StepButton,
    Field,
  },
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    /** Bound with `v-model`. */
    value: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: null,
    },
    max: {
      type: Number,
      default: null,
    },
    /** Amount added or removed per step. */
    stepSize: {
      type: Number,
      default: 1,
    },
    label: {
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
    atMin() {
      return this.min !== null && this.value <= this.min;
    },
    atMax() {
      return this.max !== null && this.value >= this.max;
    },
  },
  methods: {
    /**
     * Clamps a number into the configured bounds.
     *
     * @param {number} value candidate value
     * @returns {number} the value, held inside min and max
     */
    clamp(value) {
      let next = value;
      if (this.min !== null) next = Math.max(next, this.min);
      if (this.max !== null) next = Math.min(next, this.max);
      return next;
    },
    step(direction) {
      this.emit(this.clamp(this.value + direction * this.stepSize));
    },
    onInput(payload) {
      const raw = domValue(payload);
      // `Number('')` is 0, not NaN, so an empty field would otherwise snap the
      // value to zero mid-typing. Both an empty and an unparseable field leave
      // the value alone until something numeric is there.
      if (raw === '' || raw === null || raw === undefined) return;
      const next = Number(raw);
      if (Number.isNaN(next)) return;
      this.emit(this.clamp(next));
    },
    emit(value) {
      if (value === this.value) return;
      /**
       * Fired when the number changes (`v-model`).
       * @event input
       * @type {number}
       */
      this.$emit('input', value);
    },
  },
};
</script>
