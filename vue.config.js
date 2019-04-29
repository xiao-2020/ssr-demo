const path = require('path')
const webpack = require('webpack')
const resolve = dir => path.posix.join(__dirname, dir)
console.log(process.env.VUE_APP_UA)
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  productionSourceMap: false,
  assetsDir: 'static',


  devServer: {
    open: true
  },
  configureWebpack(config) {
    if(process.env.VUE_APP_UA === 'client') {
      config.entry.app = ['babel-polyfill', './src/client.js']
      config.plugins.push(new VueSSRClientPlugin())
    } else if (process.env.VUE_APP_UA === 'server') {
      config.entry.app = ['babel-polyfill', './src/server.js']
      config.target = 'node'
      config.devtool = 'source-map'
      config.output.libraryTarget = 'commonjs2'
      config.plugins.push(new VueSSRServerPlugin())
      config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
        name: "manifest",
        minChunks: Infinity
      }))
      // https://webpack.js.org/configuration/externals/#function
      // https://github.com/liady/webpack-node-externals
      // 外置化应用程序依赖模块。可以使服务器构建速度更快，
      // 并生成较小的 bundle 文件。
      config.externals = nodeExternals({
        // 不要外置化 webpack 需要处理的依赖模块。
        // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
        // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
        whitelist: [/\.css$/, /\.vue$/, /\.styl$/]
      })
    }
  },
  chainWebpack: config => {
    // alias
    config.resolve.alias.set('@', resolve('src'))
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options =>
        Object.assign(options, {
          transformAssetUrls: {
            video: ['src', 'poster'],
            source: 'src',
            img: 'src',
            image: 'xlink:href',
          },
        }),
      )
    //为了补删除换行而加的配置
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
  },
}