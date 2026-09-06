<template>
  <div>
    <Topline>
      <Kicker>{{ article.kicker }}</Kicker>
      <Tags>
        <V64Badge v-for="tag in article.tags" :key="tag" :label="tag" />
        <V64Badge v-if="archived" variant="warning" label="Archiv" />
      </Tags>
    </Topline>

    <Headline>{{ article.headline }}</Headline>
    <Standfirst>{{ article.standfirst }}</Standfirst>

    <Byline>
      <span>Von der Redaktion</span>
      <V64Tooltip :text="`Etwa ${article.readingMinutes} Minuten`">
        <span>{{ article.readingMinutes }} MIN</span>
      </V64Tooltip>
      <Rating>
        <V64PixelIcon
          v-for="n in 5"
          :key="n"
          :rows="heart"
          :color="n <= rating ? red : grey"
          :label="n === 1 ? `Bewertung ${rating} von 5` : ''"
          size="1.25em"
        />
      </Rating>
    </Byline>

    <V64ProgressBar
      :value="progress"
      label="Gelesen"
      :cells="20"
      show-value
      block
    />

    <Prose>
      <V64Text v-for="(paragraph, index) in visible" :key="index">{{ paragraph }}</V64Text>
    </Prose>

    <Actions v-if="!complete">
      <V64Button @click="readMore">Weiterlesen</V64Button>
    </Actions>

    <V64Divider label="Type-In des Monats" />

    <V64Panel title="Sprite-Scroller" block :padded="false">
      <V64Terminal :lines="article.listing" :typewriter="typing" prompt="READY." block />
      <template slot="footer">
        <FooterRow>
          <V64Button variant="secondary" @click="typing = !typing">
            {{ typing ? 'Sofort anzeigen' : 'Abtippen ansehen' }}
          </V64Button>
          <V64Link href="#" target="_blank">Listing als .PRG</V64Link>
        </FooterRow>
      </template>
    </V64Panel>
  </div>
</template>
<script>
import styled from 'vue-styled-components';
import {
  V64Badge, V64Tooltip, V64PixelIcon, V64ProgressBar, V64Text, V64Button,
  V64Divider, V64Panel, V64Terminal, V64Link,
} from '../../components';
import { ARTICLE, HEART } from '../data';
import { color, V64_PALETTE } from '../../styles/theme';

const Topline = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5em;
`;

const Kicker = styled.div`
  text-transform: uppercase;
  color: ${color('green')};
`;

const Tags = styled.div`
  display: flex;
  gap: 0.5em;
`;

const Headline = styled.h2`
  margin: 0.5em 0 0;
  font-size: 1.6em;
  font-weight: normal;
  text-transform: uppercase;
  color: ${color('primary')};
`;

const Standfirst = styled.p`
  margin: 0.5em 0 1em;
  color: ${color('lightgrey')};
`;

const Byline = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1em;
  margin-bottom: 1em;
  text-transform: uppercase;
  color: ${color('grey')};
`;

const Rating = styled.div`
  display: flex;
  gap: 0.125em;
`;

const Prose = styled.div`
  color: ${color('primary')};
`;

const Actions = styled.div`
  margin: 1em 0;
`;

const FooterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1em;
`;

export default {
  name: 'ExampleFeature',
  components: {
    Topline,
    Kicker,
    Tags,
    Headline,
    Standfirst,
    Byline,
    Rating,
    Prose,
    Actions,
    FooterRow,
    V64Badge,
    V64Tooltip,
    V64PixelIcon,
    V64ProgressBar,
    V64Text,
    V64Button,
    V64Divider,
    V64Panel,
    V64Terminal,
    V64Link,
  },
  props: {
    archived: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      article: ARTICLE,
      heart: HEART,
      red: V64_PALETTE.lightred,
      grey: V64_PALETTE.grey,
      rating: 4,
      shown: 1,
      typing: true,
    };
  },
  computed: {
    visible() {
      return this.article.body.slice(0, this.shown);
    },
    complete() {
      return this.shown >= this.article.body.length;
    },
    progress() {
      return Math.round((this.shown / this.article.body.length) * 100);
    },
  },
  methods: {
    readMore() {
      this.shown += 1;
      if (this.complete) this.$emit('read', 'Titelstory');
    },
  },
};
</script>
