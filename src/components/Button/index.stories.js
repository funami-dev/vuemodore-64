import { action } from '@storybook/addon-actions';
import V64Button from './index.vue';

export default {
  title: 'Button',
  component: V64Button,
};

export const Primary = () => ({
  components: { V64Button },
  methods: { onClick: action('click') },
  template: "<V64Button @click='onClick'>Run</V64Button>",
});

export const Secondary = () => ({
  components: { V64Button },
  template: "<V64Button variant='secondary'>Load</V64Button>",
});

export const Danger = () => ({
  components: { V64Button },
  template: "<V64Button variant='danger'>Delete</V64Button>",
});

export const Disabled = () => ({
  components: { V64Button },
  template: '<V64Button disabled>Save</V64Button>',
});

export const Block = () => ({
  components: { V64Button },
  template: '<V64Button block>List</V64Button>',
});
