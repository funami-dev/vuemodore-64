<template>
  <V64FormField :label="label" :error="error" :hint="hint" :block="block">
    <template slot-scope="field">
      <Row>
        <Native
          :id="field.id"
          ref="native"
          type="file"
          :accept="accept"
          :multiple="multiple"
          :disabled="disabled"
          :aria-invalid="String(field.invalid)"
          :aria-describedby="field.describedBy"
          @change="onChange"
        />
        <Pick type="button" :disabled="disabled" @click="browse">{{ buttonText }}</Pick>
        <Name :empty="!fileNames">{{ fileNames || placeholder }}</Name>
      </Row>
    </template>
  </V64FormField>
</template>
<script>
import styled from 'vue-styled-components';
import V64FormField from '../FormField/index.vue';
import { color, V64_FONT } from '../../styles/theme';

const Row = styled.div`
  display: flex;
  align-items: stretch;
`;

// The real input is driven by the button next to it, because no browser lets
// its own file control be styled into a C64 character grid.
const Native = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
`;

const Pick = styled.button`
  font-family: ${V64_FONT};
  font-size: 1em;
  flex: 0 0 auto;
  padding: 0.5em 1em;
  text-transform: uppercase;
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

const Name = styled('span', { empty: Boolean })`
  flex: 1 1 auto;
  min-width: 0;
  padding: 0.5em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: 2px solid ${color('primary')};
  border-left: none;
  color: ${props => (props.empty ? color('grey')(props) : color('primary')(props))};
`;

export default {
  name: 'V64FileInput',
  components: {
    V64FormField,
    Row,
    Native,
    Pick,
    Name,
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    /** Text on the button that opens the file picker. */
    buttonText: {
      type: String,
      default: 'Press play on tape',
    },
    /** Shown in place of the file name while nothing is chosen. */
    placeholder: {
      type: String,
      default: 'No file selected',
    },
    accept: {
      type: String,
      default: null,
    },
    multiple: {
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
  data() {
    return {
      files: [],
    };
  },
  computed: {
    fileNames() {
      return this.files.map(file => file.name).join(', ');
    },
  },
  methods: {
    browse() {
      const { native } = this.$refs;
      if (native) (native.$el || native).click();
    },
    onChange(event) {
      this.files = Array.from(event.target.files || []);
      /**
       * Fired when files are chosen; carries an array of `File` objects.
       * @event change
       * @type {File[]}
       */
      this.$emit('change', this.files);
    },
  },
};
</script>
