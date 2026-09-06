<template>
  <Anchor
    :href="disabled ? null : href"
    :target="target"
    :rel="rel"
    :aria-disabled="String(disabled)"
    :disabled="disabled"
    @click="onClick"
  >
    <slot></slot><External v-if="isExternal" aria-hidden="true">↗</External>
  </Anchor>
</template>
<script>
import styled from 'vue-styled-components';
import { color, V64_FONT } from '../../styles/theme';

const Anchor = styled('a', { disabled: Boolean })`
  font-family: ${V64_FONT};
  color: ${props => (props.disabled ? color('grey')(props) : color('primary')(props))};
  text-decoration: underline;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  &:hover:not([aria-disabled='true']),
  &:focus:not([aria-disabled='true']) {
    outline: none;
    background: ${color('primary')};
    color: ${color('secondary')};
  }
`;

const External = styled.span`
  margin-left: 0.25em;
`;

export default {
  name: 'V64Link',
  components: {
    Anchor,
    External,
  },
  props: {
    href: {
      type: String,
      default: '',
    },
    /** Opening in a new tab also sets a safe `rel` and marks the link. */
    target: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isExternal() {
      return this.target === '_blank';
    },
    rel() {
      // A `_blank` link without this hands the opened page a handle on ours.
      return this.isExternal ? 'noopener noreferrer' : null;
    },
  },
  methods: {
    onClick(event) {
      if (this.disabled) {
        event.preventDefault();
        return;
      }
      this.$emit('click', event);
    },
  },
};
</script>
