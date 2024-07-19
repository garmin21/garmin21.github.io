---
title: 背景
author: 李嘉明
createTime: 2024/04/13 14:53:55
permalink: /defensive-css/background/
---

## 背景颜色设置

:::tip
background-color:颜色值（和 color 的颜色一致 十六进制 rgba hsl 颜色单词）
:::

```css
.background-110 {
  width: 50px;
  height: 50px;
  /* 十六进制 */
  background: #f90;
  /* RGBA */
  background: rgba(0, 0, 0, 0.5);
}
```

<style>
.background-110 {
  width: 50px;
  height: 50px;
  background: #f90;
  background: rgba(0,0,0,0.5)
}
</style>

:::demo-wrapper

<p align="center">背景颜色</p>

<div class="background-110">
</div>
:::

## 背景图的设置

:::tip
background-image:url(路径) 背景图引入后 默认原点在元素的左上角
在 html 中

1. 由左至右 是 x 轴方向
2. 由上至下 是 y 轴方向
3. x 和 y 的交叉是原点

:::

```css
.box {
  width: 1000px;
  height: 600px;
  background: url('../../public/51853339.jpeg');
}
```

![alt text](/images/defensive-css/image.png)

可以看到图片本身并没有占满盒子，因为图片有一个自己固定的大小宽高，并且图片还不断重复的平铺 X,Y 轴，并且图片的原点是从 父容器 body > padding-box 的 左上角 开始

## 背景图定位 + 背景平铺

:::tip

background-repeat:控制背景图片是否平铺

- no-repeat：不平铺
- repeat：x 和 y 都平铺（默认）
- repeat-x：只有 x 轴平铺
- repeat-y：只有 y 轴平铺

background-position：x 轴方向位置 y 轴方向位置

值的写法：

- px

- 百分比  
  百分比是参照于: 容器的总宽度-图片的总宽度 : (1000px - 460px) _ 百分比 = 图片（x/y）定位移动的距离
  x: 1000px - 460px _ 百分比 === x 轴移动的距离
  y: 600px - 460px \* 百分比 === y 轴移动的距离

- 其他写法
  x：center left right
  y: center top bottom

背景图提供了合写（一般我们都使用合写）

background：color image position repeat；

:::

:::normal-demo

```html
<p>切换 checkbox 查看效果 <span id="span-html"></span></p>
<div class="wrapper" id="background-position"></div>
<div class="actions">
  <span>
    <input type="checkbox" id="toggle" />
    <label for="toggle">使用其他写法</label>
  </span>
  <span>
    <input type="checkbox" id="toggle1" />
    <label for="toggle">使用px</label>
  </span>
  <span>
    <input type="checkbox" id="toggle2" />
    <label for="toggle">使用百分比</label>
  </span>
  <span>
    <input type="checkbox" id="toggle3" />
    <label for="toggle">是否平铺</label>
  </span>
</div>
```

```css
.wrapper {
  width: 1000px;
  height: 600px;
  background: url('/51853339.jpeg');
  background-color: aqua;
  /* 默认，不平铺 */
  background-repeat: no-repeat;
}
```

```js
const spanHtml = document.querySelector('#span-html')
const background = document.querySelector('#background-position')

function setPosition() {
  spanHtml.textContent = `background-position: ${background.style.backgroundPosition}`
}
document.querySelector('#toggle').addEventListener('change', (e) => {
  background.style.backgroundPosition = e.target.checked
    ? 'center center'
    : 'initial'

  setPosition()
})
document.querySelector('#toggle1').addEventListener('change', (e) => {
  background.style.backgroundPosition = e.target.checked
    ? '100px 100px'
    : 'initial'
  setPosition()
})
document.querySelector('#toggle2').addEventListener('change', (e) => {
  background.style.backgroundPosition = e.target.checked ? '50% 50%' : 'initial'
  setPosition()
})

document.querySelector('#toggle3').addEventListener('change', (e) => {
  background.style.backgroundRepeat = e.target.checked ? 'repeat' : 'no-repeat'
})
```

:::

## 背景原点的设置

:::tip
background-origin:

1. border-box 从边框盒子开始
2. padding-box 从内边距盒子开始
3. content-box 从内容盒子开始

默认情况下：

1. 背景颜色在整个 border-box 区域显示
2. 背景图也在整个 border-box 区域显示，但是背景图片的原点在 padding-box 的左上角
   :::

::: caution
写在 background 属性后边 才能生效！！！！
:::

:::normal-demo

```html
<p>切换 checkbox 查看效果 <span id="span-html"></span></p>
<div class="wrapper" id="background-origin"></div>
<div class="actions">
  <span>
    <input type="checkbox" id="toggle" />
    <label for="toggle">border-box</label>
  </span>
  <span>
    <input type="checkbox" id="toggle1" />
    <label for="toggle">padding-box</label>
  </span>
  <span>
    <input type="checkbox" id="toggle2" />
    <label for="toggle">content-box </label>
  </span>
</div>
```

```css
.wrapper {
  /* 给padding-box 加 20px */
  padding: 20px;

  width: 1000px;
  height: 600px;
  background: url('/51853339.jpeg');
  background-color: aqua;
  /* 默认，不平铺 */
  background-repeat: no-repeat;
}
```

