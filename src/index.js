import Vue from 'vue';
import C64Input from './components/Input/index.vue';

const Components = {
  C64Input,
};

const t = Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name]);
});
console.log(t); // eslint-disable-line no-console

export default Components;
