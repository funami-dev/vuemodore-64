const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.js"],
  addons: ["@storybook/addon-actions", "@storybook/addon-links"],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        "style-loader",
        "css-loader",
        {
          loader: "sass-loader",
          options: {
            sourceMap: false,
            prependData: `@import "${path.resolve(__dirname, "../")}/src/styles/_variables.scss";`,
          },
        },
      ],
      include: path.resolve(__dirname, "../"),
    });

    return config;
  },
};
