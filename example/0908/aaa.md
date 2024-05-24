# Webpack 5.0 从零开始搭建 Vue 开发环境

## 第一步

创建 文件夹，进入该文件夹， npm init 初始化项目

老规矩，安装 webpack 五件套 `pnpm add webpack webpack-cli webpack-dev-server webpack-merge html-webpack-plugin -D`

## 创建不同的环境配置文件

`webpack.common.js` `webpack.dev.js` `webpack.prod.js` `webpack.rules.js`

webpack 文件 必有 入口 entry 出口 output 模式 mode

相应的设置 package.json script

```json
"scripts": {
  "dev:start": "webpack serve --progress --hot --config ./build/webpack.dev.js",
  "dev:build": "webpack --progress --config ./build/webpack.dev.js",
  "prod:build": "webpack --progress --config ./build/webpack.prod.js"
},
```

## 配置环境变量

安装 `npm i cross-env -D`

```json
"scripts": {
  "dev:start": "cross-env NODE_ENV=dev webpack serve --progress --hot --config ./build/webpack.dev.js",
  "dev:build": "cross-env NODE_ENV=dev webpack --progress --config ./build/webpack.dev.js",
  "prod:build": "cross-env NODE_ENV=prod webpack --progress --config ./build/webpack.prod.js"
},
```

安装 `npm i dotenv -D`

```js
const dotenv = require('dotenv')
const { DefinePlugin } = require('webpack')

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
// 正则匹配以 VUE_APP_ 开头的 变量
const prefixRE = /^VUE_APP_/
let env = {}
// 只有 NODE_ENV，BASE_URL 和以 VUE_APP_ 开头的变量将通过 webpack.DefinePlugin 静态地嵌入到客户端侧的代码中
for (const key in process.env) {
  if (key == 'NODE_ENV' || key == 'BASE_URL' || prefixRE.test(key)) {
    env[key] = JSON.stringify(process.env[key])
  }
}

// 定义全局常量
plugins: [
  new DefinePlugin({
    ...env,
  }),
]
```

这样你就可以像 vue-cli 一样，使用 文件来指定环境变量了

## 配置 devServer 热更新

```js
devServer: {
  host: 'localhost', // 指定host，，改为0.0.0.0可以被外部访问
  port: 9527, // 指定端口号
  open: false, // 服务启动后自动打开默认浏览器
  historyApiFallback: true, // 当找不到页面时，会返回index.html
  hot: true, // 启用模块热替换HMR，在修改模块时不会重新加载整个页面，只会更新改变的内容
  compress: false, // 启动GZip压缩
  proxy: [
    {
      context: ['/api'],
      target: 'http://localhost:3000',
    },
  ]
}
```

## 配置 Babel 进行语法转换

安装 `npm install @babel/core babel-loader @babel/preset-env -D` `npm i core-js`

```js
{
  test: /\.(js|jsx)$/,
  use: ['babel-loader'],
  exclude: /node_modules/, // 排除 node_modules 中的 ts 文件
},
```

新增 `babel.config.js`

```js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage', // 按需引入 polyfill
        corejs: 3,
      },
    ],
  ],
}
```

## 添加 css 和 sass 支持

`npm i style-loader css-loader sass sass-loader -D`
`npm i autoprefixer postcss-loader -D`

```js
{
    test: /\.(css|scss|sass)$/,
    use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
        'sass-loader'
    ]
}
```

目录下创建 `postcss.config.js`

PostCSS 是一个允许使用 JS 插件转换样式的工具。 这些插件可以检查（lint）你的 CSS，支持 CSS Variables 和 Mixins， 编译尚未被浏览器广泛支持的先进的 CSS 语法，内联图片，以及其它很多优秀的功能。
PostCSS 的 Autoprefixer 插件是最流行的 CSS 处理工具之一。

```js
module.exports = {
  plugins: [require('autoprefixer')],
}
```

## 处理图片,字体，音频 等静态资源

```js
{
  test: /\.(png|jpg|svg|gif)$/,
  type: 'asset',
  generator: {
    filename: 'assets/[hash:8].[name][ext]',
  },
  parser: {
    dataUrlCondition: {
      maxSize: 4 * 1024 // 4kb，设置阈值，小于这个大小的，会被处理成 base 64 的字符串，默认是8kb
    }
  }
},
{
  test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
  type: 'asset',
  parser: {
    dataUrlCondition: {
      maxSize: 10 * 1024 // 10kb  指定大小
    }
  }
},
{
  test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
  type: 'asset/resource',
  parser: {
    dataUrlCondition: {
      maxSize: 10 * 1024 // 10kb  指定大小
    }
  }
}
```

