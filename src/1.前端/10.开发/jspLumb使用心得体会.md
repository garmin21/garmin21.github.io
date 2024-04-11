---
title: jspLumb使用心得体会
author: 李嘉明
createTime: 2024/04/11 21:44:05
permalink: /article/eb415h24/
---

::: tip
jsPlumb 是一个比较强大的绘图组件，它提供了一种方法，主要用于连接网页上的元素。在现代浏览器中，它使用 SVG 或者 Canvas 技术，而对于 IE8 以下(含 IE8)的古董浏览器，则使用 VML 技术。

优点：

- 免费，并根据 MIT 许可证提供。可以直接从 jsPlumb github 网站下载框架， 也可以通过 npm 安装。（jsplumb 官网提供了免费和收费两个版本，但免费版已经可以满足日常的需求）

- 节点由自己进行绘制，样式自言可控，灵活度高。 想怎么画，怎么画

- 图表项目和连接的参数精细可控

本次使用的是 jsplumb 社区版 2.x 的版本

对于社区版，版本 6.x 的文档如下：

[6.x](https://docs.jsplumbtoolkit.com/community/)

对于 jsPlumb 的先前版本，文档在这里：

[5.x](https://docs.jsplumbtoolkit.com/community/5.x)

[2.x](https://docs.jsplumbtoolkit.com/community/2.x)
:::

## 了解的基本概念

- Souce 源节点
- Target 目标节点
- Anchor 锚点 锚点位于源节点或者目标节点上
- Endpoint 端点 端点位于连线上
- Connector 连接 或者也可以理解是连接线
- Overlays 可以理解为在连接线上的文字或者箭头之类的东东

## 安装 使用

::: code-tabs

@tab cmd

```bach
npm install jsPlumb --save
```

@tab main.js

```js
import jsPlumb from 'jsplumb'

Vue.prototype.$jsPlumb = jsPlumb.jsPlumb
```

:::

## 加载问题

很多人第一次使用 vue + jsPlumb，估计加载，都无法加载出来，原因 就是 你必须要等 DOM 树加载完毕，也就是 vue 可以访问到页面元素的时候。并且再数据量特别多的情况下，你可能需要使用 `setTimeout` + `this.$nextTick` 的组合，才能正确的渲染出来

::: code-tabs

@tab index.vue

```js
initPlumbIns() {
  let plumbIns
  // 前置，清除线的缓存，为接下来，绘制线做准备
  if (this.plumbIns) {
    this.plumbIns.reset()
  }
  // 等待DOM加载完毕
  this.$nextTick(() => {
    // 获取实例
    plumbIns = this.$jsPlumb.getInstance()
    this.plumbIns = plumbIns
    plumbIns.ready(() => { // jsPlumb 加载完毕
      // 设置容器
      plumbIns.setContainer('#dapan-monitoring-container')

      // [{ source: 'id', target: 'id' }]
      this.lineMaps.forEach((item) => {
        plumbIns.connect(item, defaultConfig)
      })

      // 绑定事件

      // 刷新布局
      plumbIns.repaintEverything()
    })
  })
  this.$once('hook:beforeDestroy', () => {
    plumbIns.clear()
  })
}

```

@tab config.js

```js
// 默认连线配置
export const defaultConfig = {
  anchor: ['Center'],
  connector: 'Bezier',
  endpoint: 'Blank',
  overlays: [['Arrow', { width: 8, length: 8, location: 1 }]], // overlay
  // 添加样式
  paintStyle: { stroke: '#FF5555', strokeWidth: 1 }, // connector
}
```

:::

## 连线偏移

::: tip
jsPlumb 默认使用 svg ,采用定位的方式 去进行 绘制线条，如果，在你连线的 css 布局中，你也使用的定位，就需要慎重考虑下，
你的定位，是否会影响到 jsPlumb 的绘制，最坏的结果就是，线的 位置 全部发生 偏移了。

:::

解决，只有，就是不要再 节点连线的布局里面使用 定位，而是使用其他办法加以解决，布局的问题

## 布局发生变化，如何重新绘制

布局发生变化，比如，display 或者数据减少，重新使用 jsPlumb 绘制线条，先 reset 清除线，在 重新 connect 连线， 一定要在 DOM 加载完毕后，reset 完成，再 重新连线

```js
checkError(check) {
      check
        ? (() => {
            // 显示异常
            this.$nextTick(() => {
              this.plumbIns.reset()
              this.errCheck = true
              this.initPlumbIns()
            })
          })()
        : (() => {
            // 显示全部
            this.$nextTick(() => {
              this.plumbIns.reset()
              this.errCheck = false
              this.initPlumbIns()
            })
          })()
    },

```

## 如何 清除线 和 重新绘制线

```js
checkHide(hide) {
  if (this.plumbIns) {
    hide
      ? (() => {
          this.plumbIns.reset()
        })()
      : (() => {
          this.lineMaps.forEach((object) =>
            this.plumbIns.connect(object, defaultConfig)
          )
        })()
  }
}
```
