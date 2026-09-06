import V64Panel from './index.vue';
import V64Button from '../Button/index.vue';

export default {
  title: 'Panel',
  component: V64Panel,
  argTypes: {
    content: { control: 'text', description: 'Default slot content' },
    close: { action: 'close' },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64Panel },
  template: '<V64Panel v-bind="$props" @close="close">{{ content }}</V64Panel>',
});

export const Simple = Template.bind({});
Simple.args = { title: 'Directory', content: '8 BLOCKS FREE' };

export const Closable = Template.bind({});
Closable.args = { title: 'Directory', content: '8 BLOCKS FREE', closable: true };

export const WithoutTitle = Template.bind({});
WithoutTitle.args = { content: 'Just a box' };

export const WithFooter = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64Panel, V64Button },
  template: `
    <V64Panel v-bind="$props">
      Overwrite GAME.PRG?
      <template slot="footer"><V64Button>Yes</V64Button></template>
    </V64Panel>
  `,
});
WithFooter.args = { title: 'Save file' };
