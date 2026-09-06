import { mount } from '@vue/test-utils';
import V64Tabs from '../index.vue';

const tabs = ['Basic', 'Assembly', 'Sprites'];

const mountTabs = (propsData = {}) => mount(V64Tabs, {
  propsData: { tabs, value: 'Basic', ...propsData },
  scopedSlots: { Basic: '<p>10 PRINT</p>' },
});

describe('V64Tabs', () => {
  it('renders a tab per entry inside a tablist', () => {
    const wrapper = mountTabs();
    expect(wrapper.find('[role="tablist"]').exists()).toBe(true);
    expect(wrapper.findAll('[role="tab"]')).toHaveLength(3);
  });

  it('marks only the open tab as selected', () => {
    const wrapper = mountTabs({ value: 'Assembly' });
    const selected = wrapper.findAll('[role="tab"]').wrappers
      .map(w => w.attributes('aria-selected'));
    expect(selected).toEqual(['false', 'true', 'false']);
  });

  it('wires each tab to its panel both ways', () => {
    const wrapper = mountTabs();
    const tab = wrapper.findAll('[role="tab"]').at(0);
    const panel = wrapper.findAll('[role="tabpanel"]').at(0);
    expect(tab.attributes('aria-controls')).toBe(panel.attributes('id'));
    expect(panel.attributes('aria-labelledby')).toBe(tab.attributes('id'));
  });

  it('keeps only the open tab reachable by Tab key', () => {
    const wrapper = mountTabs();
    const indexes = wrapper.findAll('[role="tab"]').wrappers.map(w => w.attributes('tabindex'));
    expect(indexes).toEqual(['0', '-1', '-1']);
  });

  it('renders the slot of the open tab', () => {
    expect(mountTabs().text()).toContain('10 PRINT');
  });

  it('opens another tab on click', () => {
    const wrapper = mountTabs();
    wrapper.findAll('[role="tab"]').at(1).trigger('click');
    expect(wrapper.emitted().change).toEqual([['Assembly']]);
  });

  it('says nothing when the open tab is clicked again', () => {
    const wrapper = mountTabs();
    wrapper.findAll('[role="tab"]').at(0).trigger('click');
    expect(wrapper.emitted().change).toBeUndefined();
  });

  it('moves with the arrow keys and wraps around', () => {
    const wrapper = mountTabs();
    wrapper.find('[role="tablist"]').trigger('keydown', { key: 'ArrowRight' });
    expect(wrapper.emitted().change).toEqual([['Assembly']]);

    wrapper.find('[role="tablist"]').trigger('keydown', { key: 'ArrowLeft' });
    expect(wrapper.emitted().change[1]).toEqual(['Sprites']);
  });

  it('steps over a disabled tab', () => {
    const wrapper = mount(V64Tabs, {
      propsData: {
        tabs: ['A', { value: 'B', label: 'B', disabled: true }, 'C'],
        value: 'A',
      },
    });
    wrapper.find('[role="tablist"]').trigger('keydown', { key: 'ArrowRight' });
    expect(wrapper.emitted().change).toEqual([['C']]);
  });
});
