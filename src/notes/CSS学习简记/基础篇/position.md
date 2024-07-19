---
title: 定位
author: 李嘉明
createTime: 2024/04/20 21:19:02
permalink: /defensive-css/mwv313tu/
---

## 定位的概念

:::tip
定位的基本思想很简单，它允许你定义元素框相对于其正常位置应该出现的位置，或者相对于父元素甚至浏览器窗口本身的位置 ,通过使用 position 属性，我们可以选择 4 种不同类型的定位.

position 属性是把元素放置到一个静态的、相对的、绝对的、或固定 以及 粘性的 的位置中

position 属性的值分别对应 `static`、`relative`、`absolute`、`fixed` `sticky`
:::

::: caution STOP
注意： 单位为 px 或 百分比都可以，left 和 right 同时设置时只有 left 有效，top 和 bottom 一起设置时只有 top 有效

浏览器不会自动计算元素的高度，定位元素的百分比是依赖于父级的宽高的
:::

## 相对定位 relative

特性：

- 其他元素没有受到任何影响
- 自身原来的位置也保留
- 和浮动可以一起使用
- 相对定位并不能构成 bfc，所以解决不了父级塌陷

值：

- left: 设置元素 左边缘 到 原来左边缘位置 的距离
- right: 设置元素 右边缘 到 原来右边缘位置 的距离
- top: 设置元素 上边缘 到 原来上边缘位置 的距离
- bottom: 设置元素 下边缘 到 原来下边缘位置 的距离

解释：

- 在相对定位中：left 为正 元素向右走
- 在相对定位中：top 为正 元素向下走
- 注意：允许负值

## 包含块

:::tip
绝对定位的元素 相对于它的包含块进行定位，如何确定一个元素的包含块，完全取决于它自身的 position 属性
:::

- 如果一个元素自身的 position 属性是 `static` 或者是 `relative`：它的包含块就是离他最近的祖先元素或者是格式化上下文。
- 如果一个元素自身的 position 属性是`absolute`，它的包含块就是离他最近的 拥有定位属性（值不为 static）的元素
- 如果一个元素自身的 position 属性是`fixed`，它的包含块就是 viewport（视口）
- 如果一个元素的 position 属性是`absolute` 或者是 `fixed` 在下边几种情况下，包含块会发生改变
- 当祖先元素的 拥有 `transform` 或 `perspective` 属性 并且值不为 none 的时候 它也是被当做包含块
- 当祖先元素 拥有 `filter属性的时候（值不为none）  ` 它也可以被当做包含块
- 如果由内向外找不到包含块条件的元素，那么 `html 根元素` 被称作为初始包含块

## 绝对定位 absolute

- 不预留任何的空间（脱离页面流）
- 通过指定当前元素 相对于其包含块偏移的量 来确定当前元素的位置
- 绝对定位以后，浮动失效。margin padding 仍然可以使用

## 固定定位 fixed

- 不为元素预留空间（脱离页面流）
- 相对于视口（viewport）的位置来定位元素的
- 滚动页面滚动条的时候，视口不发生改变，元素位置也不会改变

## 粘性定位

粘性定位的元素是依赖于用户的滚动，在 position:relative 与 position:fixed 定位之间切换。元素根据正常文档流进行定位，然后**相对它的最近滚动祖先 和 最近块级祖先 ，包括 table-related 元素，基于 top, right, bottom, 和 left 的值进行偏移**。

粘性定位可以被认为是相对定位和固定定位的混合。元素在跨越特定阈值前为相对定位，之后为固定定位。例如：

```css
#one { position: sticky; top: 10px; }
```
设置了以上样式的元素，在 viewport 视口滚动到元素 top 距离小于 10px 之前，元素为相对定位。之后，元素将固定在与顶部距离 10px 的位置，直到 viewport 视口回滚到阈值以下。

::: caution STOP
1. 元素定位表现为在跨越特定阈值前为相对定位，之后为固定定位。
2. 须指定 top, right, bottom 或 left 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。
3. 偏移值不会影响任何其他元素的位置。该值总是创建一个新的层叠上下文
4. 一个 sticky 元素 会 固定 在离它最近的一个拥有 滚动机制 的祖先上`（当该祖先的 overflow 是 hidden, scroll, auto, 或 overlay时）`，即便这个祖先不是最近的真实可滚动祖先。
5. sticky 元素不会触发BFC
:::


:::normal-demo

