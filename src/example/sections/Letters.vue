<template>
  <div>
    <V64Panel v-for="letter in letters" :key="letter.author" :title="letter.author" block>
      {{ letter.text }}
    </V64Panel>

    <V64Divider label="Schreib uns" />

    <Sheet @submit.prevent="send">
      <V64Input
        v-model="name"
        label="Name und Ort"
        placeholder="SABINE, KIEL"
        :error="errors.name"
        block
      />
      <V64Textarea
        v-model="text"
        label="Dein Leserbrief"
        :rows="5"
        :maxlength="280"
        :error="errors.text"
        hint="Wir kürzen, wenn es sein muss."
        block
      />
      <V64Checkbox v-model="newsletter" label="Schickt mir die Ausgabe per Post" />
      <Actions>
        <V64Button type="submit">Abschicken</V64Button>
        <V64Button variant="secondary" type="button" @click="reset">Verwerfen</V64Button>
      </Actions>
    </Sheet>
  </div>
</template>
<script>
import styled from 'vue-styled-components';
import {
  V64Panel, V64Divider, V64Input, V64Textarea, V64Checkbox, V64Button,
} from '../../components';
import { LETTERS } from '../data';

const Sheet = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
`;

export default {
  name: 'ExampleLetters',
  components: {
    Sheet,
    Actions,
    V64Panel,
    V64Divider,
    V64Input,
    V64Textarea,
    V64Checkbox,
    V64Button,
  },
  data() {
    return {
      letters: [...LETTERS],
      name: '',
      text: '',
      newsletter: false,
      errors: { name: '', text: '' },
    };
  },
  methods: {
    /**
     * Validates both fields at once so the reader sees everything that is
     * missing, rather than one complaint per attempt.
     */
    validate() {
      this.errors = {
        name: this.name.trim() ? '' : 'Bitte Name und Ort angeben',
        text: this.text.trim().length >= 10 ? '' : 'Mindestens 10 Zeichen',
      };
      return !this.errors.name && !this.errors.text;
    },
    send() {
      if (!this.validate()) return;
      this.letters.unshift({ author: this.name, text: this.text });
      this.reset();
      this.$emit('sent');
    },
    reset() {
      this.name = '';
      this.text = '';
      this.newsletter = false;
      this.errors = { name: '', text: '' };
    },
  },
};
</script>
