---
title: AntV G6·图可视化引擎- 基础认知
date: '2024-03-24'
categories:
  - 可视化
tags:
  - AntV G6
publish: true
---

## 1. 认识 AntV G6

官网地址：https://g6.antv.vision/

G6 是一个图可视化引擎，它提供了 一系列的 配置和 api 用于绘制，图形， 渲染采用的是 canvas svg webGl 等渲染方式 默认使用的 canvas

## 2.如何使用 G6

1. G6 中具有 `nodes 点集` `edges 边集` `combo 集合` 的 三种绘制 数据概念。
2. G6 中范围 一般图 和 tree 图 两种图类型
3. g6 中使用了一些布局，这些布局可以很好的帮助我们进行 页面节点的布局等

### 1， 使用 G6 绘制图形

```js
const data = {
  // 点集
  nodes: [
    {
      id: 'node1', // String，该节点存在则必须，节点的唯一标识
      x: 100, // Number，可选，节点位置的 x 值
      y: 200, // Number，可选，节点位置的 y 值
    },
    {
      id: 'node2', // String，该节点存在则必须，节点的唯一标识
      x: 300, // Number，可选，节点位置的 x 值
      y: 200, // Number，可选，节点位置的 y 值
    },
  ],
  // 边集
  edges: [
    {
      source: 'node1', // String，必须，起始点 id
      target: 'node2', // String，必须，目标点 id
    },
  ],
  combo: [],
}

const graph = new G6.Graph({
  container: 'mountNode', // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
  width: 800, // Number，必须，图的宽度
  height: 500, // Number，必须，图的高度
})

graph.data(data) // 读取 Step 2 中的数据源到图上
graph.render() // 渲染图
```
