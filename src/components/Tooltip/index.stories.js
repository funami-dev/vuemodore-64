import V64Tooltip from './index.vue';
import V64Button from '../Button/index.vue';

export default {
  title: 'Tooltip',
  component: V64Tooltip,
  argTypes: { placement: { control: { type: 'select', options: ['top', 'bottom'] } } },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64Tooltip, V64Button },
  template: `
    <div style="padding: 4em 2em;">
      <V64Tooltip v-bind="$props"><V64Button>Load</V64Button></V64Tooltip>
    </div>
  `,
});

export const Above = Template.bind({});
Above.args = { text: 'Loads from drive 8' };

export const Below = Template.bind({});
Below.args = { text: 'Lists the program', placement: 'bottom' };
