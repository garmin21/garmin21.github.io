---
title: 搭建vue2项目环境
author: 李嘉明
createTime: 2024/09/08 01:13:24
permalink: /learn-build/1fg5w4pc/
---

记录使用 vue-cli5 搭建 vue2 开发环境。

## 创建 vue2 项目

```sh
# 创建 项目命令
vue create my-app
```

相信这里大部分同学都知道

## 配置 ESlint + prettier

ESLint 是一个集代码审查和修复的工具，它的核心功能是通过配置一个个规则来限制代码的合法性和风格
prettier 是 代码美化工具

首先项目会自动安装 这两个包，如果没有就手动安装下

```sh
npm i eslint

npm i prettier
```

```json
"eslint": "^7.32.0",
// 用于关闭与 Prettier 冲突的 ESLint 规则，以便让 ESLint 和 Prettier 可以更好地协同工作。
"eslint-config-prettier": "^8.3.0",
// 它允许将 Prettier 的格式化规则作为 ESLint 规则执行。
// 这意味着你可以在运行 ESLint 时同时检查代码风格和格式化问题，从而确保代码的一致性和质量
"eslint-plugin-prettier": "^4.0.0",
// vue.js 的官方 ESLint 插件。
// 这个插件允许我们用 ESLint 检查文件的·`<template>`和，以及文件中的 Vue 代码。
"eslint-plugin-vue": "^8.0.3",

```

到现在已经安装了所需要的插件，开始配置文件

由于我们使用的是 vue-cli 创建的项目，`package.json` 的 type 是没有的，其默认 `commonjs` 规范

1. 创建 `.eslintrc.js`

```js
// ESlint 检查配置
module.exports = {
  // 设置根
  root: true,
  parserOptions: {
    // 默认解析器
    parser: '@babel/eslint-parser',
  },
  env: {
    // 环境
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    // vue2 的基本配置，可以在node_modules 中找到这个文件
    'plugin:vue/essential',
    // eslint 基本配置，可以在node_modules 中找到这个文件
    'eslint:recommended',
    // 结合了 ESLint 与 Prettier 的功能，使得 ESLint 能够运行 Prettier 的规则，确保代码风格的一致性
    'plugin:prettier/recommended',
  ],
  /**
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    // 控制在生产环境下是否允许使用 console，生产环境下输出警告，其他情况下关闭
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 控制在生产环境下是否允许使用 debugger，生产环境下输出警告，其他情况下关闭
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    camelcase: 0, // 关闭 用于强制对象属性和变量名使用骆驼拼写法
    'comma-dangle': [2, 'only-multiline'], // 用于控制对象字面量中尾随逗号的使用
    'no-useless-escape': 0, // 用于检测 JavaScript 字符串中不必要的转义字符
    quotes: [1, 'single'], // 强制使用单引号
    'no-irregular-whitespace': 2, // 禁止使用不规则的空白符
    'no-multiple-empty-lines': 0, // 关闭 限制空行
    'use-isnan': 2, // 使用 isNaN() 函数进行 NaN 判断
    'vars-on-top': 2, // 声明的变量要放在函数顶部
    'semi-spacing': [2, { before: false, after: true }], // 分号前后空格
    'no-multi-spaces': 1, // 禁止多余的空格
    'no-trailing-spaces': 2, // 禁止行尾空格
    'comma-spacing': 2, // 逗号前后的空格
    'no-unused-vars': 'warn', // 用于检测未使用的变量（未被引用或赋值）
    'no-tabs': 'off', // 检测代码中是否使用制表符（tab字符）
    'no-unreachable': 'off', // 用于检测代码中的不可到达的代码
    eqeqeq: 'off', // 关闭 用于强制执行使用严格相等运算符（=== 和 !==）
    indent: 'off', // 关闭 代码的缩进风格，包括缩进的空格数或使用制表符
    'no-extend-native': 2, // 用于防止修改内建对象的原型（Prototype）
    'no-return-assign': 0, // 用于在箭头函数和普通函数中防止在返回语句中进行赋值操作
    'object-curly-spacing': 0, // 用于强制对象字面量中花括号内的空格使用一致的风格
    'space-before-function-paren': [0, 'always'], // 用于强制函数括号前是否需要加空格
    'max-lines': ['warn', { max: 800 }], // 控制文件代码的最大行数
    'vue/no-use-v-if-with-v-for': 2, // 用于禁止在同一个元素上同时使用 v-if 和 v-for 指令
    'vue/no-empty-component-block': 2, // 用于禁止在 Vue 单文件组件中定义空的组件
    'vue/order-in-components': 2, // 用于强制组件中属性的顺序。
    'vue/prop-name-casing': 2, // 用于强制 Vue 组件中的 prop 命名风格
    'vue/require-default-prop': 2, // 用于强制 props 默认值
    'vue/require-prop-types': 2, // 用于要求在 Vue 组件中定义 prop 类型。
    'vue/require-v-for-key': 2, // 用于要求在 Vue.js 中的 v-for 指令中添加 key 属性
    'vue/valid-v-bind': 2, // 验证 v-bind 指令的合法性。
    'vue/multi-word-component-names': 0, // 强制执行在 Vue.js 组件name命名规则
  },
};
```

