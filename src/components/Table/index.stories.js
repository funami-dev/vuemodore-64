import V64Table from './index.vue';

export default { title: 'Table', component: V64Table };

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'type', label: 'Type' },
  { key: 'blocks', label: 'Blocks', align: 'right' },
];

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64Table },
  template: '<V64Table v-bind="$props" />',
});

export const Simple = Template.bind({});
Simple.args = {
  caption: 'Drive 8',
  block: true,
  columns,
  rows: [
    { name: 'GAME', type: 'PRG', blocks: 122 },
    { name: 'DEMO', type: 'PRG', blocks: 44 },
    { name: 'NOTES', type: 'SEQ', blocks: 3 },
  ],
};

export const Empty = Template.bind({});
Empty.args = { columns, rows: [], block: true };
