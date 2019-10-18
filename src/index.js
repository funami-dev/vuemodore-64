import Vue from 'vue';
import C64Input from './components/Input/index.vue';
import C64Toggle from './components/Toggle/index.vue';

const Components = {
  C64Input,
  C64Toggle,
};

Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name]);
});

export default {
  C64Input,
  C64Toggle,
};
