const path = require('path')
const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const defaultSettings = require('./src/config/setting.js')
const name = defaultSettings.title || '保函业务操作系统'

module.exports = {
  publicPath: process.env.ENV === 'test' ? '/oawebuat/' : '/',
  productionSourceMap: false,
  configureWebpack: {
    name: name,
    resolve: {
      extensions: ['.js', '.json', '.vue'],
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@api': path.resolve(__dirname, './src/api'),
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ]
  },
  chainWebpack(config) {
    config.plugin('html')
      .tap(args => {
        args[0].title = "保函业务操作系统";
        return args;
      })
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
