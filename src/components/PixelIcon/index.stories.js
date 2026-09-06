import V64PixelIcon from './index.vue';
import { V64_PALETTE } from '../../styles/theme';

export default { title: 'PixelIcon', component: V64PixelIcon };

const heart = [
  '.XX.XX.',
  'XXXXXXX',
  'XXXXXXX',
  '.XXXXX.',
  '..XXX..',
  '...X...',
];

const ship = [
  '...X...',
  '..XXX..',
  '.XXXXX.',
  'XXXXXXX',
  'X.XXX.X',
  '...X...',
];

export const Heart = () => ({
  components: { V64PixelIcon },
  data: () => ({ rows: heart, red: V64_PALETTE.lightred }),
  template: "<V64PixelIcon :rows='rows' :color='red' label='Lives' size='4em' />",
});

export const Ship = () => ({
  components: { V64PixelIcon },
  data: () => ({ rows: ship }),
  template: "<V64PixelIcon :rows='rows' size='4em' />",
});

export const Row = () => ({
  components: { V64PixelIcon },
  data: () => ({ rows: heart, red: V64_PALETTE.lightred }),
  template: `
    <div>
      <V64PixelIcon v-for="n in 3" :key="n" :rows="rows" :color="red" size="2em" />
    </div>
  `,
});
