import { mount } from '@vue/test-utils';
import V64Link from '../index.vue';

describe('V64Link', () => {
  it('renders an anchor with its href', () => {
    const wrapper = mount(V64Link, {
      propsData: { href: 'https://example.com' },
      slots: { default: 'Docs' },
    });
    expect(wrapper.element.tagName).toBe('A');
    expect(wrapper.attributes('href')).toBe('https://example.com');
    expect(wrapper.text()).toBe('Docs');
  });

  it('protects a new-tab link from the page it opens', () => {
    const wrapper = mount(V64Link, { propsData: { href: '/x', target: '_blank' } });
    expect(wrapper.attributes('rel')).toBe('noopener noreferrer');
    expect(wrapper.text()).toContain('↗');
  });

  it('adds no rel or marker for a same-tab link', () => {
    const wrapper = mount(V64Link, { propsData: { href: '/x' } });
    expect(wrapper.attributes('rel')).toBeUndefined();
    expect(wrapper.text()).not.toContain('↗');
  });

  it('drops the href and swallows the click when disabled', () => {
    const wrapper = mount(V64Link, { propsData: { href: '/x', disabled: true } });
    expect(wrapper.attributes('href')).toBeUndefined();
    expect(wrapper.attributes('aria-disabled')).toBe('true');
    wrapper.trigger('click');
    expect(wrapper.emitted().click).toBeUndefined();
  });

  it('emits click when it is not disabled', () => {
    const wrapper = mount(V64Link, { propsData: { href: '/x' } });
    wrapper.trigger('click');
    expect(wrapper.emitted().click).toHaveLength(1);
  });
});
