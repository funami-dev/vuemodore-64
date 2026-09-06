import { mount } from '@vue/test-utils';
import V64FileInput from '../index.vue';

describe('V64FileInput', () => {
  it('greets with the tape prompt and no file', () => {
    const wrapper = mount(V64FileInput);
    expect(wrapper.find('button').text()).toBe('Press play on tape');
    expect(wrapper.text()).toContain('No file selected');
  });

  it('hides the native control but keeps it in the DOM', () => {
    const wrapper = mount(V64FileInput);
    expect(wrapper.find('input[type="file"]').exists()).toBe(true);
  });

  it('opens the picker from the button', () => {
    const wrapper = mount(V64FileInput);
    const native = wrapper.find('input[type="file"]').element;
    native.click = jest.fn();
    wrapper.find('button').trigger('click');
    expect(native.click).toHaveBeenCalled();
  });

  it('shows the chosen file names and emits them', () => {
    const wrapper = mount(V64FileInput);
    const files = [{ name: 'GAME.PRG' }, { name: 'DEMO.D64' }];
    wrapper.find('input[type="file"]').vm.$emit('change', { target: { files } });
    expect(wrapper.emitted().change).toEqual([[files]]);
    expect(wrapper.text()).toContain('GAME.PRG, DEMO.D64');
  });

  it('ties its label to the native control', () => {
    const wrapper = mount(V64FileInput, { propsData: { label: 'Program' } });
    expect(wrapper.find('label').attributes('for'))
      .toBe(wrapper.find('input[type="file"]').attributes('id'));
  });
});
