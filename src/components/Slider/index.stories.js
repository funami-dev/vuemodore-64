import V64Slider from './index.vue';

export default {
  title: 'Slider',
  component: V64Slider,
  argTypes: { input: { action: 'input' } },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64Slider },
  data: () => ({ model: args.value }),
  template: '<V64Slider v-bind="$props" v-model="model" @input="input" />',
});

export const Simple = Template.bind({});
Simple.args = {
  label: 'Volume', value: 40, showValue: true, block: true,
};

export const Stepped = Template.bind({});
Stepped.args = {
  label: 'SID voice', value: 2, min: 1, max: 3, showValue: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Volume', value: 40, disabled: true, showValue: true,
};
