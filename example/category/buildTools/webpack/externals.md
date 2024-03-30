---
title: Webpack4.x：配置外部扩展(externals)
date: '2024-03-29'
categories:
  - 构建工具
tags:
  - webpack
publish: true
---

[webpack 文档](https://webpack.docschina.org/configuration/)

防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)。

例如，从 CDN 引入 jQuery，而不是把它打包：用于减少包的体积


```html
<script
  src="https://code.jquery.com/jquery-3.1.0.js"
  integrity="sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk="
  crossorigin="anonymous">
</script>

```

```js
module.exports = {
  //...
  externals: {
    jquery: 'jQuery'
  }
};
```