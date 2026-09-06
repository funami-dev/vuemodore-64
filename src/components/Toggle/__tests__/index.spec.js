import { mount } from '@vue/test-utils';
import V64Toggle from '../index.vue';

describe('V64Toggle', () => {
  it('reflects the checked prop', () => {
    expect(mount(V64Toggle, { propsData: { checked: true } }).find('input').element.checked)
      .toBe(true);
  });

  it('emits the new state when flipped', () => {
    const wrapper = mount(V64Toggle);
    const input = wrapper.find('input');
    input.element.checked = true;
    input.trigger('change');
    expect(wrapper.emitted().change).toEqual([[true]]);
  });

  it('renders its label', () => {
    expect(mount(V64Toggle, { propsData: { label: 'Sound' } }).text()).toContain('Sound');
  });

  it('keeps two switches on one page independent', () => {
    const a = mount(V64Toggle);
    const b = mount(V64Toggle);
    expect(a.find('input').attributes('id')).not.toBe(b.find('input').attributes('id'));
  });
});
