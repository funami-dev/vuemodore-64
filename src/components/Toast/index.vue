<template>
  <Anchor v-if="open" :placement="placement">
    <V64Alert :variant="variant" :title="title" dismissible block @dismiss="close">
      <slot></slot>
    </V64Alert>
  </Anchor>
</template>
<script>
import styled from 'vue-styled-components';
import V64Alert from '../Alert/index.vue';

const PLACEMENTS = {
  'top-left': 'top: 1em; left: 1em;',
  'top-right': 'top: 1em; right: 1em;',
  'bottom-left': 'bottom: 1em; left: 1em;',
  'bottom-right': 'bottom: 1em; right: 1em;',
};

const Anchor = styled('div', { placement: String })`
  position: fixed;
  z-index: 200;
  max-width: 24em;
  ${props => PLACEMENTS[props.placement]}
`;

export default {
  name: 'V64Toast',
  components: {
    Anchor,
    V64Alert,
  },
  model: {
    prop: 'open',
    event: 'change',
  },
  props: {
    /** Whether the toast is showing. Bound with `v-model`. */
    open: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    variant: {
      type: String,
      default: 'info',
    },
    placement: {
      type: String,
      default: 'bottom-right',
      validator: value => Object.keys(PLACEMENTS).includes(value),
    },
    /** Milliseconds before it closes itself. 0 keeps it up until dismissed. */
    duration: {
      type: Number,
      default: 4000,
    },
  },
  data() {
    return {
      timer: null,
    };
  },
  watch: {
    open: 'schedule',
    duration: 'schedule',
  },
  mounted() {
    this.schedule();
  },
  beforeDestroy() {
    this.clearTimer();
  },
  methods: {
    /**
     * Restarts the self-close countdown for the current state.
     *
     * Scheduling belongs after the component exists rather than in an
     * `immediate` watcher, which would set a timer during initialisation.
     */
    schedule() {
      this.clearTimer();
      if (this.open && this.duration > 0) this.timer = setTimeout(this.close, this.duration);
    },
    clearTimer() {
      // A toast dismissed by hand must not close a later one on its old timer.
      if (this.timer) clearTimeout(this.timer);
      this.timer = null;
    },
    close() {
      this.clearTimer();
      /**
       * Fired when the toast closes, by hand or on its own (`v-model`).
       * @event change
       * @type {boolean}
       */
      this.$emit('change', false);
      this.$emit('close');
    },
  },
};
</script>
