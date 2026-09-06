<template>
  <div>
    <Question>{{ poll.question }}</Question>

    <V64Alert v-if="closed" variant="warning" block>
      Diese Umfrage gehört zu einer Archivausgabe und ist geschlossen.
    </V64Alert>

    <template v-if="!voted">
      <V64RadioGroup v-model="choice" :options="poll.options" label="Deine Stimme" />
      <Actions>
        <V64Button :disabled="!choice || closed" @click="vote">Abstimmen</V64Button>
        <V64Button variant="secondary" @click="voted = true">Ergebnis ansehen</V64Button>
      </Actions>
    </template>

    <template v-else>
      <V64Alert v-if="choice" variant="success" block>
        Danke — deine Stimme für {{ choice }} ist gezählt.
      </V64Alert>
      <Results>
        <Result v-for="option in poll.options" :key="option">
          <V64ProgressBar
            :value="share(option)"
            :label="option"
            :cells="18"
            show-value
            block
          />
        </Result>
      </Results>
      <Total>{{ total }} Stimmen insgesamt</Total>
    </template>
  </div>
</template>
<script>
import styled from 'vue-styled-components';
import {
  V64Alert, V64RadioGroup, V64Button, V64ProgressBar,
} from '../../components';
import { POLL } from '../data';
import { color } from '../../styles/theme';

const Question = styled.h3`
  margin: 0 0 1em;
  font-weight: normal;
  text-transform: uppercase;
  color: ${color('primary')};
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  margin-top: 1em;
`;

const Results = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75em;
  margin-top: 1em;
`;

const Result = styled.div`
  width: 100%;
`;

const Total = styled.div`
  margin-top: 1em;
  text-transform: uppercase;
  color: ${color('grey')};
`;

export default {
  name: 'ExamplePoll',
  components: {
    Question,
    Actions,
    Results,
    Result,
    Total,
    V64Alert,
    V64RadioGroup,
    V64Button,
    V64ProgressBar,
  },
  props: {
    closed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      poll: POLL,
      tally: { ...POLL.votes },
      choice: null,
      voted: false,
    };
  },
  computed: {
    total() {
      return Object.values(this.tally).reduce((sum, votes) => sum + votes, 0);
    },
  },
  methods: {
    share(option) {
      if (!this.total) return 0;
      return Math.round((this.tally[option] / this.total) * 100);
    },
    vote() {
      if (!this.choice || this.closed) return;
      this.tally = { ...this.tally, [this.choice]: this.tally[this.choice] + 1 };
      this.voted = true;
      this.$emit('voted', this.choice);
    },
  },
};
</script>
