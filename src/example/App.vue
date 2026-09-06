<template>
  <V64Page show-header>
    <Scanlines v-if="crt" aria-hidden="true" />

    <V64Hero :title="masthead" :subtitle="`Ausgabe ${issue} — das Magazin der C64-Szene`" />
    <V64Scroller :text="ticker" :duration="tickerDuration" :paused="!ticker" />

    <Toolbar>
      <V64Breadcrumb :items="crumbs" @navigate="onCrumb" />
      <Controls>
        <V64Tooltip text="Zeilenraster wie auf einem Röhrenmonitor">
          <V64Toggle v-model="crt" label="CRT" />
        </V64Tooltip>
        <V64Slider
          v-model="tickerSpeed"
          label="Ticker"
          :min="1"
          :max="10"
          aria-label="Tickergeschwindigkeit"
        />
        <V64Select v-model="issue" label="Ausgabe" :options="issues" @change="switchIssue" />
        <V64Button @click="subscribing = true">Abonnieren</V64Button>
      </Controls>
    </Toolbar>

    <V64LoadingScreen
      v-if="loading"
      :message="`Ausgabe ${issue} wird geladen`"
      :progress="loadProgress"
    />

    <template v-else>
      <V64Alert v-if="issue !== issues[0]" variant="warning" title="Archivausgabe" block>
        Du liest eine ältere Ausgabe. Die Umfrage ist geschlossen.
        <V64Link href="#" @click="issue = issues[0]">Zur aktuellen Ausgabe</V64Link>
      </V64Alert>

      <Layout>
        <Column>
          <V64Tabs v-model="section" :tabs="sections" label="Rubriken" block>
            <template slot="Titelstory">
              <ExampleFeature :archived="archived" @read="markRead" />
            </template>
            <template slot="Charts"><ExampleCharts /></template>
            <template slot="Umfrage">
              <ExamplePoll :closed="archived" @voted="notify('Stimme gezählt', 'success')" />
            </template>
            <template slot="Leserbriefe">
              <ExampleLetters @sent="notify('Leserbrief abgeschickt', 'success')" />
            </template>
            <template slot="Werkstatt">
              <ExampleWorkshop @uploaded="notify('Listing hochgeladen', 'success')" />
            </template>
          </V64Tabs>
        </Column>

        <Rail>
          <V64Panel title="Rubriken" block :padded="false">
            <V64Menu :options="sections" label="Rubriken" block @select="section = $event" />
          </V64Panel>

          <V64Divider label="Gelesen" />
          <V64ProgressBar
            :value="readCount"
            :max="sections.length"
            :cells="14"
            label="Diese Ausgabe"
            show-value
            block
          />

          <V64Divider label="Tastatur" />
          <Shortcuts>
            <ShortcutRow v-for="row in shortcuts" :key="row.keys">
              <V64Key :label="row.keys" wide /> <span>{{ row.what }}</span>
            </ShortcutRow>
          </Shortcuts>

          <V64Divider label="Status" />
          <V64Spinner label="Neue Beiträge werden geprüft" />
        </Rail>
      </Layout>
    </template>

    <V64Divider variant="double" />
    <Colophon>
      <V64Text>RETURN TO BASIC — erscheint unregelmäßig, seit 1987.</V64Text>
      <Badges>
        <V64Link href="/">Zum Storybook</V64Link>
        <V64Badge label="Fanzine" />
        <V64Badge variant="success" :label="`${sections.length} Rubriken`" />
        <V64Badge variant="warning" label="Kein Kopierschutz" />
      </Badges>
    </Colophon>

    <V64Modal v-model="subscribing" title="Abo bestellen">
      <ExampleOrder @ordered="onOrdered" />
    </V64Modal>

    <V64Toast v-model="toast.open" :variant="toast.variant" :title="toast.title">
      {{ toast.text }}
    </V64Toast>
  </V64Page>
</template>
<script>
import styled from 'vue-styled-components';
import {
  V64Page, V64Hero, V64Scroller, V64Breadcrumb, V64Tooltip, V64Toggle, V64Slider,
  V64Select, V64Button, V64LoadingScreen, V64Alert, V64Link, V64Tabs, V64Panel,
  V64Menu, V64Divider, V64ProgressBar, V64Key, V64Spinner, V64Text, V64Badge,
  V64Modal, V64Toast,
} from '../components';
import ExampleFeature from './sections/Feature.vue';
import ExampleCharts from './sections/Charts.vue';
import ExamplePoll from './sections/Poll.vue';
import ExampleLetters from './sections/Letters.vue';
import ExampleWorkshop from './sections/Workshop.vue';
import ExampleOrder from './sections/Order.vue';
import { ISSUES, TICKER, SECTIONS } from './data';
import { color } from '../styles/theme';

