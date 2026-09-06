import { mount } from '@vue/test-utils';
import V64Toast from '../index.vue';

describe('V64Toast', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('renders nothing while closed', () => {
    expect(mount(V64Toast, { propsData: { open: false } }).find('[role]').exists()).toBe(false);
  });

  it('shows its message when open', () => {
    const wrapper = mount(V64Toast, {
      propsData: { open: true, title: 'Saved' },
      slots: { default: '38911 bytes free' },
    });
    expect(wrapper.text()).toContain('Saved');
    expect(wrapper.text()).toContain('38911 bytes free');
  });

  it('closes itself once its time is up', () => {
    const wrapper = mount(V64Toast, { propsData: { open: true, duration: 1000 } });
    expect(wrapper.emitted().change).toBeUndefined();
    jest.advanceTimersByTime(1000);
    expect(wrapper.emitted().change).toEqual([[false]]);
  });

  it('stays up when given no duration', () => {
    const wrapper = mount(V64Toast, { propsData: { open: true, duration: 0 } });
    jest.advanceTimersByTime(60000);
    expect(wrapper.emitted().change).toBeUndefined();
  });

  it('closes when dismissed by hand', () => {
    const wrapper = mount(V64Toast, { propsData: { open: true } });
    wrapper.find('[aria-label="Dismiss"]').trigger('click');
    expect(wrapper.emitted().close).toHaveLength(1);
  });

  it('does not let a dismissed toast close a later one on its old timer', () => {
    const wrapper = mount(V64Toast, { propsData: { open: true, duration: 1000 } });
    wrapper.find('[aria-label="Dismiss"]').trigger('click');
    wrapper.setProps({ open: false });
    jest.advanceTimersByTime(1000);
    expect(wrapper.emitted().change).toHaveLength(1);
  });
});
