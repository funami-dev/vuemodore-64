import Vue from 'vue';
import Vuemodore64, { install, V64Button, V64_THEME } from '@/index';
import * as components from '@/components';

describe('public entry point', () => {
  it('exports every component by name', () => {
    // Guards the barrel file: a component that is built but never exported is
    // invisible to consumers, which is how the previous entry point broke.
    const exported = Object.keys(components);
    expect(exported).toEqual([
      'V64Alert',
      'V64Badge',
      'V64Breadcrumb',
      'V64Button',
      'V64Checkbox',
      'V64Divider',
      'V64FileInput',
      'V64FormField',
      'V64Hero',
      'V64Input',
      'V64Key',
      'V64Link',
      'V64LoadingScreen',
      'V64Menu',
      'V64Modal',
      'V64NumberInput',
      'V64Page',
      'V64Pagination',
      'V64Panel',
      'V64PixelIcon',
      'V64ProgressBar',
      'V64Radio',
      'V64RadioGroup',
      'V64Scroller',
      'V64Select',
      'V64Slider',
      'V64Spinner',
      'V64Table',
      'V64Tabs',
      'V64Terminal',
      'V64Text',
      'V64Textarea',
      'V64Toast',
      'V64Toggle',
      'V64Tooltip',
    ]);
  });

  it('exports each component as a usable component definition', () => {
    expect(V64Button.name).toBe('V64Button');
  });

  it('exports the theme so consumers can build on the palette', () => {
    expect(V64_THEME.primary).toBeDefined();
  });

  it('registers every component globally', () => {
    const registered = [];
    install.installed = false;
    install({ component: name => registered.push(name) });
    expect(registered).toContain('V64Button');
    expect(registered).toContain('V64Toggle');
    expect(registered).toHaveLength(35);
  });

  it('does not register a second time', () => {
    install.installed = false;
    install({ component: () => {} });
    const second = [];
    install({ component: name => second.push(name) });
    expect(second).toHaveLength(0);
  });

  it('is installable as a Vue plugin', () => {
    install.installed = false;
    Vue.use(Vuemodore64);
    expect(Vue.options.components.V64Hero).toBeDefined();
  });
});
