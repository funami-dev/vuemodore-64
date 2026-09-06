import { mount } from '@vue/test-utils';
import V64PixelIcon from '../index.vue';

const heart = [
  '.XX.XX.',
  'XXXXXXX',
  'XXXXXXX',
  '.XXXXX.',
  '..XXX..',
  '...X...',
];

describe('V64PixelIcon', () => {
  it('renders one cell per pixel of the grid', () => {
    const wrapper = mount(V64PixelIcon, { propsData: { rows: heart } });
    expect(wrapper.vm.width).toBe(7);
    expect(wrapper.vm.bits).toHaveLength(42);
  });

  it('treats spaces and dots as empty and everything else as lit', () => {
    const wrapper = mount(V64PixelIcon, { propsData: { rows: ['X. X'] } });
    expect(wrapper.vm.bits).toEqual([true, false, false, true]);
  });

  it('pads a ragged sprite so the rows still line up', () => {
    const wrapper = mount(V64PixelIcon, { propsData: { rows: ['XXX', 'X'] } });
    expect(wrapper.vm.width).toBe(3);
    expect(wrapper.vm.bits).toEqual([true, true, true, true, false, false]);
  });

  it('is an image when named and decoration when not', () => {
    expect(mount(V64PixelIcon, { propsData: { rows: heart, label: 'Lives' } }).attributes('role'))
      .toBe('img');
    expect(mount(V64PixelIcon, { propsData: { rows: heart } }).attributes('role'))
      .toBe('presentation');
  });
});
