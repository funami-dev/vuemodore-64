import { mount } from '@vue/test-utils';
import V64Table from '../index.vue';

const columns = [{ key: 'name', label: 'Name' }, { key: 'blocks', label: 'Blocks', align: 'right' }];
const rows = [{ name: 'GAME', blocks: 12 }, { name: 'DEMO', blocks: 4 }];

describe('V64Table', () => {
  it('renders a header cell per column and a row per entry', () => {
    const wrapper = mount(V64Table, { propsData: { columns, rows } });
    expect(wrapper.findAll('th')).toHaveLength(2);
    expect(wrapper.findAll('tbody tr')).toHaveLength(2);
    expect(wrapper.findAll('td').at(0).text()).toBe('GAME');
  });

  it('expands a plain string column into key and label', () => {
    const wrapper = mount(V64Table, { propsData: { columns: ['name'], rows } });
    expect(wrapper.find('th').text()).toBe('name');
    expect(wrapper.findAll('td').at(0).text()).toBe('GAME');
  });

  it('defaults an unknown alignment to left', () => {
    const wrapper = mount(V64Table, {
      propsData: { columns: [{ key: 'name', align: 'sideways' }], rows },
    });
    expect(wrapper.vm.normalisedColumns[0].align).toBe('left');
  });

  it('keeps the column alignment it is given', () => {
    const wrapper = mount(V64Table, { propsData: { columns, rows } });
    expect(wrapper.vm.normalisedColumns[1].align).toBe('right');
  });

  it('says so when there is nothing to show', () => {
    const wrapper = mount(V64Table, { propsData: { columns, rows: [] } });
    expect(wrapper.text()).toContain('No entries');
    expect(wrapper.find('td').attributes('colspan')).toBe('2');
  });

  it('lets a slot take over a column', () => {
    const wrapper = mount(V64Table, {
      propsData: { columns, rows },
      scopedSlots: { name: '<b slot-scope="cell">{{ cell.value }}!</b>' },
    });
    expect(wrapper.find('td b').text()).toBe('GAME!');
  });
});
