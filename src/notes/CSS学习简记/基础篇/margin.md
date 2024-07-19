---
title: 外边距
author: 李嘉明
createTime: 2024/04/15 22:28:01
permalink: /defensive-css/ak2qpntf/
---

## margin

margin 是一个用于撑开 父级或者兄弟元素 距离 的属性；

```css
.dome {
  /* 上10px 右10px 下10px 左10px */
  margin: 10px 10px 10px 10px;
  /* 写一个值代表四个值 */
  margin: 10px;
  /* 三个值，代表 左 上下 右 */
  margin: 10x 20px 30px;
  /* 两个值，代表 上下  左右 */
  margin: 10px 20px;
}
```

## margin: 0 auto 水平居中

```css
.outer {
  width: 400px;
  height: 200px;
  margin: 0 auto;
  background-color: pink;
}
```

<style>
.outer {
  width: 400px;
  height: 200px;
  margin: 0 auto;
  background-color: pink;
}
</style>

:::demo-wrapper

<p align="center">margin: 0 auto</p>

<div class="outer"></div>
:::

## margin 垂直方向的叠加

在 CSS 中，当两个垂直相邻的块级元素的 margin 相遇时，它们之间的垂直距离不是两者相加，而是取两者之中的较大者。这一规则被称为 Collapsing Margins（叠加边距）。

解决方法：

1. 使用内边距（padding）代替外边距。
2. 使用边框（border）。
3. 将元素转换成行内块元素（display: inline-block;）或者行内元素（display: inline;）。
4. 使用 overflow: auto;或 overflow: hidden;属性。开启 BFC

```css{6,13}
.outer {
  width: 400px;
  height: 200px;
  margin: 0 auto;
  background-color: pink;
  margin-bottom: 20px;
}
.inner {
  width: 400px;
  height: 200px;
  margin: 0 auto;
  background-color: hotpink;
  margin-top: 20px;
}
```

<style>
.outer-9527 {
  width: 400px;
  height: 200px;
  margin: 0 auto;
  background-color: pink;
  margin-bottom: 20px;
}
.inner-9527 {
  width: 400px;
  height: 200px;
  margin: 0 auto;
  background-color: hotpink;
  margin-top: 20px;
}
</style>

:::demo-wrapper

<div>
  <div class="outer-9527"></div>
</div>
<div class="inner-9527"></div>
:::

可以看到，按照正常的想法 因该是要撑开 40px 的，但是实际上 只有 20px。这其实也不是 bug 。这是浏览器特意设计的


:::normal-demo

```html
<p>切换 checkbox 查看效果</p>
<div class="wrapper" id="margin">
  <div class="outer"></div>
</div>
<div class="inner"></div>

<div class="actions">
  <span>
    <input type="checkbox" id="toggle" />
    <label for="toggle">使用border隔断</label>
  </span>
  <span>
    <input type="checkbox" id="toggle1" />
    <label for="toggle">开启BFC</label>
  </span>
</div>
```

```css
.outer {
  width: 400px;
  height: 200px;
  margin: 0 auto;
  background-color: pink;
  margin-bottom: 20px;
}
.inner {
  width: 400px;
  height: 200px;
  margin: 0 auto;
  background-color: hotpink;
  margin-top: 20px;
}
```

```js
const wrapper = document.querySelector('#margin')

document.querySelector('#toggle').addEventListener('change', (e) => {
  wrapper.style.borderWidth = e.target.checked ? '1px' : 'initial'
  wrapper.style.borderColor = e.target.checked ? '#000' : 'initial'
  wrapper.style.borderStyle = e.target.checked ? 'solid' : 'initial'
})
document.querySelector('#toggle1').addEventListener('change', (e) => {
  wrapper.style.overflow = e.target.checked ? 'hidden' : 'initial'
})
```

:::

## margin 塌陷

