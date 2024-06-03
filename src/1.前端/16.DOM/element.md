---
title: Element 元素
author: 李嘉明
createTime: 2024/05/26 01:01:24
permalink: /article/ofl8np55/
tags:
  - DOM
---

## Element 和 Node 的关系是什么？

在 DOM（文档对象模型）中，元素（Element）是节点（Node）的一种特殊类型。节点是文档中的基本构建块，可以是元素、文本、注释、属性等。

DOM 使用节点树的形式来表示文档的结构，其中每个节点都有其特定的类型。元素节点是表示 HTML 元素的节点类型，它是节点树的一部分。除了元素节点，节点树中还包括其他类型的节点，如文本节点、注释节点、属性节点等。

元素节点具有一些特定的属性和方法，用于访问和操作 HTML 元素的标签名、属性、样式、内容等。通过元素节点，可以获取和修改元素的属性值、添加或删除子节点、遍历父节点和兄弟节点等。

元素节点是节点树中的一个节点类型，而节点是一个更广泛的概念，表示文档中的任何一个节点。因此，元素是节点的一种特殊类型，用于表示 HTML 文档中的元素。可以说，元素是节点的一种子类型或实现


## Element 是什么

1. element 表示 HTML 文档中的一个具体元素。每个 HTML 元素都是一个 element 对象的实例。
2. element 对象代表文档中的一个独立的元素节点，可以访问和操作元素的标签名、属性、样式、内容等。
3. element 对象是 Node 接口的子接口，它继承了 Node 接口中的一些属性和方法。
4. 因此，element 对象具有一些常见的属性和方法，如 nodeName、nodeType、getAttribute()、setAttribute()、appendChild() 等。
5. 通过 document 对象，可以使用方法如 getElementById()、getElementsByTagName()、querySelector() 等来获取 element 对象。

这些方法可以根据元素的 ID、标签名、选择器等来查找和获取元素节点。

## 属性

### 特殊属性

```js
Element.parentElement  // 父元素
Element.children     // 所有子元素的集合
Element.firstElementChild   // 第一个子元素  IE9+
Element.lastElementChild    // 最后一个子元素 IE9+
Element.previousElementSibling  // 上一个兄弟元素
Element.nextElementSibling    // 下一个兄弟元素
Element.childElementCount    // 子元素的数量
Element.ownerDocument     // 元素所属的文档对象（document）
Element.nodeName  // 节点名     元素节点通过nodeName可以获取标签名
Element.nodeValue  // 节点值
Element.nodeType  // 节点类型 数字； document（9） element(1)  attribute(2)  text(3)   comment(8)
Element.attributes; //返回当前元素节点的所有属性节点
Element.id; //返回指定元素的id属性，可读写
Element.tagName; //返回指定元素的大写标签名
Element.innerHTML; //返回该元素包含的HTML代码，可读写
Element.outerHTML; //返回指定元素节点的所有HTML代码，包括它自身和包含的的所有子元素，可读写
Element.className; //返回当前元素的class属性，可读写
Element.classList; //返回当前元素节点的所有class集合
Element.dataset; //返回元素节点中所有的data-*属性。
Element.style //返回元素节点的样式描述对象

// ie8以下
function hasClass(element, className) {
  return new RegExp(className, 'gi').test(element.className);
}
//移除class
function removeClass(element, className) {
  element.className = element.className.replace(
    new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'),
    ''
  );
}

// ie10
Element.classList.add(className); //新增
Element.classList.remove(className); //删除
Element.classList.contains(className); //是否包含
Element.classList.toggle(className); // toggle class
```

### 元素的文本内容

用于双标签元素, 可读可写
```js
Element.innerHTML	// 获取当前元素下的所有 HTML
Element.outerHTML // 获取所有 HTML
Element.innerText // 去掉标签，留下文本
Element.textContent // 获取元素下所有的文本内容
```

### 节点相关属性

