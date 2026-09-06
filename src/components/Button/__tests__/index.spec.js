import { mount } from '@vue/test-utils';
import V64Button from '../index.vue';

describe('V64Button', () => {
  it('renders the default slot', () => {
    const wrapper = mount(V64Button, { slots: { default: 'Run' } });
    expect(wrapper.text()).toBe('Run');
  });

  it('emits click when pressed', () => {
    const wrapper = mount(V64Button);
    wrapper.trigger('click');
    expect(wrapper.emitted().click).toHaveLength(1);
  });

  it('stays silent while disabled', () => {
    const wrapper = mount(V64Button, { propsData: { disabled: true } });
    wrapper.trigger('click');
    expect(wrapper.emitted().click).toBeUndefined();
  });

  it('renders as a button of the given type', () => {
    const wrapper = mount(V64Button, { propsData: { type: 'submit' } });
    expect(wrapper.element.tagName).toBe('BUTTON');
    expect(wrapper.attributes('type')).toBe('submit');
  });
});
