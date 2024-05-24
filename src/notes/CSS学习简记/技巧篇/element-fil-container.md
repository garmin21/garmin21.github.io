---
title: 元素充满容器
author: 李嘉明
createTime: 2024/05/23 09:35:02
permalink: /defensive-css/n002lmg8/
---


## 简介

在一些布局场景中，我们需要让一个元素充满容器，这样的办法最简单的就是 `100%` 但是还有其他办法吗？


## 定位
:::normal-demo

```html
<div class="outer">
    <div class="con">hello</div>
</div>

```
```css
.outer{
    height: 200px;
    border: 1px solid #000;
    position: relative;
}
.con{
    background-color: rgb(48, 188, 227);
    /*1、给元素定位*/
    position: absolute;
    /*当给一个没有宽高的元素四周都为0，那么元素就充满容器*/
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
}
```
:::

## flex

flex 默认在 默认 row 的排列方向, 会有撑开侧轴的特性

:::normal-demo

```html
<div class="outer">
    <div class="con">你好</div>
</div>

```
```css
.outer{
    height: 200px;
    border: 1px solid #000;
    display: flex;
}
.con{
    background-color: rgb(48, 188, 227);
    flex:1;
}
```
:::