import V64ProgressBar from './index.vue';

export default {
  title: 'ProgressBar',
  component: V64ProgressBar,
};

export const Simple = () => ({
  components: { V64ProgressBar },
  template: "<V64ProgressBar :value='40' label='Loading' show-value />",
});

export const Complete = () => ({
  components: { V64ProgressBar },
  template: "<V64ProgressBar :value='100' label='Loading' show-value />",
});

export const Indeterminate = () => ({
  components: { V64ProgressBar },
  template: "<V64ProgressBar indeterminate label='Searching for tape' />",
});

export const Wide = () => ({
  components: { V64ProgressBar },
  template: "<V64ProgressBar :value='7' :max='10' :cells='40' block show-value />",
});
