---
title: MutationObserver  DOM监听
author: 李嘉明
createTime: 2024/06/01 11:35:02
permalink: /article/mtws5o6g/
tags:
  - BOM
---

MutationObserver 是一个 Web API，用于监听 DOM 的变化

<!-- more -->

参数是一个回调函数，每当被指定的节点或子树以及配置项有 DOM 变动时会被调用。回调函数拥有两个参数：一个是描述所有被触发改动的 MutationRecord 对象数组，另一个是调用该函数的 MutationObserver 对象

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
const observer01 = new MutationObserver((mutations, observer) => {
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


## 方法

1. mutations：节点变化记录列表
2. observer：构造 MutationObserver 对象。

MutationObserver 对象有三个方法，分别如下：

1. observe：设置观察目标，接受两个参数，target：观察目标，options：通过对象成员来设置观察选项
2. disconnect：阻止观察者观察任何改变
3. takeRecords：清空记录队列并返回里面的内容


```js
// observe 方法中 options 参数有已下几个选项：

childList// 设置 true，表示观察目标子节点的变化，比如添加或者删除目标子节点，不包括修改子节点以及子节点后代的变化
attributes // 设置 true，表示观察目标属性的改变
characterData // 设置 true，表示观察目标数据的改变
subtree// 设置为 true，目标以及目标的后代改变都会观察
attributeOldValue// 如果属性为 true 或者省略，则相当于设置为 true，表示需要记录改变前的目标属性值，设置了 attributeOldValue 可以省略 attributes 设置
characterDataOldValue// 如果 characterData 为 true 或省略，则相当于设置为 true,表示需要记录改变之前的目标数据，设置了 characterDataOldValue 可以省略 characterData 设置
attributeFilter// 如果不是所有的属性改变都需要被观察，并且 attributes 设置为 true 或者被忽略，那么设置一个需要观察的属性本地名称（不需要命名空间）的列表
```

```js
// MutationObserver 有以下特点：

// MutationObserver 则是异步触发，DOM 发生变动以后，并不会马上触发，而是要等到当前所有 DOM 操作都结束后才触发。

1. 它等待所有脚本任务完成后才会运行，即采用异步方式
2. 它把 DOM 变动记录封装成一个数组进行处理，而不是一条条地个别处理 DOM 变动。
3. 它即可以观察发生在 DOM 节点的所有变动，也可以观察某一类变动
```
