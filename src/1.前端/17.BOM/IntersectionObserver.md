---
title: IntersectionObserver
author: 李嘉明
createTime: 2024/06/03 13:44:23
permalink: /article/1opzghvi/
---

检查某个元素是否进入了"视口"（viewport），即用户能不能看到它。
<!-- more -->


## 概念

网页开发时，常常需要了解某个元素是否进入了"视口"（viewport），即用户能不能看到它。

传统的实现方法是，监听到 scroll 事件后，调用目标元素的 getBoundingClientRect()方法，得到它对应于视口左上角的坐标，再判断是否在视口之内。这种方法的缺点是，由于 scroll 事件密集发生，计算量很大，容易造成性能问题。

目前有一个新的 IntersectionObserver API，可以自动"观察"元素是否可见，Chrome 51+ 已经支持。由于可见（visible）的本质是，目标元素与视口产生一个交叉区，所以这个 API 叫做"交叉观察器"。

## 用法

```js
var io = new IntersectionObserver(callback, option);
// callback 是目标元素可见后触发的回调函数
// option 是配置对象（该参数可选）
```

## API

```js
// 开始观察,可同时观察多个
io.observe(document.getElementById("example"));
io.observe(document.getElementById("app"));

// 停止观察
io.unobserve(element);

// 关闭观察器
io.disconnect();
```

如果需要拿到这个元素的位置信息，可以在回调函数 入参是一个 entries 数组

```js
function callback(entries) {
  // entries[0] 每个成员都是一个IntersectionObserverEntry对象, 观察的元素有几个，entries就会有多大
}
```

## IntersectionObserverEntry 对象

IntersectionObserverEntry 一共有六个属性:

1. time：可见性发生变化的时间，是一个高精度时间戳，单位为毫秒
2. target：被观察的目标元素，是一个 DOM 节点对象
3. rootBounds：根元素的矩形区域的信息，getBoundingClientRect()方法的返回值，如果没有根元素（即直接相对于视口滚动），则返回 null
4. boundingClientRect：目标元素的矩形区域的信息
5. intersectionRect：目标元素与视口（或根元素）的交叉区域的信息
6. intersectionRatio：目标元素的可见比例，即 intersectionRect 占 boundingClientRect 的比例，完全可见时为 1，完全不可见时小于等于 0
