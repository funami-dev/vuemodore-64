import { mount } from '@vue/test-utils';
import V64Terminal from '../index.vue';

const lines = ['LOAD "*",8,1', 'SEARCHING FOR *'];

describe('V64Terminal', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('is a polite log for assistive technology', () => {
    const wrapper = mount(V64Terminal, { propsData: { lines } });
    expect(wrapper.attributes('role')).toBe('log');
    expect(wrapper.attributes('aria-live')).toBe('polite');
  });

  it('prints every line at once by default', () => {
    const wrapper = mount(V64Terminal, { propsData: { lines } });
    expect(wrapper.text()).toContain('LOAD "*",8,1');
    expect(wrapper.text()).toContain('SEARCHING FOR *');
  });

  it('shows the prompt and cursor, and can leave them out', () => {
    expect(mount(V64Terminal, { propsData: { lines } }).text()).toContain('READY.');
    expect(mount(V64Terminal, { propsData: { lines, showPrompt: false } }).text())
      .not.toContain('READY.');
  });

  it('types one character at a time when asked', () => {
    const wrapper = mount(V64Terminal, {
      propsData: { lines: ['AB'], typewriter: true, speed: 10 },
    });
    expect(wrapper.vm.printed).toEqual([]);
    jest.advanceTimersByTime(10);
    expect(wrapper.vm.printed).toEqual(['A']);
    jest.advanceTimersByTime(10);
    expect(wrapper.vm.printed).toEqual(['AB']);
  });

  it('moves on to the next line and reports when it is done', () => {
    const wrapper = mount(V64Terminal, {
      propsData: { lines: ['A', 'B'], typewriter: true, speed: 10 },
    });
    jest.advanceTimersByTime(30);
    expect(wrapper.vm.printed).toEqual(['A', 'B']);
    expect(wrapper.emitted().done).toHaveLength(1);
  });

  it('starts over when the lines change', () => {
    const wrapper = mount(V64Terminal, {
      propsData: { lines: ['AB'], typewriter: true, speed: 10 },
    });
    jest.advanceTimersByTime(20);
    wrapper.setProps({ lines: ['XY'] });
    expect(wrapper.vm.printed).toEqual([]);
    jest.advanceTimersByTime(10);
    expect(wrapper.vm.printed).toEqual(['X']);
  });

  it('stops its timer when destroyed', () => {
    const wrapper = mount(V64Terminal, { propsData: { lines, typewriter: true } });
    wrapper.destroy();
    expect(wrapper.vm.timer).toBeNull();
  });
});
