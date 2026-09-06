import V64LoadingScreen from './index.vue';

export default { title: 'LoadingScreen', component: V64LoadingScreen };

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64LoadingScreen },
  template: '<V64LoadingScreen v-bind="$props" />',
});

export const Indeterminate = Template.bind({});
Indeterminate.args = { message: 'Searching for GAME' };

export const WithProgress = Template.bind({});
WithProgress.args = { message: 'Loading GAME', progress: 62 };

export const Paused = Template.bind({});
Paused.args = { message: 'Press play on tape', paused: true };
