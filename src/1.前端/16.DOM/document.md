---
title: Document 文档
author: 李嘉明
createTime: 2030/05/26 00:38:03
permalink: /article/hq2p9x43/
tags:
  - DOM
---

:::tip
document 表示整个 HTML 文档，它是 DOM 的根节点。通过 document 对象，可以访问和操作整个文档的内容、结构和样式。document 对象提供了许多方法和属性，用于在文档中查找、创建、修改和删除元素，以及处理事件等。
:::


## 属性
```js
document.all  //所有的元素组成的集合（类数组对象）
//document.all的妙用
if (document.all) {
    //说明是IE浏览器   IE10以及以下版本
} else {
    // 说明非IE浏览器 IE11以及EDGE 
}
document.doctype        //文档类型
document.documentElement //获取html元素
document.defaultView    //返回document对象所在的window对象
document.body       //返回当前文档的<body>节点
document.head       //[返回当前文档的<head>节点
document.activeElement //返回当前文档中获得焦点的那个元素。

//节点集合属性
document.links  //返回当前文档的所有a元素
document.forms//返回页面中所有表单元素
document.images //返回页面中所有图片元素
document.embeds//返回网页中所有嵌入对象
document.scripts//返回当前文档的所有脚本
document.stylesheets//返回当前网页的所有样式表

//文档信息属性
document.documentURI//表示当前文档的网址
document.URL//页面地址（只读）
document.domain//返回当前文档的域名（只读）
document.lastModified//返回当前文件的最后一次修改时间（只读）
document.location//返回location对象，提供当前文档的URL信息
document.referrer//历史记录中上一个地址（只读）
document.title//返回当前文档的网页标题（可读可写）
document.characterSet //属性返回渲染当前文档的字符集，比如UTF-8、ISO-8859-1。
document.readyState //返回当前文档的状态
document.designMode //控制当前文档是否可编辑，可读写
document.compatMode //返回浏览器处理文档的模式
document.cookie//用来操作cookie 会话内容（可读可写）
```

## 读写方法

```js
document.open(); //用于新建并打开一个文档
document.close(); //关闭比open方法所新建的文档
document.write(); //用于向当前文档写入内容
document.writeIn(); //用于向当前文档写入内容，尾部添加换行符。
```

## 查找节点方法

```js
document.querySelector(selectors); //接受一个CSS选择器作为参数，返回第一个匹配该选择器的元素节点。
document.querySelectorAll(selectors); //接受一个CSS选择器作为参数，返回所有匹配该选择器的元素节点。
document.getElementsByTagName(tagName); //返回所有指定HTML标签的元素
document.getElementsByClassName(className); //返回包括了所有class名字符合指定条件的元素
document.getElementsByName(name); //用于选择拥有name属性的HTML元素(比如<form>、<radio>、<img)、frame>)、cembed>和cobject>等）
document.getElementById(id); //返回匹配指定id属性的元素节点。
document.elementFromPoint(x, y); //返回位于页面指定位置最上层的Element子节点。
```

## 生成节点方法

```js
document.createElement(tagName); //用来生成 HTML元素节点
document.createTextNode(text); //用来生成文本节点
document.createAttribute(name); //生成一个新的属性对象节点，并返回它。
document.createDocumentFragment() //生成一个DocumentFragment对象
```

## 绑定事件方法

```js
document.createEvent(type); //生成一个事件对象，该对象能被element.dispatchEvent()方法使用
document.addEventListener(type,listener, capture)//注册事件
document.removeEventListener(type, listener, capture); //注销事件
document.dispatchEvent(event)//触发事件
```

## 其他

```js
document.write()
document.hasFocus(); //返回一个布尔值，表示当前文档之中是否有元素被激活或获得焦点。
document.adoptNode(externalNode); //将某个节点，从其原来所在的文档移除，插入当前文档，并返回插入后的新节点。
document.importNode(externalNode，deep)//从外部文档拷贝指定节点，插入当前文档。
```



