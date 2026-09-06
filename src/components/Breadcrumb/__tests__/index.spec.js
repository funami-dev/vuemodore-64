import { mount } from '@vue/test-utils';
import V64Breadcrumb from '../index.vue';

const items = [
  { label: 'Home', href: '/' },
  { label: 'Disk', href: '/disk' },
  { label: 'Game' },
];

describe('V64Breadcrumb', () => {
  it('is a named navigation landmark', () => {
    const wrapper = mount(V64Breadcrumb, { propsData: { items } });
    expect(wrapper.element.tagName).toBe('NAV');
    expect(wrapper.attributes('aria-label')).toBe('Breadcrumb');
  });

  it('renders one step per item with separators between them', () => {
    const wrapper = mount(V64Breadcrumb, { propsData: { items } });
    expect(wrapper.findAll('li')).toHaveLength(3);
    expect(wrapper.text().match(/\//g)).toHaveLength(2);
  });

  it('links every step except the last, and marks the last as current', () => {
    const wrapper = mount(V64Breadcrumb, { propsData: { items } });
    expect(wrapper.findAll('a')).toHaveLength(2);
    expect(wrapper.find('[aria-current="page"]').text()).toBe('Game');
  });

  it('expands a plain string into a step without a link', () => {
    const wrapper = mount(V64Breadcrumb, { propsData: { items: ['Home', 'Game'] } });
    expect(wrapper.findAll('a')).toHaveLength(0);
    expect(wrapper.findAll('li').at(0).text()).toBe('Home');
  });

  it('emits the item that was navigated to', () => {
    const wrapper = mount(V64Breadcrumb, { propsData: { items } });
    wrapper.find('a').trigger('click');
    expect(wrapper.emitted().navigate[0][0].label).toBe('Home');
  });
});
