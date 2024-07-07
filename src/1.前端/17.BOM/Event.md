---
title: PC 浏览器 Event
author: 李嘉明
createTime: 2024/06/09 19:17:48
permalink: /article/4vgb2oky/
tags:
  - BOM
  - DOM
---

区分 BOM 事件和 DOM 事件，可以根据事件的触发对象来进行判断

<!-- more -->

## 事件的捕获和冒泡

:::tip

1. 默认，事件是在冒泡阶段触发
2. 事件监听 `addEventListener` 第三个参数是布尔值，默认是(false) 表示冒泡阶段触发，如果设置为 true，会在捕获阶段触发
3. 其他绑定事件的方式，无法设置在冒泡阶段触发还是捕获阶段触发，统一在冒泡阶段触发

**什么是捕获和冒泡？**

1. 当用户在屏幕上发生动作之后，先进行捕获： 从 document 开始一直到最底层的元素（没有子元素）；目的是确定事件具体发生在了哪个元素。捕获完成之后，进行冒泡，冒泡从最底层的元素一直向上，向他的祖先元素冒泡
2. 而事件监听，是绑定的元素监听到了事件的触发，程序员指定触发的代码, 不管你有没有监听事件，只要发生的点击【触摸】行为，一定会进行捕获和冒泡
   :::

![捕获和冒泡](/event/01.jpg)

## 事件列表

### 鼠标事件

```js
click; // 单击
dblclick; // 双击
contextmenu; // 右击

mousedown; // 鼠标按键按下
mousemove; // 鼠标移动
mouseup; // 鼠标按键抬起

mouseover; // 鼠标悬停在元素上
mouseout; // 鼠标离开元素

mouseenter; // mouseover的代替方案 鼠标悬停在元素上		（IE9+）
mouseleave; // mouseout的代替方法  鼠标离开元素		  (IE9+)
```

**mouseover 与 mouseenter 的区别**

区别在于，是否具有子元素，

1. 如果是 `mouseover` 当他进入子元素的时候，就相当于离开了 绑定元素的范围，同时事件会冒泡到父元素中，导致事件又触发一次
2. 如果是 `mouseenter` 不管有没有子元素，它只会触发一次，所以推荐使用 mouseenter

:::normal-demo

```css
.outer {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: pink;
}
.inner {
  width: 50px;
  height: 50px;
  background-color: aqua;
}
```

```html
<div class="outer">
  <div class="inner"></div>
</div>
```

```js
document.querySelector('.outer').addEventListener('mouseover', (ev) => {
  console.count('mouseover' + '有子元素不断触发');
});
document.querySelector('.outer').addEventListener('mouseenter', (ev) => {
  console.count('mouseenter' + '有无子元素都不会再次触发');
});
```

:::

### 键盘事件

键盘只能跟【可以输入的元素产生交互】，还有就是 document,因为键盘按下，不管你绑定给谁，最后一定是事件冒泡到 document 节点上

```js
keydown; // 键盘的按键按下触发事件， 触发一次
keyup; // 键盘的按键抬起触发事件，触发一次
keypress; // 键盘的按键按下（字符按键）触发一次
```

:::normal-demo

```html
<input type="text" id="input" placeholder="keydown + keyup 测试" />
```

```js
document.querySelector('#input').addEventListener('keydown', () => {
  console.log('keydown');
});

document.querySelector('#input').addEventListener('keyup', (ev) => {
  console.log('keyup' + ev.target.value);
});
```

:::

### 文档事件

```js
load; // 文档加载完成
unload; // 文档关闭  浏览器绑定该事件的时候，不允许弹框。
beforeunload; // 文档关闭之前

// 有兼容性
DOMContentLoaded; // 文档DOM元素加载完触发事件

visibilitychange; // 用于检测整个文档的可见性状态变化的事件
```

**visibilitychange**
:::normal-demo

```html
<p>监听文档是否可见，需要复制出去运行，效果：当你切换页面的时候，会改变tab 标题</p>
```

```js
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === 'visible') {
    document.title = '页面可见';
  } else {
    document.title = '页面不可见';
  }
});
```

:::

**beforeunload**

:::tip
需要注意的一件事是当页面去加载图片【外部文件】的时候，浏览器是不会等待图片下载完才去渲染页面，而是异步的去渲染页面，图片相当于是引入了一个外部文件，只是占着一个位置，你这个时候去获取图片的宽度和高度，是获取不到的,而是需要等待页面全部加载完成才能获取
:::

:::normal-demo

```html
<p>关闭标签页弹出提示</p>
```

```js
window.isCloseHint = true;
// 初始化关闭
window.addEventListener('beforeunload', function (e) {
  if (window.isCloseHint) {
    let confirmationMessage = '您确定要关闭窗口吗，如果关闭窗口下载会停止！';
    (e || window.event).returnValue = confirmationMessage;
    return confirmationMessage;
  }
});
```