## 配置 vue2 开发 环境

指定版本号安装，不然安装到了最新版

`npm i vue-loader@15.9.8 vue-template-compiler@2.6.14 -D`
`npm i vue@2.6.14`

```js
const { VueLoaderPlugin } = require('vue-loader');

{
  test: /\.vue$/,
  loader: 'vue-loader',
}

plugins: [new VueLoaderPlugin()],
```

这样你就可以使用 vue 开发了

## 配置某些静态资源文件不经过打包

修改 webpack.prod.js

如果你希望某些静态资源不希望打包

`npm i copy-webpack-plugin -D`

```js
new CopyWebpackPlugin({
  patterns: [
    {
      from: _resolve('public/assets'), // 拷贝目录
      // to: '' to 可以不写，默认找 output 的输出路径
      globOptions: {
        // ignore: ['**/index.html'] // 配置忽略拷贝 public 下的指定文件
      },
    },
  ],
}),
```

## 提取样式文件

<!-- 修改webpack.prod.js -->

`npm i mini-css-extract-plugin -D`

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

plugins: [
  new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash:8].css', //输出的 CSS 文件的名称
    chunkFilename: 'css/[name].[contenthash:8].chunk.css', // 非入口的 css chunk 文件名称
    ignoreOrder: true, // 忽略有关顺序冲突的警告
  }),
],
```

<!-- 修改 webpack.rules.js -->

```js
const isDev = process.env.NODE_ENV === 'dev';
const styleLoader = isDev ? 'style-loader' : MiniCssExtractPlugin.loader;

{
  test: /\.(css|scss|sass)$/,
  use: [styleLoader, 'css-loader', 'postcss-loader', 'sass-loader'],
}
```

## 配置持久化缓存

修改 webpack.base.js


```js
cache: {
  // 使用持久化缓存
  type: 'filesystem', //memory:使用内容缓存 filesystem：使用文件缓存
  buildDependencies: {
    config: [__filename],  // 当构建依赖的config文件（通过 require 依赖）内容发生变化时，缓存失效
  }
},
```

## 打包工具分析
`npm install --save-dev webpack-bundle-analyzer`

## css质量检测

`npm install --save-dev stylelint stylelint-config-standard stylelint-config-prettier -D`

配置文件，

以及vscode setting 开启 styleLint 工具

## 图片压缩 `image-minimizer-webpack-plugin`

- [](https://runebook.dev/zh/docs/webpack/plugins/image-minimizer-webpack-plugin)
在npm install 后 加上 --user=root 安装下来，但是配置报错 `Expected a string, got object` 暂时无法解决

## 代码规范

使用插件 配置 vscode setting.json

eslint + prettier + styleLint

[eslint8.x文档](https://zh-hans.eslint.org/docs/latest/use/getting-started)

安装 eslint `npm i eslint@8.57.0 eslint-config-airbnb-base eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue -D`

eslint-config-airbnb-base 是 Airbnb 公司开发的一个 ESLint 配置规则集, 继承即可

eslint-config-prettier 

[prettier文档](https://prettier.io/docs/en/install#eslint-and-other-linters)
官方解释: 如果您使用 ESLint，请安装eslint-config-prettier以使 ESLint 和 Prettier 能够很好地配合。它关闭所有不必要或可能与 Prettier 冲突的 ESLint 规则。 Stylelint 有一个类似的配置：stylelint-config-prettier

eslint-plugin-prettier
[prettier文档](https://prettier.io/docs/en/integrating-with-linters#notes)
官方解释: 当 Prettier 是新的时候，这些插件特别有用。通过在 linter 中运行 Prettier


eslint-plugin-vue
[eslint-plugin-vue文档](https://eslint.vuejs.org/)
这个插件允许我们使用 ESLint 检查文件的template和，以及文件中的 Vue 代码。script .vue .js

## Git Hook 工具

1. husky 可以帮助我们在提交代码的时候，执行我们的 脚本，比如 eslint 检查 prettier styleLint 等...
2. git hooks 是本地的，不会被同步到 git 仓库里。为了保证每个人的本地仓库都能执行预设的 git hooks，于是就有了 husky


`npm i husky -D`
`npx husky init`


默认生成一个 .husky 文件夹，预设了一个 pre-commit 的钩子 里面 `npm test` 命令


eslint 等 lint 工具，会全量检查，哪怕你没有引入 没用修改，也会检查，如何只我们需要commit 的文件，

lint-staged 就诞生了

lint-staged 的作用就是： 只针对将要提交的文件进行 lint 处理

安装 `npm install --save-dev lint-staged`


配置 `.lintstagedrc` 文件 指定那些文件需要lint


```json
{
  "*.{js,vue}": ["npm run lint"], // 指定 .js 或者 .vue 文件需要 执行 npm run lint 
  "*.{html,vue,css,sass,scss,less}": ["npm run stylelint"] // 指定 css 文件等包含css,需要 执行 npm run stylelint
}
```

```json

