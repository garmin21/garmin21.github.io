---
title: FileReader对象
author: 李嘉明
createTime: 2024/05/26 21:27:10
permalink: /article/a3eerq3w/
tags:
  - BOM
---

:::tip
WEB API接口:
`FileReader` 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 [`File`](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 或 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 对象指定要读取的文件或数据。 
:::

### 实例化

```js
const reader = new FileReader();
```

### 属性

```js
FileReader.error  // 只读一个DOMException，表示在读取文件时发生的错误 。
FileReader.readyState // 只读,表示FileReader状态的数字。取值如下：
        EMPTY	0	// 还没有加载任何数据.
        LOADING	1	// 数据正在被加载.
        DONE	2	// 已完成全部的读取请求.
FileReader.result // 只读,文件的内容。该属性仅在读取操作完成后才有效，数据的格式取决于使用哪个方法来启动读取操作。
```



### 实例方法

```js
// 1. 异步按字符读取文件内容，结果用字符串表示形式
reader.readAsText(this.files[0]);
// 2. 异步读取文件内容，结果为data:url的形式表示
reader.readAsDataURL(this.files[0])
// 3. 异步按照字节读取文件内容，结果为文件的二进制串
reader.readAsBinaryString(this.files[0])
// 4. 异步按字节读取文件内容，结果用 ArrayBuffer 对象表示
reader.readAsArrayBuffer(this.files[0])
// 5. 中止读取操作
reader.abort()
```



### 事件

| `onabort`     | 中断时触发                     |
| ------------- | ------------------------------ |
| `onerror`     | 出错时触发                     |
| `onload`      | 文件读取成功完成时触发         |
| `onloadend`   | 读取完成触发（无论成功或失败） |
| `onloadstart` | 读取开始时触发                 |
| `onprogress`  | 读取中                         |



### ArrayBuffer 对象

>  `ArrayBuffer` 对象用来表示通用的、固定长度的原始二进制数据缓冲区.`ArrayBuffer` 不能直接操作,而是要通过类型数组对象或 `DataView` 对象来操作,它们会将缓冲区中的数据表示为特定的格式,并通过这些格式来读写缓冲区的内容. 

 `ArrayBuffer`也是一个构造函数，可以分配一段可以存放数据的连续内存区域 

```js
const buffer = new ArrayBuffer(8);
// ArrayBuffer 对象有实例属性 byteLength ，表示当前实例占用的内存字节长度（单位字节）
console.log(buffer.byteLength);
```

 由于无法对 `Arraybuffer` 直接进行操作,所以我们需要借助其他对象来操作. 所有就有了 `TypedArray`(类型数组对象)和 `DataView`对象。 

####  `DataView 对象`

>  `DataView`视图是一个可以从二进制`ArrayBuffer`对象中读写多种数值类型的底层接口。

1. `setint8()` 从`DataView`起始位置以`byte`为计数的指定偏移量（`byteOffset`）处存储一个`8-bit`数（一个字节）

2. `getint8()` 从`DataView`起始位置以`byte`为计数的指定偏移量（`byteOffset`）处获取一个`8-bit`数（一个字节）



```js
let buffer = new ArrayBuffer(2);
console.log(buffer.byteLength); // 2
let dataView = new DataView(buffer);
dataView.setInt(0, 1);
dataView.setInt(1, 2);
console.log(dataView.getInt8(0)); // 1
console.log(dataView.getInt8(1)); // 2
console.log(dataView.getInt16(0)); // 258
```

#### `TypedArray`

> `TypedArray`视图，与`DataView`视图的一个区别是，它不是一个构造函数，而是一组构造函数，代表不同的数据格式。`TypedArray`对象描述了一个底层的二进制数据缓存区（`binary data buffer`）的一个类数组视图（`view`）。但它本身不可以被实例化，甚至无法访问，你可以把它理解为接口，它有很多的实现

实现方法


```js
const buffer = new ArrayBuffer(8);
console.log(buffer.byteLength); // 8
const int8Array = new Int8Array(buffer);
console.log(int8Array.length); // 8
const int16Array = new Int16Array(buffer);
console.log(int16Array.length); // 4
```



### Blob对象

>  `Blob`是用来支持文件操作的。简单的说：在`JS`中，有两个构造函数 `File` 和 `Blob`, 而`File`继承了所有`Blob`的属性。  `File`对象可以看作一种特殊的`Blob`对象。 

