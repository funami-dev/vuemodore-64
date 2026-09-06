import V64PixelIcon from './index.vue';
import { V64_PALETTE } from '../../styles/theme';

export default {
  title: 'PixelIcon',
  component: V64PixelIcon,
  argTypes: { color: { control: 'color' } },
};

const heart = ['.XX.XX.', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'];
const ship = ['...X...', '..XXX..', '.XXXXX.', 'XXXXXXX', 'X.XXX.X', '...X...'];

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64PixelIcon },
  template: '<V64PixelIcon v-bind="$props" />',
});

export const Heart = Template.bind({});
Heart.args = {
  rows: heart, color: V64_PALETTE.lightred, label: 'Lives', size: '4em',
};

export const Ship = Template.bind({});
Ship.args = { rows: ship, size: '4em' };

export const Row = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64PixelIcon },
  template: `
    <div>
      <V64PixelIcon v-for="n in 3" :key="n" v-bind="$props" />
    </div>
  `,
});
Row.args = { rows: heart, color: V64_PALETTE.lightred, size: '2em' };
