import { mount } from '@vue/test-utils';
import V64LoadingScreen from '../index.vue';
import V64ProgressBar from '../../ProgressBar/index.vue';

describe('V64LoadingScreen', () => {
  it('announces itself with its message', () => {
    const wrapper = mount(V64LoadingScreen, { propsData: { message: 'Loading GAME' } });
    expect(wrapper.attributes('role')).toBe('status');
    expect(wrapper.attributes('aria-label')).toBe('Loading GAME');
    expect(wrapper.text()).toContain('Loading GAME');
  });

  it('frames the screen with a band of stripes above and below', () => {
    // Stripe, middle, stripe -- the progress bar inside contributes its own
    // aria-hidden element, so structure is what this asserts, not that count.
    const wrapper = mount(V64LoadingScreen);
    const { children } = wrapper.element;
    expect(children).toHaveLength(3);
    expect(children[0].getAttribute('aria-hidden')).toBe('true');
    expect(children[2].getAttribute('aria-hidden')).toBe('true');
    expect(children[1].getAttribute('aria-hidden')).toBeNull();
  });

  it('runs an endless bar when the length is unknown', () => {
    const wrapper = mount(V64LoadingScreen);
    expect(wrapper.find(V64ProgressBar).props('indeterminate')).toBe(true);
  });

  it('shows real progress when it has some', () => {
    const wrapper = mount(V64LoadingScreen, { propsData: { progress: 40 } });
    const bar = wrapper.find(V64ProgressBar);
    expect(bar.props('indeterminate')).toBe(false);
    expect(bar.props('value')).toBe(40);
    expect(wrapper.text()).toContain('40%');
  });
});
