import V64Text from './index.vue';
import { V64_PALETTE } from '../../styles/theme';

export default {
  title: 'Text',
  component: V64Text,
  argTypes: {
    color: { control: 'color' },
    content: { control: 'text', description: 'Default slot content' },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64Text },
  template: '<V64Text v-bind="$props">{{ content }}</V64Text>',
});

export const Simple = Template.bind({});
Simple.args = { content: 'Ready.' };

export const Coloured = Template.bind({});
Coloured.args = { content: 'LOAD "*",8,1', color: V64_PALETTE.green };
