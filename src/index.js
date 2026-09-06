import * as components from './components';

export * from './components';
export { V64_THEME, V64_PALETTE, V64_FONT } from './styles/theme';

/**
 * Registers every component globally.
 *
 * Lets consumers pull in the whole design system with `Vue.use(Vuemodore64)`
 * instead of importing each component by hand. Tree shaking is still available
 * through the named exports above.
 *
 * @param {object} Vue the Vue constructor, passed in by `Vue.use`
 */
export function install(Vue) {
  if (install.installed) return;
  install.installed = true;

  Object.keys(components).forEach((name) => {
    Vue.component(name, components[name]);
  });
}

export default { install };
