import V64Page from '../components/Page/index.vue';
import V64Hero from '../components/Hero/index.vue';
import V64Text from '../components/Text/index.vue';
import V64Button from '../components/Button/index.vue';
import V64Input from '../components/Input/index.vue';
import V64Select from '../components/Select/index.vue';
import V64Checkbox from '../components/Checkbox/index.vue';
import V64RadioGroup from '../components/Radio/group.vue';
import V64Toggle from '../components/Toggle/index.vue';
import V64Slider from '../components/Slider/index.vue';
import V64ProgressBar from '../components/ProgressBar/index.vue';

export default {
  title: 'All',
};

export const Overview = () => ({
  components: {
    V64Page,
    V64Hero,
    V64Text,
    V64Button,
    V64Input,
    V64Select,
    V64Checkbox,
    V64RadioGroup,
    V64Toggle,
    V64Slider,
    V64ProgressBar,
  },
  data: () => ({
    filename: '*',
    device: 'Disk',
    devices: ['Tape', 'Disk', 'Cartridge'],
    speed: 'Fast',
    speeds: ['Slow', 'Fast'],
    verify: true,
    sound: true,
    volume: 40,
  }),
  template: `
    <V64Page showHeader showReady>
      <V64Hero title="Vuemodore 64" subtitle="A Commodore 64 design system for Vue" />
      <V64Text>Load a program</V64Text>
      <V64Input v-model="filename" label="Filename" placeholder="ENTER NAME" block />
      <V64Select v-model="device" label="Device" :options="devices" block />
      <V64RadioGroup v-model="speed" label="Speed" :options="speeds" inline />
      <V64Checkbox v-model="verify" label="Verify after load" />
      <V64Toggle v-model="sound" label="Sound" />
      <V64Slider v-model="volume" label="Volume" show-value block />
      <V64ProgressBar :value="volume" label="Loading" show-value block />
      <V64Button>Load "*",8,1</V64Button>
      <V64Button variant="secondary">List</V64Button>
    </V64Page>
  `,
});
