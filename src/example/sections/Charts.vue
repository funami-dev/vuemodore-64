<template>
  <div>
    <Bar>
      <V64Select v-model="sort" label="Sortierung" :options="sorts" />
      <V64NumberInput v-model="perPage" label="Pro Seite" :min="4" :max="12" :step-size="4" />
    </Bar>

    <V64Spinner v-if="loading" label="Charts werden geladen" />

    <template v-else>
      <V64Table
        :columns="columns"
        :rows="page"
        caption="Die beliebtesten Demos der Szene"
        block
      >
        <template slot="title" slot-scope="cell">
          <V64Link href="#">{{ cell.value }}</V64Link>
          <V64Badge v-if="cell.row.rank <= 3" variant="success" label="Top 3" />
        </template>
      </V64Table>

      <Foot>
        <V64Pagination v-model="current" :pages="pages" />
        <Count>{{ rows.length }} Einträge</Count>
      </Foot>
    </template>
  </div>
</template>
<script>
import styled from 'vue-styled-components';
import {
  V64Select, V64NumberInput, V64Spinner, V64Table, V64Link, V64Badge, V64Pagination,
} from '../../components';
import { CHART_COLUMNS, CHART_ROWS } from '../data';
import { color } from '../../styles/theme';

const SORTS = ['Stimmen', 'Titel', 'Gruppe'];

const Bar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 1em;
  margin-bottom: 1em;
`;

const Foot = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1em;
  margin-top: 1em;
`;

const Count = styled.span`
  text-transform: uppercase;
  color: ${color('grey')};
`;

export default {
  name: 'ExampleCharts',
  components: {
    Bar,
    Foot,
    Count,
    V64Select,
    V64NumberInput,
    V64Spinner,
    V64Table,
    V64Link,
    V64Badge,
    V64Pagination,
  },
  data() {
    return {
      columns: CHART_COLUMNS,
      rows: CHART_ROWS,
      sorts: SORTS,
      sort: SORTS[0],
      perPage: 4,
      current: 1,
      loading: false,
      timer: null,
    };
  },
  computed: {
    sorted() {
      const rows = [...this.rows];
      if (this.sort === 'Titel') return rows.sort((a, b) => a.title.localeCompare(b.title));
      if (this.sort === 'Gruppe') return rows.sort((a, b) => a.group.localeCompare(b.group));
      return rows.sort((a, b) => b.votes - a.votes);
    },
    pages() {
      return Math.max(1, Math.ceil(this.sorted.length / this.perPage));
    },
    page() {
      const start = (this.current - 1) * this.perPage;
      return this.sorted.slice(start, start + this.perPage);
    },
  },
  watch: {
    sort: 'reload',
    perPage: 'reload',
  },
  beforeDestroy() {
    this.stop();
  },
  methods: {
    /** A short spinner, because a real chart list would come off a server. */
    reload() {
      this.stop();
      // Re-sorting can leave the current page past the end of the list.
      this.current = Math.min(this.current, this.pages);
      this.loading = true;
      this.timer = setTimeout(() => { this.loading = false; }, 500);
    },
    stop() {
      if (this.timer) clearTimeout(this.timer);
      this.timer = null;
    },
  },
};
</script>
