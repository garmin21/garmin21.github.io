---
title: BOM 浏览器对象模型
author: 李嘉明
createTime: 2030/05/26 12:18:56
permalink: /article/19nmullk/
tags:
  - BOM
---

- Browser Object Model 浏览器对象模型
- 是用于描述这种对象与对象之间层次关系的模型，浏览器对象模型提供了独立于内容的、可以与浏览器窗口进行互动的对象结构。
- 其中代表浏览器窗口的 Window 对象是 BOM 的顶层对象，其他对象都是该对象的子对象

## 作用

- 1. 弹出新浏览器窗口的能力；
- 2. 移动、关闭和更改浏览器窗口大小的能力；
- 3. 可提供 WEB 浏览器详细信息的导航对象；
- 4. 可提供浏览器载入页面详细信息的本地对象；
- 5. 可提供用户屏幕分辨率详细信息的屏幕对象；
- 6. 支持 Cookies；

## window

:::tip
window 对象是客户端 JavaScript 的全局对象，是所有客户端 JavaScript 特性和 API 的主要接入点，它表示 Web 浏览器的一个窗口或窗体,并且用标识符 window 来引用它
:::

### 属性

```js
document; // 对 Document文档 对象的只读引用。请参阅 Document 对象。
location; // 用于窗口或框架的 Location 地址对象。请参阅 Location 对象。
history; // 对 History历史记录 对象的只读引用。请参数 History 对象。
navigator; // 对 Navigator导航对象的只读引用。请参数 Navigator 对象。
screen; // 对 Screen 屏幕对象的只读引用。请参数 Screen 对象。
innerHeight; // IE9+ 返回窗口的文档显示区的高度。是视口（页面中的文档区域）
innerWidth; // IE9+ 返回窗口的文档显示区的宽度。是视口（页面中的文档区域）
outerHeight; // IE9+ 返回窗口的外部高度。是浏览器窗口
outerWidth; // IE9+ 返回窗口的外部宽度。是浏览器窗口
self; // 返回对当前窗口的引用。等价于 Window 属性。
length; // 设置或返回窗口中的框架数量。
name; // 设置或返回窗口的名称。 name 可以是iframe的name属性 如果是浏览器窗口直接打开,name的属性为空
closed; // 返回窗口是否已被关闭。
opener; // 返回对创建此窗口的窗口的引用。
parent; // 返回父窗口。
top; // 返回最顶层的先辈窗口。

// 获取视口宽度
// window.innerWidth 【ie8不认识】
window.innerWidth || document.documentElement.clientWidth;
// 获取视口高度
// document.documentElement.clientHeight 获取的是视口的高度，不会被子元素的高度撑开,这是一种特殊情况
window.innerHeight || document.documentElement.clientHeight;
```

### 方法

```js
alert(); // 显示带有一段消息和一个确认按钮的警告框。
confirm(); // 显示带有一段消息以及确认按钮和取消按钮的对话框。
prompt(); // 显示可提示用户输入的对话框。
setInterval(); // 按照指定的周期（以毫秒计）来调用函数或计算表达式。
setTimeout(); // 在指定的毫秒数后调用函数或计算表达式。
clearInterval(); // 取消由 setInterval() 设置的 timeout。
clearTimeout(); // 取消由 setTimeout() 方法设置的 timeout。
// 打开一个窗口 参数一：地址  参数二：窗口名字  参数三：指定窗口大小 width=400,height=300
open(); // 打开一个新的浏览器窗口或查找一个已命名的窗口。
close(); // 关闭浏览器窗口。（只有open打开才能关闭）
print(); // 打印当前窗口的内容。
moveBy(); // 可相对窗口的当前坐标把它移动指定的像素。 仅IE
moveTo(); // 把窗口的左上角移动到一个指定的坐标。 仅IE
resizeBy(); // 按照指定的像素调整窗口的大小。 仅IE
resizeTo(); // 把窗口的大小调整到指定的宽度和高度。 仅IE
scrollTo(x, y); // 页面滚动到指定的坐标位置
// 可以指定一个参数配置对象：top : y, left : x, behavior: 默认值(瞬间滚动instant), (平滑滚动smooth)
scrollBy(x, y); // 页面滚动多少距离【像素】
// base64编码和解码
atob(); // 解码
btoa(); // 编码

// 该方法会在浏览器重绘之前来调用指定的回调函数, 返回一个 ID，唯一标识，用于取消回调函数
requestAnimationFrame(callBack);
cancelAnimationFrame(id); // 用于取消 回调函数

// requestIdleCallback() 主要用来在浏览器空闲时运行高耗时、低优先级的任务
requestIdleCallback(callback, options)
cancelIdleCallback(id)
```

