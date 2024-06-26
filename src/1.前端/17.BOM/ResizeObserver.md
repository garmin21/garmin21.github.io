---
title: ResizeObserver DOM尺寸监听
author: 李嘉明
createTime: 2024/05/11 22:49:25
permalink: /article/9e5vginp/
tags:
  - BOM
---

ResizeObserver 是一个 Web API，用于 监听元素尺寸 发生变化
<!-- more -->

:::tip
ResizeObserver 接口可以监听到 Element 的内容区域或 SVGElement 的边界框改变。内容区域则需要减去内边距 padding。（有关内容区域、内边距资料见盒子模型 ）

ResizeObserver 避免了在自身回调中调整大小，从而触发的无限回调和循环依赖。它仅通过在后续帧中处理 DOM 中更深层次的元素来实现这一点。如果（浏览器）遵循规范，只会在绘制前或布局后触发调用。
:::

## 使用

```js
let textarea = document.getElementById("textarea");

//   初始化就会执行一次
const resize = new ResizeObserver((entries) => {
  // 一但 textarea 的长宽 发生变化，这里就会持续触发
  const [item] = entries;

  // item.borderBoxSize // 边框盒子大小
  // item.contentBoxSize // 内容盒子大小
  // item.contentRect // 元素内容盒子在页面节点上的信息
  // item.target // 元素对象
  // item.devicePixelContentBoxSize // 元素设备像素盒子的信息
        // blockSize: 52; 某种情况下 这个高度
        // inlineSize: 269; 某种情况下这是宽度

  item.target.style.borderRadius =
    Math.max(0, 250 - item.contentRect.width) + "px";
});

resize.observe(textarea);
```

## API

1. `resize.observe` 启动监听元素
2. `resize.disconnect` 取消对目标元素的监听
3. `resize.unobserve` 结束对目标元素的监听


:::tip 
监听浏览器窗口发生变化，可以直接监听`document.body`
:::