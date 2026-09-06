import { mount } from '@vue/test-utils';
import V64Select from '../index.vue';

describe('V64Select', () => {
  it('renders one option per entry', () => {
    const wrapper = mount(V64Select, { propsData: { options: ['Tape', 'Disk'] } });
    expect(wrapper.findAll('option')).toHaveLength(2);
    expect(wrapper.findAll('option').at(0).text()).toBe('Tape');
  });

  it('adds the placeholder as a disabled first entry', () => {
    const wrapper = mount(V64Select, {
      propsData: { options: ['Tape'], placeholder: 'SELECT...' },
    });
    const first = wrapper.findAll('option').at(0);
    expect(first.text()).toBe('SELECT...');
    expect(first.element.disabled).toBe(true);
  });

  it('accepts object options', () => {
    const options = [{ value: 8, label: 'Drive 8' }];
    const wrapper = mount(V64Select, { propsData: { options } });
    expect(wrapper.find('option').attributes('value')).toBe('8');
    expect(wrapper.find('option').text()).toBe('Drive 8');
  });

  it('emits the picked value on change', () => {
    const wrapper = mount(V64Select, { propsData: { options: ['Tape', 'Disk'], value: 'Tape' } });
    const select = wrapper.find('select');
    select.element.value = 'Disk';
    select.trigger('change');
    expect(wrapper.emitted().change).toEqual([['Disk']]);
  });
});
