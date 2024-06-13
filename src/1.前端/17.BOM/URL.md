---
title: window.URL 对象
author: 李嘉明
createTime: 2024/06/13 22:49:25
permalink: /article/9e5vgin3/
tags:
  - BOM
---


## URL.createObjectURL

`URL.createObjectURL()`方法会根据传入的参数创建一个指向该参数对象的 URL. 这个 URL 的生命仅存在于它被创建的这个文档里. 新的对象 URL 指向执行的 File 对象或者是 Blob 对象.

**语法:**

```JS
const objectURL = window.URL.createObjectURL(blob || file);
```

**参数:**

File 对象或者 Blob 对象

这里大概说下 File 对象和 Blob 对象:

File 对象,就是一个文件,比如我用 input type="file" 标签来上传文件,那么里面的每个文件都是一个 File 对象.

Blob 对象,就是二进制数据,比如通过 `new Blob()` 创建的对象就是 Blob 对象.又比如,在 XMLHttpRequest 里,如果指定 responseType 为 blob,那么得到的返回值也是一个 blob 对象.

**注意点:**

每次调用 createObjectURL 的时候,一个新的 URL 对象就被创建了.即使你已经为同一个文件创建过一个 URL. 如果你不再需要这个对象,要释放它,需要使用 URL.revokeObjectURL()方法. 当页面被关闭,浏览器会自动释放它,但是为了最佳性能和内存使用,当确保不再用得到它的时候,就应该释放它.

## URL.revokeObjectURL

`URL.revokeObjectURL()`方法会释放一个通过`URL.createObjectURL()`创建的对象 URL. 当你要已经用过了这个对象 URL,然后要让浏览器知道这个 URL 已经不再需要指向对应的文件的时候,就需要调用这个方法.

具体的意思就是说,一个对象 URL,使用这个 url 是可以访问到指定的文件的,但是我可能只需要访问一次,一旦已经访问到了,这个对象 URL 就不再需要了,就被释放掉,被释放掉以后,这个对象 URL 就不再指向指定的文件了.

比如一张图片,我创建了一个对象 URL,然后通过这个对象 URL,我页面里加载了这张图.既然已经被加载,并且不需要再次加载这张图,那我就把这个对象 URL 释放,然后这个 URL 就不再指向这张图了.

**语法:**

```js
window.URL.revokeObjectURL(objectURL);
```

**参数:**

objectURL 是一个通过 URL.createObjectURL()方法创建的对象 URL

这两个方法不支持低版本浏览器.

## 例子

```js
//获取图片Blob数据
$.ajax({
  type: 'GET',
  url: 'img.png',
  resDataType: 'blob',
  imgType: 'png',
  success: function (resText) {
    var img = document.createElement('img');
    // 创建URL
    var objectUrl = window.URL.createObjectURL(resText);
    img.src = objectUrl;
    img.onload = function () {
      // 销毁URL
      window.URL.revokeObjectURL(objectUrl);
    };
    document.body.appendChild(img);
  },
  fail: function (err) {
    console.log(err);
  },
});
```

指定返回的数据格式为 blob 二进制数据，通过返回的图片二进制数据来创建一个 URL 对象，当图片加载完成后释放URL 对象.
