import V64Badge from './index.vue';

export default { title: 'Badge', component: V64Badge };

export const Default = () => ({ components: { V64Badge }, template: "<V64Badge label='New' />" });

export const Success = () => ({
  components: { V64Badge },
  template: "<V64Badge variant='success' label='Saved' />",
});

export const Warning = () => ({
  components: { V64Badge },
  template: "<V64Badge variant='warning' label='Worn' />",
});

export const Danger = () => ({
  components: { V64Badge },
  template: "<V64Badge variant='danger' label='Error' />",
});

export const Count = () => ({ components: { V64Badge }, template: "<V64Badge :label='12' />" });
