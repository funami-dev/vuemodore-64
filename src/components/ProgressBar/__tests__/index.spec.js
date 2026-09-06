import { mount } from '@vue/test-utils';
import V64ProgressBar from '../index.vue';

const FILLED = '█';
const EMPTY = '·';

describe('V64ProgressBar', () => {
  it('fills half the cells at half progress', () => {
    const wrapper = mount(V64ProgressBar, { propsData: { value: 50, cells: 10 } });
    expect(wrapper.vm.bar).toBe(FILLED.repeat(5) + EMPTY.repeat(5));
  });

  it('keeps the bar the same width whatever the progress', () => {
    const widths = [0, 33, 100].map(value => (
      mount(V64ProgressBar, { propsData: { value, cells: 20 } }).vm.bar.length
    ));
    expect(widths).toEqual([20, 20, 20]);
  });

  it('clamps values outside the range instead of overflowing', () => {
    expect(mount(V64ProgressBar, { propsData: { value: -10, cells: 10 } }).vm.bar)
      .toBe(EMPTY.repeat(10));
    expect(mount(V64ProgressBar, { propsData: { value: 400, cells: 10 } }).vm.bar)
      .toBe(FILLED.repeat(10));
  });

  it('reports progress against a custom maximum', () => {
    const wrapper = mount(V64ProgressBar, { propsData: { value: 7, max: 10, showValue: true } });
    expect(wrapper.text()).toContain('70%');
  });

  it('exposes its progress to assistive technology', () => {
    const wrapper = mount(V64ProgressBar, { propsData: { value: 7, max: 10 } });
    expect(wrapper.attributes('role')).toBe('progressbar');
    expect(wrapper.attributes('aria-valuenow')).toBe('7');
    expect(wrapper.attributes('aria-valuemax')).toBe('10');
  });

  it('reports no value at all while indeterminate', () => {
    const wrapper = mount(V64ProgressBar, { propsData: { indeterminate: true, value: 40 } });
    expect(wrapper.attributes('aria-valuenow')).toBeUndefined();
    expect(wrapper.text()).not.toContain(FILLED);
  });
});
