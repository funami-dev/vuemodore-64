<template>
  <Root
    role="menu"
    tabindex="0"
    :aria-label="label || null"
    :aria-activedescendant="activeId"
    :block="block"
    @keydown="onKeydown"
  >
    <Item
      v-for="(option, index) in normalisedOptions"
      :id="`${id}-${index}`"
      :key="String(option.value)"
      role="menuitem"
      :active="index === activeIndex"
      :disabled="Boolean(option.disabled)"
      :aria-disabled="String(Boolean(option.disabled))"
      @click="select(index)"
      @mouseenter="onHover(index)"
    >
      <Caret aria-hidden="true">{{ index === activeIndex ? '>' : ' ' }}</Caret>
      {{ option.label }}
    </Item>
  </Root>
</template>
<script>
import styled from 'vue-styled-components';
import { color, V64_FONT } from '../../styles/theme';
import normaliseOptions from '../../utils/normaliseOptions';
import uid from '../../utils/uid';

// The menu screen every C64 game booted into: a list of entries with a `>`
// marking the current one, driven by the cursor keys.
const Root = styled('ul', { block: Boolean })`
  font-family: ${V64_FONT};
  display: ${props => (props.block ? 'block' : 'inline-block')};
  width: ${props => (props.block ? '100%' : 'auto')};
  margin: 0;
  padding: 0.5em 0;
  list-style: none;
  background: ${color('secondary')};
  color: ${color('primary')};

  &:focus {
    outline: 2px solid ${color('green')};
  }
`;

const Item = styled('li', { active: Boolean, disabled: Boolean })`
  padding: 0.25em 0.75em;
  text-transform: uppercase;
  white-space: nowrap;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  color: ${(props) => {
    if (props.disabled) return color('grey')(props);
    return props.active ? color('secondary')(props) : color('primary')(props);
  }};
  background: ${props => (props.active && !props.disabled ? color('primary')(props) : 'transparent')};
`;

const Caret = styled.span`
  display: inline-block;
  width: 1ch;
  margin-right: 0.5em;
`;

export default {
  name: 'V64Menu',
  components: {
    Root,
    Item,
    Caret,
  },
  props: {
    /**
     * Entries to show. Plain strings and numbers are expanded into
     * `{ value, label }`; `{ value, label, disabled }` skips an entry.
     */
    options: {
      type: Array,
      required: true,
    },
    /** Accessible name of the menu. */
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
      id: uid('v64-menu'),
      activeIndex: 0,
    };
  },
  computed: {
    normalisedOptions() {
      return normaliseOptions(this.options);
    },
    activeId() {
      return `${this.id}-${this.activeIndex}`;
    },
  },
  methods: {
    onKeydown(event) {
      const handlers = {
        ArrowDown: () => this.move(1),
        ArrowUp: () => this.move(-1),
        Home: () => this.moveTo(0),
        End: () => this.moveTo(this.normalisedOptions.length - 1),
        Enter: () => this.select(this.activeIndex),
        ' ': () => this.select(this.activeIndex),
      };
      const handler = handlers[event.key];
      if (!handler) return;
      event.preventDefault();
      handler();
    },
    /**
     * Steps to the next selectable entry, skipping disabled ones and wrapping
     * around the ends the way a game menu does.
     *
     * @param {number} step 1 to go down, -1 to go up
     */
    move(step) {
      const count = this.normalisedOptions.length;
      if (!count) return;
      let next = this.activeIndex;
      for (let i = 0; i < count; i += 1) {
        next = (next + step + count) % count;
        if (!this.normalisedOptions[next].disabled) {
          this.activeIndex = next;
          return;
        }
      }
    },
    moveTo(index) {
      if (this.normalisedOptions[index] && !this.normalisedOptions[index].disabled) {
        this.activeIndex = index;
      }
    },
    onHover(index) {
      this.moveTo(index);
    },
    select(index) {
      const option = this.normalisedOptions[index];
      if (!option || option.disabled) return;
      this.activeIndex = index;
      /**
       * Fired when an entry is chosen, by click or by Enter.
       * @event select
       * @type {*}
       */
      this.$emit('select', option.value);
    },
  },
};
</script>
