import { mount } from '@vue/test-utils';
import V64Text from '../index.vue';

describe('V64Text', () => {
  it('renders its slot inside a pre so listings keep their layout', () => {
    const wrapper = mount(V64Text, { slots: { default: 'Ready.' } });
    expect(wrapper.element.tagName).toBe('PRE');
    expect(wrapper.text()).toBe('Ready.');
  });

  it('accepts a colour override', () => {
    const wrapper = mount(V64Text, {
      propsData: { color: 'rgb(0, 204, 85)' },
      slots: { default: 'Ok' },
    });
    expect(wrapper.props('color')).toBe('rgb(0, 204, 85)');
  });
});
