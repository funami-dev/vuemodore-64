import V64Divider from './index.vue';

export default { title: 'Divider', component: V64Divider };

export const Single = () => ({ components: { V64Divider }, template: '<V64Divider />' });

export const Double = () => ({
  components: { V64Divider },
  template: "<V64Divider variant='double' />",
});

export const WithLabel = () => ({
  components: { V64Divider },
  template: "<V64Divider label='Options' />",
});
