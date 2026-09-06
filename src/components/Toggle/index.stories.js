import V64Toggle from './index.vue';

export default {
  title: 'Toggle',
  component: V64Toggle,
};

export const Simple = () => ({
  components: { V64Toggle },
  data: () => ({ on: false }),
  template: "<V64Toggle v-model='on' />",
});

export const WithLabel = () => ({
  components: { V64Toggle },
  data: () => ({ on: true }),
  template: "<V64Toggle v-model='on' label='Sound' />",
});

export const Disabled = () => ({
  components: { V64Toggle },
  template: "<V64Toggle label='Sound' disabled />",
});
