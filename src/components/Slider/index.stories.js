import V64Slider from './index.vue';

export default {
  title: 'Slider',
  component: V64Slider,
};

export const Simple = () => ({
  components: { V64Slider },
  data: () => ({ volume: 40 }),
  template: "<V64Slider v-model='volume' label='Volume' show-value />",
});

export const Stepped = () => ({
  components: { V64Slider },
  data: () => ({ voice: 2 }),
  template: "<V64Slider v-model='voice' label='SID voice' :min='1' :max='3' show-value />",
});

export const Disabled = () => ({
  components: { V64Slider },
  template: "<V64Slider label='Volume' :value='40' disabled show-value />",
});
