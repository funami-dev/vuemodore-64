import { mount } from '@vue/test-utils';
import V64Checkbox from '../index.vue';

describe('V64Checkbox', () => {
  it('draws an empty box when unchecked', () => {
    const wrapper = mount(V64Checkbox, { propsData: { label: 'Fast load' } });
    expect(wrapper.text()).toContain('Fast load');
    expect(wrapper.find('input').element.checked).toBe(false);
  });

  it('reflects the checked prop on the native input', () => {
    const wrapper = mount(V64Checkbox, { propsData: { checked: true } });
    expect(wrapper.find('input').element.checked).toBe(true);
  });

  it('emits the new state on change', () => {
    const wrapper = mount(V64Checkbox);
    const input = wrapper.find('input');
    input.element.checked = true;
    input.trigger('change');
    expect(wrapper.emitted().change).toEqual([[true]]);
  });

  it('gives every instance its own id so labels stay unambiguous', () => {
    const a = mount(V64Checkbox);
    const b = mount(V64Checkbox);
    expect(a.find('input').attributes('id')).not.toBe(b.find('input').attributes('id'));
  });
});
