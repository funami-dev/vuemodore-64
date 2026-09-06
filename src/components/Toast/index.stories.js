import V64Toast from './index.vue';
import V64Button from '../Button/index.vue';

export default {
  title: 'Toast',
  component: V64Toast,
  argTypes: {
    placement: {
      control: {
        type: 'select',
        options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      },
    },
    content: { control: 'text', description: 'Default slot content' },
    close: { action: 'close' },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64Toast, V64Button },
  data: () => ({ model: args.open }),
  template: `
    <div>
      <V64Button @click="model = true">Save</V64Button>
      <V64Toast v-bind="$props" v-model="model" @close="close">{{ content }}</V64Toast>
    </div>
  `,
});

export const StaysUp = Template.bind({});
StaysUp.args = {
  open: true, title: 'Saved', content: '38911 basic bytes free', duration: 0,
};

export const AutoClosing = Template.bind({});
AutoClosing.args = {
  open: true,
  variant: 'success',
  title: 'Saved',
  content: 'Gone in 3 seconds',
  duration: 3000,
};
