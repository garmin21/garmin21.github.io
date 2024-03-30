---
title: Webpack4.x：配置入口(entry)
date: '2024-03-28'
categories:
  - 构建工具
tags:
  - webpack
publish: true
---

[webpack 文档](https://webpack.docschina.org/configuration/)


在 webpack 配置中，`entry` 用于指定入口文件，告诉 webpack 应该从哪个文件开始构建应用程序的依赖关系。`entry` 可以配置为一个字符串、数组或对象，具体取决于你的项目结构和需求。下面是 `entry` 的几种常见配置方式：

1. **单入口配置**：使用单个入口文件作为构建的起点。
   ```javascript
   module.exports = {
     entry: './src/index.js'
   };
   ```

2. **多入口配置（数组形式）**：如果项目有多个入口文件，可以使用数组来表示多个入口。
   ```javascript
   module.exports = {
     entry: ['./src/index1.js', './src/index2.js']
   };
   ```

3. **多入口配置（对象形式）**：使用对象来配置多个入口，这种方式适合于多页面应用或者需要动态加载模块的情况。键名为 chunk 名称，值为入口文件路径。
   ```javascript
   module.exports = {
     entry: {
       main: './src/index.js',
       app: './src/app.js'
     }
   };
   ```

在以上配置中，`entry` 用于告诉 webpack 从哪些文件开始构建应用程序的依赖关系。根据不同的配置方式，webpack 将会生成不同的 chunk，并输出对应的 bundle 文件。