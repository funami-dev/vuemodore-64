import V64Tabs from './index.vue';

export default { title: 'Tabs', component: V64Tabs };

export const Simple = () => ({
  components: { V64Tabs },
  data: () => ({ open: 'Basic', tabs: ['Basic', 'Assembly', 'Sprites'] }),
  template: `
    <V64Tabs v-model="open" :tabs="tabs" label="Manual">
      <template slot="Basic">10 PRINT "HELLO"</template>
      <template slot="Assembly">LDA #$01</template>
      <template slot="Sprites">POKE 2040,13</template>
    </V64Tabs>
  `,
});

export const WithDisabledTab = () => ({
  components: { V64Tabs },
  data: () => ({
    open: 'Basic',
    tabs: ['Basic', { value: 'sid', label: 'SID', disabled: true }, 'Sprites'],
  }),
  template: "<V64Tabs v-model='open' :tabs='tabs' label='Manual' />",
});
