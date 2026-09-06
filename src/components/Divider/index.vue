<template>
  <Root v-if="label" role="separator" :aria-label="label">
    <Rule aria-hidden="true">{{ line }}</Rule>
    <Inset>{{ label }}</Inset>
    <Rule aria-hidden="true">{{ line }}</Rule>
  </Root>
  <Root v-else role="separator">
    <Rule aria-hidden="true">{{ line }}</Rule>
  </Root>
</template>
<script>
import styled from 'vue-styled-components';
import { color, V64_FONT } from '../../styles/theme';

// Drawn with box characters rather than a border, so it lines up with the
// character grid the rest of the system sits on.
const GLYPHS = {
  single: '─',
  double: '═',
  dotted: '·',
};

const Root = styled.div`
  font-family: ${V64_FONT};
  display: flex;
  align-items: center;
  overflow: hidden;
  color: ${color('primary')};
  margin: 1em 0;
`;

// `min-width: 0` is what lets the rule shrink: a flex item defaults to
// `min-width: auto`, which is the width of its content -- 200 box characters
// here -- so without it the divider widens every page it sits on and
// `overflow: hidden` never gets the chance to clip.
const Rule = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  user-select: none;
`;

const Inset = styled.span`
  flex: 0 0 auto;
  margin: 0 1em;
  text-transform: uppercase;
`;

export default {
  name: 'V64Divider',
  components: {
    Root,
    Rule,
    Inset,
  },
  props: {
    /** Optional text set into the middle of the line. */
    label: {
      type: String,
      default: '',
    },
    variant: {
      type: String,
      default: 'single',
      validator: value => Object.keys(GLYPHS).includes(value),
    },
  },
  computed: {
    line() {
      // Long enough to overflow any realistic container; the flex item clips it.
      return GLYPHS[this.variant].repeat(200);
    },
  },
};
</script>