创建 `.eslintignore` 忽略 eslint 的检查范围

```txt
# 忽略build目录下类型为js的文件的语法检查
build/*.js
# 忽略src/assets目录下文件的语法检查
# src/assets
# 忽略public目录下文件的语法检查
public
# 忽略当前目录下为js的文件的语法检查
*.js
# 忽略当前目录下为vue的文件的语法检查
*.vue
*.sh
*.md
*.scss
*.woff
*.ttf
node_modules
.vscode


```

2. 创建 `.prettierrc.js`

```js
// @see: https://www.prettier.cn

module.exports = {
  // 指定最大换行长度
  printWidth: 130,
  // 缩进制表符宽度 | 空格数
  tabWidth: 2,
  // 使用制表符而不是空格缩进行 (true：制表符，false：空格)
  useTabs: true,
  // 结尾不用分号 (true：有，false：没有)
  semi: false,
  // 使用单引号 (true：单引号，false：双引号)
  singleQuote: true,
  // 在对象字面量中决定是否将属性名用引号括起来 可选值 "<as-needed|consistent|preserve>"
  quoteProps: 'as-needed',
  // 在JSX中使用单引号而不是双引号 (true：单引号，false：双引号)
  jsxSingleQuote: true,
  // 多行时尽可能打印尾随逗号 可选值"<none|es5|all>"
  trailingComma: 'none',
  // 在对象，数组括号与文字之间加空格 "{ foo: bar }" (true：有，false：没有)
  bracketSpacing: true,
  // 将 > 多行元素放在最后一行的末尾，而不是单独放在下一行 (true：放末尾，false：单独一行)
  bracketSameLine: false,
  // (x) => {} 箭头函数参数只有一个时是否要有小括号 (avoid：省略括号，always：不省略括号)
  arrowParens: 'avoid',
  // 指定要使用的解析器，不需要写文件开头的 @prettier
  requirePragma: false,
  // 可以在文件顶部插入一个特殊标记，指定该文件已使用 Prettier 格式化
  insertPragma: false,
  // 用于控制文本是否应该被换行以及如何进行换行
  proseWrap: 'preserve',
  // 在html中空格是否是敏感的 "css" - 遵守 CSS 显示属性的默认值， "strict" - 空格被认为是敏感的 ，"ignore" - 空格被认为是不敏感的
  htmlWhitespaceSensitivity: 'css',
  // 控制在 Vue 单文件组件中 <script> 和 <style> 标签内的代码缩进方式
  vueIndentScriptAndStyle: false,
  // 换行符使用 lf 结尾是 可选值 "<auto|lf|crlf|cr>"
  endOfLine: 'auto',
  // 这两个选项可用于格式化以给定字符偏移量（分别包括和不包括）开始和结束的代码 (rangeStart：开始，rangeEnd：结束)
  rangeStart: 0,
  rangeEnd: Infinity,
};
```

创建 `.prettierignore` 忽略 prettier 的检查范围

```text
/dist/*
.local
/node_modules/**

**/*.svg
**/*.sh

/public/*
stats.html
*.md
*.scss
*.woff
*.ttf
index.html

```

最后一步，我们需要 开启 这个插件 扩展的检查功能, 配置 vscode 配置文件

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  //   开始eslint 检查
  "eslint.enable": true,
  "eslint.format.enable": true,
  "eslint.codeAction.showDocumentation": {
    "enable": true
  },
  // 保存自动修复
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit",
    "source.fixAll.eslint": "explicit",
    "source.fixAll.stylelint": "explicit"
  },
  "eslint.lintTask.enable": true,
  "eslint.workingDirectories": [
    {
      "mode": "auto"
    }
  ],
  //eslint 检查文件集合
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "html",
    "vue",
    "typescript",
    "typescriptreact",
    "markdown"
  ],

  "stylelint.enable": true,
  // 关闭编辑器内置样式检查（避免与stylelint冲突）
  "css.validate": false,
  "less.validate": false,
  "scss.validate": false,
  "stylelint.validate": ["css", "less", "postcss", "scss", "sass", "vue"]
}
```

## 配置 stylelint

Stylelint 是一个强大、先进的 CSS 代码检查器（linter），可以帮助你规避 CSS 代码中的错误并保持一致的编码风格。

**css 样式的书写顺序及原理——很重要！很重要！很重要！ 浏览器的渲染原理：reflow 和 repaint**

```sh
npm i stylelint@14.16.1
```

安装 14.16.1 版本，高的版本会和插件引起冲突，无法安装

```json
"stylelint": "14.16.1",
"stylelint-config-html": "1.1.0",
"stylelint-config-prettier": "9.0.5",
"stylelint-config-recess-order": "3.1.0",
"stylelint-config-recommended-scss": "8.0.0",
"stylelint-config-recommended-vue": "1.5.0",
"stylelint-config-standard": "28.0.0",
"stylelint-config-standard-scss": "6.1.0",
```

1. 创建 `.stylelintrc.cjs`

```js
// @see: https://stylelint.io

