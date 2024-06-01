---
title: MutationObserver
author: 李嘉明
createTime: 2024/06/01 11:35:02
permalink: /article/mtws5o6g/
tags:
  - BOM
---

MutationObserver 是一个 Web API，用于监听 DOM 的变化

<!-- more -->

:::tip

1. 子节点的添加或删除：当目标元素的子节点添加或删除时，MutationObserver 可以捕获这些变化。这包括通过 appendChild、removeChild、insertBefore 等方法添加或删除子节点的操作。
   属性的变化：当目标元素的属性值发生变化时，MutationObserver 可以监听到这些变化。这包括使用 setAttribute、removeAttribute 等方法修改属性值的操作。

2. 元素的样式变化：当目标元素的样式发生变化时，MutationObserver 可以捕获这些变化。这包括通过修改元素的 style 属性或使用 CSS 类进行样式变化的操作。

3. 元素的内容变化：当目标元素的文本内容或子节点的内容发生变化时，MutationObserver 可以监听到这些变化。这包括通过修改元素的 textContent 或 innerHTML 属性来改变元素内容的操作。
   使用 MutationObserver，你可以注册一个回调函数，当指定的 DOM 变化发生时，该回调函数会被触发。你可以在回调函数中处理需要针对变化执行的逻辑。
   :::

## 示例

:::normal-demo

```html
<section class="dom1">
  <div id="container01">
    <!--  -->
  </div>
  <button onclick="dome1()">appendChild</button>
  <button onclick="dome2()">removeChild</button>
  <button onclick="dome3()">insertBefore</button>
  <button onclick="dome4()">setAttribute</button>
  <button onclick="dome5()">removeAttribute</button>
  <button onclick="dome6()">style</button>
</section>
```

```css
.element {
  width: 200px;
  height: 200px;
  background-color: lightblue;
  cursor: pointer;
}

.element:hover {
  background-color: lightgreen;
}
```

```js
const element01 = document.getElementById('container01');
element01.textContent = 'hello';
const observer01 = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    console.log(mutation, '全部属性');
    console.log(mutation.addedNodes, '添加节点的NodeList');
    console.log(mutation.attributeName, '属性名称');
    console.log(mutation.attributeNamespace, '属性的别名还是缩写');
    console.log(mutation.nextSibling, '下一个兄弟元素');
    console.log(mutation.oldValue, '老的值');
    console.log(mutation.previousSibling, '上一个兄弟元素');
    console.log(mutation.removedNodes, '删除节点的NodeList');
    console.log(mutation.target, '当前监听的元素');
    console.log(mutation.type, '表示生效的是那个配置');

    console.log(' ');
  });
});

const config01 = {
  subtree: true,
  childList: true,
  attributes: true,
};

observer01.observe(element01, config01);

function dome1() {
  const span = document.createElement('span');
  span.id = 'fg';
  span.textContent = '你好啊';
  element01.appendChild(span);
}
function dome2() {
  const span = element01.querySelector('#fg');
  element01.removeChild(span);
}

function dome3() {
  const span = document.createElement('span');
  span.textContent = '我不好';
  element01.insertBefore(span, element01.querySelector('#fg'));
}

function dome4() {
  element01.setAttribute('class', 'element');
}

function dome5() {
  element01.removeAttribute('class');
}

function dome6() {
  element01.style.cssText = `display: flex;justify-content: center;align-items: center;`;
}
```

:::
