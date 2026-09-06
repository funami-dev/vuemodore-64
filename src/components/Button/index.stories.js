import V64Button from './index.vue';

export default {
  title: 'Button',
  component: V64Button,
  argTypes: {
    variant: { control: { type: 'select', options: ['primary', 'secondary', 'danger'] } },
    label: { control: 'text', description: 'Default slot content' },
    click: { action: 'click' },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64Button },
  template: '<V64Button v-bind="$props" @click="click">{{ label }}</V64Button>',
});

export const Primary = Template.bind({});
Primary.args = { label: 'Run', variant: 'primary' };

export const Secondary = Template.bind({});
Secondary.args = { label: 'Load', variant: 'secondary' };

export const Danger = Template.bind({});
Danger.args = { label: 'Delete', variant: 'danger' };

export const Disabled = Template.bind({});
Disabled.args = { label: 'Save', disabled: true };

export const Block = Template.bind({});
Block.args = { label: 'List', block: true };
