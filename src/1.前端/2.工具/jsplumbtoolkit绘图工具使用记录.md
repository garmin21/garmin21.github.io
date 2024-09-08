---
title: jsplumbtoolkit绘图工具使用记录
author: 李嘉明
createTime: 2024/04/18 20:59:46
permalink: /article/j7cb45vd/
tags:
  - 工具
---

::: tip
jsPlumb 是一个强大的 JavaScript 连线库，提供 html 元素的拖放、连线等功能，可绘制不同类型、样式的连线，适用于开发 web 页面的图表、建模工具等。同时也支持 vue , react 和 Angular。
:::

- @jsplumb/core：核心包，包含管理元素之间的连接、端点的方法。与渲染器解耦，不依赖于 DOM；
- @jsplumb/browser-ui：默认渲染器，使用 SVG（可缩放矢量图形）连接元素。（元素较多时渲染较慢）；
- @jsplumb/util：实用工具包；
- @jsplumb/common：定义和接口。

- 优点

  - 免费，并根据 MIT 许可证提供。社区版免费
  - 节点由自己进行绘制，样式自言可控，灵活度高
  - 图表项目和连接的参数精细可控

- 文档地址
  - [社区版，版本 6.x](https://docs.jsplumbtoolkit.com/community/)
  - [jsPlumb 的先前版本 5.x](https://docs.jsplumbtoolkit.com/community/5.x)
  - [jsPlumb 的先前版本 2.x](https://docs.jsplumbtoolkit.com/community/2.x)

## 了解的基本概念

- source 源节点
- Target 目标节点
- Anchor 锚点 锚点位于源节点或者目标节点上
- Endpoint 端点 端点位于连线上
- Connector 连接 或者也可以理解是连接线
- Overlays 可以理解为在连接线上的文字或者箭头之类的东东

:::tip
如果您在使用 jsPlumb 的连接或端点时遇到定位问题，请检查您是否已设置容器。jsPlumb 使用绝对定位，浏览器相对于设置了相对定位的第一个祖先进行计算。position : relative

:::

## 安装基本应用

```bash
npm install @jsplumb/browser-ui --save
```

```vue
<script>
import { newInstance, ready } from '@jsplumb/browser-ui'
export default {
  mounted() {
    // 等待DOM 加载完毕，后才能获取节点
    this.$nextTick(() => {
      const jsplumbInstance = newInstance({
        // 设置容器
        container: document.getElementById('jsplumbDemo'),

        // 设置默认全局配置
        paintStyle: { strokeWidth: 2, stroke: '#FF5555' }, // 线条设置
        endpoint: 'Blank', // 端点类型
        anchor: 'AutoDefault', // AutoDefault 动态锚点
        // ... 还有很多需要自己去看文档
      })

      ready(() => {
        // 在这里等待 jsplumb 准备好了，开始 调用 api 绘制连线
      })
    })
  },
}
</script>
```

## 新建连线

```vue
<template>
  <div id="jsplumbDemo" class="jsplumb-demo">
    <div id="item-left" class="left">item left</div>
    <div id="item-right" class="right">item right</div>
  </div>
</template>
<script>
import { newInstance, ready } from '@jsplumb/browser-ui'
export default {
  mounted() {
    this.$nextTick(() => {
      const jsplumbInstance = newInstance({
        container: document.getElementById('jsplumbDemo'),
      })
      ready(() => {
        jsplumbInstance.batch(() => {
          jsplumbInstance.connect({
            cssClass: 'line-class', // 边线设置class
            source: document.getElementById('item-left'),
            target: document.getElementById('item-right'),
            anchors: 'AutoDefault',
            endpoint: 'Blank', // 端点类形
            deleteEndpointsOnDetach: false, // 连接被删除仍然保留端点
            paintStyle: {
              // 线条填充
              stroke: '#333',
              strokeWidth: 2,
            },
            hoverPaintStyle: {
              // 线条移入时的填充
              stroke: 'red',
              strokeWidth: 4,
            },
            overlays: [
              {
                // 设置箭头
                type: 'PlainArrow',
                options: {
                  location: 1, // location 设置 箭头出现的位置
                  stroke: '#FF5555', // stroke 设置颜色
                  width: 10,
                  height: 10,
                },
              },
            ],
          })
        }, true)
      })
    })
  },
}
</script>
```

## 事件绑定

在项目开发过程中经常需要用到绑定事件的的功能，比如：移入、移出、点击等等

```vue
<template>
  <div id="jsplumbDemo" class="jsplumb-demo">
    <div id="item-left" class="left">item left</div>
    <div id="item-right" class="right">item right</div>
  </div>
</template>
<script>
import { newInstance, ready, EVENT_CONNECTION_CLICK } from '@jsplumb/browser-ui'
export default {
  mounted() {
    this.$nextTick(() => {
      const jsplumbInstance = newInstance({
        container: document.getElementById('jsplumbDemo'),
      })
      ready(() => {
        // ... 在建立连线后
        // EVENT_CONNECTION_CLICK : 线的点击事件
        jsplumbInstance.bind(EVENT_CONNECTION_CLICK, (element) => {
          this.ERR_DETAILS.caller = element.source?.getAttribute('id') // 获取起点元素ID
          this.ERR_DETAILS.callee = element.target?.getAttribute('id') // 获取终点元素ID

          // 得到连接对象 Connection
          console.log(element.Connection)
        })

        // 重新绘制
        jsplumbInstance.repaintEverything()
      })
    })
  },
}
</script>
```


到此，我们就已经 建立了连线，下集我将介绍下  jsPlumb 在开发中的常用 API