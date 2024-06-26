---
title: IntersectionObserver 交叉视口
author: 李嘉明
createTime: 2024/06/03 13:44:23
permalink: /article/1opzghvi/
tags:
  - BOM
---

检查某个元素是否进入了"视口"（viewport），即用户能不能看到它。
<!-- more -->
## 概念

网页开发时，常常需要了解某个元素是否进入了"视口"（viewport），即用户能不能看到它。

传统的实现方法是，监听到 scroll 事件后，调用目标元素的 `getBoundingClientRect()`方法，得到它对应于视口左上角的坐标，再判断是否在视口之内。这种方法的缺点是，由于 scroll 事件密集发生，计算量很大，容易造成性能问题。

目前有一个新的 IntersectionObserver API，可以自动"观察"元素是否可见，Chrome 51+ 已经支持。由于可见（visible）的本质是，目标元素与视口产生一个交叉区，所以这个 API 叫做"交叉观察器"。


[阮一峰的文档](http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html)

## 用法

```js
const callback = entries => {  
  // ...  
}; 
 
const options = {  
  root: document.querySelector('#scroll'),
  rootMargin: '0px',  
  threshold: [0]  
};  

const observer = new IntersectionObserver(callback, options);  
const ele = document.querySelector('.img');  
observer.observe(ele); 
```

**回调函数**
```js
const callback = (entries, observer) => {   
  entries.forEach(entry => {  
    //   entry.boundingClientRect  
    //   entry.intersectionRatio  
    //   entry.intersectionRect  
    //   entry.isIntersecting  
    //   entry.rootBounds  
    //   entry.target  
    //   entry.time  
  });  

};
entry.boundingClientRect // 目标元素的区域信息，getBoundingClientRect()的返回值
entry.intersectionRatio  // 目标元素的可见比率
entry.intersectionRect   // 目标元素与根元素交叉的区域信息
entry.isIntersecting     // 是否进入可视区域
entry.rootBounds         // 根元素的矩形区域信息
entry.target             // 被观察的目标，是一个DOM节点
entry.time               // 可见性发生变化的时间,相交发生时距离页面打开时的毫秒数.精度为微秒。
```

**options**
```js
// option 是配置对象（该参数可选）
option.root       // 目标元素所在的容器节点，如果不指定根节点，默认文档为根节点。
option.rootMargin // 围绕根元素的边距，类似于css的margin属性。注意这个单位为px
option.threshold  // 相交的比例，既可以是一个数字也可以是一个数组。取值在0-1之间。
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

// 返回一个IntersectionObserverEntry对象数组。
io.takeRecords()
/**
 * 每个对象的目标元素都包含每次相交的信息。
 * takeRecords是同步的，IntersectionObserver的回调是异步  的，
 * 且IntersectionObserver的回调时间最大是100ms，所以回调会在1-100ms内执行。
 * 如果执行了异步回调，takeRecords()就会返回空数据组，如果同步先执行，则回调不执行。使用场景较少。
 * /
```

## IntersectionObserverEntry 对象

IntersectionObserverEntry 一共有六个属性:

1. time：可见性发生变化的时间，是一个高精度时间戳，单位为毫秒
2. target：被观察的目标元素，是一个 DOM 节点对象
3. rootBounds：根元素的矩形区域的信息，getBoundingClientRect()方法的返回值，如果没有根元素（即直接相对于视口滚动），则返回 null
4. boundingClientRect：目标元素的矩形区域的信息
5. intersectionRect：目标元素与视口（或根元素）的交叉区域的信息
6. intersectionRatio：目标元素的可见比例，即 intersectionRect 占 boundingClientRect 的比例，完全可见时为 1，完全不可见时小于等于 0
