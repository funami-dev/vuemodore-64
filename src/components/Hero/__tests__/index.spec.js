import { mount } from '@vue/test-utils';
import V64Hero from '../index.vue';

describe('V64Hero', () => {
  it('renders the headline as the page heading', () => {
    const wrapper = mount(V64Hero, { propsData: { title: 'Vuemodore 64' } });
    expect(wrapper.find('h1').text()).toBe('Vuemodore 64');
  });

  it('renders the subtitle', () => {
    const wrapper = mount(V64Hero, { propsData: { title: 'A', subtitle: 'B' } });
    expect(wrapper.find('p').text()).toBe('B');
  });

  it('leaves out empty parts instead of rendering hollow markup', () => {
    const wrapper = mount(V64Hero, { propsData: { title: 'A' } });
    expect(wrapper.find('p').exists()).toBe(false);
  });

  it('places default slot content as actions', () => {
    const wrapper = mount(V64Hero, {
      propsData: { title: 'A' },
      slots: { default: '<button>Load</button>' },
    });
    expect(wrapper.find('button').text()).toBe('Load');
  });

  it('lets a slot replace the title text', () => {
    const wrapper = mount(V64Hero, { slots: { title: '<em>Ready</em>' } });
    expect(wrapper.find('h1 em').text()).toBe('Ready');
  });

  it('can drop the loading stripes', () => {
    const withStripes = mount(V64Hero, { propsData: { title: 'A' } });
    const without = mount(V64Hero, { propsData: { title: 'A', stripes: false } });
    expect(withStripes.findAll('[aria-hidden="true"]')).toHaveLength(2);
    expect(without.findAll('[aria-hidden="true"]')).toHaveLength(0);
  });
});
