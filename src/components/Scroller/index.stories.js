import V64Scroller from './index.vue';

export default { title: 'Scroller', component: V64Scroller };

const text = 'GREETINGS TO ALL CRACKERS OUT THERE ... THIS ONE SCROLLS FOREVER ... ';

export const Simple = () => ({
  components: { V64Scroller },
  data: () => ({ text }),
  template: "<V64Scroller :text='text' />",
});

export const Fast = () => ({
  components: { V64Scroller },
  data: () => ({ text }),
  template: "<V64Scroller :text='text' :duration='6' />",
});

export const Paused = () => ({
  components: { V64Scroller },
  data: () => ({ text }),
  template: "<V64Scroller :text='text' paused />",
});
