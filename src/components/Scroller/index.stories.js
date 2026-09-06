import V64Scroller from './index.vue';

export default { title: 'Scroller', component: V64Scroller };

const text = 'GREETINGS TO ALL CRACKERS OUT THERE ... THIS ONE SCROLLS FOREVER ... ';

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64Scroller },
  template: '<V64Scroller v-bind="$props" />',
});

export const Simple = Template.bind({});
Simple.args = { text };

export const Fast = Template.bind({});
Fast.args = { text, duration: 6 };

export const Paused = Template.bind({});
Paused.args = { text, paused: true };