module.exports = {
  root: true,
  // 继承某些已有的规则
  extends: [
    'stylelint-config-standard', // 配置 stylelint 拓展插件
    'stylelint-config-html/vue', // 配置 vue 中 template 样式格式化
    'stylelint-config-standard-scss', // 配置 stylelint scss 插件
    'stylelint-config-recommended-vue/scss', // 配置 vue 中 scss 样式格式化
    'stylelint-config-recess-order', // 配置 stylelint css 属性书写顺序插件,
    'stylelint-config-prettier', // 配置 stylelint 和 prettier 兼容
  ],
  overrides: [
    // 扫描 .vue/html 文件中的 <style> 标签内的样式
    {
      files: ['**/*.{vue,html}'],
      customSyntax: 'postcss-html',
    },
  ],
  rules: {
    'function-url-quotes': 'always', // URL 的引号 "always(必须加上引号)"|"never(没有引号)"
    'string-quotes': 'double', // 指定字符串使用单引号或双引号 "single(单引号)"|"double(双引号)"
    'unit-case': 'lower', // 指定单位的大小写 "lower(全小写)"|"upper(全大写)"
    'color-hex-case': 'lower', // 指定 16 进制颜色的大小写 "lower(全小写)"|"upper(全大写)"
    'color-hex-length': 'long', // 指定 16 进制颜色的简写或扩写 "short(16进制简写)"|"long(16进制扩写)"
    'rule-empty-line-before': 'never', // 要求或禁止在规则之前的空行 "always(规则之前必须始终有一个空行)"|"never(规则前绝不能有空行)"|"always-multi-line(多行规则之前必须始终有一个空行)"|"never-multi-line(多行规则之前绝不能有空行)"
    'block-opening-brace-space-before': 'always', // 要求在块的开大括号之前必须有一个空格或不能有空白符 "always(大括号前必须始终有一个空格)"|"never(左大括号之前绝不能有空格)"|"always-single-line(在单行块中的左大括号之前必须始终有一个空格)"|"never-single-line(在单行块中的左大括号之前绝不能有空格)"|"always-multi-line(在多行块中，左大括号之前必须始终有一个空格)"|"never-multi-line(多行块中的左大括号之前绝不能有空格)"
    'font-family-no-missing-generic-family-keyword': null, // 禁止在字体族名称列表中缺少通用字体族关键字
    'scss/at-import-partial-extension': null, // 解决不能使用 @import 引入 scss 文件
    'property-no-unknown': null, // 禁止未知的属性
    'no-empty-source': null, // 禁止空源码
    'selector-class-pattern': null, // 强制选择器类名的格式
    'value-no-vendor-prefix': null, // 关闭 vendor-prefix (为了解决多行省略 -webkit-box)
    'no-descending-specificity': null, // 不允许较低特异性的选择器出现在覆盖较高特异性的选择器
    'value-keyword-case': null, // 解决在 scss 中使用 v-bind 大写单词报错
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'v-deep', 'deep'],
      },
    ],
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
};
```

往 package.json 写入一条命令 `"lint:style": "stylelint src/**/*.{css,scss,vue} --cache --fix"`

创建 `.stylelintignore` 忽略 stylelint 的检查范围

```text
/node_modules/*
/dist/*
/html/*
/public/*
*.md
*.js
```

由于 配置 stylelint 时，用到的 postcss 和 sass 工具 ，所以需要安装下

```json
"postcss": "^8.4.45",
"postcss-html": "^1.7.0",
"sass": "^1.77.8",
"sass-loader": "^16.0.1",
```

## 配置 postcss

PostCSS 是一个用 JavaScript 工具和插件转换 CSS 代码的工具。
PostCSS 并不是一门语言，而是一个类似于 webpack 的工具，它支持很多插件，来达到便捷的编译效果，组成一个 CSS 编译/lint/autoprefixer 的生态圈。

配置 `postcss.config.cjs`

```js
module.exports = {
  plugins: {
    autoprefixer: {},
  },
};
```

安装 autoprefixer 工具，自动加入 前缀

```sh
npm i autoprefixer
```

## 其他内容

1. 创建 `..editorconfig`

```text
root = true

# 匹配全部文件
[*]
# 设置字符集
charset = utf-8
# 缩进风格，可选space、tab
indent_style = space
# 缩进的空格数
indent_size = 2
# 结尾换行符，可选lf、cr、crlf
end_of_line = lf
# 在文件结尾插入新行
insert_final_newline = true
# 删除一行中的前后空格
trim_trailing_whitespace = true

# 匹配md结尾的文件
[*.md]
insert_final_newline = false
trim_trailing_whitespace = false
```

2. 创建 环境 `.env.development` 和 `.env.production`

```sh
VUE_APP_ENV='dev'

VUE_APP_BASE_API= ""

VUE_APP_SYS_TITLE='系统管理'
VUE_APP_API_BASE_URL=/api

```

3. 创建 `.gitignore`

```text
.DS_Store
node_modules
/dist


# local env files
.env.local
.env.*.local

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Editor directories and files
.idea
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

4. 创建 `.npmrc`

设置淘宝镜像

```text
registry=https://registry.npmmirror.com
```

5. 安装 `@babel/plugin-proposal-optional-chaining`

安装 `@babel/plugin-proposal-optional-chaining` 用于支持 可选链，配置 babel

```js
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: ['@babel/plugin-proposal-optional-chaining'],
};
```

## vue.config.js 配置 开发与生产环境配置

```js
const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');
const path = require('path');
const { name } = require('./package.json');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';
const productionGzipExtensions = ['js', 'css'];

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: isProduction ? '/name/' : '/',
  lintOnSave: true,
  outputDir: '../dist',
  assetsDir: 'static',
  runtimeCompiler: true,
  chainWebpack: (config) => {
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
    config.module
      .rule('svg')
      .exclude.add(path.resolve('src/assets/icons'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(path.resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();

    config.when(isProduction, (config) => {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          // cacheGroups 下可以可以配置多个组，每个组根据test设置条件，符合test条件的模块
          commons: {
            name: 'chunk-commons',
            test: path.resolve(__dirname, './src/components'),
            minChunks: 3, //  被至少用三次以上打包分离
            priority: 5, // 优先级
            reuseExistingChunk: true, // 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
          },
          node_vendors: {
            name: 'chunk-libs',
            chunks: 'initial', // 只打包初始时依赖的第三方
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
          },
          ElementUI: {
            name: 'chunk-elementUI', // 单独将 elementUI 拆包
            priority: 20, // 数字大权重到，满足多个 cacheGroups 的条件时候分到权重高的
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
          },
        },
      });
      config.optimization.runtimeChunk('single');
    });
  },
  configureWebpack: {
    name: '常规vue2模板',
    performance: {
      maxEntrypointSize: 5000000,
      maxAssetSize: 3000000,
    },
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js',
      },
    },
    plugins: isProduction
      ? [
          new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
          // 使用gzip打包
          new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
              '\\.(' + productionGzipExtensions.join('|') + ')$'
            ),
            threshold: 10240,
            minRatio: 0.8,
          }),
        ]
      : [],
    output: {
      library: `${name}`,
      libraryTarget: 'umd',
      chunkLoadingGlobal: `webpackJsonp_${name}`,
      filename: '[name].[hash].js',
      chunkFilename: '[name].[hash].js',
    },
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    client: {
      overlay: {
        //  当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
        warnings: true,
        errors: true,
      },
    },
    host: '0.0.0.0',
    port: 9090,
    open: false,
    proxy: {
      //   "^/v2api": {
      //     target: process.env.VUE_APP_BASE_API, // 开发环境
      //     changeOrigin: true,
      //     pathRewrite: {
      //       "^/v2api": "",
      //     },
      //   },
    },
    allowedHosts: 'all',
  },
  css: {
    loaderOptions: {
      sass: {
				// sass 引入全局公用 mixin 变量等
        additionalData(content, loaderContext) {
          const { resourcePath, rootContext } = loaderContext;
          const relativePath = path.relative(rootContext, resourcePath);
          if (
            relativePath.replace(/\\/g, '/') !== 'src/assets/scss/global.scss'
          ) {
            return `@import "@/assets/scss/global.scss";${content}`;
          }
          return content;
        },
      },
    },
  },
});
```
