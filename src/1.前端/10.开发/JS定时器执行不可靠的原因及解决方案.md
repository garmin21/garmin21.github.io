---
title: JS定时器执行不可靠的原因及解决方案
author: 李嘉明
createTime: 2024/06/11 21:41:22
permalink: /article/og2cnwjy/
tags:
  - FE
---

## 前言

在工作中应用定时器的场景非常多，但你会发现有时候定时器好像并没有按照我们的预期去执行，比如我们常遇到的`setTimeout(()=>{},0)`它有时候并不是按我们预期的立马就执行。想要知道为什么会这样，我们首先需要了解**Javascript**`计时器`的工作原理。

## 定时器工作原理

为了理解计时器的内部工作原理，我们首先需要了解一个非常重要的概念：**计时器设定的延时是没有保证的。因为所有在浏览器中执行的 JavaScript 单线程异步事件（比如鼠标点击事件和计时器）都只有在它有空的时候才执行。**

由于 JavaScript 一次只能执行一段代码(由于它的单线程特性)，所以每一段代码都会“阻塞”其他异步事件的进程。这意味着，当异步事件发生时(如鼠标单击、计时器触发或 XMLHttpRequest 完成)，它将排队等待稍后执行。

总的来说造成 JS 定时器不可靠的原因就是 JavaScript 是单线程的，一次只能执行一个任务，而 setTimeout() 的第二个参数（延时时间）只是告诉 JavaScript 再过多长时间把当前任务添加到队列中。如果队列是空的，那么添加的代码会立即执行；如果队列不是空的，那么它就要等前面的代码执行完了以后再执行定时器任务必须等主线程任务执行才可能开始执行，无论它是否到达我们设置的时间

## 解决方案

### 方法一：requestAnimationFrame

> **`window.requestAnimationFrame()`** 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行，理想状态下回调函数执行次数通常是每秒 60 次（也就是我们所说的 60fsp），也就是每 16.7ms 执行一次，但是并不一定保证为 16.7 ms。

```js
const t = Date.now();
function mySetTimeout(cb, delay) {
  let startTime = Date.now();
  loop();
  function loop() {
    if (Date.now() - startTime >= delay) {
      cb();
      return;
    }
    requestAnimationFrame(loop);
  }
}
mySetTimeout(() => console.log('mySetTimeout', Date.now() - t), 2000); //2005
setTimeout(() => console.log('SetTimeout', Date.now() - t), 2000); // 2002
```

这种方案看起来像是增加了误差，这是因为 requestAnimationFrame 每 16.7ms 执行一次，因此它不适用于间隔很小的定时器修正。

### 方法二： Web Worker

Web Worker 为 Web 内容在后台线程中运行脚本提供了一种简单的方法。线程可以执行任务而不干扰用户界面。此外，他们可以使用`XMLHttpRequest`执行 I/O (尽管`responseXML`和`channel`属性总是为空)。一旦创建， 一个 worker 可以将消息发送到创建它的 JavaScript 代码, 通过将消息发布到该代码指定的事件处理程序（反之亦然）。

Web Worker 的作用就是**为 JavaScript 创造多线程环境**，允许主线程创建 Worker 线程，将一些任务分配给后者运行。在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。等到 Worker 线程完成计算任务，再把结果返回给主线程。这样的好处是，一些计算密集型或高延迟的任务，被 Worker 线程负担了，主线程不会被阻塞或拖慢。

```js
export const mySetInterval = (message, time = 5000) => {
  const blob = new Blob(
    [
      `var number = Number.MAX_SAFE_INTEGER;
      const run = () => {
          number--;
          if(number < 0){
              return;
          }
          self.postMessage(number);
          self.setTimeout(run,${time});
      }
      run();`,
    ],
    { type: 'application/javascript' }
  );
  let worker = new Worker(URL.createObjectURL(blob));
  worker.onmessage = message;

  return function destroy() {
    worker.terminate();
    worker = null;
  };
};
```

**使用**

```js
const off = mySetInterval(() => {
    console.log('每隔五秒触发一次‘)
})
```

这种方案体验整体上来说还是比较好的，既能较大程度修正计时器也不影响主进程任务
