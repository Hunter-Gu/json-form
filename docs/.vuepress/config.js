const $path = require('path')

const resolve = function(dir = '') {
  return $path.join(process.cwd(), dir)
}

module.exports = {
  base: "/json-form/",
  themeConfig: {
    sidebar: 'auto',
    // displayAllHeaders: true // 默认值：false
  },
  configureWebpack: (config, isServer) => {
    return {
      resolve: {
        alias: {
          '@': resolve('src'),
        }
      }
    }
  }
}
