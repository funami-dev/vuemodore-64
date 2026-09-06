import V64Spinner from './index.vue';

export default { title: 'Spinner', component: V64Spinner };

export const Simple = () => ({ components: { V64Spinner }, template: '<V64Spinner />' });

export const WithLabel = () => ({
  components: { V64Spinner },
  template: "<V64Spinner label='Searching for tape' />",
});
