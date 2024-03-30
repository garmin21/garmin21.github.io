---
title: 8-05 CSS动画
date: '2022-08-05'
categories:
    - CSS
tags:
    - CSS
publish: true
---

### 1. will-change

will-change 属性通过告诉浏览器什么属性、什么元素将会发生变化，可以对这些操作进行可能性的优化，由此提高 CSS 动画的执行效率。

这个属性可以有 4 个值：

1. auto: 实行标准浏览器优化。
2. scroll-position: 指明元素的滚动位置将会出现动画变化，浏览器应该为滚动视窗内容的不可见部分事先做好准备。
3. contents: 指明元素的内容将会发生变化，浏览器不要缓存它们的内容。
4. `<custom-ident>`: 指明 will-change 实施的目标属性，比如 transform 或 opacity。

如果想通知浏览器会发生一个 transform 方面的变化，可以这样写：

```css
.element {
    will-change: transform;
}
```

我们还可以指定多个值，用逗号分隔，例如：

```css
.element {
    will-change: transform, opacity;
}
```

然而，千万不要过度使用 will-change 属性，否则，事与愿违，页面的执行效率会降低，推荐的做法是当一个元素或属性发生变化时打开 will-change，变化完成之后关闭它。`will-change: auto;`

### 2. pointer-events

现代浏览器里 CSS 的职责范围和 JavaScript 的越来越模糊分不清。比如 CSS 里`-webkit-touch-callout`属性在 iOS 里能禁止当用户点击时弹出气泡框。而本文要说的 pointer-events 的风格更像 JavaScript，它能够：

1. 阻止用户的点击动作产生任何效果
2. 阻止缺省鼠标指针的显示
3. 阻止 CSS 里的 hover 和 active 状态的变化触发事件
4. 阻止 JavaScript 点击动作触发的事件

```css
/* none值能阻止点击、状态变化和鼠标指针变化 */
.element {
    pointer-events: none;
}
```

一些需要注意的关于 pointer-events 的事项：

1. 子元素可以声明 pointer-events 来解禁父元素的阻止鼠标事件限制。
2. 如果你对一个元素设置了 click 事件监听器，然后你移除了 pointer-events 样式声明，或把它的值改变为 auto，监听器会重新生效。基本上，监听器会遵守 pointer-events 的设定。

适用场景：

1. 做权限级控制的时候可以通过 `pointer-events` 阻止点击
2. 滚动页面的时候，如果你页面有许多 hover 的效果，可能会导致滚动出现问题，可以在滚动时给 body 元素应用 `pointer-events：none`，禁用了包括 hover 在内的鼠标事件，从而提高滚动性能。
