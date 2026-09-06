import V64Key from './index.vue';

export default {
  title: 'Key',
  component: V64Key,
  argTypes: { content: { control: 'text', description: 'Default slot content' } },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64Key },
  template: '<V64Key v-bind="$props" />',
});

export const Single = Template.bind({});
Single.args = { label: 'F1' };

export const Wide = Template.bind({});
Wide.args = { label: 'Return', wide: true };

export const Combination = () => ({
  components: { V64Key },
  template: '<div><V64Key label="Run" wide /> + <V64Key label="Stop" wide /></div>',
});
