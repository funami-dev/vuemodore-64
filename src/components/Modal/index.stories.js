import V64Modal from './index.vue';
import V64Button from '../Button/index.vue';

export default { title: 'Modal', component: V64Modal };

export const Simple = () => ({
  components: { V64Modal, V64Button },
  data: () => ({ open: true }),
  template: `
    <div>
      <V64Button @click="open = true">Open</V64Button>
      <V64Modal v-model="open" title="Really quit?">
        All progress since the last save is lost.
        <template slot="footer"><V64Button variant="danger" @click="open = false">Quit</V64Button></template>
      </V64Modal>
    </div>
  `,
});
