import V64Checkbox from './index.vue';

export default {
  title: 'Checkbox',
  component: V64Checkbox,
  argTypes: { change: { action: 'change' } },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64Checkbox },
  data: () => ({ model: args.checked }),
  template: '<V64Checkbox v-bind="$props" v-model="model" @change="change" />',
});

export const Unchecked = Template.bind({});
Unchecked.args = { label: 'Fast load', checked: false };

export const Checked = Template.bind({});
Checked.args = { label: 'Fast load', checked: true };

export const Disabled = Template.bind({});
Disabled.args = { label: 'Turbo tape', disabled: true };
