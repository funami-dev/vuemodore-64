import V64Badge from './index.vue';

export default {
  title: 'Badge',
  component: V64Badge,
  argTypes: {
    variant: { control: { type: 'select', options: ['default', 'success', 'warning', 'danger'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64Badge },
  template: '<V64Badge v-bind="$props" />',
});

export const Default = Template.bind({});
Default.args = { label: 'New' };

export const Success = Template.bind({});
Success.args = { label: 'Saved', variant: 'success' };

export const Warning = Template.bind({});
Warning.args = { label: 'Worn', variant: 'warning' };

export const Danger = Template.bind({});
Danger.args = { label: 'Error', variant: 'danger' };

export const Count = Template.bind({});
Count.args = { label: 12 };