```css
.background-111 {
    border: 1px solid #ba3537;
}
.sticky {
    position: sticky;
    top: 0;
    padding: 5px;
    background-color: #ccc;
    border: 2px solid #ba3537;
}

.text-mwv313tu p {
    line-height: 50px;
}
```
```html
<div class="background-111">
    <div>
        <p><b>请尝试在此框架内滚动以了解粘性定位的工作原理。</b></p>
        <p><b>注释：</b>IE/Edge 15 以及更早的版本不支持粘性定位。</p>
    </div> 
    <div class="sticky">我有粘性！</div>
    <div class="text">
        <p>粘性元素根据滚动位置在相对（relative）和固定（fixed）之间切换。它会被相对定位，直到在视口中遇到给定的偏移位置为止 - 然后将其“粘贴”在适当的位置（比如 position:fixed）。</p>
        <p>粘性元素根据滚动位置在相对（relative）和固定（fixed）之间切换。它会被相对定位，直到在视口中遇到给定的偏移位置为止 - 然后将其“粘贴”在适当的位置（比如 position:fixed）。</p>
        <p>粘性元素根据滚动位置在相对（relative）和固定（fixed）之间切换。它会被相对定位，直到在视口中遇到给定的偏移位置为止 - 然后将其“粘贴”在适当的位置（比如 position:fixed）。</p>
        <p>粘性元素根据滚动位置在相对（relative）和固定（fixed）之间切换。它会被相对定位，直到在视口中遇到给定的偏移位置为止 - 然后将其“粘贴”在适当的位置（比如 position:fixed）。</p>
        <p>粘性元素根据滚动位置在相对（relative）和固定（fixed）之间切换。它会被相对定位，直到在视口中遇到给定的偏移位置为止 - 然后将其“粘贴”在适当的位置（比如 position:fixed）。</p>
        <p>粘性元素根据滚动位置在相对（relative）和固定（fixed）之间切换。它会被相对定位，直到在视口中遇到给定的偏移位置为止 - 然后将其“粘贴”在适当的位置（比如 position:fixed）。</p>
        <p>粘性元素根据滚动位置在相对（relative）和固定（fixed）之间切换。它会被相对定位，直到在视口中遇到给定的偏移位置为止 - 然后将其“粘贴”在适当的位置（比如 position:fixed）。</p>
        <p>粘性元素根据滚动位置在相对（relative）和固定（fixed）之间切换。它会被相对定位，直到在视口中遇到给定的偏移位置为止 - 然后将其“粘贴”在适当的位置（比如 position:fixed）。</p>
        <p>粘性元素根据滚动位置在相对（relative）和固定（fixed）之间切换。它会被相对定位，直到在视口中遇到给定的偏移位置为止 - 然后将其“粘贴”在适当的位置（比如 position:fixed）。</p>
        <p>粘性元素根据滚动位置在相对（relative）和固定（fixed）之间切换。它会被相对定位，直到在视口中遇到给定的偏移位置为止 - 然后将其“粘贴”在适当的位置（比如 position:fixed）。</p>
        <p>粘性元素根据滚动位置在相对（relative）和固定（fixed）之间切换。它会被相对定位，直到在视口中遇到给定的偏移位置为止 - 然后将其“粘贴”在适当的位置（比如 position:fixed）。</p>
        <p>粘性元素根据滚动位置在相对（relative）和固定（fixed）之间切换。它会被相对定位，直到在视口中遇到给定的偏移位置为止 - 然后将其“粘贴”在适当的位置（比如 position:fixed）。</p>
        <p>粘性元素根据滚动位置在相对（relative）和固定（fixed）之间切换。它会被相对定位，直到在视口中遇到给定的偏移位置为止 - 然后将其“粘贴”在适当的位置（比如 position:fixed）。</p>
        <p>粘性元素根据滚动位置在相对（relative）和固定（fixed）之间切换。它会被相对定位，直到在视口中遇到给定的偏移位置为止 - 然后将其“粘贴”在适当的位置（比如 position:fixed）。</p>
        <p>粘性元素根据滚动位置在相对（relative）和固定（fixed）之间切换。它会被相对定位，直到在视口中遇到给定的偏移位置为止 - 然后将其“粘贴”在适当的位置（比如 position:fixed）。</p>
        <p>粘性元素根据滚动位置在相对（relative）和固定（fixed）之间切换。它会被相对定位，直到在视口中遇到给定的偏移位置为止 - 然后将其“粘贴”在适当的位置（比如 position:fixed）。</p>
        <p>粘性元素根据滚动位置在相对（relative）和固定（fixed）之间切换。它会被相对定位，直到在视口中遇到给定的偏移位置为止 - 然后将其“粘贴”在适当的位置（比如 position:fixed）。</p>
        <p>粘性元素根据滚动位置在相对（relative）和固定（fixed）之间切换。它会被相对定位，直到在视口中遇到给定的偏移位置为止 - 然后将其“粘贴”在适当的位置（比如 position:fixed）。</p>
        <p>粘性元素根据滚动位置在相对（relative）和固定（fixed）之间切换。它会被相对定位，直到在视口中遇到给定的偏移位置为止 - 然后将其“粘贴”在适当的位置（比如 position:fixed）。</p>
        <p>粘性元素根据滚动位置在相对（relative）和固定（fixed）之间切换。它会被相对定位，直到在视口中遇到给定的偏移位置为止 - 然后将其“粘贴”在适当的位置（比如 position:fixed）。</p>
    </div>
</div>
```
:::

## 定位位置的设置

- 定位位置是通过 left right top bottom 来设置的

值可以是

- 像素
  1. 像素是多少就是多少
- 百分比
  1. left 和 right 的百分比相对于参考物的 width ,
  2. top 和 bottom 的百分比是相对于参考物的 height
  3. 无论任何方向的 padding 或 margin 百分比都是 相对于 参考物的 width 来计算的

## z-index 属性：

1. 用于指定了一个定位属性的元素 及其后代 的层叠顺序
2. 只有定位元素（非 static 值）拥有 z-index 属性
3. z-index 的值没有单位 理论上来说 z-index 的值大的元素 会覆盖小的元素
4. 定位元素默认的 z-index 的值 是 auto
5. 如果一个拥有 z-index 属性的定位元素中 子元素也设置了 z-index，那么子元素会重新创建一个层叠上下文，子元素的 z-index 只能在当前的层叠上下文中对比排列

元素层叠顺序：

```json
z-index为负 < background < border < 块级元素 < 浮动元素 < 内联元素 < 没有设置z-index的定位元素 < z-index为正
```
