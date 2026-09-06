import V64Select from './index.vue';

export default {
  title: 'Select',
  component: V64Select,
  argTypes: { change: { action: 'change' } },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64Select },
  data: () => ({ model: args.value }),
  template: '<V64Select v-bind="$props" v-model="model" @change="change" />',
});

export const Simple = Template.bind({});
Simple.args = {
  label: 'Device',
  options: ['Tape', 'Disk', 'Cartridge'],
  value: 'Disk',
  block: true,
};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
  label: 'Device',
  placeholder: 'SELECT...',
  options: ['Tape', 'Disk'],
  value: '',
  block: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Device', options: ['Tape'], disabled: true, block: true,
};
