import V64Pagination from './index.vue';

export default { title: 'Pagination', component: V64Pagination };

export const FewPages = () => ({
  components: { V64Pagination },
  data: () => ({ page: 1 }),
  template: "<V64Pagination v-model='page' :pages='4' />",
});

export const ManyPages = () => ({
  components: { V64Pagination },
  data: () => ({ page: 50 }),
  template: "<V64Pagination v-model='page' :pages='100' />",
});
