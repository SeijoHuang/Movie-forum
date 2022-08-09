module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/Movie-forum/" : "/",

  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/scss/basic.scss";`,
      },
    },
  },
}
