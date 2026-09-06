import V64Modal from './index.vue';
import V64Button from '../Button/index.vue';

export default {
  title: 'Modal',
  component: V64Modal,
  argTypes: { close: { action: 'close' } },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64Modal, V64Button },
  data: () => ({ model: args.open }),
  template: `
    <div>
      <V64Button @click="model = true">Open</V64Button>
      <V64Modal v-bind="$props" v-model="model" @close="close">
        All progress since the last save is lost.
        <template slot="footer">
          <V64Button variant="danger" @click="model = false">Quit</V64Button>
        </template>
      </V64Modal>
    </div>
  `,
});

export const Simple = Template.bind({});
Simple.args = { open: true, title: 'Really quit?' };

export const NotDismissable = Template.bind({});
NotDismissable.args = {
  open: true,
  title: 'Formatting disk',
  closable: false,
  closeOnOverlay: false,
  closeOnEsc: false,
};