```js
Element.offsetParent; //返回当前元素节点的最靠近的、并且CSS的position属性不等于static的父元素
Element.children; //包括当前元素节点的所有子元素
Element.childElementCount; //返回当前元素节点包含的子HTML元素节点的个数
Element.firstElementChild; //返回当前节点的第一个Element子节点
Element.lastElementChild; //返回当前节点的最后一个Element子节点
Element.nextElementSibling; //返回当前元素节点的下一个兄弟HTML元素节点
Element.previousElementSibling; //返回当前元素节点的前一个兄弟HTML节点
```

### 尺寸 / 位置   属性

```js
// 元素尺寸
Element.clientHeight//   (内容+内边距) 返回元素节点可见部分的高度 
Element.clientWidth//    (内容+内边距) 返回元素节点可见部分的宽度 

Element.offsetHeight//   (内容+内边距+边框)  (获取元素实际高度)
Element.offsetWidth//    (内容+内边距+边框)  (获取元素实际宽度)

Element.scrollHeight//   元素尺寸（如果子元素没有溢出，同clientHeight；如果子元素溢出：子元素宽度+一个方向的内边距）
Element.scrollWidth//    元素尺寸（如果子元素没有溢出，同clientWidth；如果子元素溢出：子元素宽度+一个方向的内边距）

// 元素位置
Element.clientLeft//     返回元素节点左边框的宽度
Element.clientTop//      返回元素节点上边框的宽度

//获取距离第一个定位的祖先元素(值不为static)上的位置，如果都没有，则，向上查找包含块，找不到则定位在根元素上【HTML】的位置
Element.offsetLeft//     返回当前元素左上角相对于Element.offsetParent节点的水平偏移
Element.offsetTop //     返回当前元素左上角相对于Element.offsetParent节点的垂直偏移

// 可读可写
// 注意：这个属性控制的是元素内容的滚动位置，所以当子元素超出父级时，才生效，并且这个属性是给父元素设置的
// 生效前提： 子元素溢出父元素，设置父元素overflow：hidden/auto/scroll
Element.scrollLeft//     返回元素节点的水平滚动条向右滚动的像素数值,通过设置这个属性可以改变元素的滚动位置  : 值增大，内容向左滚,滚动条向右移
Element.scrollTop//      返回元素节点的垂直滚动向下滚动的像素数值, 元素内容的滚动位置； 值增大，内容向上滚,滚动条向下移
```

> getBoundingClientRect 不考虑兼容性，可以代替

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

## 方法

### 样式方法

```js
Element.setAttribute('style', '') // 设置 style 属性
Element.style.backgroundColor = 'red' // 设置行内样式 背景颜色 为 red
Element.style.cssText //用来读写或删除整个style属性
Element.style.setProperty(propertyName,value) //设置css属性
element.style.getPropertyValue(property) //获取css属性
Element.style.removeProperty(property)//删除css属性

//操作非内联样式

// ie8
Element.currentStyle[attrName] //  IE: 获取不到复合属性(background、border)
// ie9+
window.getComputedStyle(el,null)[attrName]
window.getComputedStyle(el,null).getPropertyValue(attrName)
//伪类
window.getComputedStyle(el, ':after')[attrName]
```

**getComputedStyle 和 element.style 对比**
:::tip
1. getComputedStyle 和 element.style 的相同点就是二者返回的都是 CSSStyleDeclaration 对象。

而不同点就是：
1. element.style 读取的只是元素的内联样式，即写在元素的 style 属性上的样式；而 getComputedStyle 读取的样式是最终样式，包括了内联样式、嵌入样式和外部样式。

2. element.style 既支持读也支持写，我们通过 element.style 即可改写元素的样式。而 getComputedStyle 仅支持读并不支持写入。我们可以通过使用 getComputedStyle 读取样式，通过 element.style 修改样式
:::

### 属性方法

```js
Element.getAttribute(); // :读取指定属性
Element.setAttribute(); // :设置指定属性
Element.hasAttribute(); //:返回一个布尔值，表示当前元素节点是否有指定的属性
Element.removeAttribute(); // :移除指定属性
```

### 查找方法

```js
Element.querySelector();
Element.querySelectorAll();
Element.getElementsByTagName();
Element.getElementsByClassName();
// ...
```

### 事件方法

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

### 其他

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
