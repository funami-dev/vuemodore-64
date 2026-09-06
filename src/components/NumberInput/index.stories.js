import V64NumberInput from './index.vue';

export default {
  title: 'NumberInput',
  component: V64NumberInput,
  argTypes: { input: { action: 'input' } },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64NumberInput },
  data: () => ({ model: args.value }),
  template: '<V64NumberInput v-bind="$props" v-model="model" @input="input" />',
});

export const Simple = Template.bind({});
Simple.args = {
  label: 'Device number', value: 8, min: 8, max: 11,
};

export const Unbounded = Template.bind({});
Unbounded.args = { label: 'Poke value', value: 0 };

export const Stepped = Template.bind({});
Stepped.args = {
  label: 'Border colour', value: 0, min: 0, max: 15, stepSize: 5,
};
