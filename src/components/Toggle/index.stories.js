import V64Toggle from './index.vue';

export default {
  title: 'Toggle',
  component: V64Toggle,
  argTypes: { change: { action: 'change' } },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64Toggle },
  data: () => ({ model: args.checked }),
  template: '<V64Toggle v-bind="$props" v-model="model" @change="change" />',
});

export const Simple = Template.bind({});
Simple.args = { checked: false };

export const WithLabel = Template.bind({});
WithLabel.args = { label: 'Sound', checked: true };

export const Disabled = Template.bind({});
Disabled.args = { label: 'Sound', disabled: true };
