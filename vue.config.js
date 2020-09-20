// // vue.config.js
// const path = require('path')

module.exports = {
  // options...
  css: {
    loaderOptions: {
      sass: {
        prependData: `
                @import "@/styles/_variables.scss";
                @import "@/styles/_mixins.scss";
                @import "@/styles/_global-styles.scss";
                `
      }
    }
  }
}
