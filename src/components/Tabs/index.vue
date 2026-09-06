<template>
  <Root :block="block">
    <Strip role="tablist" :aria-label="label || null" @keydown="onKeydown">
      <Tab
        v-for="(tab, index) in normalisedTabs"
        :id="`${id}-tab-${index}`"
        :key="String(tab.value)"
        role="tab"
        type="button"
        :selected="tab.value === value"
        :disabled="Boolean(tab.disabled)"
        :aria-selected="String(tab.value === value)"
        :aria-controls="`${id}-panel-${index}`"
        :tabindex="tab.value === value ? 0 : -1"
        @click="select(tab)"
      >
        {{ tab.label }}
      </Tab>
    </Strip>
    <Sheet
      v-for="(tab, index) in normalisedTabs"
      v-show="tab.value === value"
      :id="`${id}-panel-${index}`"
      :key="String(tab.value)"
      role="tabpanel"
      :aria-labelledby="`${id}-tab-${index}`"
      tabindex="0"
    >
      <slot :name="tab.value" :tab="tab"></slot>
    </Sheet>
  </Root>
</template>
<script>
import styled from 'vue-styled-components';
import { color, V64_FONT } from '../../styles/theme';
import normaliseOptions from '../../utils/normaliseOptions';
import uid from '../../utils/uid';

const Root = styled('div', { block: Boolean })`
  font-family: ${V64_FONT};
  display: ${props => (props.block ? 'block' : 'inline-block')};
  width: ${props => (props.block ? '100%' : 'auto')};
  color: ${color('primary')};
`;

const Strip = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Tab = styled('button', { selected: Boolean })`
  font-family: ${V64_FONT};
  font-size: 1em;
  padding: 0.5em 1em;
  border: 2px solid ${color('primary')};
  border-bottom: none;
  border-radius: 0;
  cursor: pointer;
  text-transform: uppercase;
  background: ${props => (props.selected ? color('primary')(props) : color('secondary')(props))};
  color: ${props => (props.selected ? color('secondary')(props) : color('primary')(props))};

  & + & {
    border-left: none;
  }

  &:focus {
    outline: none;
    border-color: ${color('green')};
  }

  &:disabled {
    color: ${color('grey')};
    cursor: not-allowed;
  }
`;

const Sheet = styled.div`
  padding: 1em;
  border: 2px solid ${color('primary')};
  background: ${color('secondary')};

  &:focus {
    outline: none;
  }
`;

export default {
  name: 'V64Tabs',
  components: {
    Root,
    Strip,
    Tab,
    Sheet,
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    /** Value of the open tab, bound with `v-model`. */
    value: {
      type: [String, Number],
      default: null,
    },
    /**
     * Tabs as `{ value, label, disabled }`; a plain string becomes a tab
     * keyed and labelled by itself. Each tab's content goes in a slot named
     * after its value.
     */
    tabs: {
      type: Array,
      required: true,
    },
    label: {
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
      id: uid('v64-tabs'),
    };
  },
  computed: {
    normalisedTabs() {
      return normaliseOptions(this.tabs);
    },
    selectedIndex() {
      return this.normalisedTabs.findIndex(tab => tab.value === this.value);
    },
  },
  methods: {
    onKeydown(event) {
      const steps = { ArrowRight: 1, ArrowLeft: -1 };
      const step = steps[event.key];
      if (!step) return;
      event.preventDefault();
      this.move(step);
    },
    /**
     * Moves to the next selectable tab, skipping disabled ones and wrapping.
     *
     * @param {number} step 1 for the next tab, -1 for the previous one
     */
    move(step) {
      const tabs = this.normalisedTabs;
      const count = tabs.length;
      if (!count) return;
      let next = this.selectedIndex === -1 ? 0 : this.selectedIndex;
      for (let i = 0; i < count; i += 1) {
        next = (next + step + count) % count;
        if (!tabs[next].disabled) {
          this.select(tabs[next]);
          return;
        }
      }
    },
    select(tab) {
      if (tab.disabled || tab.value === this.value) return;
      /**
       * Fired when another tab is opened (`v-model`).
       * @event change
       * @type {string|number}
       */
      this.$emit('change', tab.value);
    },
  },
};
</script>
