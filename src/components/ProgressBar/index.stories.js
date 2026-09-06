import V64ProgressBar from './index.vue';

export default { title: 'ProgressBar', component: V64ProgressBar };

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64ProgressBar },
  template: '<V64ProgressBar v-bind="$props" />',
});

export const Simple = Template.bind({});
Simple.args = {
  value: 40, label: 'Loading', showValue: true, block: true,
};

export const Complete = Template.bind({});
Complete.args = {
  value: 100, label: 'Loading', showValue: true, block: true,
};

export const Indeterminate = Template.bind({});
Indeterminate.args = { indeterminate: true, label: 'Searching for tape', block: true };

export const Wide = Template.bind({});
Wide.args = {
  value: 7, max: 10, cells: 40, showValue: true, block: true,
};
