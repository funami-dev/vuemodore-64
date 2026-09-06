import { mount } from '@vue/test-utils';
import V64Input from '../index.vue';

describe('V64Input', () => {
  it('shows the bound value', () => {
    const wrapper = mount(V64Input, { propsData: { value: 'COMMODORE' } });
    expect(wrapper.find('input').element.value).toBe('COMMODORE');
  });

  it('emits the new value on input', () => {
    const wrapper = mount(V64Input);
    const input = wrapper.find('input');
    input.element.value = 'LOAD';
    input.trigger('input');
    expect(wrapper.emitted().input).toEqual([['LOAD']]);
  });

  it('ties the label to the field', () => {
    const wrapper = mount(V64Input, { propsData: { label: 'Filename' } });
    const id = wrapper.find('input').attributes('id');
    expect(wrapper.find('label').attributes('for')).toBe(id);
  });

  it('announces an error message to assistive technology', () => {
    const wrapper = mount(V64Input, { propsData: { error: 'Syntax error' } });
    const input = wrapper.find('input');
    expect(input.attributes('aria-invalid')).toBe('true');
    expect(wrapper.find('[role="alert"]').text()).toBe('Syntax error');
    expect(input.attributes('aria-describedby')).toBe(wrapper.find('[role="alert"]').attributes('id'));
  });

  it('is not marked invalid without an error', () => {
    const wrapper = mount(V64Input);
    expect(wrapper.find('input').attributes('aria-invalid')).toBe('false');
    expect(wrapper.find('[role="alert"]').exists()).toBe(false);
  });
});
