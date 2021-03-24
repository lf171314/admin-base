const path = require('path')
const resolve = filePath => path.resolve(__dirname, filePath)
const isNotDev = process.env.NODE_ENV !== 'development'

module.exports = {
  // publicPath: isNotDev ? process.env.VUE_APP_DIR : './',
  publicPath: process.env.VUE_APP_DIR,
  outputDir: process.env.VUE_APP_DIR,
  assetsDir: 'static',
  chainWebpack(config) {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config.when(isNotDev, config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
        .plugin('preload')
        .tap(options => {
          const arg = options[0] || {}
          arg.fileBlacklist = [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/]
          return options
        })
        .end()

      config.optimization.splitChunks({
        chunks: 'all',
        minSize: 103424,
        maxSize: 357376,
        maxAsyncRequests: 6,
        automaticNameMaxLength: 15,
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          polyfill: {
            test: /[\\/]node_modules[\\/](core-js|raf|@babel|babel)[\\/]/,
            name: 'chunk-polyfill',
            priority: 2
          },
          echarts: {
            name: 'chunk-echarts',
            priority: 15,
            test: /[\\/]node_modules[\\/]_?echarts(.*)/
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          vue: {
            name: 'chunk-vue',
            test: /[\\/]node_modules[\\/]_?vue(.*)/,
            priority: 20
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
      // 固化 chunkId
      config.optimization.namedChunks(true)
    })
  },
  devServer: {
    https: false,
    proxy: {
      '/': {
        target: process.env.VUE_APP_API,
        ws: false
      }
    }
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/styles/common/_variables.scss";\n@import "@/styles/common/_mixins.scss";`
      },
      less: {
        javascriptEnabled: true
      }
    }
  },
  transpileDependencies: ['vue-echarts', 'resize-detector']
}
