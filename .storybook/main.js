module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: 'webpack4',
  },
};
