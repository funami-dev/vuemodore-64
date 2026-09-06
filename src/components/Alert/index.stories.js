import V64Alert from './index.vue';

export default {
  title: 'Alert',
  component: V64Alert,
  argTypes: {
    variant: { control: { type: 'select', options: ['info', 'success', 'warning', 'error'] } },
    content: { control: 'text', description: 'Default slot content' },
    dismiss: { action: 'dismiss' },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64Alert },
  template: '<V64Alert v-bind="$props" @dismiss="dismiss">{{ content }}</V64Alert>',
});

export const Error = Template.bind({});
Error.args = {
  variant: 'error', title: 'Syntax error', content: 'Line 20', block: true,
};

export const Warning = Template.bind({});
Warning.args = { variant: 'warning', content: 'Tape may be worn', block: true };

export const Success = Template.bind({});
Success.args = { variant: 'success', content: 'Saved to drive 8', block: true };

export const Info = Template.bind({});
Info.args = { content: '38911 basic bytes free', block: true };

export const Dismissible = Template.bind({});
Dismissible.args = {
  variant: 'error',
  title: 'Device not present',
  content: 'Check the cable',
  dismissible: true,
  block: true,
};
