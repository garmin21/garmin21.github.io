---
title: vue3
author: 李嘉明
createTime: 2024/09/08 14:24:25
permalink: /learn-build/c0uo7m7w/
---

通过 <https://cn.vuejs.org/guide/scaling-up/tooling#project-scaffolding> 进行搭建项目

我们通过 `npm create vue@latest` 创建一个 vue 项目，这个命令会安装和执行 create-vue，它是 Vue 提供的官方脚手架工具。跟随命令行的提示继续操作即可。最终生成 vite 最为打包工具的项目结构

## ESlint

**项目自动安装 eslint**

> 官网规则：<https://zh-hans.eslint.org/docs/latest/rules/>

通过手脚架生成的，会带有 `.eslintrc.cjs` 的文件，默认配置以及我自己的配置内容如下：

```js
/* eslint-env node */
// 要纠正ESLint搜索插件包的方式，将这一行添加到项目的.eslintrc.js文件的顶部:
// 支持在可共享配置中将插件作为依赖项
require('@rushstack/eslint-patch/modern-module-resolution');
module.exports = {
  // 默认配置
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    // 默认配置
    'plugin:vue/vue3-essential',
    // 默认配置
    'eslint:recommended',
    // 默认配置, 内部 相当于是导入了 plugin:prettier/recommended，
    // eslint-config-prettier : 关闭所有不必要的或可能与 Prettier 冲突的 ESLint 规则
    // eslint-plugin-prettier : 将 Prettier 作为 ESLint 规则运行，并将差异报告为单独的 ESLint 问题
    '@vue/eslint-config-prettier/skip-formatting',
    // eslint-plugin-import : 支持 ES6+ 的导入/导出语法校验，它默认已经开启了一些实用的规则，也提供了许多需要手动开启或者实验性的规则。
    'plugin:import/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  // 默认配置
  parserOptions: {
    ecmaVersion: 'latest',
  },
  // 导入的相关插件
  plugins: ['import'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    camelcase: 0,
    'comma-dangle': [2, 'only-multiline'],
    'no-useless-escape': 0,
    quotes: [1, 'single'],
    'no-irregular-whitespace': 2,
    'use-isnan': 2,
    'vars-on-top': 2,
    'semi-spacing': [2, { before: false, after: true }],
    'no-multi-spaces': 1,
    'no-trailing-spaces': 2,
    'comma-spacing': 2,
    'no-unused-vars': 'warn',
    'no-tabs': 'off',
    'no-unreachable': 'off',
    indent: 'off',
    'no-extend-native': 2,
    'no-return-assign': 0,
    'object-curly-spacing': 0,
    'space-before-function-paren': [0, 'always'],
    // max-lines: 限制文件的最大行数
    'max-lines': ['error', { max: 800 }],
    'vue/no-use-v-if-with-v-for': 2,
    'vue/no-empty-component-block': 2,
    'vue/order-in-components': 2,
    'vue/prop-name-casing': 2,
    'vue/require-default-prop': 2,
    'vue/require-prop-types': 2,
    'vue/require-v-for-key': 2,
    'vue/valid-v-bind': 2,
    'vue/multi-word-component-names': 0,
    'vue/comment-directive': 0,
    // 函数
    'max-lines-per-function': ['error', { max: 80 }],
    'max-params': ['error', 3],
    'prefer-const': 'error',
    'no-const-assign': 'error',
    'no-var': 'error',
    'no-prototype-builtins': 'error',
    'array-callback-return': 'warn',
    'no-new-func': 'error',
    'no-plusplus': 'error',
    eqeqeq: 'warn',
    'no-case-declarations': 'warn',
    'no-unneeded-ternary': 'error',
    // 导入
    'import/no-unresolved': 'off',
    'import/no-mutable-exports': 'warn',
    // 'import/prefer-default-export': 'warn',
    'import/first': 'warn',
    'import/no-webpack-loader-syntax': 'error',
    'no-empty-function': ['error'],
    'no-param-reassign': ['error'],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'max-classes-per-file': ['error', 1],
    'max-nested-callbacks': ['error', { max: 2 }],
    'no-duplicate-imports': ['error'],
    // max-len: 限制每行代码的最大字符数。
    // 'max-len': ['error', { code: 130 }],
    // 函数调用间距
    'func-call-spacing': 'error',
    // 键间距
    'key-spacing': ['error', { beforeColon: false }],
    // 禁止没有必要的括号
    'no-extra-parens': 'error',
    // 块的最大深度
    'max-depth': ['error', 4],
    // 箭头函数风格
    // 'arrow-body-style': ['error', 'always'],
    // 类强制使用 this
    'class-methods-use-this': 'error',
    // 禁止不必要的嵌套块
    'no-lone-blocks': 'warn',
  },
};
```

