<template>
  <ThemeProvider :theme="theme">
    <V64App>
      <Outer>
        <Inner>
          <V64Head v-if="showHeader" />
          <V64Text v-if="showReady">READY</V64Text>
          <V64Text v-if="showCursor"><Blink>▋</Blink></V64Text>
        </Inner>
      </Outer>
    </V64App>
  </ThemeProvider>
</template>
<script>
import styled, { ThemeProvider } from 'vue-styled-components';
import V64Head from './header.vue';

const V64_THEME = {
  primary: 'rgb(168, 159, 253)',
  secondary: 'rgb(78, 47, 225)',
  green: 'rgb(0, 204, 85)',
  lightgrey: 'rgb(187, 187, 187)',
  grey: 'rgb(119, 119, 119)',
};

const V64Text = styled.pre`
  margin: 16px 0;
  color: ${props => props.speed};
`;

const V64App = styled.div`
  height: 100%;
  font-family: 'C64 PRO MONO', 'C64 PRO', 'Courier New', 'Lucida Console', Courier, MENLO, MONACO,
    monospace;
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
  background: $secondary;
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
    theme: {
      type: Object,
      // default: props => props.theme,
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
