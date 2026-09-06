import V64Tabs from './index.vue';

export default {
  title: 'Tabs',
  component: V64Tabs,
  argTypes: { change: { action: 'change' } },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64Tabs },
  data: () => ({ model: args.value }),
  template: `
    <V64Tabs v-bind="$props" v-model="model" @change="change">
      <template slot="Basic">10 PRINT "HELLO"</template>
      <template slot="Assembly">LDA #$01</template>
      <template slot="Sprites">POKE 2040,13</template>
    </V64Tabs>
  `,
});

export const Simple = Template.bind({});
Simple.args = { label: 'Manual', tabs: ['Basic', 'Assembly', 'Sprites'], value: 'Basic' };

export const WithDisabledTab = Template.bind({});
WithDisabledTab.args = {
  label: 'Manual',
  value: 'Basic',
  tabs: ['Basic', { value: 'sid', label: 'SID', disabled: true }, 'Sprites'],
};
