import V64NumberInput from './index.vue';

export default { title: 'NumberInput', component: V64NumberInput };

export const Simple = () => ({
  components: { V64NumberInput },
  data: () => ({ device: 8 }),
  template: "<V64NumberInput v-model='device' label='Device number' :min='8' :max='11' />",
});

export const Stepped = () => ({
  components: { V64NumberInput },
  data: () => ({ poke: 0 }),
  template: "<V64NumberInput v-model='poke' label='Border colour' :min='0' :max='15' :step-size='1' />",
});
