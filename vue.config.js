'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: 'MutsuLi',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    performance: {
      hints: 'warning',
      //入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 50000000,
      //生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js');
      }
    }
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [{
      rel: 'preload',
      // to ignore runtime.js
      // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
      fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
      include: 'initial'
    }])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

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

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                // elementUI: {
                //   name: 'chunk-elementUI', // split elementUI into a single package
                //   priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                //   test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                // },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  },
  devServer: {
    port: 8100,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: ""
    // port: 8100, // 当前vue项目的端口号
    // https: false,
    // hotOnly: false, // https:{type:Boolean}
    // // proxy: null, // 设置代理
    // // proxy: 'http://123.206.33.109:8081',          // 配置跨域处理,只有一个代理
    // proxy: {
    //   // // 配置多个代理
    //   // "/api": {
    //   //   //target: "http://localhost:8081",//这里改成你自己的后端api端口地址，记得每次修改，都需要重新build
    //   //   //target: "http://localhost:58427",
    //   //   //target: "http://api.douban.com",
    //   //   target: "http://47.102.128.186:9100",
    //   //   ws: true,
    //   //   changeOrigin: true,
    //   //   pathRewrite: {
    //   //     // 路径重写，
    //   //     "^/apb": "" // 替换target中的请求地址
    //   //   }
    //   // },
    //   // "/images": {
    //   //   target: "http://localhost:8081",
    //   // }
    // },
    // before: app => {},
    // disableHostCheck: true,
  },
  transpileDependencies: ['vuetify']
}
