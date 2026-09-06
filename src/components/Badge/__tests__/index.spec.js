import { mount } from '@vue/test-utils';
import V64Badge from '../index.vue';

describe('V64Badge', () => {
  it('renders its label', () => {
    expect(mount(V64Badge, { propsData: { label: 'New' } }).text()).toBe('New');
  });

  it('lets the slot win over the label prop', () => {
    const wrapper = mount(V64Badge, { propsData: { label: 'New' }, slots: { default: '12' } });
    expect(wrapper.text()).toBe('12');
  });

  it('accepts a number', () => {
    expect(mount(V64Badge, { propsData: { label: 8 } }).text()).toBe('8');
  });
});