:::

### 表单事件

```js
submit; // 表单提交的时候
reset; // 表单重置的时候
blur; // 当表单控件失去焦点的时候
focus; // 当表单控件获取焦点的时候
focusin; // 当元素或其子元素获得焦点时触发。该事件在捕获阶段触发，所以会在子元素的 focus 事件之前触发。
focusout; // 当元素或其子元素失去焦点时触发。该事件在捕获阶段触发，所以会在子元素的 blur 事件之前触发
select; // 当输入框内的文本被选中的时候
change; // 表单控件内容改变的时候 用于select或者input:radio以及input:checkbox
```

### 图片事件

```js
load; // 图片加载完毕
error; // 图片加载错误
abort; // 图片加载中断
```

### 滚轮事件

```js
mousewheel; //用于chrome和IE
DOMMouseScroll; //用于firefox	只能使用addEventListener监听
```

```js
//ie/chrome
ele.addEventListener('onmousewheel',scrollMove);
//firefox
ele.addEventListener('DOMMouseScroll',scrollMove);

 function scrollMove(event) {
    var flag = null;
    if(event.wheelDelta){
      //ie/chrome
      if(event.wheelDelta > 0){
        //上
        flag = 'up';
      }else {
        //下
        flag = 'down'
      }
    }else if(event.detail){
      //firefox
      if(event.detail < 0){
        //上
        flag = 'up';
      }else {
        //下
        flag = 'down'
      }
    }
     ...
 }
```

**获取滚轮滚动方向：**

```js
event.wheelDelta; // chrome和IE 120表示向上滚动， -120表示向下滚动
event.detail; //firefox的用法 3表示向下滚动  -3表示向上滚动
```

### 窗口事件

```js
scroll; // 内容发生滚动  绑定给有滚动条的元素或者window
resize; // 视口大小发生变化  绑定给window
pageshow; // 页面显示触发事件，包括了后退/前进按钮操作，同时也会在onload 事件触发后初始化页面时触发
// 只读属性: persisted 表示网页是否是来自缓存.
storage; // 当存储区域（localStorage 或 sessionStorage）被修改时，将触发 storage 事件
```

### 过渡事件

```js
// 具有一定兼容性，浏览器必须支持css3
transitionstart; // 过渡开始时触发事件
transitionend; // 过渡结束时触发事件
transitioncancel; // 过渡中断触发事件
```

### 网络事件

```js
online; // 网络连接触发事件
offline; // 网络断开触发事件
```

## 事件对象

```js
// clientX/Y获取到的是触发点相对视口左上角距离，不随页面滚动而改变。所有浏览器均支持
event.clientX;
event.clientY;
// offsetX/Y获取到是触发点相对被触发元素的左上角距离,
// 其中在IE中以内容区左上角为基准点不包括边框，
// 如果触发点在边框上会返回负值，而chrome中以边框左上角为基准点。
event.offsetX;
event.offsetY;
// screenX/Y获取到的是触发点相对显示器屏幕左上角的距离，不随页面滚动而改变。所有浏览器均支持
event.screenX;
event.screenY;
// pageX/Y获取到的是触发点相对文档区域左上角距离，
// 会随着页面滚动而改变,除IE6/7/8不支持外，其余浏览器均支持
event.pageX;
event.pageY;
```

### 鼠标事件对象 MouseEvent

```js
clientX / clientY; // 鼠标在视口上的位置
offsetX / offsetY; // 鼠标在元素上的位置,并不是绑定给谁就是谁，而是event.target所指的元素
pageX / pageY; // 鼠标在页面上（根元素上）的位置
screenX / screenY; // 鼠标在屏幕上的位置
button; // 鼠标按键键值 （0表示左键，1表示滑轮， 2表示右键）
```

### 键盘事件对象 KeyboardEvent

```js
event.keyCode; // 键盘按键对应的ascii值
event.which; // 同keyCode
event.key; // 键盘按键的值 （返回是字符串）
```

### 所有的事件对象共有的属性 Event

```js
event.type; // 返回事件类型（事件名）
event.timeStamp; // 触发事件时的时间戳（从页面打开的那一刻开始计算）
event.target; // 获取目标元素 （事件委派）
event.stopPropagation(); // 阻止冒泡
event.preventDefault(); // 阻止默认行为（一些元素发生某些事件之后又默认行为）
```

**注意：** 在事件绑定的函数内，return false 既能阻止事件冒泡，又可以阻止默认行为。

## 事件委派

为了给动态添加的元素也绑定事件，就直接给祖先元素绑定事情，事件冒泡通过 `event.target` 得到触发事件的 元素