// The CRT look is one repeating gradient over the whole page rather than a
// filter, so it costs nothing and never touches the components themselves.
const Scanlines = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 500;
  pointer-events: none;
  background: repeating-linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.25) 0 1px,
    transparent 1px 3px
  );
`;

const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1em;
  padding: 1em;
`;

const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 1em;
`;

const Layout = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 1em;
  padding: 0 1em;
`;

const Column = styled.div`
  flex: 3 1 22em;
  min-width: 0;
`;

const Rail = styled.div`
  flex: 1 1 14em;
  min-width: 0;
`;

const Shortcuts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

const ShortcutRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
  color: ${color('primary')};
`;

const Colophon = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1em;
  padding: 0 1em 2em;
`;

const Badges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
`;

export default {
  name: 'ExampleApp',
  components: {
    Scanlines,
    Toolbar,
    Controls,
    Layout,
    Column,
    Rail,
    Shortcuts,
    ShortcutRow,
    Colophon,
    Badges,
    V64Page,
    V64Hero,
    V64Scroller,
    V64Breadcrumb,
    V64Tooltip,
    V64Toggle,
    V64Slider,
    V64Select,
    V64Button,
    V64LoadingScreen,
    V64Alert,
    V64Link,
    V64Tabs,
    V64Panel,
    V64Menu,
    V64Divider,
    V64ProgressBar,
    V64Key,
    V64Spinner,
    V64Text,
    V64Badge,
    V64Modal,
    V64Toast,
    ExampleFeature,
    ExampleCharts,
    ExamplePoll,
    ExampleLetters,
    ExampleWorkshop,
    ExampleOrder,
  },
  data() {
    return {
      masthead: 'Return to Basic',
      issues: ISSUES,
      issue: ISSUES[0],
      ticker: TICKER,
      tickerSpeed: 5,
      sections: SECTIONS,
      section: SECTIONS[0],
      crt: false,
      subscribing: false,
      loading: false,
      loadProgress: 0,
      loadTimer: null,
      readSections: [],
      toast: {
        open: false, title: '', text: '', variant: 'info',
      },
      shortcuts: [
        { keys: 'Run/Stop', what: 'Ticker anhalten' },
        { keys: 'F1', what: 'Nächste Rubrik' },
        { keys: 'F7', what: 'Ausgabe wechseln' },
      ],
    };
  },
  computed: {
    archived() {
      return this.issue !== this.issues[0];
    },
    // The slider reads as speed, the component wants a duration, so 10 is fast.
    tickerDuration() {
      return 44 - this.tickerSpeed * 4;
    },
    crumbs() {
      return [
        { label: 'Kiosk', href: '#' },
        { label: `Ausgabe ${this.issue}`, href: '#' },
        { label: this.section },
      ];
    },
    readCount() {
      return this.readSections.length;
    },
  },
  watch: {
    section(next) {
      this.markRead(next);
    },
  },
  mounted() {
    this.markRead(this.section);
  },
  beforeDestroy() {
    this.stopLoading();
  },
  methods: {
    markRead(section) {
      const name = typeof section === 'string' ? section : this.section;
      if (!this.readSections.includes(name)) this.readSections.push(name);
    },
    onCrumb(item) {
      if (item.label === 'Kiosk') [this.section] = this.sections;
    },
    /** Fakes the wait a tape would have made you sit through. */
    switchIssue() {
      this.stopLoading();
      this.loading = true;
      this.loadProgress = 0;
      this.readSections = [];
      this.loadTimer = setInterval(() => {
        this.loadProgress += 8;
        if (this.loadProgress >= 100) {
          this.stopLoading();
          this.loading = false;
          this.markRead(this.section);
          this.notify(`Ausgabe ${this.issue} geladen`, 'success');
        }
      }, 90);
    },
    stopLoading() {
      if (this.loadTimer) clearInterval(this.loadTimer);
      this.loadTimer = null;
    },
    onOrdered(count) {
      this.subscribing = false;
      this.notify(`${count} Ausgaben bestellt`, 'success');
    },
    notify(text, variant = 'info') {
      this.toast = {
        open: true, title: 'Hinweis', text, variant,
      };
    },
  },
};
</script>
