<template>
  <Root role="radiogroup" :aria-label="label" :inline="inline">
    <GroupLabel v-if="label">{{ label }}</GroupLabel>
    <V64Radio
      v-for="option in normalisedOptions"
      :key="String(option.value)"
      :value="option.value"
      :label="option.label"
      :name="groupName"
      :checked-value="value"
      :disabled="disabled || option.disabled"
      @change="$emit('change', $event)"
    />
  </Root>
</template>
<script>
import styled from 'vue-styled-components';
import V64Radio from './index.vue';
import { color, V64_FONT } from '../../styles/theme';
import uid from '../../utils/uid';
import normaliseOptions from '../../utils/normaliseOptions';

const Root = styled('div', { inline: Boolean })`
  font-family: ${V64_FONT};
  color: ${color('primary')};
  display: flex;
  flex-direction: ${props => (props.inline ? 'row' : 'column')};
  align-items: ${props => (props.inline ? 'center' : 'flex-start')};
  flex-wrap: wrap;

  > label {
    margin: 0 ${props => (props.inline ? '1em' : '0')} 0.25em 0;
  }
`;

const GroupLabel = styled.div`
  width: 100%;
  margin-bottom: 0.5em;
  text-transform: uppercase;
`;

export default {
  name: 'V64RadioGroup',
  components: {
    Root,
    GroupLabel,
    V64Radio,
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    /** Selected value of the group, bound with `v-model`. */
    value: {
      type: [String, Number, Boolean],
      default: null,
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
    /** Lays the buttons out in a row instead of a column. */
    inline: {
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
      groupName: uid('v64-radio-group'),
    };
  },
  computed: {
    normalisedOptions() {
      return normaliseOptions(this.options);
    },
  },
};
</script>
