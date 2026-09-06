<template>
  <div>
    <Intro>
      Schick uns dein eigenes Listing. Wir drucken das beste in der nächsten Ausgabe.
    </Intro>

    <V64FileInput
      label="Dein Listing"
      button-text="Press play on tape"
      accept=".prg,.d64,.txt"
      :error="fileError"
      hint="PRG, D64 oder eine Textdatei"
      block
      @change="onFiles"
    />

    <V64Divider label="Wie es laufen soll" />

    <Grid>
      <V64Select v-model="device" label="Laufwerk" :options="devices" />
      <V64NumberInput v-model="drive" label="Gerätenummer" :min="8" :max="11" />
      <V64Slider v-model="speed" label="Ladegeschwindigkeit" :min="1" :max="5" show-value />
    </Grid>

    <Options>
      <V64Toggle v-model="fastload" label="Fastloader" />
      <V64Checkbox v-model="verify" label="Nach dem Schreiben prüfen" />
    </Options>

    <V64FormField label="Kurzbeschreibung" hint="Eine Zeile, wie im Heft" block>
      <input
        slot-scope="field"
        :id="field.id"
        v-model="blurb"
        :aria-describedby="field.describedBy"
      />
    </V64FormField>

    <Actions>
      <V64Button :disabled="!files.length" @click="upload">Hochladen</V64Button>
      <V64Tooltip text="Setzt alle Felder zurück">
        <V64Button variant="secondary" @click="reset">Zurücksetzen</V64Button>
      </V64Tooltip>
    </Actions>

    <V64Alert v-if="files.length" variant="info" block>
      Bereit: {{ names }} — {{ device }}, Gerät {{ drive }}, Stufe {{ speed }}.
    </V64Alert>
  </div>
</template>
<script>
import styled from 'vue-styled-components';
import {
  V64FileInput, V64Divider, V64Select, V64NumberInput, V64Slider, V64Toggle,
  V64Checkbox, V64FormField, V64Button, V64Tooltip, V64Alert,
} from '../../components';
import { color } from '../../styles/theme';

const DEVICES = ['Diskette', 'Kassette', 'Modul'];

const Intro = styled.p`
  margin: 0 0 1em;
  color: ${color('lightgrey')};
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 1em;
`;

const Options = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  margin: 1em 0;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  margin: 1em 0;
`;

export default {
  name: 'ExampleWorkshop',
  components: {
    Intro,
    Grid,
    Options,
    Actions,
    V64FileInput,
    V64Divider,
    V64Select,
    V64NumberInput,
    V64Slider,
    V64Toggle,
    V64Checkbox,
    V64FormField,
    V64Button,
    V64Tooltip,
    V64Alert,
  },
  data() {
    return {
      files: [],
      fileError: '',
      devices: DEVICES,
      device: DEVICES[0],
      drive: 8,
      speed: 3,
      fastload: true,
      verify: false,
      blurb: '',
    };
  },
  computed: {
    names() {
      return this.files.map(file => file.name).join(', ');
    },
  },
  methods: {
    onFiles(files) {
      this.files = files;
      this.fileError = files.length ? '' : 'Keine Datei gewählt';
    },
    upload() {
      if (!this.files.length) {
        this.fileError = 'Bitte erst eine Datei wählen';
        return;
      }
      this.$emit('uploaded', this.files);
      this.reset();
    },
    reset() {
      this.files = [];
      this.fileError = '';
      this.blurb = '';
      [this.device] = DEVICES;
      this.drive = 8;
      this.speed = 3;
    },
  },
};
</script>
<style scoped>
input {
  font-family: inherit;
  font-size: 1em;
  width: 100%;
  padding: 0.5em;
  border-radius: 0;
  border: 2px solid rgb(168, 159, 253);
  color: rgb(168, 159, 253);
  background: rgb(78, 47, 225);
}
</style>
