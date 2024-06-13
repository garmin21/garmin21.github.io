---
title: web Worker 多线程
author: 李嘉明
createTime: 2024/06/13 16:59:27
permalink: /article/qa2s1ldk/
tags:
  - BOM
---



:::tip
利用Worker可以实现多线程，通过实例化一个Worker，创建一个子线程，子线程里面不允许操作DOM，也没有window
:::


## 前言

由于JS 是单线程的，所以，我们在主线程中，大量计算的话会导致，主线程一直卡在计算的程序中，导致后续代码无法执行，所有，有了事件循环的异步处理，但是，异步处理实际上也是需要，在主线程空闲的时候，才能被执行到，如果主线程一直被占用了，异步代码也不会执行了，所以我们在js 中 引入 `web Worker` 分线程，相当于创建了一个子线程，这是浏览器提供给我们的。

请看大图：

![事件循环](/async/event-loop.png)


**worker适合场景:**
把耗时的计算放在分线程，不会影响主线程的其他工作
如果耗时的计算在主线程，导致页面卡顿（甚至崩溃）

**worker的缺点：**

1. 无法操作DOM
2. 无法跨域
3. 兼容性（不是所有的浏览器都可以使用）


## 构造函数

```js
const worker = new Worker(file | Blob)
```

### 方法

```js

postMessage // 向分线程发送数据

```

### 事件

```js
onmessage // 监听分线程的消息
```


## 分线程如何向主线程发送消息?

我们知道在 分线程中 不允许操作DOM，也没有window 对象，但是他有全局的 self 对象， self 就相当于是一个 简化后的 window

```js
self.postMessage('hello') // 向主线程发送数据
```