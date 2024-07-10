---
title: scrollIntoView 元素出现视口
author: 李嘉明
createTime: 2024/07/10 21:04:05
permalink: /article/vgugrup8/
tags:
  - DOM
---

在业务开发中发现了一个陌生的方法：`scrollIntoView` 。从字面意思来看，这个方法应该是让 dom 元素滚动到视口，于是查阅了一下[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView)。

## 描述

Element 方法 `scrollIntoView`：滚动父级容器，使得元素出现在视口。

## 参数

```js
type alignToTop = boolean
type scrollIntoViewOptions = {
  behavior: 'auto' | 'smooth'
  block: 'start' | 'center' | 'end' | 'nearest'
  inline: 'start' | 'center' | 'end' | 'nearest'
}

interface Element {
  scrollIntoView(arg?: alignToTop | scrollIntoViewOptions): void
}
```

**scrollIntoViewOptions**，一个包含下列属性的对象。

- `behavior`定义过渡动画，默认值为`auto`。

  - `auto`，表示没有平滑的滚动动画效果。
  - `smooth`，表示有平滑的滚动动画效果。

- `block`定义垂直方向的对齐，默认值为`start`。

  - `start`，表示`顶端`对齐。
  - `center`，表示`中间`对齐。
  - `end`，表示`底端`对齐。
  - `nearest`：

    - 如果元素完全在视口内，则垂直方向不发生滚动。
    - 如果元素未能完全在视口内，则根据最短滚动距离原则，垂直方向滚动父级容器，使元素完全在视口内。

- `inline`定义水平方向的对齐，默认值为`nearest`。

  - `start`，表示`左端`对齐。
  - `center`，表示`中间`对齐。
  - `end`，表示`右端`对齐。
  - `nearest`：

    - 如果元素完全在视口内，则水平方向不发生滚动。
    - 如果元素未能完全在视口内，则根据最短滚动距离原则，水平方向滚动父级容器，使元素完全在视口内。

**alignToTop**

- 当传入参数`true`时，相当于`{behavior: 'auto', block: 'start', inline: 'nearest'}`
- 当传入参数`false`时，相当于`{behavior: 'auto', block: 'end', inline: 'nearest'}`
- 当未传入参数时，默认值为：`{behavior: 'auto', block: 'start', inline: 'nearest'}`

## 效果

:::normal-demo

```css
.outer2 {
  width: 100px;
  overflow: hidden;
}

.outer2 .container {
  width: 200px;
}

.outer2 .inner {
  width: 50px;
  height: 50px;
  background-color: pink;
  float: left;
  line-height: 50px;
  text-align: center;
}
```

```html
<div class="outer2">
  <div class="container">
    <div class="inner">1</div>
    <div class="inner">2</div>
    <div class="inner">3</div>
    <div class="inner">4</div>
  </div>
</div>

<button data-id="4">将第四个元素滚动到容器视口</button>
<button data-id="1">将第一个元素滚动到容器视口</button>
```

```js
document.querySelectorAll('button').forEach((btn) => {
  btn.addEventListener('click', scrollTo);
});
function scrollTo(ev) {
  const index = ev.target.dataset.id || 1;
  document
    .querySelector(`.container .inner:nth-child(${index})`)
    .scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
}
```
:::
