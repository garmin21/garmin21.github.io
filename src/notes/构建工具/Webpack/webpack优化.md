---
title: webpack优化
author: 李嘉明
createTime: 2024/04/12 23:50:25
permalink: /learn-build/webpack-optimization/
---

## webpack优化

1. oneOf:[] // 使打包速度得到提升
2. cacheDirectory: true // 开启babel缓存，webpack构建打包速度(第二次)更快

```js
③ tree shaking：树摇
    功能：去除无用的(js)代码
    使用：
      1. 必须使用ES6模块化
      2. 需要将webpack环境调为生产环境（会压缩js代码，会开启tree shaking）

    package.json配置：
      写法一: sideEffects: false // 所有资源都没有副作用（所有资源都可以进行tree shaking）

      写法二: sideEffects: [ '*.css', '*.less','js'] // 样式资源有副作用（不要进行tree shaking）
```

```js
④ caching：缓存
    hash：每次webpack构建打包都会生成一个唯一的hash
      所有资源共享同一个hash
      问题：只修改js文件，会导致所有文件缓存失效

    chunkhash：每次输出的chunk生成hash
      问题：如果来源于同一个文件，hash会一样

    contenthash：每个文件会根据文件内容生成hash值（每个文件的hash都不一样）
```

```js
⑤ code splitting：代码分割
    作用：提取公共代码成单独文件
    使用：
      1. 通过多入口来分割代码
	  2. optimization.splitChunks.chunks = 'all' 能够提取公共代码成单独文件（自动）
	  3. 单入口 + import动态导入 分割代码（手动）
```

```js
⑥ lazy loading：懒加载 和 预加载
    懒加载js文件
    	使用：在满足一定的触发条件下触发	import动态导入
        不加 webpackPrefetch: true ，是懒加载。 点击按钮时，才去发送请求加载js文件
    预加载js文件
    	 加 webpackPrefetch: true， 是预加载。 等待页面其他资源加载完毕，再去偷偷加载js文件。点击按钮时，读取之前偷偷加载的缓存，直接使用
      	缺点：兼容性问题比较严重
```

```js
⑦ shimming：
    用来向外暴露全局变量，（每个模块就不用单独引入了，可以直接使用）
    优点：可以让代码更简写
    缺点：增加了额外的全局变量
    用法：const webpack = require('webpack');
	new webpack.ProvidePlugin({
      $: 'vue'
    })
```

```js
⑧ pwa:
	下载 :`npm i workbox-webpack-plugin`
	引入 : const WorkboxPlugin = require("workbox-webpack-plugin"); // pwa
	插件 : new WorkboxPlugin.GenerateSW({
      // 这些选项帮助快速启用 ServiceWorkers
      // 不允许遗留任何“旧的” ServiceWorkers
      clientsClaim: true,
      skipWaiting: true
    })
	使用 :
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(registration => {
        console.log("SW registered: ", registration);
      })
      .catch(registrationError => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
```

```js
⑨  dll:
    单独打包jquery，将来就不需要重复打包jquery了
    必须新建一个单独打包的`webpack.dll.js`的文件
    使用：new webpack.DllPlugin({
          name: '[name]',
          path: resolve(__dirname, '../dll/manifest.json')
        })
	在开发环境下使用：
	 new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, '../dll/manifest.json')
    }),
// 但是只是指定了jquery去哪里找，并没有往开发环境中添加资源,所以要使用到一个插件
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
new AddAssetHtmlPlugin({
      filepath: resolve(__dirname, '../dll/jquery.dll.js'),
      outputPath: 'js', // 文件输出路径
      publicPath: 'js', // 文件引入路径
    })
```

```js
⑩ 多线程: 缺点会有 600ms 的线程开销，要根据项目启用
	下载 : `npm i thread-loader`
	使用 : {loader:'thread-loader'} // 开启多线程
// 将来什么文件越来越大，耗费时间越来越长，就使用这项技术
```

## 性能分析插件

```js
安装 `npm i webpack-bundle-analyzer`
引入 const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
new BundleAnalyzerPlugin()
```
