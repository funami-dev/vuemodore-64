import { mount } from '@vue/test-utils';
import V64Modal from '../index.vue';

describe('V64Modal', () => {
  it('renders nothing while closed', () => {
    const wrapper = mount(V64Modal, { propsData: { open: false } });
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false);
  });

  it('is a modal dialog when open, named by its title', () => {
    const wrapper = mount(V64Modal, {
      propsData: { open: true, title: 'Really quit?' },
      slots: { default: 'All progress is lost.' },
    });
    const dialog = wrapper.find('[role="dialog"]');
    expect(dialog.attributes('aria-modal')).toBe('true');
    expect(dialog.attributes('aria-label')).toBe('Really quit?');
    expect(wrapper.text()).toContain('All progress is lost.');
  });

  it('closes on Escape', () => {
    const wrapper = mount(V64Modal, { propsData: { open: true } });
    wrapper.find('[role="dialog"]').trigger('keydown.esc');
    expect(wrapper.emitted().change).toEqual([[false]]);
    expect(wrapper.emitted().close).toHaveLength(1);
  });

  it('stays open on Escape when told to', () => {
    const wrapper = mount(V64Modal, { propsData: { open: true, closeOnEsc: false } });
    wrapper.find('[role="dialog"]').trigger('keydown.esc');
    expect(wrapper.emitted().change).toBeUndefined();
  });

  it('closes when the backdrop itself is clicked', () => {
    const wrapper = mount(V64Modal, { propsData: { open: true } });
    wrapper.trigger('click');
    expect(wrapper.emitted().change).toEqual([[false]]);
  });

  it('ignores a backdrop click when told to', () => {
    const wrapper = mount(V64Modal, { propsData: { open: true, closeOnOverlay: false } });
    wrapper.trigger('click');
    expect(wrapper.emitted().change).toBeUndefined();
  });

  it('closes from the title bar button', () => {
    const wrapper = mount(V64Modal, { propsData: { open: true, title: 'Quit' } });
    wrapper.find('button').trigger('click');
    expect(wrapper.emitted().close).toHaveLength(1);
  });

  it('moves focus into the dialog so the keyboard follows', async () => {
    const wrapper = mount(V64Modal, { propsData: { open: false }, attachToDocument: true });
    wrapper.setProps({ open: true });
    await wrapper.vm.$nextTick();
    expect(document.activeElement).toBe(wrapper.find('[role="dialog"]').element);
    wrapper.destroy();
  });
});
