import { mount } from '@vue/test-utils';
import V64Panel from '../index.vue';

describe('V64Panel', () => {
  it('renders its title and body', () => {
    const wrapper = mount(V64Panel, {
      propsData: { title: 'Directory' },
      slots: { default: 'READY.' },
    });
    expect(wrapper.text()).toContain('Directory');
    expect(wrapper.text()).toContain('READY.');
  });

  it('leaves out the title bar when there is no title', () => {
    const wrapper = mount(V64Panel, { slots: { default: 'x' } });
    expect(wrapper.findAll('div').length).toBe(1);
  });

  it('offers a close button only when asked, and emits close', () => {
    expect(mount(V64Panel, { propsData: { title: 'A' } }).find('button').exists()).toBe(false);

    const wrapper = mount(V64Panel, { propsData: { title: 'A', closable: true } });
    wrapper.find('button').trigger('click');
    expect(wrapper.emitted().close).toHaveLength(1);
  });

  it('renders a footer only when the slot is filled', () => {
    const bare = mount(V64Panel, { slots: { default: 'x' } });
    expect(bare.text()).toBe('x');

    const wrapper = mount(V64Panel, { slots: { default: 'x', footer: 'OK' } });
    expect(wrapper.text()).toContain('OK');
  });
});
