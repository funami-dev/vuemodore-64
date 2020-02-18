import Page from './index.vue';

// const V64_THEME = {
//   primary: 'rgb(168, 159, 53)',
//   secondary: 'rgb(78, 47, 225)',
//   green: 'rgb(0, 204, 85)',
//   lightgrey: 'rgb(187, 187, 187)',
//   grey: 'rgb(119, 119, 119)',
// };

export default {
  title: 'Page',
  component: Page,
};

export const SimplePage = () => ({
  components: { Page },
  template: '<Page showHeader showCursor showReady />',
});

export const SimplePageShow = () => ({
  components: { Page },
  template: '<Page showCursor />',
});
