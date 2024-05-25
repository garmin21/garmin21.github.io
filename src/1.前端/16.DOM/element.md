---
title: element
author: 李嘉明
createTime: 2024/05/26 01:01:24
permalink: /article/ofl8np55/
---

:::tip
element 表示 HTML 文档中的一个具体元素。每个 HTML 元素都是一个 element 对象的实例。
element 对象代表文档中的一个独立的元素节点，可以访问和操作元素的标签名、属性、样式、内容等。
element 对象是 Node 接口的子接口，它继承了 Node 接口中的一些属性和方法。
因此，element 对象具有一些常见的属性和方法，如 nodeName、nodeType、getAttribute()、setAttribute()、appendChild() 等。
通过 document 对象，可以使用方法如 getElementById()、getElementsByTagName()、querySelector() 等来获取 element 对象。
这些方法可以根据元素的 ID、标签名、选择器等来查找和获取元素节点。
:::

# 属性

## 特殊属性

```js
Element.attributes; //返回当前元素节点的所有属性节点
Element.id; //返回指定元素的id属性，可读写
Element.tagName; //返回指定元素的大写标签名
Element.innerHTML; //返回该元素包含的HTML代码，可读写
Element.outerHTML; //返回指定元素节点的所有HTML代码，包括它自身和包含的的所有子元素，可读写
Element.className; //返回当前元素的class属性，可读写
Element.classList; //返回当前元素节点的所有class集合
Element.dataset; //返回元素节点中所有的data-*属性。
```

## 节点相关属性

```js
Element.offsetParent; //返回当前元素节点的最靠近的、并且CSS的position属性不等于static的父元素
Element.children; //包括当前元素节点的所有子元素
Element.childElementCount; //返回当前元素节点包含的子HTML元素节点的个数
Element.firstElementChild; //返回当前节点的第一个Element子节点
Element.lastElementChild; //返回当前节点的最后一个Element子节点
Element.nextElementSibling; //返回当前元素节点的下一个兄弟HTML元素节点
Element.previousElementSibling; //返回当前元素节点的前一个兄弟HTML节点
```

## 尺寸属性

```js
Element.clientHeight//返回元素节点可见部分的高度
Element.clientWidth//返回元素节点可见部分的宽度
Element.clientLeft//返回元素节点左边框的宽度
Element.clientTop//返回元素节点顶部边框的宽度
Element.scrollHeight//返回元素节点的总高度
Element.scrollWidth//返回元素节点的总宽度
Element.scrollLeft//返回元素节点的水平滚动条向右滚动的像素数值,通过设置这个属性可以改变元素的滚动位置
Element.scrollTop//返回元素节点的垂直滚动向下滚动的像素数值
Element.offsetHeight//返回元素的垂直高度(包含border,padding)
Element.offsetWidth//返回元素的水平宽度(包含border,padding)
。
Element.offsetLeft//返回当前元素左上角相对于Element.offsetParent节点的垂直偏移
Element.offsetTop //返回水平位移
Element.style //返回元素节点的样式描述对象

```

# 方法

## 位置方法

```js
Element.getBoundingClientRect();
// getBoundingClientRect返回一个对象，包含top,left ,right, bottom ,width, height // width、height元素自身宽高
// top元素上外边界距窗口最上面的距离
// right 元素右外边界距窗口最左边的距离
// bottom元素下外边界距窗口最上面的距离
// left 元素左外边界距窗口最左边的距离
// width 元素自身宽(包含border , padding)
// height元素自身高(包含border , padding)
Element.getClientRects(); //返回当前元素在页面上形参的所有矩形。

//元素在页面上的偏移量
var rect = el.getBoundingClientRect();
return {
  top: rect.top + document.body.scrollTop,
  left: rect.left + document.body.scrollLeft,
};
```

## 属性方法

```js
Element.getAttribute(); // :读取指定属性
Element.setAttribute(); // :设置指定属性
Element.hasAttribute(); //:返回一个布尔值，表示当前元素节点是否有指定的属性
Element.removeAttribute(); // :移除指定属性
```

## 查找方法

```js
Element.querySelector();
Element.querySelectorAll();
Element.getElementsByTagName();
Element.getElementsByClassName();
// ...
```

## 事件方法

```js
Element.addEventListener() // :添加事件的回调函数
Element.removeEventListener() // :移除事件监听函数
Element.dispatchEvent() // :触发事件

// ie8
Element.attachEvent(oneventName, listener)
Element.detachEvent(oneventName,listener)l

// event对象
var event = window.event || event;
//事件的目标节点
var target = event.target || event.srcElement;
//事件委托
ul.addEventListener( 'click ', function(event){
    if (event.target.tagName.toLowerCase() === 'li') {
        console. log(event.target.innerHTML)
    }
});
```

## 其他

```js
Element.scrollIntoView(); //滚动当前元素，进入浏览器的可见区域
//解析HTML字符串，然后将生成的节点插入DOM树的指定位置。
Element.insertAdjacentHTML(where, htmlString);
Element.insertAdjacentHTML('beforeBegin', htmlString); //在该元素前插入
Element.insertAdjacentHTML('afterBegin', htmlString); //在该元素第一个子元素前插入
Element.insertAdjacentHTML('beforeEnd ', htmlString); //在该元素最后一个子元素后面插入
Element.insertAdjacentHTML('afterEnd', htmlString); //在该元素后插入
Element.remove(); //用于将当前元素节点从DOM中移除
Element.focus(); //用于将当前页面的焦点，转移到指定元素上
```
