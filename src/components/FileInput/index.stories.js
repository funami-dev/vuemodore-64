import V64FileInput from './index.vue';

export default {
  title: 'FileInput',
  component: V64FileInput,
  argTypes: { change: { action: 'change' } },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64FileInput },
  template: '<V64FileInput v-bind="$props" @change="change" />',
});

export const Simple = Template.bind({});
Simple.args = { label: 'Program', block: true };

export const Multiple = Template.bind({});
Multiple.args = {
  label: 'Programs', buttonText: 'Load', multiple: true, block: true,
};

export const WithError = Template.bind({});
WithError.args = { label: 'Program', error: 'File not found', block: true };
