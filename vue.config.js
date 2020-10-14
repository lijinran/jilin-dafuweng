const Dotenv = require('dotenv-webpack');

// Vue.config.js 配置选项
module.exports = {
    //  构建时的输出目录
    outputDir: `${process.env.VUE_APP_OUTPUT_DIR}`,
    //  基本路径
    publicPath: `${process.env.VUE_APP_PUBLIC_PATH}`,
    //  html 的输出路径
    indexPath: "index.html",
    devServer: {
      disableHostCheck: true,
      host: "0.0.0.0",
      port: '9527',
    },
    configureWebpack: {
      plugins: [
        new Dotenv()
      ]
    },
    chainWebpack: config => {
      config.plugin('html')
        .tap(args => {
          args[0].title= `${process.env.VUE_APP_TITLE}`
          return args
        })
      const oneOfsMap = config.module.rule('scss').oneOfs.store
      oneOfsMap.forEach(item => {
        item
          .use('sass-resources-loader')
          .loader('sass-resources-loader')
          .options({
            resources: ['./src/assets/scss/common.scss']
          })
          .end()
      })
    }
}