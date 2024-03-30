---
title: 8-16 FileReader对象
date: '2022-08-16'
categories:
    - javascript
tags:
    - javascript
publish: true
---

FileReader 对象允许 Web 应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。(简单来说就是 web 端的读取文件)

### 实例化

```js
const reader = new FileReader()
```

### 属性

```js
error // 只读，表示在读取文件时发生的错误 。
readyState // 只读，表示FileReader状态的数字
// 取值如下：
//   EMPTY	0	还没有加载任何数据.
//   LOADING	1	数据正在被加载.
//   DONE	2	已完成全部的读取请求.

result //只读， 文件的内容。该属性仅在读取操作完成后才有效
```

### 实例方法

```js
// 1. 异步按字符读取文件内容，结果用字符串表示形式
reader.readAsText(this.files[0])
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

### 案例

```js
document.querySelector('input').onchange = function () {
    console.log(this.files, 'files')
    // 初始化
    var reader = new FileReader()

    reader.onloadstart = function () {
        console.log('开始读取', 'onloadstart')
    }

    reader.onprogress = function () {
        console.log('读取中触发', 'onprogress')
    }

    reader.onabort = function () {
        console.log('中断时触发', 'onabort')
    }
    reader.onerror = function () {
        console.log('读取出错时触发', 'onerror')
    }

    console.log(reader.readyState, 'readyState')
    // 1. 异步按字符读取文件内容，结果用字符串表示形式
    // reader.readAsText(this.files[0]);
    // 2. 异步读取文件内容，结果为data:url的形式表示
    // reader.readAsDataURL(this.files[0])
    // 3. 异步按照字节读取文件内容，结果为文件的二进制串
    // reader.readAsBinaryString(this.files[0])
    // 4. 异步按字节读取文件内容，结果用 ArrayBuffer 对象表示
    // reader.readAsArrayBuffer(this.files[0])
    // 5. 中止读取操作
    // reader.abort()
    // 当文件读取完毕之后，会把内容存放到 result 里面去
    reader.onload = function () {
        console.log(this.result, 'result')
        document.body.innerHTML = this.result
    }

    reader.onloadend = function () {
        console.log('读取完成触发，无论成功还是失败', 'onloadend')
    }
}
```
