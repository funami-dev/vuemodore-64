<template>
  <Root :aria-label="label">
    <Trail>
      <Crumb v-for="(item, index) in normalisedItems" :key="index">
        <Separator v-if="index > 0" aria-hidden="true">{{ separator }}</Separator>
        <V64Link
          v-if="item.href && index < normalisedItems.length - 1"
          :href="item.href"
          @click="$emit('navigate', item)"
        >
          {{ item.label }}
        </V64Link>
        <Current v-else :aria-current="index === normalisedItems.length - 1 ? 'page' : null">
          {{ item.label }}
        </Current>
      </Crumb>
    </Trail>
  </Root>
</template>
<script>
import styled from 'vue-styled-components';
import V64Link from '../Link/index.vue';
import { color, V64_FONT } from '../../styles/theme';

const Root = styled.nav`
  font-family: ${V64_FONT};
  color: ${color('primary')};
`;

const Trail = styled.ol`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Crumb = styled.li`
  display: flex;
  align-items: center;
`;

const Separator = styled.span`
  margin: 0 0.5em;
  color: ${color('grey')};
`;

const Current = styled.span`
  color: ${color('lightgrey')};
`;

export default {
  name: 'V64Breadcrumb',
  components: {
    Root,
    Trail,
    Crumb,
    Separator,
    Current,
    V64Link,
  },
  props: {
    /**
     * Trail from the root to here, as `{ label, href }`. A plain string
     * becomes a step without a link. The last entry is always the current one.
     */
    items: {
      type: Array,
      required: true,
    },
    separator: {
      type: String,
      default: '/',
    },
    /** Accessible name of the navigation landmark. */
    label: {
      type: String,
      default: 'Breadcrumb',
    },
  },
  computed: {
    normalisedItems() {
      return this.items.map((item) => {
        if (item !== null && typeof item === 'object') return item;
        return { label: String(item) };
      });
    },
  },
};
</script>
