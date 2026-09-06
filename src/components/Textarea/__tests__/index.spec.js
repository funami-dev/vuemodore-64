import { mount } from '@vue/test-utils';
import V64Textarea from '../index.vue';

describe('V64Textarea', () => {
  it('shows the bound value in a textarea', () => {
    const wrapper = mount(V64Textarea, { propsData: { value: '10 PRINT' } });
    expect(wrapper.find('textarea').element.value).toBe('10 PRINT');
  });

  it('emits the new value on input', () => {
    const wrapper = mount(V64Textarea);
    const field = wrapper.find('textarea');
    field.element.value = '20 GOTO 10';
    field.trigger('input');
    expect(wrapper.emitted().input).toEqual([['20 GOTO 10']]);
  });

  it('honours the row count', () => {
    expect(mount(V64Textarea, { propsData: { rows: 8 } }).find('textarea').attributes('rows'))
      .toBe('8');
  });

  it('counts down the remaining characters only when a maximum is set', () => {
    expect(mount(V64Textarea, { propsData: { value: 'abc' } }).text()).toBe('');

    const wrapper = mount(V64Textarea, { propsData: { value: 'abc', maxlength: 10 } });
    expect(wrapper.text()).toContain('7');
  });

  it('ties its label to the field', () => {
    const wrapper = mount(V64Textarea, { propsData: { label: 'Listing' } });
    expect(wrapper.find('label').attributes('for')).toBe(wrapper.find('textarea').attributes('id'));
  });
});
