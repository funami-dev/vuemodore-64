<template>
  <Overlay v-if="open" @click.self="onOverlayClick">
    <Sheet
      ref="sheet"
      role="dialog"
      aria-modal="true"
      :aria-label="title || null"
      tabindex="-1"
      @keydown.esc="onEsc"
    >
      <V64Panel :title="title" :closable="closable" block @close="close">
        <slot></slot>
        <template v-if="$slots.footer" slot="footer"><slot name="footer"></slot></template>
      </V64Panel>
    </Sheet>
  </Overlay>
</template>
<script>
import styled from 'vue-styled-components';
import V64Panel from '../Panel/index.vue';
import { color } from '../../styles/theme';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em;
  background: ${color('black')};
  background: rgba(0, 0, 0, 0.6);
`;

const Sheet = styled.div`
  width: 100%;
  max-width: 32em;
  max-height: 100%;
  overflow: auto;

  &:focus {
    outline: none;
  }
`;

export default {
  name: 'V64Modal',
  components: {
    Overlay,
    Sheet,
    V64Panel,
  },
  model: {
    prop: 'open',
    event: 'change',
  },
  props: {
    /** Whether the dialog is showing. Bound with `v-model`. */
    open: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    /** Shows the close button in the title bar. */
    closable: {
      type: Boolean,
      default: true,
    },
    /** Closes when the backdrop next to the dialog is clicked. */
    closeOnOverlay: {
      type: Boolean,
      default: true,
    },
    closeOnEsc: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    open: {
      immediate: true,
      handler(open) {
        if (open) this.$nextTick(this.focusSheet);
      },
    },
  },
  methods: {
    focusSheet() {
      // Moving focus into the dialog is what makes Escape and Tab behave; without
      // it the keyboard stays behind on the page that opened it. The ref is a
      // styled component, so the element to focus is its $el.
      const { sheet } = this.$refs;
      if (sheet) (sheet.$el || sheet).focus();
    },
    onOverlayClick() {
      if (this.closeOnOverlay) this.close();
    },
    onEsc() {
      if (this.closeOnEsc) this.close();
    },
    close() {
      /**
       * Fired when the dialog asks to be closed (`v-model`).
       * @event change
       * @type {boolean}
       */
      this.$emit('change', false);
      this.$emit('close');
    },
  },
};
</script>
