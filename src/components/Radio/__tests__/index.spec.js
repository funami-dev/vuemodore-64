import { mount } from '@vue/test-utils';
import V64Radio from '../index.vue';
import V64RadioGroup from '../group.vue';

describe('V64Radio', () => {
  it('is checked when its value is the selected one', () => {
    const wrapper = mount(V64Radio, { propsData: { value: 'tape', checkedValue: 'tape' } });
    expect(wrapper.find('input').element.checked).toBe(true);
  });

  it('is unchecked when another value is selected', () => {
    const wrapper = mount(V64Radio, { propsData: { value: 'tape', checkedValue: 'disk' } });
    expect(wrapper.find('input').element.checked).toBe(false);
  });

  it('emits its own value on change', () => {
    const wrapper = mount(V64Radio, { propsData: { value: 'disk' } });
    wrapper.find('input').trigger('change');
    expect(wrapper.emitted().change).toEqual([['disk']]);
  });
});

describe('V64RadioGroup', () => {
  it('expands plain options into value/label pairs', () => {
    const wrapper = mount(V64RadioGroup, { propsData: { options: ['Tape', 'Disk'] } });
    const radios = wrapper.findAll(V64Radio);
    expect(radios).toHaveLength(2);
    expect(radios.at(0).props('value')).toBe('Tape');
    expect(radios.at(0).props('label')).toBe('Tape');
  });

  it('accepts object options and marks single ones disabled', () => {
    const options = [{ value: 1, label: 'Slow' }, { value: 2, label: 'Turbo', disabled: true }];
    const wrapper = mount(V64RadioGroup, { propsData: { options } });
    expect(wrapper.findAll('input').at(1).element.disabled).toBe(true);
    expect(wrapper.findAll('input').at(0).element.disabled).toBe(false);
  });

  it('shares one native name across the group', () => {
    const wrapper = mount(V64RadioGroup, { propsData: { options: ['a', 'b'] } });
    const names = wrapper.findAll('input').wrappers.map(w => w.attributes('name'));
    expect(names[0]).toBe(names[1]);
  });

  it('relays the selected value of a child', () => {
    const wrapper = mount(V64RadioGroup, { propsData: { options: ['a', 'b'], value: 'a' } });
    wrapper.findAll('input').at(1).trigger('change');
    expect(wrapper.emitted().change).toEqual([['b']]);
  });
});
