import V64Breadcrumb from './index.vue';

export default {
  title: 'Breadcrumb',
  component: V64Breadcrumb,
  argTypes: { navigate: { action: 'navigate' } },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64Breadcrumb },
  template: '<V64Breadcrumb v-bind="$props" @navigate="navigate" />',
});

export const Simple = Template.bind({});
Simple.args = {
  items: [{ label: 'Home', href: '#' }, { label: 'Drive 8', href: '#' }, { label: 'GAME.PRG' }],
};

export const OtherSeparator = Template.bind({});
OtherSeparator.args = {
  separator: '>',
  items: [{ label: 'Home', href: '#' }, { label: 'GAME.PRG' }],
};