Margin 塌陷 ，主要发生在垂直方向上，指的是 CSS 中块级元素相邻上下边距的合并现象
当两个块级元素垂直相邻且没有中间有边框、内边距或外边距时，它们的外边距会合并，较大的外边距值会覆盖较小的外边距值，这种合并现象称为 margin 塌陷, 父子元素之间的 margin 塌陷是指**父元素中的第一个子元素**如果都设置了同方向的 margin-top 值，且没有其他内容隔离，那么这两个 margin 值相遇时也会发生塌陷，即较大的 margin 值会覆盖较小的 margin 值。

## 负 margin

::: demo-wrapper img no-padding
![viewport](/images/defensive-css/margin.jpg)
:::

箭头设置那个方向，盒子就会让那个方向移动，负 margin 最大的特点就是，显示没有任何变化，但是实际盒子占据的空间，在逐渐 偏移

## 负 margin 的应用

举例： 当我们有一个 474px 的盒子，里面放 4 个 99px 的子元素，并 👎 设置其每一个子元素的 `margin-right: 26px;`. 我们通过计算发现，显然是不够的，这个时候，选中到最后一个子元素，让其 `margin-right: 0;` 这样就解决了我们的问题，那么如果我们使用 负 margin 该怎么做呢?

<style>
.outer {
  width: 474px;
  height: 250px;
}
.outer div.inner {
  width: 99px;
  height: 200px;
  background-color: pink;
  float: left;
  margin-right: 26px;
}
.outer div.inner:nth-child(1) {
  background-color: hotpink;
}
.outer div.inner:nth-child(2) {
  background-color: rgb(42, 163, 85);
}
.outer div.inner:nth-child(3) {
  background-color: red;
}
.outer div.inner:nth-child(4) {
  background-color: green;
}
.outer div:nth-last-child(1) {
  margin-right: 0;
}
</style>

:::demo-wrapper

<div class="outer">
  <div class="inner"></div>
  <div class="inner"></div>
  <div class="inner"></div>
  <div class="inner"></div>
</div>
:::

:::tip
负 margin 的用法, 我们在其中间层，再套一个盒子， 让盒子的宽度，足够放得下 4 个子元素 + margin-right的宽度，这个时候，发现我们的父容器还是被撑开了 26px, 因为 wrapper元素 就设置了 500px 的像素，如何让 wrapper元素 变成跟父元素一样的大小呢？ 使用 `margin-right: -26px;` 视觉上没有什么变化，实际上，wrapper元素 所占据的位置，已经向左偏移了 26px, 此时正好等于 父元素的宽度，使用 `overflow: hidden;` 用于清除浮动。

```html
<div class="outer">
  <div class="wrapper">
    <div class="inner"></div>
    <div class="inner"></div>
    <div class="inner"></div>
    <div class="inner"></div>
  </div>
</div>
```

```css
.outer {
  width: 474px;
  height: 250px;
}

.wrapper {
  width: 500px;
  overflow: hidden;
  margin-right: -26px;
}

.outer .inner {
  width: 99px;
  height: 200px;
  float: left;
  margin-right: 26px;
}
```

:::

<style>
.outer {
  width: 474px;
  height: 250px;
}

.wrapper {
  width: 500px;
  overflow: hidden;
  margin-right: -26px;
}

.outer .inner {
  width: 99px;
  height: 200px;
  float: left;
  margin-right: 26px;
}

.outer div.inner:nth-child(1) {
  background-color: hotpink;
}
.outer div.inner:nth-child(2) {
  background-color: rgb(42, 163, 85);
}
.outer div.inner:nth-child(3) {
  background-color: red;
}
.outer div.inner:nth-child(4) {
  background-color: green;
}
</style>

:::demo-wrapper
<div class="outer">
  <div class="wrapper">
    <div class="inner"></div>
    <div class="inner"></div>
    <div class="inner"></div>
    <div class="inner"></div>
  </div>
</div>
:::
