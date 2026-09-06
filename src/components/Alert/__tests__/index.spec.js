import { mount } from '@vue/test-utils';
import V64Alert from '../index.vue';

describe('V64Alert', () => {
  it('renders its title and message', () => {
    const wrapper = mount(V64Alert, {
      propsData: { title: 'Syntax error' },
      slots: { default: 'Line 10' },
    });
    expect(wrapper.text()).toContain('Syntax error');
    expect(wrapper.text()).toContain('Line 10');
  });

  it('leads each variant with the character the machine would have used', () => {
    const sign = variant => mount(V64Alert, { propsData: { variant } }).vm.sign;
    expect(sign('error')).toBe('?');
    expect(sign('warning')).toBe('!');
    expect(sign('success')).toBe('*');
    expect(sign('info')).toBe('*');
  });

  it('interrupts for errors and warnings, waits its turn otherwise', () => {
    const role = variant => mount(V64Alert, { propsData: { variant } }).attributes('role');
    expect(role('error')).toBe('alert');
    expect(role('warning')).toBe('alert');
    expect(role('info')).toBe('status');
    expect(role('success')).toBe('status');
  });

  it('offers a dismiss button only when asked, and emits dismiss', () => {
    expect(mount(V64Alert).find('button').exists()).toBe(false);

    const wrapper = mount(V64Alert, { propsData: { dismissible: true } });
    wrapper.find('button').trigger('click');
    expect(wrapper.emitted().dismiss).toHaveLength(1);
  });
});
