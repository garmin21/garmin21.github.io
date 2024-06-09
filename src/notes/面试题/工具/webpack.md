---
title: webpack
createTime: 2022/04/18 07:04:03
author: 李嘉明
permalink: /interview-question/e2tpl1sq/
---

::: tip 提问

1. 对 webpack 的了解
2. webpack 的工作原理
3. loader 和 plugin？ 有什么区别？
4. 做过哪些 webpack 优化？

:::

::: info 说明
一般来说， 面试中问及的 webpack 相关知识，如果是面向招写业务代码的，
能了解个 webpack 的原理和能做什么，就差不多够了。如果是面向招做基础设施的，
那么还需要了解 loader、 plugin 等相关内容，以及如何写一个 loader/plugin，
还有就是如何做 webpack 优化这些，但做招基础设施又不仅仅只考擦 webpack，更多还是对构建工具的整体理解。
:::

## webpack

webpack 是一个用于 现代 javascript 应用程序的静态模块打包工具。

## 工作原理

1. 读取 `webpack` 的配置参数；
2. 启动 `webpack` , 创建 `compiler` 对象，开始解析项目；
3. 从入口文件 `entry` 开始解析，并找到其导入的**依赖模块**，递归遍历分析，形成**依赖关系树**；
4. 对不同的文件类型资源的依赖模块文件，使用对应的 `Loader` 进行转换，最终转为 webpack 的有效模块；
5. 在编译过程中， `webpack` 通过 发布订阅模式，向外抛出一些 `hooks` ，`webpack` 的 `Plugin` 通过监听各个 `hooks` ，
   执行插件任务，扩展 `webpack` 的功能，干预输出结果。
6. 根据 输出配置 `output` ，将打包构建好的资源文件 输出。

## loader

将其他类型的资源文件转换为 webpack 能够处理的有效模块。

## plugin

plugin 是 webpack 的核心功能，其目的是在于解决 loader 无法解决的其他事上。

plugin 可以在 webpack 访问到 webpack 的整个生命周期，并且可以访问到 compile 对象，以及当前编译过程对象 compilation, 这使得 plugin 拥有非常强大的能力。

## loader 和 plugin 的区别

loader 仅能对其关联的模块类型进行解析转换，不能访问到 webpack 的整个生命周期

plugin 是对 webpack 的扩展，可以访问到 webpack 整个生命周期。

## webpack 优化

以下内容是针对 webpack@5 的优化方向建议：

### 构建流程分析

在进行优化前，首先要搞清楚有哪些地方出现了痛点，需要进行优化。

- 编译速度分析

  借助 `speed-measure-webpack-plugin` 插件，可以帮助我们获取插件、loader 的耗时。
  消耗时间比较长的，认为可以优化的，则放到优化计划中。

- 打包体积分析

  借助 `webpack-bundle-analyzer` 插件，可以帮助我们获取打包后生成的 bundle 的体积中，各个模块的位置、体积等信息。

### 编译速度优化

1. 配置缓存方案。

   在 webpack 的配置文件中 声明 配置： `{ cache: { type: 'filesystem } }`,来启用对模块和 chunk 的持久缓存。
   可以大幅度优化 二次启动构建速度、打包速度等。

2. 对使用的 loader，根据其作用，指定 include 或者 exclude，减少 loader 的应用范围。

3. 管理资源

   使用 webpack5 内置的 `asset/resource` 代替 `assets loader`(如， url-loader、file-loader、raw-loader)。

4. 多进程打包编译

   使用 `thread-loader`将耗时长的 loader 进行包装，放到其他的线程中进行处理。

### 打包体积优化

重复多次出现的模块，可以抽到共享 chunk 中，非首屏加载必须的模块，可以抽到异步 chunk 中。

（还有对各种资源进行压缩等）
