<template>
  <Root :block="block">
    <Grid>
      <caption v-if="caption">{{ caption }}</caption>
      <thead>
        <tr>
          <HeadCell
            v-for="column in normalisedColumns"
            :key="column.key"
            scope="col"
            :align="column.align"
          >
            {{ column.label }}
          </HeadCell>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index">
          <Cell
            v-for="column in normalisedColumns"
            :key="column.key"
            :align="column.align"
          >
            <slot :name="column.key" :row="row" :value="row[column.key]">
              {{ row[column.key] }}
            </slot>
          </Cell>
        </tr>
        <tr v-if="!rows.length">
          <Cell :colspan="normalisedColumns.length" align="center">{{ emptyText }}</Cell>
        </tr>
      </tbody>
    </Grid>
  </Root>
</template>
<script>
import styled from 'vue-styled-components';
import { color, V64_FONT } from '../../styles/theme';

const ALIGNMENTS = ['left', 'center', 'right'];

// Wide tables scroll inside their own box rather than pushing the page sideways.
const Root = styled('div', { block: Boolean })`
  font-family: ${V64_FONT};
  display: ${props => (props.block ? 'block' : 'inline-block')};
  width: ${props => (props.block ? '100%' : 'auto')};
  max-width: 100%;
  overflow-x: auto;
  color: ${color('primary')};
  background: ${color('secondary')};
`;

const Grid = styled.table`
  width: 100%;
  border-collapse: collapse;
  white-space: nowrap;

  caption {
    padding: 0.5em;
    text-align: left;
    text-transform: uppercase;
  }
`;

const HeadCell = styled('th', { align: String })`
  padding: 0.5em 0.75em;
  text-align: ${props => props.align};
  text-transform: uppercase;
  font-weight: normal;
  background: ${color('primary')};
  color: ${color('secondary')};
`;

const Cell = styled('td', { align: String })`
  padding: 0.5em 0.75em;
  text-align: ${props => props.align};
  border-bottom: 1px solid ${color('grey')};
`;

export default {
  name: 'V64Table',
  components: {
    Root,
    Grid,
    HeadCell,
    Cell,
  },
  props: {
    /**
     * Columns as `{ key, label, align }`. A plain string is expanded into a
     * column keyed and labelled by itself.
     */
    columns: {
      type: Array,
      required: true,
    },
    /** One object per row, read by the `key` of each column. */
    rows: {
      type: Array,
      required: true,
    },
    caption: {
      type: String,
      default: '',
    },
    /** Shown in place of the rows when there are none. */
    emptyText: {
      type: String,
      default: 'No entries',
    },
    block: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    normalisedColumns() {
      return this.columns.map((column) => {
        const source = typeof column === 'object' && column !== null ? column : { key: column };
        return {
          key: source.key,
          label: source.label === undefined ? String(source.key) : source.label,
          align: ALIGNMENTS.includes(source.align) ? source.align : 'left',
        };
      });
    },
  },
};
</script>
