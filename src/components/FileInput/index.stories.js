import { action } from '@storybook/addon-actions';
import V64FileInput from './index.vue';

export default { title: 'FileInput', component: V64FileInput };

export const Simple = () => ({
  components: { V64FileInput },
  methods: { onChange: action('change') },
  template: "<V64FileInput label='Program' block @change='onChange' />",
});

export const Multiple = () => ({
  components: { V64FileInput },
  template: "<V64FileInput label='Programs' button-text='Load' multiple block />",
});