"scripts": {
  // eslint 检查 缓存 并自动修复 src 下 .js 和 .vue 文件
  "lint": "eslint --cache --fix src/**/*.{js,vue}",
  // stylelint 检查 src 下的 所哟css 文件
  "stylelint": "stylelint src/**/*.{html,vue,css,sass,scss,less}"
}
```


## DLL

Webpack DLL（Dynamic Link Library）是一种用于优化构建性能的技术。它允许将一组稳定的第三方依赖库（如React、lodash、jQuery等）预先打包成一个或多个独立的 DLL 文件，以便在后续的构建过程中重复使用。

使用Webpack DLL有以下优势：
1. 构建速度提升：由于第三方库是预先打包成 DLL 文件，构建过程中不需要再次编译这些库，从而加快了构建速度。只有应用程序代码需要重新编译。

2. 缓存机制：DLL 文件具有稳定的内容和文件名，这使得浏览器能够更好地利用缓存。当第三方库没有发生变化时，浏览器可以直接使用缓存的 DLL 文件，无需重新下载和加载。

使用Webpack DLL的一般步骤如下：

1. 创建DLL配置：在Webpack配置中，创建一个用于打包DLL的配置文件，该配置文件仅包含第三方库的入口和输出配置。

2. 打包DLL文件：运行Webpack命令，使用DLL配置文件来打包第三方库。这将生成一个或多个DLL文件。

3. 引入DLL文件：在应用程序的Webpack配置中，通过使用Webpack的DllReferencePlugin插件，将DLL文件引入到构建过程中。

4. 构建应用程序：运行Webpack命令，构建应用程序代码，Webpack会自动使用之前打包的DLL文件，加快构建速度。

需要注意的是，如果第三方库发生了更新或变化，需要重新打包DLL文件。

通过使用Webpack DLL，可以显著减少重复编译和构建时间，提高开发过程中的性能和效率。它特别适用于大型项目和频繁构建的情况，可以有效地优化开发人员的工作流程。

## 智能感知 import 别名导入文件

本项目采用 js ，所以我们需要配置 jsconfig.json 文件

```json
{
  "compilerOptions": {
    "baseUrl": ".", // baseUrl：指定了模块解析的基本路径。在这里，. 表示基本路径为当前目录
    "paths": { // paths 相对于 baseUrl 进行解析
      "@components/*": ["src/components/*"], // @components/* 表示以 src/components/ 开头的路径可以使用 @components/ 来引用。
      "@src/*": ["src/*"],
      "@assets/*": ["src/assets/*"],
      "@utils/*": ["src/utils/*"],
      "@api/*": ["src/api/*"],
    }
  },
  "exclude": ["node_module"]
}
```

## css 原子化 nocss

`npm i unocss@0.58.0 @unocss/webpack@0.58.0 @unocss/reset @unocss/eslint-config -D`

编译缓存问题：Vue2中使用UnoCSS如果不删除cache-loader，会导致UnoCSS样式不生效

## portfinder 

webpack5配置portfinder支持端口多开

```js
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = devConfig.devServer.port;
  portfinder.getPort((err, port) => {
      if (err) {
          reject(err)
      } else {
          // publish the new Port, necessary for e2e tests
          process.env.PORT = port
          // add port to devServer config,主要是这一步更新可用的端口
          devConfig.devServer.port = port
          resolve(merge(commonConfig, devConfig))
      }
  })
})

```