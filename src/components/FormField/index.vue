<template>
  <Root :block="block">
    <LabelRow v-if="label || $slots.suffix">
      <FieldLabel v-if="label" :for="id">{{ label }}</FieldLabel>
      <Suffix v-if="$slots.suffix"><slot name="suffix"></slot></Suffix>
    </LabelRow>
    <slot :id="id" :invalid="invalid" :described-by="describedBy"></slot>
    <Message v-if="error" :id="messageId" role="alert" :invalid="true">{{ error }}</Message>
    <Message v-else-if="hint" :id="messageId" :invalid="false">{{ hint }}</Message>
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

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.5em;
  text-transform: uppercase;
`;

const FieldLabel = styled.label`
  cursor: pointer;
`;

const Suffix = styled.span`
  margin-left: 1em;
`;

const Message = styled('div', { invalid: Boolean })`
  margin-top: 0.5em;
  text-transform: uppercase;
  color: ${props => (props.invalid ? color('red')(props) : color('lightgrey')(props))};
`;

export default {
  name: 'V64FormField',
  components: {
    Root,
    LabelRow,
    FieldLabel,
    Suffix,
    Message,
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    /** Message below the control; also switches the control to its error state. */
    error: {
      type: String,
      default: '',
    },
    /** Shown below the control while there is no error. */
    hint: {
      type: String,
      default: '',
    },
    block: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      id: uid('v64-field'),
    };
  },
  computed: {
    invalid() {
      return Boolean(this.error);
    },
    messageId() {
      return `${this.id}-message`;
    },
    describedBy() {
      return this.error || this.hint ? this.messageId : null;
    },
  },
};
</script>
