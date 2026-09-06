import { mount } from '@vue/test-utils';
import V64Tooltip from '../index.vue';

const mountTip = () => mount(V64Tooltip, {
  propsData: { text: 'Loads from drive 8' },
  slots: { default: '<button>Load</button>' },
});

describe('V64Tooltip', () => {
  it('keeps the bubble hidden until asked', () => {
    const wrapper = mountTip();
    expect(wrapper.find('[role="tooltip"]').isVisible()).toBe(false);
  });

  it('shows on hover and hides again', () => {
    const wrapper = mountTip();
    wrapper.trigger('mouseenter');
    expect(wrapper.find('[role="tooltip"]').isVisible()).toBe(true);
    wrapper.trigger('mouseleave');
    expect(wrapper.find('[role="tooltip"]').isVisible()).toBe(false);
  });

  it('shows on focus, so it is reachable without a mouse', () => {
    const wrapper = mountTip();
    wrapper.trigger('focusin');
    expect(wrapper.find('[role="tooltip"]').isVisible()).toBe(true);
  });

  it('describes the trigger only while it is showing', () => {
    const wrapper = mountTip();
    const trigger = wrapper.findAll('span').at(1);
    expect(trigger.attributes('aria-describedby')).toBeUndefined();

    wrapper.trigger('mouseenter');
    expect(trigger.attributes('aria-describedby'))
      .toBe(wrapper.find('[role="tooltip"]').attributes('id'));
  });

  it('keeps the bubble in the DOM so its id always resolves', () => {
    const wrapper = mountTip();
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(true);
  });
});
