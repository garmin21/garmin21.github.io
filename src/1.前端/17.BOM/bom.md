---
title: BOM 浏览器对象模型
author: 李嘉明
createTime: 2024/05/26 12:18:56
permalink: /article/19nmullk/
tags:
  - BOM
---

## 1 window

```txt
window对象：
	window是JS的全局对象；
	所有的全局属性都是window的属性
	使用window的属性和方法的时候，可以省略window.; 
	系统的函数 alert\prompt\Number\Boolean\Array\Object等 也是window的属性
```



#### ① 属性

```txt
document 文档
history  历史记录
location url地址
screen 屏幕
navigator 导航
innerWidth / innerHeight   是视口的宽度（页面中的文档区域）
outerWidth / outerHeight   是浏览器窗口的宽高
name   标记窗口的名字/系统要求name的值必须是字符串，如果设置了其他类型也会自动转为字符串！！
```

#### ② 方法

```js
alert（） 警告框
confirm()  确认框
prompt()  输出框
setInterval()
setTimeout()
clearInterval()
clearTimeout()
open()  //打开一个窗口 参数一：地址  参数二：窗口名字  参数三：指定窗口大小 width=400,height=300
close()  // 关闭窗口（只有open打开才能关闭）
print() 调用打印
scrollTo(x, y) 页面滚动到指定的坐标位置 
// 可以指定一个参数配置对象：top : y, left : x, behavior: 默认值(瞬间滚动instant), (平滑滚动smooth)
scrollBy(x, y) 页面滚动多少距离【像素】
// base64编码和解码
window.atob() // 解码
window.btoa() // 编码
```

```js
window.requestAnimationFrame(callBack); 
	// ① 该方法会在浏览器重绘之前来调用指定的回调函数
    // ② 返回一个requestID，唯一标识，用于取消回调函数
window.cancelAnimationFrame(requestID);
	// 用于取消 回调函数
```



### 定时器函数

> 延迟多长时间执行一次回调函数中的代码

```
setInterval()	多次定时器
clearInterval() 清除多次定时器
setTimeout()	单次定时器
clearTimeout() 清除单次定时器
```

#### 1.1 steInterval()

```js
// 用于多次定时，返回值是一个数字，这个值只赋值一次，用于清除定时
// 理解：当使用多个定时，每个定时的定时标记才会不一样
```

**注意**: `steInterval在执行之前都有一段时间的空挡期`

#### 1.2 steTimeout()

```js
// 用于单次定时，并且只定时一次
```
> 使用 steTimeout 实现多次定时的效果

```js
// 定义数字标记变量
var number = 10;
// 定义函数
function run(){
    // --在后，先参与运算，在 --
    number--;
    // 判断 number < 0 让程序停止运行
    if(number < 0){
        // 当 number 小于 0 时 程序就不在运行了
        return;
    }
    // 不断的调用，run函数，形成 类似 递归一样的效果
    setTimeout(run,1000);
}
run();
```

![定时器](/async/定时器.svg)

> setTimeout 和 setInterval 的第三个参数： **第三个参数及以后的参数都可以作为定时器回调函数的参数** 

## 2 history

> history 对象表示窗口的历史记录

#### ① 属性

```js
length // 获取当前窗口的历史浏览记录个数
```

#### ② 方法

```js
// 使页面进行后退以及前进的操作
back() // 上一步
forward() // 下一步
go() // 负代表上 正表示下
```

## 3 location

> **location描述地址信息，location和他的属性【可读可写】**

#### ① 属性

```txt
href 完整的URL
protocol 协议部分
hostname  主机名部分
port 端口
host  主机名+端口
pathname  路径部分s
search   ?搜索部分
hash    锚点部分
```

#### ② 方法

```js
reload() 页面重新加载 // 刷新
assign()	打开一个新的页面后 还可以后退 // 类似于open
replace()   打开新的页面（会把当前页面的历史记录抹掉）不能后退了
```

## 4 screen

#### 属性

```
width 屏幕宽高
height
```

## 5. navigator

#### 属性

```js
navigator.userAgent   // 获取用户浏览器的信息
navigator.language    // 获取浏览器当前所处的语言环境
navigator.platform    // 获取当前平台，帮助区分 Windows/Linux/Mac 等
navigator.clipboard   // 原生提供的复制api
// navigator.clipboard.writeText('你好？？？')
```


