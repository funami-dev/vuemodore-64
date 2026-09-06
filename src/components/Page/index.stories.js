import V64Page from './index.vue';
import V64Text from '../Text/index.vue';

export default { title: 'Page', component: V64Page };

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64Page, V64Text },
  template: '<V64Page v-bind="$props"><V64Text>And I am a text</V64Text></V64Page>',
});

export const Booting = Template.bind({});
Booting.args = { showHeader: true, showReady: true, showCursor: true };

export const CursorOnly = Template.bind({});
CursorOnly.args = { showCursor: true };
