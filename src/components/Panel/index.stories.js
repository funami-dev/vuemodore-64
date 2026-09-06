import V64Panel from './index.vue';
import V64Button from '../Button/index.vue';

export default { title: 'Panel', component: V64Panel };

export const Simple = () => ({
  components: { V64Panel },
  template: "<V64Panel title='Directory'>8 BLOCKS FREE</V64Panel>",
});

export const Closable = () => ({
  components: { V64Panel },
  template: "<V64Panel title='Directory' closable>8 BLOCKS FREE</V64Panel>",
});

export const WithFooter = () => ({
  components: { V64Panel, V64Button },
  template: `
    <V64Panel title="Save file">
      Overwrite GAME.PRG?
      <template slot="footer"><V64Button>Yes</V64Button></template>
    </V64Panel>
  `,
});

export const WithoutTitle = () => ({
  components: { V64Panel },
  template: '<V64Panel>Just a box</V64Panel>',
});
