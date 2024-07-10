---
title: scroll-behavior 平滑滚动
author: 李嘉明
createTime: 2024/07/10 11:32:57
permalink: /defensive-css/scroll-behavior/
---

## scroll-behavior

`scroll-behavior:smooth` 写在滚动容器元素上，可以让容器（非鼠标手势触发）的滚动变得平滑。

## 语法

```css
scroll-behavior: auto;
scroll-behavior: smooth;
```

:::normal-demo

```css
.tab {
  overflow: hidden;
}
.label {
  width: 100px;
  margin-right: -1px;
  border: 1px solid #ccc;
  border-bottom: 0;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: #eee;
  text-align: center;
  float: left;
}
.box {
  height: 200px;
  border: 1px solid #ccc;
  /* ======= */
  scroll-behavior: smooth;
  /* ======= */
  overflow: hidden;
}
.content {
  height: 100%;
  padding: 0 20px;
  position: relative;
  overflow: hidden;
}
.box input {
  position: absolute;
  top: 0;
  height: 100%;
  width: 1px;
  border: 0;
  padding: 0;
  margin: 0;
  clip: rect(0 0 0 0);
}
```

```html
<div class="tab">
  <label class="label" for="tab1">选项卡1</label>
  <label class="label" for="tab2">选项卡2</label>
  <label class="label" for="tab3">选项卡3</label>
</div>
<div class="box">
  <div class="content">
    <input id="tab1" />
    <img src="/images/chrome-override/override-header-1.png" width="96" height="128" />
  </div>
  <div class="content">
    <input id="tab2" />
    <img src="/images/chrome-override/override-header-2.png" width="96" height="128" />
  </div>
  <div class="content">
    <input id="tab3" />
    <img src="/images/chrome-override/override-header-3.png" width="96" height="128" />
  </div>
</div>
```

:::

## 相关性的 DOM API

```js
dom.scrollIntoView();
```
