import V64Input from './index.vue';

export default {
  title: 'Input',
  component: V64Input,
  argTypes: {
    type: {
      control: { type: 'select', options: ['text', 'password', 'email', 'search', 'tel', 'url'] },
    },
    input: { action: 'input' },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64Input },
  data: () => ({ model: args.value }),
  template: '<V64Input v-bind="$props" v-model="model" @input="input" />',
});

export const Simple = Template.bind({});
Simple.args = { label: 'Your name', placeholder: 'ENTER NAME', block: true };

export const WithValue = Template.bind({});
WithValue.args = { label: 'Your name', value: 'COMMODORE', block: true };

export const WithHint = Template.bind({});
WithHint.args = { label: 'Filename', hint: 'Max 16 characters', block: true };

export const WithError = Template.bind({});
WithError.args = {
  label: 'Filename', value: '?', error: 'Syntax error', block: true,
};

export const Password = Template.bind({});
Password.args = {
  label: 'Password', type: 'password', value: 'basic', block: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Device', value: 'TAPE', disabled: true, block: true,
};
