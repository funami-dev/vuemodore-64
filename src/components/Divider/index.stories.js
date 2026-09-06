import V64Divider from './index.vue';

export default {
  title: 'Divider',
  component: V64Divider,
  argTypes: {
    variant: { control: { type: 'select', options: ['single', 'double', 'dotted'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64Divider },
  template: '<div style="width: 30em;"><V64Divider v-bind="$props" /></div>',
});

export const Single = Template.bind({});
Single.args = { variant: 'single' };

export const Double = Template.bind({});
Double.args = { variant: 'double' };

export const WithLabel = Template.bind({});
WithLabel.args = { label: 'Options' };
