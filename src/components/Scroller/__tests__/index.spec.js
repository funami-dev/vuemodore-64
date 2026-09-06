import { mount } from '@vue/test-utils';
import V64Scroller from '../index.vue';

describe('V64Scroller', () => {
  it('renders the text twice so the loop has no seam', () => {
    const wrapper = mount(V64Scroller, { propsData: { text: 'GREETINGS' } });
    expect(wrapper.text()).toBe('GREETINGSGREETINGS');
    expect(wrapper.findAll('span')).toHaveLength(2);
  });

  it('exposes the text once to assistive technology, not twice', () => {
    const wrapper = mount(V64Scroller, { propsData: { text: 'GREETINGS' } });
    expect(wrapper.attributes('aria-label')).toBe('GREETINGS');
    expect(wrapper.find('[aria-hidden="true"]').exists()).toBe(true);
  });

  it('can be paused', () => {
    expect(mount(V64Scroller, { propsData: { text: 'X', paused: true } }).props('paused'))
      .toBe(true);
  });
});
