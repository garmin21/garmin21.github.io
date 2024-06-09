---
title: vue.config.js 配置说明
tags:
  - vue
createTime: 2024/03/31 20:46:37
permalink: /article/iezsvhvr/
author: 李嘉明
---

### 基本配置

1. productionSourceMap：生产环境是否要生成 sourceMap
2. publicPath：部署应用包时的基本 URL,用法和 webpack 本身的 output.publicPath 一致

   - 可以通过三元运算去配置 dev 和 prod 环境, publicPath: process.env.NODE_ENV === 'production' ? '/prod/' : './'

3. outputDir: build 时输出的文件目录
4. assetsDir: 放置静态文件夹目录
5. devServer: dev 环境下，webpack-dev-server 相关配置
   - port: 开发运行时的端口
   - host: 开发运行时域名，设置成'0.0.0.0',在同一个局域网下，如果你的项目在运行，同时可以通过你的 http://ip:port/...访问你的项目
   - https: 是否启用 https
   - open: npm run serve 时是否直接打开浏览器

### 参考一

```js
'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const CompressionPlugin = require('compression-webpack-plugin')

const name = process.env.VUE_APP_TITLE || '芋道管理系统' // 网页标题

const port = process.env.port || process.env.npm_config_port || 80 // 端口

// vue.config.js 配置说明
//官方vue.config.js 参考文档 https://cli.vuejs.org/zh/config/#css-loaderoptions
// 这里只列一部分，具体配置参考文档
module.exports = {
  // 部署生产环境和开发环境下的URL。
  // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
  // 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/。
  publicPath: process.env.PUBLIC_PATH ? process.env.PUBLIC_PATH : '/',
  // 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
  outputDir: 'dist',
  // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: 'static',
  // 是否开启eslint保存检测，有效值：ture | false | 'error'
  lintOnSave: process.env.NODE_ENV === 'development',
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  // webpack-dev-server 相关配置
  devServer: {
    host: '0.0.0.0',
    port: port,
    open: true,
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      ['/proxy-api']: {
        target: `http://localhost:48080`,
        // target: `http://api-dashboard.yudao.iocoder.cn`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: '',
        },
      },
    },
    disableHostCheck: true,
  },
  css: {
    loaderOptions: {
      sass: {
        sassOptions: { outputStyle: 'expanded' },
      },
    },
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
    plugins: [
      // http://doc.ruoyi.vip/ruoyi-vue/other/faq.html#使用gzip解压缩静态文件
      new CompressionPlugin({
        cache: false, // 不启用文件缓存
        test: /\.(js|css|html)?$/i, // 压缩文件格式
        filename: '[path].gz[query]', // 压缩后的文件名
        algorithm: 'gzip', // 使用gzip压缩
        minRatio: 0.8, // 压缩率小于1才会压缩
      }),
    ],
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/assets/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()

    config.when(process.env.NODE_ENV !== 'development', (config) => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/,
          },
        ])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial', // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      })
      config.optimization.runtimeChunk('single'),
        {
          from: path.resolve(__dirname, './public/robots.txt'), //防爬虫文件
          to: './', //到根目录下
        }
    })
  },
}
```

### 参考二

```js
const { defineConfig } = require('@vue/cli-service')
const path = require('path')

// 路径处理方法
function resolve(dir) {
  return path.join(__dirname, dir)
}

const externals = [
  {
    vue: 'Vue',
  },
  {
    'vue-router': 'VueRouter',
  },
  {
    axios: 'axios',
  },
  {
    vuetify: 'Vuetify',
  },
  {
    md5: 'MD5',
  },
  {
    qs: 'Qs',
  },
]
const cdn = {
  css: [],
  js: [
    'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js',
    'https://cdn.jsdelivr.net/npm/vue-router@3.5.1/dist/vue-router.min.js',
    'https://cdn.jsdelivr.net/npm/axios@0.27.2/dist/axios.min.js',
    'https://cdn.jsdelivr.net/npm/vuetify@2.6.0/dist/vuetify.min.js',
    'https://cdn.jsdelivr.net/npm/md5@2.3.0/dist/md5.min.js',
    'https://cdn.jsdelivr.net/npm/qs@6.11.0/dist/qs.min.js',
  ],
}

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  outputDir: 'dist',
  productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV !== 'production',
  devServer: {
    port: 8887,
    hot: true,
    compress: true, // 是否启动压缩 gzip
    proxy: {
      '/api': {
        target: 'http://www.xxxx.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "@/assets/scss/variables.scss";',
      },
    },
  },
  configureWebpack: {
    resolve: {
      extensions: ['.vue', '.js', '.json', 'scss', 'css'],
      alias: {
        '@': resolve('src'),
      },
      modules: [resolve('src'), 'node_modules'],
    },
    module: {},
    plugins: [],
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.externals(externals)
      // 通过 html-webpack-plugin 将 cdn 注入到 index.html 之中
      config.plugin('html').tap((args) => {
        args[0].cdn = cdn
        return args
      })
      config.plugin('CompressionPlugin').use('compression-webpack-plugin', [
        {
          filename: '[path][base].gz',
          algorithm: 'gzip',
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240, // 只处理比这个值大的资源。按字节计算
          minRatio: 0.8, // 只有压缩率比这个值小的资源才会被处理
        },
      ])
      config.optimization.splitChunks({
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(s?css|less|sass)$/,
            chunks: 'all',
            priority: 10,
          },
          common: {
            name: 'chunk-common',
            chunks: 'all',
            minChunks: 2, // 拆分前必须共享模块的最小 chunks 数。
            maxInitialRequests: 5, // 打包后的入口文件加载时，还能同时加载js文件的数量（包括入口文件）
            minSize: 0, // 生成 chunk 的最小体积（≈ 20kb)
            priority: 1, // 优化将优先考虑具有更高 priority（优先级）的缓存组
            reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
          },
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            priority: 2,
            reuseExistingChunk: true,
          },
        },
      })
    }
  },
})
```

### 文章

- https://juejin.cn/post/7117886188949602317#heading-10
- https://juejin.cn/post/7074280531617120270
- https://juejin.cn/post/6886698055685373965#heading-21
