> 项目的版本是基于`@vue/cli 5.0.4`和`webpack@5.73.0`

`vue-cli`5版本已经内置了`webpack5`，且很多配置都内置化了，换言之，基础打包无需在`vue.config.js`中配置了，大大简化了配置过程。因为主要是针对项目的优化，所以创建的过程会简略，下面是优化的具体详情。

### 项目初始化

*   安装 vue-cli
    
    npm install -g @vue/cli
    
*   创建项目  
    使用`vue create xx`创建项目，根据自己的项目自行选择即可；初始化项目完毕后，可看到项目的目录结构中已经存在`vue.config.js`文件了。
    
    ### publicPath
    
    配置打包后的路径，需要注意的一点是当路由是`history`模式时，路径需要设置为绝对路径，即`/`而不是`./`。同时 nginx 需要配置`try_files $uri $uri/ /index.html;`
    
    module.exports = defineConfig({
    publicPath: process.env.NODE\_ENV === 'production' ? '/' : '/',
    })
    
    ### outputDir
    
    配置打包文件的存放目录。
    
    module.exports = defineConfig({
    outputDir: 'dist',
    })
    
    ### productionSourceMap
    
    是否在生产环境中使用 sourcemap，用于定位到错误源码。(不建议使用，会影响打包速度，且会让人看到自己的代码)
    
    module.exports = defineConfig({
    outputDir: 'dist',
    })
    
    ### devServer
    
    配置 api 以及跨域端口等设置。
    
    module.exports = defineConfig({
    devServer: {
      port: 8887,
      hot: true,
      compress: true, // 是否启动压缩 gzip
      proxy: {
        '/api': {
          target: 'http://www.galaxychips.com',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    },
    })
    
    ### css 优化
    
    创建项目时已经选择了 sass，打包时会自动转化为基础 css，且文件会独立分离出来。所以这里我只引入了一个全局变量文件。
    
    module.exports = defineConfig({
    css: {
      loaderOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/variables.scss";'
        }
      }
    },
    })
    
    ### js 优化
    
    生产环境下内置的插件已经会处理压缩并用 babel 转化代码的操作。
    
    ### cdn 加速
    
    将公用库改为`cdn`引入方式，加快访问速度，注入html的插件无需安装，已经内置。`externals`和`cdn`常量根据自己的项目而定。（文末会贴出代码）
    
    module.exports = defineConfig({
    chainWebpack: config => {
      if (process.env.NODE\_ENV === 'production') {
        config.externals(externals)
        // 通过 html-webpack-plugin 将 cdn 注入到 index.html 之中
        config.plugin('html')
          .tap(args => {
            args\[0\].cdn = cdn
            return args
          })
      }
    }
    })
    
    public/index.html 中需要写入注入代码。
    
    <head\>
      <link rel\="stylesheet" href\="https://cdn.jsdelivr.net/npm/vuetify@2.6.0/dist/vuetify.min.css"\>
      <link rel\="stylesheet" href\="https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css"\>
      <link rel\="stylesheet" href\="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"\>
      <link rel\="stylesheet" href\="https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css"\>
    <% for (var i in htmlWebpackPlugin.options.cdn && htmlWebpackPlugin.options.cdn.css) { %>
      <link rel\="stylesheet" href\="<%= htmlWebpackPlugin.options.cdn.css\[i\] %>"\>
    <% } %>
    </head\>
    <body\>
      <!-- built files will be auto injected -->
      <% for (var i in htmlWebpackPlugin.options.cdn && htmlWebpackPlugin.options.cdn.js) { %>
        <script type\="text/javascript" src\="<%= htmlWebpackPlugin.options.cdn.js\[i\] %>"\></script\>
      <% } %>
    </body\>
    
    > 注意：我使用的 ui 框架是`vuetify`，使用 cdn 引入的话就不需要通过 import 引入样式，否则打包时会出错。
    
    ### 代码分割
    
    `lru-cache`是项目中的额外插件，提取为一个单独的 chunk。
    
    config
      .optimization.splitChunks({
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\\.(s?css|less|sass)$/,
            chunks: 'all',
            priority: 10
          },
          common: {
            name: 'chunk-common',
            chunks: 'all',
            minChunks: 2, // 拆分前必须共享模块的最小 chunks 数。
            maxInitialRequests: 5, // 打包后的入口文件加载时，还能同时加载js文件的数量（包括入口文件）
            minSize: 0, // 生成 chunk 的最小体积（≈ 20kb)
            priority: 1, // 优化将优先考虑具有更高 priority（优先级）的缓存组
            reuseExistingChunk: true // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
          },
          vendors: {
            name: 'chunk-vendors',
            test: /\[\\\\/\]node\_modules\[\\\\/\]/,
            chunks: 'all',
            priority: 2,
            reuseExistingChunk: true
          },
          lrucache: {
            name: 'chunk-lrucache',
            test: /\[\\\\/\]node\_modules\[\\\\/\]\_?lru-cache(.\*)/,
            chunks: 'all',
            priority: 3,
            reuseExistingChunk: true
          }
        }
      })
    
    ### gzip压缩
    
    运行`npm install compression-webpack-plugin -D`安装压缩插件。
    
    config.plugin('CompressionPlugin').use('compression-webpack-plugin', \[{
      filename: '\[path\]\[base\].gz',
      algorithm: 'gzip',
      test: /\\.js$|\\.css$|\\.html$/,
      threshold: 10240, // 只处理比这个值大的资源。按字节计算
      minRatio: 0.8 // 只有压缩率比这个值小的资源才会被处理
    }\])
    
    ### 整个配置详情如下
    
    const { defineConfig } = require('@vue/cli-service')
    const path = require('path')
    
    // 路径处理方法
    function resolve (dir) {
    return path.join(\_\_dirname, dir)
    }
    
    const externals = \[
    {
      vue: 'Vue'
    },
    {
      'vue-router': 'VueRouter'
    },
    {
      axios: 'axios'
    },
    {
      vuetify: 'Vuetify'
    },
    {
      md5: 'MD5'
    },
    {
      qs: 'Qs'
    }
    \]
    const cdn = {
    css: \[\],
    js: \[
      'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js',
      'https://cdn.jsdelivr.net/npm/vue-router@3.5.1/dist/vue-router.min.js',
      'https://cdn.jsdelivr.net/npm/axios@0.27.2/dist/axios.min.js',
      'https://cdn.jsdelivr.net/npm/vuetify@2.6.0/dist/vuetify.min.js',
      'https://cdn.jsdelivr.net/npm/md5@2.3.0/dist/md5.min.js',
      'https://cdn.jsdelivr.net/npm/qs@6.11.0/dist/qs.min.js'
    \]
    }
    
    module.exports = defineConfig({
    publicPath: process.env.NODE\_ENV === 'production' ? '/' : '/',
    outputDir: 'dist',
    productionSourceMap: false,
    lintOnSave: process.env.NODE\_ENV !== 'production',
    devServer: {
      port: 8887,
      hot: true,
      compress: true, // 是否启动压缩 gzip
      proxy: {
        '/api': {
          target: 'http://www.xxxx.com',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    },
    css: {
      loaderOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/variables.scss";'
        }
      }
    },
    configureWebpack: {
      resolve: {
        extensions: \['.vue', '.js', '.json', 'scss', 'css'\],
        alias: {
          '@': resolve('src')
        },
        modules: \[resolve('src'), 'node\_modules'\]
      },
      module: {
      },
      plugins: \[
      \]
    },
    chainWebpack: config => {
      if (process.env.NODE\_ENV === 'production') {
        config.externals(externals)
        // 通过 html-webpack-plugin 将 cdn 注入到 index.html 之中
        config.plugin('html')
          .tap(args => {
            args\[0\].cdn = cdn
            return args
          })
        config.plugin('CompressionPlugin').use('compression-webpack-plugin', \[{
          filename: '\[path\]\[base\].gz',
          algorithm: 'gzip',
          test: /\\.js$|\\.css$|\\.html$/,
          threshold: 10240, // 只处理比这个值大的资源。按字节计算
          minRatio: 0.8 // 只有压缩率比这个值小的资源才会被处理
        }\])
        config
          .optimization.splitChunks({
            cacheGroups: {
              styles: {
                name: 'styles',
                test: /\\.(s?css|less|sass)$/,
                chunks: 'all',
                priority: 10
              },
              common: {
                name: 'chunk-common',
                chunks: 'all',
                minChunks: 2, // 拆分前必须共享模块的最小 chunks 数。
                maxInitialRequests: 5, // 打包后的入口文件加载时，还能同时加载js文件的数量（包括入口文件）
                minSize: 0, // 生成 chunk 的最小体积（≈ 20kb)
                priority: 1, // 优化将优先考虑具有更高 priority（优先级）的缓存组
                reuseExistingChunk: true // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
              },
              vendors: {
                name: 'chunk-vendors',
                test: /\[\\\\/\]node\_modules\[\\\\/\]/,
                chunks: 'all',
                priority: 2,
                reuseExistingChunk: true
              },
              lrucache: {
                name: 'chunk-lrucache',
                test: /\[\\\\/\]node\_modules\[\\\\/\]\_?lru-cache(.\*)/,
                chunks: 'all',
                priority: 3,
                reuseExistingChunk: true
              }
            }
          })
      }
    }
    })

本文转自 <https://segmentfault.com/a/1190000042253052>，如有侵权，请联系删除。