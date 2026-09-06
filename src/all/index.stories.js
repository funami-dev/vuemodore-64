import V64Page from '../components/Page/index.vue';
import V64Hero from '../components/Hero/index.vue';
import V64Panel from '../components/Panel/index.vue';
import V64Text from '../components/Text/index.vue';
import V64Divider from '../components/Divider/index.vue';
import V64Button from '../components/Button/index.vue';
import V64Badge from '../components/Badge/index.vue';
import V64Key from '../components/Key/index.vue';
import V64Link from '../components/Link/index.vue';
import V64Alert from '../components/Alert/index.vue';
import V64Spinner from '../components/Spinner/index.vue';
import V64Input from '../components/Input/index.vue';
import V64Textarea from '../components/Textarea/index.vue';
import V64Select from '../components/Select/index.vue';
import V64NumberInput from '../components/NumberInput/index.vue';
import V64FileInput from '../components/FileInput/index.vue';
import V64RadioGroup from '../components/Radio/group.vue';
import V64Checkbox from '../components/Checkbox/index.vue';
import V64Toggle from '../components/Toggle/index.vue';
import V64Slider from '../components/Slider/index.vue';
import V64ProgressBar from '../components/ProgressBar/index.vue';
import V64Menu from '../components/Menu/index.vue';
import V64Tabs from '../components/Tabs/index.vue';
import V64Table from '../components/Table/index.vue';
import V64Breadcrumb from '../components/Breadcrumb/index.vue';
import V64Pagination from '../components/Pagination/index.vue';
import V64Tooltip from '../components/Tooltip/index.vue';
import V64Scroller from '../components/Scroller/index.vue';
import V64PixelIcon from '../components/PixelIcon/index.vue';
import V64Terminal from '../components/Terminal/index.vue';
import { V64_PALETTE } from '../styles/theme';

export default { title: 'All' };

const components = {
  V64Page,
  V64Hero,
  V64Panel,
  V64Text,
  V64Divider,
  V64Button,
  V64Badge,
  V64Key,
  V64Link,
  V64Alert,
  V64Spinner,
  V64Input,
  V64Textarea,
  V64Select,
  V64NumberInput,
  V64FileInput,
  V64RadioGroup,
  V64Checkbox,
  V64Toggle,
  V64Slider,
  V64ProgressBar,
  V64Menu,
  V64Tabs,
  V64Table,
  V64Breadcrumb,
  V64Pagination,
  V64Tooltip,
  V64Scroller,
  V64PixelIcon,
  V64Terminal,
};

const state = () => ({
  filename: '*',
  listing: '10 PRINT "HELLO"',
  device: 'Disk',
  devices: ['Tape', 'Disk', 'Cartridge'],
  deviceNumber: 8,
  speed: 'Fast',
  speeds: ['Slow', 'Fast'],
  verify: true,
  sound: true,
  volume: 40,
  page: 2,
  tab: 'Basic',
  tabs: ['Basic', 'Assembly'],
  menu: ['Start game', 'Options', 'Quit'],
  crumbs: [{ label: 'Home', href: '#' }, { label: 'Drive 8', href: '#' }, { label: 'GAME.PRG' }],
  columns: [
    { key: 'name', label: 'Name' },
    { key: 'blocks', label: 'Blocks', align: 'right' },
  ],
  rows: [{ name: 'GAME', blocks: 122 }, { name: 'DEMO', blocks: 44 }],
  heart: ['.XX.XX.', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'],
  red: V64_PALETTE.lightred,
  terminal: ['LOAD "*",8,1', 'SEARCHING FOR *'],
  scroll: 'ALL 35 COMPONENTS ON ONE SCREEN ... ',
});

export const Overview = () => ({
  components,
  data: state,
  template: `
    <V64Page showHeader>
      <V64Hero title="Vuemodore 64" subtitle="A Commodore 64 design system for Vue" />
      <V64Scroller :text="scroll" />

      <V64Divider label="Content" />
      <V64Breadcrumb :items="crumbs" />
      <V64Text>Text keeps its whitespace, like a BASIC listing.</V64Text>
      <V64Panel title="Directory" block>
        <V64Table :columns="columns" :rows="rows" block />
      </V64Panel>
      <V64Tabs v-model="tab" :tabs="tabs" label="Manual" block>
        <template slot="Basic">10 PRINT "HELLO"</template>
        <template slot="Assembly">LDA #$01</template>
      </V64Tabs>
      <V64Terminal :lines="terminal" block />

      <V64Divider label="Actions" />
      <V64Button>Load "*",8,1</V64Button>
      <V64Button variant="secondary">List</V64Button>
      <V64Button variant="danger">Delete</V64Button>
      <V64Tooltip text="Lists the program"><V64Link href="#">Manual</V64Link></V64Tooltip>
      <V64Badge label="New" />
      <V64Key label="Run" wide />
      <V64PixelIcon :rows="heart" :color="red" label="Lives" />

      <V64Divider label="Feedback" />
      <V64Alert variant="error" title="Syntax error" block>Line 20</V64Alert>
      <V64Spinner label="Searching for tape" />
      <V64ProgressBar :value="volume" label="Loading" show-value block />

      <V64Divider label="Forms" />
      <V64Input v-model="filename" label="Filename" placeholder="ENTER NAME" block />
      <V64Textarea v-model="listing" label="Listing" :rows="3" block />
      <V64Select v-model="device" label="Device" :options="devices" block />
      <V64NumberInput v-model="deviceNumber" label="Device number" :min="8" :max="11" />
      <V64FileInput label="Program" block />
      <V64RadioGroup v-model="speed" label="Speed" :options="speeds" inline />
      <V64Checkbox v-model="verify" label="Verify after load" />
      <V64Toggle v-model="sound" label="Sound" />
      <V64Slider v-model="volume" label="Volume" show-value block />

      <V64Divider label="Navigation" />
      <V64Menu :options="menu" label="Main menu" />
      <V64Pagination v-model="page" :pages="12" />
    </V64Page>
  `,
});
