import V64Tooltip from './index.vue';
import V64Button from '../Button/index.vue';

export default { title: 'Tooltip', component: V64Tooltip };

export const Simple = () => ({
  components: { V64Tooltip, V64Button },
  template: `
    <div style="padding: 4em 2em;">
      <V64Tooltip text="Loads from drive 8"><V64Button>Load</V64Button></V64Tooltip>
    </div>
  `,
});

export const Below = () => ({
  components: { V64Tooltip, V64Button },
  template: `
    <div style="padding: 2em;">
      <V64Tooltip text="Lists the program" placement="bottom"><V64Button>List</V64Button></V64Tooltip>
    </div>
  `,
});
