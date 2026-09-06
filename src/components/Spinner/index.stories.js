import V64Spinner from './index.vue';

export default { title: 'Spinner', component: V64Spinner };

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64Spinner },
  template: '<V64Spinner v-bind="$props" />',
});

export const Simple = Template.bind({});
Simple.args = {};

export const WithLabel = Template.bind({});
WithLabel.args = { label: 'Searching for tape' };

export const Slow = Template.bind({});
Slow.args = { label: 'Thinking', speed: 400 };
