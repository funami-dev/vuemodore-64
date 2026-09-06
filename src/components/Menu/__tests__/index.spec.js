import { mount } from '@vue/test-utils';
import V64Menu from '../index.vue';

const options = ['Start', 'Options', 'Quit'];

describe('V64Menu', () => {
  it('renders one entry per option and marks the first one active', () => {
    const wrapper = mount(V64Menu, { propsData: { options } });
    expect(wrapper.findAll('[role="menuitem"]')).toHaveLength(3);
    expect(wrapper.text()).toContain('>');
    expect(wrapper.attributes('aria-activedescendant'))
      .toBe(wrapper.findAll('[role="menuitem"]').at(0).attributes('id'));
  });

  it('walks down and up with the cursor keys', () => {
    const wrapper = mount(V64Menu, { propsData: { options } });
    wrapper.trigger('keydown', { key: 'ArrowDown' });
    expect(wrapper.vm.activeIndex).toBe(1);
    wrapper.trigger('keydown', { key: 'ArrowUp' });
    expect(wrapper.vm.activeIndex).toBe(0);
  });

  it('wraps around at both ends', () => {
    const wrapper = mount(V64Menu, { propsData: { options } });
    wrapper.trigger('keydown', { key: 'ArrowUp' });
    expect(wrapper.vm.activeIndex).toBe(2);
    wrapper.trigger('keydown', { key: 'ArrowDown' });
    expect(wrapper.vm.activeIndex).toBe(0);
  });

  it('jumps to the ends with Home and End', () => {
    const wrapper = mount(V64Menu, { propsData: { options } });
    wrapper.trigger('keydown', { key: 'End' });
    expect(wrapper.vm.activeIndex).toBe(2);
    wrapper.trigger('keydown', { key: 'Home' });
    expect(wrapper.vm.activeIndex).toBe(0);
  });

  it('steps over disabled entries instead of landing on them', () => {
    const wrapper = mount(V64Menu, {
      propsData: {
        options: ['Start', { value: 'load', label: 'Load', disabled: true }, 'Quit'],
      },
    });
    wrapper.trigger('keydown', { key: 'ArrowDown' });
    expect(wrapper.vm.activeIndex).toBe(2);
  });

  it('emits the value on Enter and on click', () => {
    const wrapper = mount(V64Menu, { propsData: { options } });
    wrapper.trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted().select).toEqual([['Start']]);

    wrapper.findAll('[role="menuitem"]').at(2).trigger('click');
    expect(wrapper.emitted().select[1]).toEqual(['Quit']);
  });

  it('refuses to select a disabled entry', () => {
    const wrapper = mount(V64Menu, {
      propsData: { options: [{ value: 'x', label: 'X', disabled: true }] },
    });
    wrapper.find('[role="menuitem"]').trigger('click');
    expect(wrapper.emitted().select).toBeUndefined();
  });
});
