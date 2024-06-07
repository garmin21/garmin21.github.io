---
title: Webpack4.x：配置监听(Watch)
date: '2024-03-29'
categories:
  - 构建工具
tags:
  - webpack
publish: true
---

[webpack 文档](https://webpack.docschina.org/configuration/)


启用 Watch 模式。这意味着在初始构建之后，webpack 将继续监听任何已解析文件的更改。


```js
// webpack.config.js

module.exports = {
  //...
  watch: true
};
// webpack-dev-server 和 webpack-dev-middleware 里 Watch 模式默认开启


```