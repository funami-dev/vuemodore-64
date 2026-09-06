import { V64_THEME } from '../src/styles/theme';

// Storybook's own canvas is white; the components are drawn for the C64's blue
// screen, so the preview paints that behind every story.
export const parameters = {
  backgrounds: {
    default: 'C64',
    values: [
      { name: 'C64', value: V64_THEME.secondary },
      { name: 'Border', value: V64_THEME.primary },
      { name: 'Black', value: V64_THEME.black },
    ],
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
