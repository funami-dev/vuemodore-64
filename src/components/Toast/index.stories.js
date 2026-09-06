import V64Toast from './index.vue';
import V64Button from '../Button/index.vue';

export default { title: 'Toast', component: V64Toast };

export const Simple = () => ({
  components: { V64Toast, V64Button },
  data: () => ({ open: true }),
  template: `
    <div>
      <V64Button @click="open = true">Save</V64Button>
      <V64Toast v-model="open" title="Saved" :duration="0">38911 basic bytes free</V64Toast>
    </div>
  `,
});

export const AutoClosing = () => ({
  components: { V64Toast, V64Button },
  data: () => ({ open: true }),
  template: `
    <div>
      <V64Button @click="open = true">Save</V64Button>
      <V64Toast v-model="open" variant="success" title="Saved" :duration="3000">Gone in 3s</V64Toast>
    </div>
  `,
});
