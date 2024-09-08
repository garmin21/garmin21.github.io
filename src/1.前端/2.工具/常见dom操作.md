---
title: 常见dom操作
author: 李嘉明
createTime: 2024/04/14 14:04:25
permalink: /article/g0xcuetg/
tags:
  - 工具
---

:::tip
在我们前端开发中，使用 javascript 去操作 DOM 必不会在少，各个 浏览器的兼容性，虽然 现在很少考虑在 IE 上运行我们的项目，因此就封装了一系列的 工具函数，帮助我们快速，编写代码

:::

## 去除首尾空白字符

```js
const trim = function (string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}
```

## 转小驼峰命名

```js
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g
const camelCase = function (name) {
  return name.replace(
    SPECIAL_CHARS_REGEXP,
    function (_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter
    }
  )
}
```

让我们逐步解析这个函数的实现：

`replace(/([\:\-\_]+(.))/g, function(_, separator, letter, offset) { ... })`：这一部分使用正则表达式来匹配`连字符（-）、冒号（:）和下划线（_）后面的字母`，并将其替换为大写字母形式。正则表达式`/([\:\-\_]+(.))/g`中的括号`()`用于捕获匹配的分隔符和字母，`[\:\-\_]+`表示一个或多个连续的分隔符，`(.))`表示一个字母。`function(_, separator, letter, offset) { ... }`是一个回调函数，用于处理每个匹配项。`_`表示整个匹配项，`separator`表示分隔符，`letter`表示字母，`offset`表示匹配项的偏移量。如果`offset为0（即第一个匹配项）`，则保持字母小写；否则将字母转换为大写。

## 绑定事件: 元素，事件名 触发回调

```js
const on = (function () {
  if (!isServer && document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()
```

## 解除事件: 元素，事件 触发回调

```js
const off = (function () {
  if (!isServer && document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()
```

## 事件 绑定一次

```js
const once = function (el, event, fn) {
  var listener = function () {
    if (fn) {
      fn.apply(this, arguments)
    }
    off(el, event, listener)
  }
  on(el, event, listener)
}
```

## 判断 class 是否存在 返回值是一个布尔

```js
function hasClass(el, cls) {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1)
    throw new Error('className should not contain space.')
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
}
```

## 增加 class 单个 多个都支持

```js
function addClass(el, cls) {
  if (!el) return
  var curClass = el.className
  var classes = (cls || '').split(' ')

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.add(clsName)
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName
    }
  }
  if (!el.classList) {
    el.setAttribute('class', curClass)
  }
}
```

## 移除 class 单个 多个 都行

```js
function removeClass(el, cls) {
  if (!el || !cls) return
  var classes = cls.split(' ')
  var curClass = ' ' + el.className + ' '

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.remove(clsName)
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ')
    }
  }
  if (!el.classList) {
    el.setAttribute('class', trim(curClass))
  }
}
```

## 获取 style , 判断是 IE 版本，大于IE 9  使用 getComputedStyle

```js
const getStyle = ieVersion < 9 ? function(element, styleName) {
  if (isServer) return;
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'styleFloat';
  }
  try {
    switch (styleName) {
      case 'opacity':
        try {
          return element.filters.item('alpha').opacity / 100;
        } catch (e) {
          return 1.0;
        }
      default:
        return (element.style[styleName] || element.currentStyle ? element.currentStyle[styleName] : null);
    }
  } catch (e) {
    return element.style[styleName];
  }
} : function(element, styleName) {
  if (isServer) return;
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'cssFloat';
  }
  try {
    var computed = document.defaultView.getComputedStyle(element, '');
    return element.style[styleName] || computed ? computed[styleName] : null;
  } catch (e) {
    return element.style[styleName];
  }
};

```

## 元素设置样式, 可以是一个对象 也可以是一个string 书写的样式

```js

function setStyle(element, styleName, value) {
  if (!element || !styleName) return;

  if (typeof styleName === 'object') {
    for (var prop in styleName) {
      if (styleName.hasOwnProperty(prop)) {
        setStyle(element, prop, styleName[prop]);
      }
    }
  } else {
    styleName = camelCase(styleName);
    if (styleName === 'opacity' && ieVersion < 9) {
      element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')';
    } else {
      element.style[styleName] = value;
    }
  }
};

```

## 检查一个元素（el）是否具有滚动条。

```js
const isScroll = (el, vertical) => {
  if (isServer) return;

  const determinedDirection = vertical !== null && vertical !== undefined;
  const overflow = determinedDirection
    ? vertical
      ? getStyle(el, 'overflow-y')
      : getStyle(el, 'overflow-x')
    : getStyle(el, 'overflow');

  return overflow.match(/(scroll|auto|overlay)/);
};
```

## 用于获取一个元素（el）所在的滚动容器。

```js
const getScrollContainer = (el, vertical) => {
  if (isServer) return;

  let parent = el;
  while (parent) {
    if ([window, document, document.documentElement].includes(parent)) {
      return window;
    }
    if (isScroll(parent, vertical)) {
      return parent;
    }
    parent = parent.parentNode;
  }

  return parent;
};
```

## 检查一个元素（el）是否在指定容器（container）内部。

```js
const isInContainer = (el, container) => {
  if (isServer || !el || !container) return false;

  const elRect = el.getBoundingClientRect();
  let containerRect;

  if ([window, document, document.documentElement, null, undefined].includes(container)) {
    containerRect = {
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      left: 0
    };
  } else {
    containerRect = container.getBoundingClientRect();
  }

  return elRect.top < containerRect.bottom &&
    elRect.bottom > containerRect.top &&
    elRect.right > containerRect.left &&
    elRect.left < containerRect.right;
};
```