```js
const spanHtml = document.querySelector('#span-html')
const background = document.querySelector('#background-origin')

function setPosition() {
  spanHtml.textContent = `background-origin: ${background.style.backgroundOrigin}`
}
document.querySelector('#toggle').addEventListener('change', (e) => {
  background.style.backgroundOrigin = e.target.checked
    ? 'border-box'
    : 'initial'

  setPosition()
})
document.querySelector('#toggle1').addEventListener('change', (e) => {
  background.style.backgroundOrigin = e.target.checked
    ? 'padding-box'
    : 'initial'
  setPosition()
})
document.querySelector('#toggle2').addEventListener('change', (e) => {
  background.style.backgroundOrigin = e.target.checked
    ? 'content-box '
    : 'initial'
  setPosition()
})
```

:::

## 背景裁剪

:::tip
background-clip:

1. border-box
2. padding-box
3. content-box

只有在裁剪区域才会显示背景图
:::

:::normal-demo

```html
<p>切换 checkbox 查看效果 <span id="span-html"></span></p>
<div class="wrapper" id="background-clip"></div>
<div class="actions">
  <span>
    <input type="checkbox" id="toggle" />
    <label for="toggle">border-box</label>
  </span>
  <span>
    <input type="checkbox" id="toggle1" />
    <label for="toggle">padding-box</label>
  </span>
  <span>
    <input type="checkbox" id="toggle2" />
    <label for="toggle">content-box </label>
  </span>
</div>
```

```css
.wrapper {
  /* 给padding-box 加 20px */
  padding: 20px;

  width: 1000px;
  height: 600px;
  background: url('/51853339.jpeg');
  background-color: aqua;
  /* 默认，不平铺 */
  background-repeat: no-repeat;
}
```

```js
const spanHtml = document.querySelector('#span-html')
const background = document.querySelector('#background-clip')

function setPosition() {
  spanHtml.textContent = `background-clip: ${background.style.backgroundClip}`
}
document.querySelector('#toggle').addEventListener('change', (e) => {
  background.style.backgroundClip = e.target.checked ? 'border-box' : 'initial'

  setPosition()
})
document.querySelector('#toggle1').addEventListener('change', (e) => {
  background.style.backgroundClip = e.target.checked ? 'padding-box' : 'initial'
  setPosition()
})
document.querySelector('#toggle2').addEventListener('change', (e) => {
  background.style.backgroundClip = e.target.checked
    ? 'content-box '
    : 'initial'
  setPosition()
})
```

:::

## 背景大小设置

:::tip
background-size:

1. 单位
   x 和 y
   如果只写一个值，那么代表 x y 轴等比缩放
   如果写两个值 图片比例可能发生变化
2. 百分比
   百分比是参照：
   x 是参照内容区域的宽度 既 图片大小 = 内容宽度 _ x 百分比
   y 是参照内容区域的高度 既 图片大小 = 内容宽度 _ y 百分比
3. cover
   等比缩放图片
   直到图片填充整个容器位置（x 和 y 都填充,并且有一个边是刚好贴边）
   图片可能会超出容器
4. contain
   等比缩放图片
   直到图片有一个边充满容器即可
   图片可能充不满整个容器，但是至少一个边是充满的

:::

<style>
  .box {
    width: 600px;
    height: 400px;
    background: url('/51853339.jpeg');
    background-color: aqua;
    background-repeat: no-repeat;
    background-size: 50% 50%;
  }
</style>

:::demo-wrapper

<p align="center">background-size: 50% 50%;</p>

<div class="box"></div>
:::

## 背景是否固定窗口（viewport）

:::tip
background-attachment：用来指明背景图的位置是固定在窗口（viewport）的，还是跟着包含块移动的简单理解为背景图 跟随滚动条的移动方式

1. fixed 相对视窗定位，不会随着滚动条滚动
2. scroll 跟着滚动条滚动

默认跟随滚动
:::

:::normal-demo

```html
<p>切换 checkbox 查看效果 <span id="span-html"></span></p>
<div class="container">
  <div class="content" id="background-attachment">
    <h1>Welcome to My Website</h1>
    <p>This is a background-attachment demo.</p>
  </div>
</div>
<div class="actions">
  <span>
    <input type="checkbox" id="toggle" />
    <label for="toggle">是否 fixed</label>
  </span>
</div>
```

```css
.container {
  height: 300px;
  overflow: auto;
}
.content {
  padding: 20px;
  height: 500px;
  color: #333;
  text-align: center;
  background-image: url('/51853339.jpeg');
  background-position: center center;
  background-repeat: no-repeat;
}
```

```js
const spanHtml = document.querySelector('#span-html')
const background = document.querySelector('#background-attachment')

function setPosition() {
  spanHtml.textContent = `background-attachment: ${background.style.backgroundAttachment}`
}
document.querySelector('#toggle').addEventListener('change', (e) => {
  background.style.backgroundAttachment = e.target.checked ? 'fixed' : 'scroll'

  setPosition()
})
```

:::

## 多重背景的实现

```css
.background-max {
  padding: 20px;
  color: #333;
  text-align: center;
  background: url('/18.png'), url('/1.webp');
  background-repeat: no-repeat;
  height: 300px;
}
```

<style>
  .background-max {
    padding: 20px;
    color: #333;
    text-align: center;
    background: url('/18.png'), url('/1.webp');
    background-repeat: no-repeat;
    height: 300px;
  }
</style>

:::demo-wrapper

<p align="center">多重背景</p>

<div class="background-max">
  <h1>Welcome to My Website</h1>
  <p>This is a background-attachment demo.</p>
</div>
:::
