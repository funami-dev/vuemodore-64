import { mount } from '@vue/test-utils';
import V64Divider from '../index.vue';

describe('V64Divider', () => {
  it('is a separator for assistive technology', () => {
    expect(mount(V64Divider).attributes('role')).toBe('separator');
  });

  it('draws the glyph of the chosen variant', () => {
    expect(mount(V64Divider).vm.line[0]).toBe('─');
    expect(mount(V64Divider, { propsData: { variant: 'double' } }).vm.line[0]).toBe('═');
    expect(mount(V64Divider, { propsData: { variant: 'dotted' } }).vm.line[0]).toBe('·');
  });

  it('sets a label between two rules and names the separator', () => {
    const wrapper = mount(V64Divider, { propsData: { label: 'Options' } });
    expect(wrapper.text()).toContain('Options');
    expect(wrapper.attributes('aria-label')).toBe('Options');
    expect(wrapper.findAll('div').length).toBe(3);
  });

  it('draws a single rule without a label', () => {
    const wrapper = mount(V64Divider);
    expect(wrapper.findAll('div').length).toBe(2);
  });
});
