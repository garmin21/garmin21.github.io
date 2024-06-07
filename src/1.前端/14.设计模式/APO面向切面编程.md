---
title: APO面向切面编程
author: 李嘉明
createTime: 2024/06/07 22:02:25
permalink: /article/ktn633hf/
tags:
  - 设计模式
---

AOP 是一种通过将横切关注点与主业务逻辑分离的编程范式，提供了更好的代码组织和模块化方式。
它对于处理横切关注点、减少代码重复和耦合，以及提高代码可维护性和可扩展性都具有重要意义。

<!-- more -->

## 应用场景

比如说，我们需要再执行某一段代码前后各执行 一段逻辑

## 示例

```js
Function.prototype.after = function (callback) {
  let self = this;
  return function () {
    const res = self.apply(this, arguments);
    callback.apply(this, arguments);
    return res;
  };
};

Function.prototype.before = function (callback) {
  let self = this;
  return function () {
    const res = callback.apply(this, arguments);
    return self.apply(this, [res]);
  };
};

// 拆分 dome 内的逻辑
function plus() {
  console.log('主逻辑函数执行之前===>');
  return 12 + 9;
}

function log(a) {
  console.log(a);
}

function update() {
  console.log('主逻辑函数执行之后===>');
}
const fn = log.before(plus).after(update);

fn();
```

## 分析代码执行顺序

```js
/**
 * log.before 将 plus 传入并执行后， 此时self 就是log ,返回一个闭包，在闭包中将this 绑定给了plus函数，到这一步，返回的函数为
 * function x() {
 *  const res = plus.apply(this, arguments)
 *  return log.apply(this, [res]);
 * }
 * 这个时候，返回的函数原型上还有 after 方法，调用 after 方法，传入 update，返回一个闭包，此时的self 就是返回函数x的this,
 *
 * function b() {
 *  const res = x.apply(this, arguments)
 *  update.apply(this, [res])
 * }
 *
 * 最后将其函数返回，由此分析到 我们的代码基本集中到after 中被执行了。
 * 首先 plus 被执行 返回 21 ===> log 执行 打印 21, 但是无返回值 ===> 回到b 函数 update被执行 打印语句
 */
```
