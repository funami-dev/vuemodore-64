import { action } from '@storybook/addon-actions';
import V64Menu from './index.vue';

export default { title: 'Menu', component: V64Menu };

export const Simple = () => ({
  components: { V64Menu },
  methods: { onSelect: action('select') },
  data: () => ({ options: ['Start game', 'Options', 'High scores', 'Quit'] }),
  template: "<V64Menu :options='options' label='Main menu' @select='onSelect' />",
});

export const WithDisabledEntry = () => ({
  components: { V64Menu },
  data: () => ({
    options: ['Start game', { value: 'load', label: 'Continue', disabled: true }, 'Quit'],
  }),
  template: "<V64Menu :options='options' label='Main menu' />",
});
