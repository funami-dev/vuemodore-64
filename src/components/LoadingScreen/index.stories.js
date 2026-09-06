import V64LoadingScreen from './index.vue';

export default { title: 'LoadingScreen', component: V64LoadingScreen };

export const Indeterminate = () => ({
  components: { V64LoadingScreen },
  template: "<V64LoadingScreen message='Searching for GAME' />",
});

export const WithProgress = () => ({
  components: { V64LoadingScreen },
  template: "<V64LoadingScreen message='Loading GAME' :progress='62' />",
});

export const Paused = () => ({
  components: { V64LoadingScreen },
  template: "<V64LoadingScreen message='Press play on tape' paused />",
});
