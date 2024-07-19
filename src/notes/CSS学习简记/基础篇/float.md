---
title: 浮动
author: 李嘉明
createTime: 2024/04/20 14:52:37
permalink: /defensive-css/xf8jc34x/
---

## 浮动的来历

::: tip
浮动的概念：让元素脱离文档流，按照指定的方向发生移动，遇到父级的边界或者是上一个浮动元素或者是上一个不浮动兄弟元素就停下来

早期浮动，是用来做，文字环绕 布局的，后期开始使用 float 脱离页面文档流 进行布局。

float 可以改变行块元素的特性，将其改为 跟块元素 一样的特性支持 列如 上下margin 上下的padding 
:::

## 页面流

正常情况下，页面总是 从左至右，从上到下 布局，我们把这种情况称为 页面文档流，而 浮动 float 是一种脱离页面流的手段

## 文字环绕

:::tip
浮动 与 行内元素盒子，具有不可重叠性
:::

<style>
.outer-002 {
  width: 500px;
  height: 300px;
  background-color: pink;
  margin: 0 auto;
}
.outer-002 img {
  float: left;
}
</style>

:::demo-wrapper

<p align="center">背景颜色</p>

<div class="outer-002">
<img src="/51853339.jpeg" alt="" width="240" height="80" />
Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi sint
qui similique pariatur quisquam. Modi commodi accusamus vero officia
aliquam tempora, eius animi perferendis aliquid! Harum quas ut expedita
voluptatem. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
Quibusdam ab itaque tempora natus quis provident voluptates adipisci?
Facilis, molestias ducimus, porro quod omnis a tempora eius placeat nemo
voluptatum iure?
</div>
:::

## 左浮动 + 右浮动

<style>
.outer-003 {
  width: 500px;
  margin: 0 auto;
  background-color: pink;
  overflow: auto;
}
.inner-003 {
  width: 100px;
  height: 100px;
  background-color: black;
  color: white;
  font-size: 18px;
}

.inner-003:nth-child(1) {
  float: left;
}
.inner-003:nth-child(2) {
  float: right;
}
</style>

:::demo-wrapper
<div class="outer-003">
  <div class="inner-003">float: left;</div>
  <div class="inner-003">float: right;</div>
</div>
:::

## 高度塌陷

:::tip
浮动元素以后，脱离父级内容区域，父级没有内容撑开自身的高度，所以父级的高度为 0
父级的兄弟元素是 按照父级的位置进行布局的，所以页面会出现布局错乱
:::

解决办法：清除浮动，清除浮动不是不让元素浮动，而是清除浮动对父级带来的影响


## 清除浮动的方法：


1. 给浮动元素的父级设置高度height（不推荐使用）
  - 缺点：很多情况下 高度都是不缺定的  所有不适用
  
2. 以浮制浮，给浮动元素的父元素设置浮动，原理是开启BFC（不推荐使用）
  - 缺点：只有在父级需要浮动的时候，可以这么清除，否则父级的浮动会影响布局

3. overflow 给父级设置，原理也是开启BFC（可以使用）
  - 优点：简单快捷
  - 缺点：元素超出的时候，会隐藏超出部分

4. br清除浮动：在浮动元素的后边书写一个br。br中书写clear属性，值为both
  - 缺点：增加不必要的元素，不符合样式与结构相分离的要求

5. clear清浮动法：给浮动元素的下边添加一个块元素，书写样式clear:both
  - 缺点：增加额外的结构，不符合语义化标准

6. after伪元素清浮动（推荐）
  - 可以给所有浮动元素的父级一个  clearFix的类名 ,当一个元素需要清除浮动的时候  直接设置clearFix类名即可

```css
.clearFix:after {
  content:"\200B";  必须拥有content属性   内容为空
  display: block;   必须块标签才能清浮动
  height: 0;          高度为0 不占用空间
  clear: both;        清除浮动
}
```