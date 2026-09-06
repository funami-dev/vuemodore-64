import { mount } from '@vue/test-utils';
import V64NumberInput from '../index.vue';

describe('V64NumberInput', () => {
  it('shows the bound value', () => {
    expect(mount(V64NumberInput, { propsData: { value: 8 } }).find('input').element.value)
      .toBe('8');
  });

  it('steps up and down by the step size', () => {
    const wrapper = mount(V64NumberInput, { propsData: { value: 10, stepSize: 5 } });
    wrapper.find('[aria-label="Increase"]').trigger('click');
    expect(wrapper.emitted().input).toEqual([[15]]);

    wrapper.find('[aria-label="Decrease"]').trigger('click');
    expect(wrapper.emitted().input[1]).toEqual([5]);
  });

  it('holds the value inside its bounds', () => {
    const wrapper = mount(V64NumberInput, { propsData: { value: 9, min: 0, max: 10 } });
    wrapper.vm.step(1);
    expect(wrapper.emitted().input).toEqual([[10]]);
    expect(wrapper.vm.clamp(99)).toBe(10);
    expect(wrapper.vm.clamp(-5)).toBe(0);
  });

  it('disables the step button at each end', () => {
    const low = mount(V64NumberInput, { propsData: { value: 0, min: 0, max: 10 } });
    expect(low.find('[aria-label="Decrease"]').element.disabled).toBe(true);
    expect(low.find('[aria-label="Increase"]').element.disabled).toBe(false);

    const high = mount(V64NumberInput, { propsData: { value: 10, min: 0, max: 10 } });
    expect(high.find('[aria-label="Increase"]').element.disabled).toBe(true);
  });

  it('emits a number, not the string the field holds', () => {
    const wrapper = mount(V64NumberInput, { propsData: { value: 1 } });
    const field = wrapper.find('input');
    field.element.value = '42';
    field.trigger('input');
    expect(wrapper.emitted().input).toEqual([[42]]);
  });

  it('leaves the value alone while the field is empty mid-typing', () => {
    const wrapper = mount(V64NumberInput, { propsData: { value: 5 } });
    const field = wrapper.find('input');
    field.element.value = '';
    field.trigger('input');
    expect(wrapper.emitted().input).toBeUndefined();
  });

  it('says nothing when the value would not change', () => {
    const wrapper = mount(V64NumberInput, { propsData: { value: 10, max: 10 } });
    wrapper.vm.step(1);
    expect(wrapper.emitted().input).toBeUndefined();
  });
});
