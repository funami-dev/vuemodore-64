import V64Select from './index.vue';

export default {
  title: 'Select',
  component: V64Select,
};

export const Simple = () => ({
  components: { V64Select },
  data: () => ({ device: 'Disk', options: ['Tape', 'Disk', 'Cartridge'] }),
  template: "<V64Select v-model='device' label='Device' :options='options' />",
});

export const WithPlaceholder = () => ({
  components: { V64Select },
  data: () => ({ device: '', options: ['Tape', 'Disk'] }),
  template: "<V64Select v-model='device' label='Device' placeholder='SELECT...' :options='options' />",
});

export const Disabled = () => ({
  components: { V64Select },
  data: () => ({ options: ['Tape'] }),
  template: "<V64Select label='Device' :options='options' disabled />",
});