`.eslintignore` 忽略文件

## prettier

**项目自动安装 prettier**

> prettier 官网规则： <https://www.prettier.cn/docs/options.html>


创建 `.prettierrc.cjs`配置文件，配置如下

```js
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

`.prettierignore` 忽略文件

## stylelint

配置 stylelint 的时候，我们需要手动安装一些配置。

> 官网规则：<https://www.stylelint.cn/user-guide/rules>

**经过验证，这一套配置，正常通用，版本需要需要固定安装，有些插件已经很久没有维护了**

```json
"stylelint": "^14.16.1",
"stylelint-config-html": "^1.1.0",
"stylelint-config-prettier": "^9.0.5",
"stylelint-config-recess-order": "^3.1.0",
"stylelint-config-recommended-scss": "^8.0.0",
"stylelint-config-recommended-vue": "^1.5.0",
"stylelint-config-standard": "^28.0.0",
"stylelint-config-standard-scss": "^6.1.0",
```

创建 `.stylelintrc.json`配置文件，配置如下

```json
{
  "extends": [
    "stylelint-config-standard", // 配置 stylelint 拓展插件
    "stylelint-config-html/vue", // 配置 vue 中 template 样式格式化
    "stylelint-config-standard-scss", // 配置 stylelint scss 插件
    "stylelint-config-recommended-vue/scss", // 配置 vue 中 scss 样式格式化
    "stylelint-config-recess-order", // 配置 stylelint css 属性书写顺序插件,
    "stylelint-config-prettier" // 配置 stylelint 和 prettier 兼容
  ],
  "customSyntax": "postcss-html",
  "overrides": [
    // 扫描 .vue/html 文件中的 <style> 标签内的样式
    {
      "files": ["**/*.{vue,html}"],
      "customSyntax": "postcss-html"
    }
  ],
  "ignoreFiles": [
    "**/*.js",
    "**/*.jsx",
    "**/*.tsx",
    "**/*.ts",
    "**/*.json",
    "**/*.md",
    "**/*.yaml"
  ],
  "root": true,
  "rules": {
    "function-url-quotes": "always", // URL 的引号 "always(必须加上引号)"|"never(没有引号)"
    "string-quotes": "double", // 指定字符串使用单引号或双引号 "single(单引号)"|"double(双引号)"
    "unit-case": "lower", // 指定单位的大小写 "lower(全小写)"|"upper(全大写)"
    "color-hex-case": "lower", // 指定 16 进制颜色的大小写 "lower(全小写)"|"upper(全大写)"
    "color-hex-length": "long", // 指定 16 进制颜色的简写或扩写 "short(16进制简写)"|"long(16进制扩写)"
    "rule-empty-line-before": "never", // 要求或禁止在规则之前的空行 "always(规则之前必须始终有一个空行)"|"never(规则前绝不能有空行)"|"always-multi-line(多行规则之前必须始终有一个空行)"|"never-multi-line(多行规则之前绝不能有空行)"
    "block-opening-brace-space-before": "always", // 要求在块的开大括号之前必须有一个空格或不能有空白符 "always(大括号前必须始终有一个空格)"|"never(左大括号之前绝不能有空格)"|"always-single-line(在单行块中的左大括号之前必须始终有一个空格)"|"never-single-line(在单行块中的左大括号之前绝不能有空格)"|"always-multi-line(在多行块中，左大括号之前必须始终有一个空格)"|"never-multi-line(多行块中的左大括号之前绝不能有空格)"
    "font-family-no-missing-generic-family-keyword": null, // 禁止在字体族名称列表中缺少通用字体族关键字
    "scss/at-import-partial-extension": null, // 解决不能使用 @import 引入 scss 文件
    "property-no-unknown": null, // 禁止未知的属性
    "no-empty-source": null, // 禁止空源码
    "selector-class-pattern": null, // 强制选择器类名的格式
    "value-no-vendor-prefix": null, // 关闭 vendor-prefix (为了解决多行省略 -webkit-box)
    "no-descending-specificity": null, // 不允许较低特异性的选择器出现在覆盖较高特异性的选择器
    "value-keyword-case": null, // 解决在 scss 中使用 v-bind 大写单词报错
    "selector-pseudo-class-no-unknown": [
      true,
      {
        "ignorePseudoClasses": ["global", "v-deep", "deep"]
      }
    ],
    "selector-class-pattern": null
  }
}
```

`.stylelintignore` 忽略文件

## postcss

手动安装 `postcss postcss-html autoprefixer postcss-px-conversion`

`postcss-px-conversion` 移动端 / PC 端适配解决方案

创建 `postcss.config.cjs`配置文件，配置如下:

```js
module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px-conversion': {
      // 要从哪种单位转换（默认为'px'）。
      unitType: 'px',
      // 视口的宽度。
      viewportWidth: 1920,
      // vw单位的小数位数。
      unitPrecision: 5,
      // 要转换为vw的CSS属性列表。
      allowedProperties: ['*'],
      // 要排除在转换之外的CSS属性列表。
      excludedProperties: [],
      // 期望的视口单位（vw、vh、vmin、vmax）。
      viewportUnit: 'vw',
      // 期望的字体视口单位。
      fontViewportUnit: 'vw',
      // 要忽略的选择器（字符串或正则表达式）。
      selectorBlacklist: [],
      // 要替换的最小像素值。
      minPixelValue: 1,
      // 在媒体查询中允许px到vw的转换。
      allowMediaQuery: false,
      // 替换包含vw的规则而不是添加回退规则。
      replaceRules: true,
      // 要忽略的文件（作为正则表达式数组）。
      excludeFiles: [],
      // 转换匹配的文件（作为正则表达式数组）。
      includeFiles: [],
      // 为横向模式添加@media
      enableLandscape: false,
      // 横向模式的期望单位。
      landscapeUnit: 'vw',
      // 横向方向的视口宽度。
      landscapeViewportWidth: 568,
      // 启用per-file配置（默认为true）。
      enablePerFileConfig: false,
      // 用于指定视口宽度的注释（默认为"viewport-width"）。
      viewportWidthComment: 'viewport-width',
    },
  },
};
```

## Vite 配置

```js
import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import pkg from './package.json';
// vue 运行插件
import vue from '@vitejs/plugin-vue';
// vue jsx 插件
import vueJsx from '@vitejs/plugin-vue-jsx';
import dayjs from 'dayjs';
// 自动导入，查看 element-plus 文档
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// vite 的 html 插件
import { createHtmlPlugin } from 'vite-plugin-html';
// vite 的 eslint 插件，如果有不符合的错误会直接显示到 页面中
import eslintPlugin from 'vite-plugin-eslint';
// vite 的压缩工具
import viteCompression from 'vite-plugin-compression';
// vite 的 svg 快捷使用工具
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
const { dependencies, devDependencies, name, version } = pkg;

