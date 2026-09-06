import V64Checkbox from './index.vue';

export default {
  title: 'Checkbox',
  component: V64Checkbox,
};

export const Unchecked = () => ({
  components: { V64Checkbox },
  data: () => ({ on: false }),
  template: "<V64Checkbox v-model='on' label='Fast load' />",
});

export const Checked = () => ({
  components: { V64Checkbox },
  data: () => ({ on: true }),
  template: "<V64Checkbox v-model='on' label='Fast load' />",
});

export const Disabled = () => ({
  components: { V64Checkbox },
  template: "<V64Checkbox label='Turbo tape' disabled />",
});
