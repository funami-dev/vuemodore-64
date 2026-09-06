import { mount } from '@vue/test-utils';
import V64Spinner from '../index.vue';

describe('V64Spinner', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('announces itself as a status', () => {
    expect(mount(V64Spinner).attributes('role')).toBe('status');
    expect(mount(V64Spinner).attributes('aria-label')).toBe('Loading');
  });

  it('uses its label for the accessible name', () => {
    const wrapper = mount(V64Spinner, { propsData: { label: 'Searching' } });
    expect(wrapper.attributes('aria-label')).toBe('Searching');
    expect(wrapper.text()).toContain('Searching');
  });

  it('cycles through its frames', () => {
    const wrapper = mount(V64Spinner, { propsData: { speed: 100 } });
    expect(wrapper.vm.frame).toBe('|');
    jest.advanceTimersByTime(100);
    expect(wrapper.vm.frame).toBe('/');
    jest.advanceTimersByTime(200);
    expect(wrapper.vm.frame).toBe('\\');
    jest.advanceTimersByTime(100);
    expect(wrapper.vm.frame).toBe('|');
  });

  it('stops its timer when destroyed', () => {
    const wrapper = mount(V64Spinner);
    wrapper.destroy();
    expect(clearInterval).toHaveBeenCalled();
  });
});
