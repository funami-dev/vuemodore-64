module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/_variables.scss";`,
      },
    },
  },

  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      // mutate config for production...
    } else {
      // mutate for development...
    }
  },
};