// https://vitejs.dev/config/
const __APP_INFO__ = {
  __APP_VERSION__: JSON.stringify('v1.0.0'),
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};

const elementPlus = [
  AutoImport({
    resolvers: [ElementPlusResolver()],
  }),
  Components({
    resolvers: [ElementPlusResolver()],
  }),
];

export default defineConfig(({ command, mode }) => {
  const isBuild = command === 'build';
  const root = process.cwd();
  const env = loadEnv(mode, root);
  return {
    plugins: [
      vue({
        template: {
          // 配置vue 的编译配置选项
          compilerOptions: {
            isCustomElement: (tag) => ['micro-app'].includes(tag),
          },
        },
      }),
      vueJsx(),
      createHtmlPlugin({
        // 是否压缩
        minify: isBuild,
        inject: {
          data: {
            title: '运维门户平台',
          },
        },
      }),
      eslintPlugin({
        cache: false,
        // 排除 node_modules 检查
        exclude: ['node_modules'],
      }),
      viteCompression({
        verbose: true,
        disable: false, // 不禁用压缩
        deleteOriginFile: false, // 压缩后是否删除原文件
        threshold: 10240, // 压缩前最小文件大小
        algorithm: 'gzip', // 压缩算法
        ext: '.gz', // 文件类型
      }),
      createSvgIconsPlugin({
        // 图标路径
        iconDirs: [resolve(process.cwd(), 'src/assets/icons/svg')],
        // 命名方式
        symbolId: 'icon-[dir]-[name]',
        // 生成位置 默认 body 后
        inject: 'body-last',
        // 自定义 DOM 的 id
        customDomId: '__svg__icons__dom__',
      }),
      ...elementPlus,
    ],
    resolve: {
      // 路径别名 搭配 jsconfig.json 配置使用
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
      // 忽略扩展
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs'],
    },
    // 项目根目录（index.html 文件所在的位置）
    root,
    // 开发或生产环境服务的公共基础路径
    base: '/',
    // 定义全局常量
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
      __VUE_PROD_DEVTOOLS__: true,
      // 启用生产环境构建下激活不匹配的详细警告
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true',
    },
    // 开发服务器配置
    server: {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      // fs: {
      // 	// 限制为工作区 root 路径以外的文件的访问。
      // 	strict: true
      // },
      // 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 将监听所有地址，包括局域网和公网地址
      host: '0.0.0.0',
      port: 8100,
      open: true,
      // 跨域，允许任何源访问
      cors: true,
      https: false,
      proxy: {
        '^/api': {
          target: env.VITE_APP_BASE_API,
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      // 指定输出路径 ， 默认 dist
      outDir: 'build',
      // 指定打包器
      minify: 'terser', // esbuild打包速度最快，terser打包体积最小。
      // terser 更多打包配置 
      terserOptions: {
        compress: {
          // 定在构建时是否保持 JavaScript 中的 Infinity 值而不进行转换为字符串
          keep_infinity: true,
          // warnings: false,
          drop_console: false, //打包时删除console
          drop_debugger: true, //打包时删除 debugger
          pure_funcs: ['console.log'],
        },

        output: {
          // 去掉注释内容
          comments: true,
        },
      },
      // 压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
      brotliSize: false,
      reportCompressedSize: false, // 禁用 gzip 压缩大小报告，可略微减少打包时间
      // 规定触发警告的 chunk 大小
      chunkSizeWarningLimit: 2000,
      // 自定义底层的 Rollup 打包配置
      rollupOptions: {
        output: {
          // js最小拆包
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[1]
                .toString();
            }
          },
          // 静态资源分类和包装
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
      },
    },
    // css 配置
    css: {
      // 指定传递给 CSS 预处理器的选项
      preprocessorOptions: {
        scss: {
          // 全局导入 公共变量，mixin 等
          additionalData: '@import "@/assets/scss/global.scss";',
        },
      },
    },
  };
});
```
