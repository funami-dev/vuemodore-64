import V64Textarea from './index.vue';

export default {
  title: 'Textarea',
  component: V64Textarea,
  argTypes: { input: { action: 'input' } },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64Textarea },
  data: () => ({ model: args.value }),
  template: '<V64Textarea v-bind="$props" v-model="model" @input="input" />',
});

export const Simple = Template.bind({});
Simple.args = {
  label: 'Listing', value: '10 PRINT "HELLO"\n20 GOTO 10', rows: 6, block: true,
};

export const WithCounter = Template.bind({});
WithCounter.args = {
  label: 'Note', value: 'HELLO', maxlength: 40, block: true,
};

export const WithError = Template.bind({});
WithError.args = {
  label: 'Listing', value: '?', error: 'Syntax error', block: true,
};
