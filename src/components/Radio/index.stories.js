import V64Radio from './index.vue';
import V64RadioGroup from './group.vue';

export default {
  title: 'Radio',
  component: V64Radio,
};

export const Single = () => ({
  components: { V64Radio },
  data: () => ({ device: 'tape' }),
  template: "<V64Radio v-model='device' value='tape' label='Tape' />",
});

export const Group = () => ({
  components: { V64RadioGroup },
  data: () => ({ device: 'disk', options: ['Tape', 'Disk', 'Cartridge'] }),
  template: "<V64RadioGroup v-model='device' label='Load from' :options='options' />",
});

export const InlineGroup = () => ({
  components: { V64RadioGroup },
  data: () => ({
    speed: 1,
    options: [
      { value: 1, label: 'Slow' },
      { value: 2, label: 'Fast' },
      { value: 3, label: 'Turbo', disabled: true },
    ],
  }),
  template: "<V64RadioGroup v-model='speed' label='Speed' :options='options' inline />",
});
