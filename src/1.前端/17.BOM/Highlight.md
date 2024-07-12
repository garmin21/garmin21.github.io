---
title: Highlight CSS 自定义高亮 API
author: 李嘉明
createTime: 2024/07/12 16:41:01
permalink: /article/wkddn2cw/
tags:
  - BOM
---

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CSS_Custom_Highlight_API)

CSS 自定义高亮 API 提供了一种方法，可以通过使用 JavaScript 创建范围并使用 CSS 定义样式来设置文档中任意文本范围的样式。

使用 CSS 自定义高亮 API 设置网页上文本范围的样式有四个步骤：

1. 创建 Range 对象。
2. 为这些范围创建 Highlight 对象。
3. 使用 HighlightRegistry 进行注册。
4. 使用 ::highlight() 伪元素定义高亮样式。

## 语法

```js
// 实例化一个 Highlight 对象
const highlight = new Highlight(range1, range2);
// 注册 Highlight 高亮
CSS.highlights.set('user-1-highlight', highlight);

// 从注册表中删除一个高亮显示。
CSS.highlights.delete('user-1-highlight');

// 清除注册表。
CSS.highlights.clear();
```

```css
/* 高亮样式 */

::highlight(user-1-highlight) {
  background-color: pink;
  color: black;
}
```

## 效果

::: normal-demo 高亮案例

```css
::highlight(search-results) {
  background-color: #f06;
  color: white;
}
```

```html
<input type="text" />
<div class="outer">
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis sequi error
  repudiandae dolorem accusamus itaque minima architecto cumque cupiditate,
  suscipit explicabo ipsum numquam a corrupti iure. Placeat obcaecati esse
  atque!
</div>
```

```js
const element = document.querySelector('.outer');
const textNodes = [];
for (let i = 0; i < element.childNodes.length; i++) {
  const node = element.childNodes[i];
  if (node.nodeType === Node.TEXT_NODE) {
    textNodes.push(node);
  }
}

document.querySelector('[type=text]').addEventListener(
  'input',
  (ev) => {
    // 清除 之前的 注册表
    CSS.highlights.clear();
    const str = ev.target.value.trim().toLowerCase();
    if (!str) {
      return;
    }
    const ranges = textNodes
      .map((el) => ({
        // 遍历所有的文本节点，提取除 当前 文本节点 el ,以及 text 文本内容
        el,
        text: el.textContent.toLowerCase(),
      }))
      .map(({ text, el }) => {
        // 定义收集匹配到字符的所有下标集合
        const indices = [];
        // 定义开始查询的位置
        let startPos = 0;
        // 不清楚内容到底有多少，使用 while 循环 ，只要查询的索引位置小于 文本长度，就一直执行循环
        // 当我输入一个字符。index 大于等于 0 添加到 列表中 并且更新 startPos 值
        while (startPos < text.length) {
          const index = text.indexOf(str, startPos);
          if (index === -1) break; // 只要找到了 就跳出循环
          indices.push(index);
          startPos = index + str.length;
        }

        // 为创建 range
        return indices.map((index) => {
          const range = new Range();
          range.setStart(el, index);
          range.setEnd(el, index + str.length);
          return range;
        });
      });

    // 为范围创建一个Highlight对象。
    const searchResultsHighlight = new Highlight(...ranges.flat());
    // 在注册表中注册Highlight对象。
    CSS.highlights.set('search-results', searchResultsHighlight);
  },
  false
);
```

:::
