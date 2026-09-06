import V64Radio from './index.vue';
import V64RadioGroup from './group.vue';

export default {
  title: 'Radio',
  component: V64RadioGroup,
  subcomponents: { V64Radio },
  argTypes: { change: { action: 'change' } },
};

const GroupTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64RadioGroup },
  data: () => ({ model: args.value }),
  template: '<V64RadioGroup v-bind="$props" v-model="model" @change="change" />',
});

export const Group = GroupTemplate.bind({});
Group.args = { label: 'Load from', options: ['Tape', 'Disk', 'Cartridge'], value: 'Disk' };

export const InlineGroup = GroupTemplate.bind({});
InlineGroup.args = {
  label: 'Speed',
  inline: true,
  value: 1,
  options: [
    { value: 1, label: 'Slow' },
    { value: 2, label: 'Fast' },
    { value: 3, label: 'Turbo', disabled: true },
  ],
};

export const Single = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64Radio },
  data: () => ({ model: 'tape' }),
  template: "<V64Radio v-model='model' value='tape' label='Tape' />",
});
