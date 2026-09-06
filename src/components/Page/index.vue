<template>
  <ThemeProvider :theme="theme">
    <V64App>
      <Outer>
        <Inner>
          <V64Head v-if="showHeader" />
          <V64Text v-if="showReady">READY</V64Text>
          <V64Text v-if="showCursor"><Blink>▋</Blink></V64Text>
          <slot></slot>
        </Inner>
      </Outer>
    </V64App>
  </ThemeProvider>
</template>
<script>
import styled, { ThemeProvider } from 'vue-styled-components';
import V64Head from './header.vue';
import V64Text from '../Text/index.vue';
import { V64_THEME, V64_FONT } from '../../styles/theme';

const V64App = styled.div`
  height: 100%;
  font-family: ${V64_FONT};
  background: ${props => props.theme.primary};
`;

const Blink = styled('span', { speed: Number })`
  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
  animation: blink ${({ speed }) => speed || 1.4}s step-start 0s infinite;
`;

const Outer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: stretch;
  align-items: center;
  background: ${props => props.theme.primary};
  height: 100%;
`;

const Inner = styled.div`
  margin: 8%;
  order: 0;
  flex: 1 1 auto;
  align-self: stretch;
  color: ${props => props.theme.primary};
  background: ${props => props.theme.secondary};
`;

export default {
  name: 'V64Page',
  components: {
    ThemeProvider,
    V64App,
    Blink,
    Outer,
    Inner,
    V64Text,
    V64Head,
  },
  props: {
    /** Overrides single colours of the design system for everything inside. */
    theme: {
      type: Object,
      default: () => V64_THEME,
    },
    showHeader: {
      type: Boolean,
    },
    showCursor: {
      type: Boolean,
    },
    showReady: {
      type: Boolean,
    },
  },
};
</script>
