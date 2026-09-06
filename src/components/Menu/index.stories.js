import V64Menu from './index.vue';

export default {
  title: 'Menu',
  component: V64Menu,
  argTypes: { select: { action: 'select' } },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64Menu },
  template: '<V64Menu v-bind="$props" @select="select" />',
});

export const Simple = Template.bind({});
Simple.args = {
  label: 'Main menu',
  options: ['Start game', 'Options', 'High scores', 'Quit'],
};

export const WithDisabledEntry = Template.bind({});
WithDisabledEntry.args = {
  label: 'Main menu',
  options: ['Start game', { value: 'load', label: 'Continue', disabled: true }, 'Quit'],
};
