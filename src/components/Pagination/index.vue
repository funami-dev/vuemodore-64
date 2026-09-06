<template>
  <Root :aria-label="label">
    <Step
      type="button"
      :disabled="page <= 1"
      aria-label="Previous page"
      @click="go(page - 1)"
    >
      &lt;
    </Step>
    <Numbers>
      <template v-for="(entry, index) in entries">
        <Gap v-if="entry === null" :key="`gap-${index}`" aria-hidden="true">...</Gap>
        <Step
          v-else
          :key="entry"
          type="button"
          :current="entry === page"
          :aria-current="entry === page ? 'page' : null"
          :aria-label="`Page ${entry}`"
          @click="go(entry)"
        >
          {{ entry }}
        </Step>
      </template>
    </Numbers>
    <Step
      type="button"
      :disabled="page >= pages"
      aria-label="Next page"
      @click="go(page + 1)"
    >
      &gt;
    </Step>
  </Root>
</template>
<script>
import styled from 'vue-styled-components';
import { color, V64_FONT } from '../../styles/theme';

const Root = styled.nav`
  font-family: ${V64_FONT};
  display: inline-flex;
  align-items: center;
  color: ${color('primary')};
`;

const Numbers = styled.div`
  display: flex;
  align-items: center;
`;

const Step = styled('button', { current: Boolean })`
  font-family: ${V64_FONT};
  font-size: 1em;
  min-width: 2.5em;
  padding: 0.25em 0.5em;
  margin: 0 1px;
  border: 2px solid ${props => (props.current ? color('primary')(props) : 'transparent')};
  border-radius: 0;
  cursor: pointer;
  background: ${props => (props.current ? color('primary')(props) : color('secondary')(props))};
  color: ${props => (props.current ? color('secondary')(props) : color('primary')(props))};

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    outline: none;
    border-color: ${color('green')};
  }

  &:disabled {
    color: ${color('grey')};
    cursor: not-allowed;
  }
`;

const Gap = styled.span`
  padding: 0 0.5em;
  color: ${color('grey')};
`;

export default {
  name: 'V64Pagination',
  components: {
    Root,
    Numbers,
    Step,
    Gap,
  },
  model: {
    prop: 'page',
    event: 'change',
  },
  props: {
    /** Current page, 1 based, bound with `v-model`. */
    page: {
      type: Number,
      default: 1,
    },
    /** Total number of pages. */
    pages: {
      type: Number,
      required: true,
      validator: value => value >= 1,
    },
    /** How many pages to show either side of the current one. */
    around: {
      type: Number,
      default: 1,
    },
    label: {
      type: String,
      default: 'Pagination',
    },
  },
  computed: {
    /**
     * The page numbers to show, with `null` standing in for a gap.
     *
     * The first and last page are always reachable; everything further than
     * `around` from the current page collapses, so the control keeps its width
     * whether there are five pages or five hundred.
     *
     * @returns {Array<number|null>} page numbers, gaps as null
     */
    entries() {
      const shown = new Set([1, this.pages]);
      for (let i = this.page - this.around; i <= this.page + this.around; i += 1) {
        if (i >= 1 && i <= this.pages) shown.add(i);
      }

      const sorted = [...shown].sort((a, b) => a - b);
      return sorted.reduce((entries, number, index) => {
        const previous = sorted[index - 1];
        // A gap standing in for a single page is wider than the page it hides,
        // so only collapse a run of two or more.
        if (index > 0 && number - previous === 2) entries.push(previous + 1);
        else if (index > 0 && number - previous > 2) entries.push(null);
        entries.push(number);
        return entries;
      }, []);
    },
  },
  methods: {
    go(page) {
      if (page < 1 || page > this.pages || page === this.page) return;
      /**
       * Fired when another page is picked (`v-model`).
       * @event change
       * @type {number}
       */
      this.$emit('change', page);
    },
  },
};
</script>
