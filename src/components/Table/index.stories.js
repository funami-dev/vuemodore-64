import V64Table from './index.vue';

export default { title: 'Table', component: V64Table };

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'type', label: 'Type' },
  { key: 'blocks', label: 'Blocks', align: 'right' },
];

const rows = [
  { name: 'GAME', type: 'PRG', blocks: 122 },
  { name: 'DEMO', type: 'PRG', blocks: 44 },
  { name: 'NOTES', type: 'SEQ', blocks: 3 },
];

export const Simple = () => ({
  components: { V64Table },
  data: () => ({ columns, rows }),
  template: "<V64Table :columns='columns' :rows='rows' caption='Drive 8' block />",
});

export const Empty = () => ({
  components: { V64Table },
  data: () => ({ columns }),
  template: "<V64Table :columns='columns' :rows='[]' block />",
});
