import { mount } from '@vue/test-utils';
import V64Key from '../index.vue';

describe('V64Key', () => {
  it('renders as a kbd element so it reads as a key', () => {
    const wrapper = mount(V64Key, { propsData: { label: 'F1' } });
    expect(wrapper.element.tagName).toBe('KBD');
    expect(wrapper.text()).toBe('F1');
  });

  it('lets the slot win over the label', () => {
    const wrapper = mount(V64Key, { propsData: { label: 'F1' }, slots: { default: 'RUN' } });
    expect(wrapper.text()).toBe('RUN');
  });

  it('takes a wide form for the long keys', () => {
    expect(mount(V64Key, { propsData: { label: 'Space', wide: true } }).props('wide')).toBe(true);
  });
});
