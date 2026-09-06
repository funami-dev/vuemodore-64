import { mount } from '@vue/test-utils';
import V64FormField from '../index.vue';

const withInput = {
  scopedSlots: {
    default: `
      <input
        slot-scope="field"
        :id="field.id"
        :aria-invalid="String(field.invalid)"
        :aria-describedby="field.describedBy"
      />
    `,
  },
};

describe('V64FormField', () => {
  it('hands the control an id and ties the label to it', () => {
    const wrapper = mount(V64FormField, { propsData: { label: 'Filename' }, ...withInput });
    expect(wrapper.find('label').attributes('for')).toBe(wrapper.find('input').attributes('id'));
  });

  it('announces an error and points the control at it', () => {
    const wrapper = mount(V64FormField, { propsData: { error: 'Syntax error' }, ...withInput });
    const message = wrapper.find('[role="alert"]');
    expect(message.text()).toBe('Syntax error');
    expect(wrapper.find('input').attributes('aria-describedby')).toBe(message.attributes('id'));
    expect(wrapper.find('input').attributes('aria-invalid')).toBe('true');
  });

  it('shows a hint when there is no error, and drops it when one arrives', () => {
    const wrapper = mount(V64FormField, { propsData: { hint: 'Max 16 chars' }, ...withInput });
    expect(wrapper.text()).toContain('Max 16 chars');
    expect(wrapper.find('[role="alert"]').exists()).toBe(false);

    wrapper.setProps({ error: 'Too long' });
    expect(wrapper.text()).toContain('Too long');
    expect(wrapper.text()).not.toContain('Max 16 chars');
  });

  it('renders nothing extra when it has neither label nor message', () => {
    const wrapper = mount(V64FormField, withInput);
    expect(wrapper.find('label').exists()).toBe(false);
    expect(wrapper.findAll('div').length).toBe(1);
    expect(wrapper.find('input').attributes('aria-describedby')).toBeUndefined();
  });

  it('gives every field its own id', () => {
    const a = mount(V64FormField, { propsData: { label: 'A' }, ...withInput });
    const b = mount(V64FormField, { propsData: { label: 'B' }, ...withInput });
    expect(a.find('input').attributes('id')).not.toBe(b.find('input').attributes('id'));
  });
});
