---
title: 浏览器中的 Event
author: 李嘉明
createTime: 2024/06/09 19:17:48
permalink: /article/4vgb2oky/
---

### 1. 给元素监听/绑定事件

#### 1.1 事件的监听/绑定 三种方式

```js
// 第一种方法  把事件当做标签的属性
<button onclick="fn()"></button>;

// 第二种方法， 把事件当做元素对象的方法
btnElement.onclick = fn;

// 第三种方法 事件监听方式
// 所有以大写字母开头的事件，必须使用事件监听的方式
element.addEvenetListener('click', fn);
```

#### 1.2 解除事件绑定

```js
// 如果是第一种方式绑定 把事件当做标签属性
element.onclick = null; //覆盖

// 如果是第二种方式绑定 把事件当做元素对象方法
element.onclick = null; //覆盖

// 如果是第三种方式绑定 事件监听， 移除监听者
element.removeEventListener('click', fn);
```

#### 1.3 事件监听兼容性问题

```js
//IE9+ 以及其他浏览器
addEventListener();
removeEventListener();

// IE8以及以下
attachEvent(); //添加监听 事件名加on
detachEvent(); //移除监听
```

### 2. 事件的捕获和冒泡

```js
// 默认，事件是在冒泡阶段触发
//【事件监听】addEventListener（） 第三个参数是布尔值，默认是(false)表示冒泡阶段触发，如果设置为true，会在捕获阶段触发
// 其他绑定事件的方式，无法设置在冒泡阶段触发还是捕获阶段触发，统一在冒泡阶段触发

// 什么是捕获和冒泡？

// 当用户在屏幕上发生动作之后，先进行捕获： 从document开始一直到最底层的元素（没有子元素）； 目的是确定事件具体发生在了哪个元素。捕获完成之后，进行冒泡，冒泡从最底层的元素一直向上，向他的祖先元素冒泡
// 而事件监听，是绑定的元素监听到了事件的触发，程序员指定触发的代码
// 不管你有没有监听事件，只要发生的点击【触摸】行为，一定会进行捕获和冒泡
```

![捕获和冒泡](event/01.png)

### 4 事件列表

#### 4.1 鼠标事件

```js
click; // 单击
dblclick; // 双击
contextmenu; // 右击
mousedown; // 鼠标按键按下
mouseup; // 鼠标按键抬起
mousemove; // 鼠标移动
mouseover; // 鼠标悬停在元素上
mouseout; // 鼠标离开元素
mouseenter; // mouseover的代替方案 鼠标悬停在元素上		（IE9+）
mouseleave; // mouseout的代替方法  鼠标离开元素		  (IE9+)
```

#### 4.2 键盘事件

键盘只能跟【可以输入的元素产生交互】，还有就是 document,因为键盘按下，不管你绑定给谁，最后一定是事件冒泡到 document 节点上

```js
keydown   // 键盘的按键按下
keyup	  // 键盘的按键抬起
keypress  // 键盘的按键按下（字符按键）
```

#### 4.3 文档事件

```js
load  	 		// 加载完成
unload   		// 文档关闭  浏览器绑定该事件的时候，不允许弹框。
beforeunload    // 文档关闭之前

// 有兼容性
DOMContentLoaded  // 文档DOM元素加载完触发事件
```

:::tip
需要注意的一件事是当页面去加载图片【外部文件】的时候，浏览器是不会等待图片下载完才去渲染页面，而是异步的去渲染页面，图片相当于是引入了一个外部文件，只是占着一个位置，你这个时候去获取图片的宽度和高度，是获取不到的,而是需要等待页面全部加载完成才能获取
:::

#### 4.4 表单事件

```js
submit		// 表单提交的时候
reset		// 表单重置的时候
blur		// 当表单控件失去焦点的时候
focus		// 当表单控件获取焦点的时候
select      // 当输入框内的文本被选中的时候
change		// 表单控件内容改变的时候 用于select或者input:radio以及input:checkbox
```

#### 3.5 图片事件

```js
load	   // 图片加载完毕
error      // 图片加载错误
abort 	   // 图片加载中断
```

#### 3.6 其他事件

```js
scroll     // 内容发生滚动  绑定给有滚动条的元素或者window
resize     // 视口大小发生变化  绑定给window
pageshow   // 页面显示触发事件，包括了后退/前进按钮操作，同时也会在onload 事件触发后初始化页面时触发
	       // 只读属性: persisted 表示网页是否是来自缓存.
storage	   // 当存储区域（localStorage 或 sessionStorage）被修改时，将触发 storage 事件
```

#### 3.7 滚轮事件

```js
mousewheel;      //用于chrome和IE
DOMMouseScroll;  //用于firefox	只能使用addEventListener监听
```

**获取滚轮滚动方向：**
```js
event.wheelDelta;  // chrome和IE 120表示向上滚动， -120表示向下滚动
event.detail;  //firefox的用法 3表示向下滚动  -3表示向上滚动
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

#### 3.8 过渡事件

```js
// 具有一定兼容性，浏览器必须支持css3
transitionstart;   // 过渡开始时触发事件
transitionend;     // 过渡结束时触发事件
transitioncancel;  // 过渡中断触发事件
```

#### 3.9 网络事件

```js
online;   // 网络连接触发事件
offline;  // 网络断开触发事件
```

### 5 事件对象

```js
// clientX/Y获取到的是触发点相对视口左上角距离，不随页面滚动而改变。所有浏览器均支持
event.clientX / event.clientY;
//offsetX/Y获取到是触发点相对被触发dom的左上角距离,其中在IE中以内容区左上角为基准点不包括边框，如果触发点在边框上会返回负值，而chrome中以边框左上角为基准点。
event.offsetX / event.offsetY;
// screenX/Y获取到的是触发点相对显示器屏幕左上角的距离，不随页面滚动而改变。所有浏览器均支持
event.screenX / event.screenY;
// pageX/Y获取到的是触发点相对文档区域左上角距离，会随着页面滚动而改变,除IE6/7/8不支持外，其余浏览器均支持
event.pageX / event.pageY;
```

#### 5.1 鼠标事件对象 MouseEvent

```js
event.clientX / clientY		// 鼠标在视口上的位置
event.offsetX / offsetY		// 鼠标在元素上的位置,并不是绑定给谁就是谁，而是event.target所指的元素
event.pageX / pageY			// 鼠标在页面上（根元素上）的位置
event.screenX / screenY		// 鼠标在屏幕上的位置
event.button					// 鼠标按键键值 （0表示左键，1表示滑轮， 2表示右键）
```

#### 5.2 键盘事件对象 KeyboardEvent

```js
event.keyCode    // 键盘按键对应的ascii值
event.which      // 同keyCode
event.key		 // 键盘按键的值 （返回是字符串）
```

#### 5.3 所有的事件对象共有的属性 Event

```js
event.type		// 返回事件类型（事件名）
event.timestamp   // 触发事件时的时间戳（从页面打开的那一刻开始计算）
event.target		// 获取目标元素 （事件委派）
event.stopPropagation()   // 阻止冒泡
event.preventDefault()    // 阻止默认行为（一些元素发生某些事件之后又默认行为）
```

**注意：** 在事件绑定的函数内，return false 既能阻止事件冒泡，又可以阻止默认行为。

### 6 事件委派

为了给动态添加的元素也绑定事件，就直接给祖先元素绑定事情，事件冒泡通过 `event.target` 得到触发事件的 元素

### 1. 视口大小


