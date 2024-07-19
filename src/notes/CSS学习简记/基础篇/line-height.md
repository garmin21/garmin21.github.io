---
title: 行高
author: 李嘉明
createTime: 2024/04/13 11:34:06
permalink: /defensive-css/line-height/
---

## line-height

line-height 是用于控制文本，和内联元素的高度。规范来说就是两行文字基线之间的距离，行高直接决定了内联元素占用的高度（不包括替换元素）， line-height 是可以被继承的。

理解概念，四线格，

:::demo-wrapper

<div style="width:200px;margin:20px auto;padding-bottom:10px;border-radius:5px;overflow:hidden;box-shadow:var(--vp-shadow-2)">
   <img src="/images/defensive-css/4.png" alt="">
</div>
:::

下面是一个 典型例子：

```css
.outer {
  background-color: red;
  line-height: 50px;
  color: black;
}
```

<style>
  .outer {
    background-color: red;
    line-height: 50px;
    color: black;
  }
  
</style>

:::demo-wrapper

<p align="center">嵌套文本</p>

<div class="outer">
  文本，文本，文本，文本
</div>
:::

## 值 (不支持负值)

- normal：执行浏览器默认值，在各个浏览器中不同，并且还受字体的影响
- 数字：没有单位，比如 1.5 就是当前元素文字大小的 1.5 倍
- 百分比：也是相对于当前元素的文字大小计算的，很少使用
- 长度：带单位，直接设置行高

```css
.outer-1 {
  background-color: red;
  line-height: 3;
  color: black;
}
```

<style>
  .outer-1 {
    background-color: red;
    line-height: 3;
    color: black;
  }
  
</style>

:::demo-wrapper

<p align="center">设置浏览器默认字体大小 ✖️ 3</p>

<div class="outer-1">
  文本，文本，文本，文本
</div>
:::

## 行距与半行距

- 行距是 上边一行文字的底线和下边一行文字的顶线之间的距离
- 半行距 就是行距的一半; 让行高减去一行文字的高度，得到的值除以 2，就是半行距
- 一行文字的上边和下边分别是两个半行距
- 半行距高度\*2 + 文字的字号 = 行高