**requestAnimationFrame**
:::normal-demo

```css
.outer {
  width: 50px;
  height: 50px;
  background-color: aqua;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

```html
<div class="outer">0</div>
<button onclick="handleClick()">按钮</button>
```

```js
let number = 0;
let _isClick = false;
const outer = document.querySelector('.outer');
function step() {
  if (_isClick) {
    number++;
  } else {
    number--;
  }

  outer.style.marginLeft = number * 2 + 'px';
  outer.textContent = number
  if (_isClick && number < 100) {
    window.requestAnimationFrame(step);
  }

  if (!_isClick && number > 0) {
    window.requestAnimationFrame(step);
  }
}

function handleClick() {
  _isClick = !_isClick;
  window.requestAnimationFrame(step);
}
```

:::

## history

用来把窗口的浏览历史用文档和文档状态列表的形式表示
处于安全考虑,脚本不能访问以保存的 URL

> history 对象表示窗口的历史记录

### 属性

```js
length; // 获取当前窗口的历史浏览记录个数
```

### 方法

```js
back(); // 加载 history 列表中的前一个 URL。
forward(); // 加载 history 列表中的下一个 URL。
go(); // 加载 history 列表中的某个具体页面。
```

## location

表示该窗口中当前显示的文档的 URL
并定义了方法来使窗口载入新的文档

> **location 描述地址信息，location 和他的属性【可读可写】**

### 属性

```js
href; // 设置或返回完整的 URL。
protocol; // 设置或返回当前 URL 的协议。
host; // 设置或返回主机名和当前 URL 的端口号。
hostname; // 设置或返回当前 URL 的主机名。
port; // 设置或返回当前 URL 的端口号。
pathname; // 设置或返回当前 URL 的路径部分。
hash; // 设置或返回从井号 (#) 开始的 URL（锚）。
search; // 设置或返回从问号 (?) 开始的 URL（查询部分）。
```

### 方法

```js
reload(); // 页面重新加载 // 刷新
assign(); // 打开一个新的页面后 还可以后退 // 类似于open
replace(); // 打开新的页面（会把当前页面的历史记录抹掉）不能后退了
```

## screen

提供有关窗口显示大小和可用颜色数量的信息

### 属性

```js
width; // 返回显示器屏幕的宽度。
height; // 返回显示屏幕的高度。
availHeight; // 返回显示屏幕的高度 (除 Windows 任务栏之外)。
availWidth; // 返回显示屏幕的宽度 (除 Windows 任务栏之外)。
colorDepth; // 返回目标设备或缓冲器上的调色板的比特深度。
```

## navigator

该对象描述了浏览器厂商和版本信息
Navigator 是为了 纪念 NetSpace 公司的 Navigator 浏览器

### 属性

```js
appName; // 返回浏览器的名称。
appVersion; // 返回浏览器的平台和版本信息。
userAgent; // 返回由客户机发送服务器的 useragent 头部的值。
onLine; // 返回指明系统是否处于脱机模式的布尔值。
appCodeName; // 返回浏览器的代码名。
cookieEnabled; // 返回指明浏览器中是否启用 cookie 的布尔值。
language; // 获取浏览器当前所处的语言环境
platform; // 获取当前平台，帮助区分 Windows/Linux/Mac 等
clipboard; // 原生提供的复制api, navigator.clipboard.writeText('你好？？？')
```

### 方法

```js
javaEnabled(); // 规定浏览器是否启用 Java。
```
