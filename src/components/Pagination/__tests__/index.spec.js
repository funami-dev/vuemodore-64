import { mount } from '@vue/test-utils';
import V64Pagination from '../index.vue';

describe('V64Pagination', () => {
  it('lists every page while they still fit', () => {
    const wrapper = mount(V64Pagination, { propsData: { pages: 4, page: 1 } });
    expect(wrapper.vm.entries).toEqual([1, 2, 3, 4]);
  });

  it('collapses the middle but keeps the ends reachable', () => {
    const wrapper = mount(V64Pagination, { propsData: { pages: 100, page: 50 } });
    expect(wrapper.vm.entries).toEqual([1, null, 49, 50, 51, null, 100]);
  });

  it('keeps its width whether there are five pages or five hundred', () => {
    const count = page => mount(V64Pagination, {
      propsData: { pages: 500, page },
    }).vm.entries.length;
    expect(count(1)).toBeLessThanOrEqual(7);
    expect(count(250)).toBeLessThanOrEqual(7);
    expect(count(500)).toBeLessThanOrEqual(7);
  });

  it('marks the current page for assistive technology', () => {
    const wrapper = mount(V64Pagination, { propsData: { pages: 5, page: 3 } });
    expect(wrapper.find('[aria-current="page"]').text()).toBe('3');
  });

  it('disables the step buttons at the ends', () => {
    const first = mount(V64Pagination, { propsData: { pages: 5, page: 1 } });
    expect(first.find('[aria-label="Previous page"]').element.disabled).toBe(true);
    expect(first.find('[aria-label="Next page"]').element.disabled).toBe(false);

    const last = mount(V64Pagination, { propsData: { pages: 5, page: 5 } });
    expect(last.find('[aria-label="Next page"]').element.disabled).toBe(true);
  });

  it('emits the page that was picked', () => {
    const wrapper = mount(V64Pagination, { propsData: { pages: 5, page: 3 } });
    wrapper.find('[aria-label="Next page"]').trigger('click');
    expect(wrapper.emitted().change).toEqual([[4]]);
  });

  it('refuses to step outside the range or onto the current page', () => {
    const wrapper = mount(V64Pagination, { propsData: { pages: 5, page: 3 } });
    wrapper.vm.go(0);
    wrapper.vm.go(6);
    wrapper.vm.go(3);
    expect(wrapper.emitted().change).toBeUndefined();
  });
});
