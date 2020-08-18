module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: 8100,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      target: "",
    }
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
