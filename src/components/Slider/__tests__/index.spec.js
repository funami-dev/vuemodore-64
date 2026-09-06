import { mount } from '@vue/test-utils';
import V64Slider from '../index.vue';

describe('V64Slider', () => {
  it('passes its bounds to the native range input', () => {
    const wrapper = mount(V64Slider, {
      propsData: {
        min: 1, max: 3, step: 1, value: 2,
      },
    });
    const input = wrapper.find('input');
    expect(input.attributes('min')).toBe('1');
    expect(input.attributes('max')).toBe('3');
    expect(input.element.value).toBe('2');
  });

  it('emits a number, not the string the DOM hands over', () => {
    const wrapper = mount(V64Slider);
    const input = wrapper.find('input');
    input.element.value = '42';
    input.trigger('input');
    expect(wrapper.emitted().input).toEqual([[42]]);
  });

  it('prints the current value only when asked to', () => {
    expect(mount(V64Slider, { propsData: { value: 7 } }).text()).not.toContain('7');
    expect(mount(V64Slider, { propsData: { value: 7, showValue: true } }).text()).toContain('7');
  });

  it('exposes its range to assistive technology', () => {
    const wrapper = mount(V64Slider, { propsData: { value: 7, max: 10 } });
    expect(wrapper.find('input').attributes('aria-valuenow')).toBe('7');
    expect(wrapper.find('input').attributes('aria-valuemax')).toBe('10');
  });
});
