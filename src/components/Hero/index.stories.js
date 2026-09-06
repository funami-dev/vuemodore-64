import V64Hero from './index.vue';
import V64Button from '../Button/index.vue';

export default {
  title: 'Hero',
  component: V64Hero,
  argTypes: { align: { control: { type: 'select', options: ['left', 'center', 'right'] } } },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64Hero },
  template: '<V64Hero v-bind="$props" />',
});

export const Simple = Template.bind({});
Simple.args = {
  title: 'Vuemodore 64',
  subtitle: 'A Commodore 64 design system for Vue',
};

export const LeftAlignedWithoutStripes = Template.bind({});
LeftAlignedWithoutStripes.args = {
  title: 'Ready.',
  subtitle: 'Type a command',
  align: 'left',
  stripes: false,
};

export const WithActions = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64Hero, V64Button },
  template: `
    <V64Hero v-bind="$props">
      <V64Button>Load "*",8,1</V64Button>
      <V64Button variant="secondary">List</V64Button>
    </V64Hero>
  `,
});
WithActions.args = {
  title: 'Vuemodore 64',
  subtitle: '64K RAM system, 38911 basic bytes free',
};
