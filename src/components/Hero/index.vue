<template>
  <Root :align="align">
    <Stripes v-if="stripes" aria-hidden="true" />
    <Inner>
      <Headline v-if="title || $slots.title">
        <slot name="title">{{ title }}</slot>
      </Headline>
      <Subtitle v-if="subtitle || $slots.subtitle">
        <slot name="subtitle">{{ subtitle }}</slot>
      </Subtitle>
      <Actions v-if="$slots.default">
        <slot></slot>
      </Actions>
    </Inner>
    <Stripes v-if="stripes" aria-hidden="true" />
  </Root>
</template>
<script>
import styled from 'vue-styled-components';
import { color, V64_FONT, V64_PALETTE } from '../../styles/theme';

const ALIGNMENTS = ['left', 'center', 'right'];

const Root = styled('section', { align: String })`
  font-family: ${V64_FONT};
  color: ${color('primary')};
  background: ${color('secondary')};
  text-align: ${props => props.align};
`;

// The colour bars a C64 painted into its border while a tape was loading --
// the most recognisable thing the machine ever put on screen.
const Stripes = styled.div`
  height: 1.5em;
  background: repeating-linear-gradient(
    180deg,
    ${V64_PALETTE.lightred} 0 0.25em,
    ${V64_PALETTE.yellow} 0.25em 0.5em,
    ${V64_PALETTE.lightgreen} 0.5em 0.75em,
    ${V64_PALETTE.cyan} 0.75em 1em,
    ${V64_PALETTE.purple} 1em 1.25em,
    ${V64_PALETTE.lightblue} 1.25em 1.5em
  );
`;

const Inner = styled.div`
  padding: 3em 2em;
`;

const Headline = styled.h1`
  margin: 0;
  font-size: 2em;
  font-weight: normal;
  text-transform: uppercase;
  word-break: break-word;
`;

const Subtitle = styled.p`
  margin: 1em 0 0;
  color: ${color('lightgrey')};
`;

const Actions = styled.div`
  margin-top: 2em;

  > * {
    margin: 0 0.5em 0.5em 0;
  }
`;

export default {
  name: 'V64Hero',
  components: {
    Root,
    Stripes,
    Inner,
    Headline,
    Subtitle,
    Actions,
  },
  props: {
    /** Headline. Use the `title` slot when it needs markup. */
    title: {
      type: String,
      default: '',
    },
    /** Supporting line below the headline; also available as a slot. */
    subtitle: {
      type: String,
      default: '',
    },
    align: {
      type: String,
      default: 'center',
      validator: value => ALIGNMENTS.includes(value),
    },
    /** Frames the banner with the C64 tape loading stripes. */
    stripes: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
