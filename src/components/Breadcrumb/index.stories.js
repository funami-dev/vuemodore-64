import V64Breadcrumb from './index.vue';

export default { title: 'Breadcrumb', component: V64Breadcrumb };

export const Simple = () => ({
  components: { V64Breadcrumb },
  data: () => ({
    items: [{ label: 'Home', href: '#' }, { label: 'Drive 8', href: '#' }, { label: 'GAME.PRG' }],
  }),
  template: "<V64Breadcrumb :items='items' />",
});
