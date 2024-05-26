---
title: Node 节点
author: 李嘉明
createTime: 2024/05/26 11:14:42
permalink: /article/glu43qny/
tags:
  - DOM
---

## 元素和节点的关系？

**文档中每一部分都是节点**， 元素继承自节点，
比如 元素继承自元素节点，属性继承自属性节点。


## 节点的分类

* document  根节点
* elementNode  元素节点  
* attributeNode  属性节点
* textNode  文本节点
* commentNode 注释节点

## 节点属性

> 根元素【html】的父节点是 document ,父元素是  null

```js
Node.nodeName   // 节点名     元素节点通过nodeName可以获取标签名
Node.nodeValue  // 节点值
Node.nodeType   // 节点类型  数字； document（9） element(1)  attribute(2)  text(3)   comment(8)
Node.parentNode    // 父节点
Node.childNode     // 所有子节点的集合
Node.firstChild    // 第一个子节点
Node.lastChild     // 最后一个子节点
Node.previousSibling   // 上一个兄弟节点
Node.nextSibling       // 下一个兄弟节点
```


## 节点方法

```js
Node.hasChildNodes()  // 方法如果节点拥有子节点，则返回布尔 true，否则返回 false。
Node.scrollIntoView() // 方法让当前的元素滚动到浏览器窗口的可视区域内，类似于window.scrollTo()方法
document.createElement(tagName) // 创建元素节点
parentElement.appendChild(node)  //追加子节点
parentElement.insertBefore(newNode, oldNode)  //指定位置插入节点,并且是在指定节点的前面插入
parentElement.removeChild(node) //删除子节点
Node.remove() // 自杀，有一定兼容性问题
parentElement.replaceChild(newNode, oldNode)   //替换子节点, 会把旧的节点删掉换成新的节点
element.cloneNode(true)  // 克隆节点	true 深度克隆，元素自己和后代元素都会克隆  | false (默认)  只克隆元素自己，不克隆后代元素
```


### documentFragment / 文档片段

```js
// 也是一类节点， nodeType是11， 不是元素。相当于一个一次性塑料袋
// 创建一个新的空白的文档片段对象
var df = document.createDocumentFragment();

// 可以给df对象添加子节点，df节点也可以作为其他元素的子节点
// df对象不会出先在dom树中

// 应用场景：
// 	如果连续给一个元素添加多个子元素，可以先把子元素添加到df对象中，最后把df对象添加到父元素中！ 减少浏览器渲染次数。
```