---
title: 无限列表 v-infinite-scroll指令
author: 李嘉明
createTime: 2024/07/14 16:04:55
permalink: /article/jiahhc2q/
tags:
  - element-ui
---

无限列表（infinite Scrolling）是一种优化大型列表或长内容的滚动效果的技术。它通过分片渲染可见区域内的元素，而不是一上来直接渲染整个列表，通过不断下滑分片的形式的方式去渲染内容 。来提高性能和内存效率。

<!-- 无限列表（Virtual Scrolling）是一种优化大型列表或长内容的滚动效果的技术。它通过只渲染可见区域内的元素，而不是渲染整个列表，来提高性能和内存效率。 -->

## v-infinite-scroll

无限列表 ，在我们移动端开发中的就是常客了。就不在使用 分页来加载我们的内容，只能是用户不断向上滑动，加载更多内容，这样使得移动端的体验得到许多提升
今天，我们要介绍的就是 `EL` 中 的 无限列表指令

<!-- 无限列表 ，在我们移动端开发中的就是常客了。当页面渲染过多时，我们就急需一种，**只渲染 可见区域内容的解决方案** 帮助我们去解决性能瓶颈的问题。今天，我们要介绍的就是 `EL` 中 的 无限列表指令 -->

**需要了解的无限列表实现原理**

实现的原理就类似于 针对 大数据量的加载，比如以下几种方式, **但是以下几种方式，还是会直接渲染全部，仅仅是将渲染放缓了，不会去影响主线程的执行，也不会造成主线程卡顿的** 那这样，把其 放在 `Web Worker` 中岂不是更好，当然我们无限列表肯定不是这样的, **而是只渲染可见区域下的元素，当用户主动拉取更多数据时，从而 不断的 在之前的基础上 增加元素内容。这样我们的元素节点会不断的增加，直到不再需要渲染数据了**

::: code-tabs

@tab setTimeout 计时器分页渲染

```js
const renderList = async () => {
  console.time('列表时间');
  const list = await getList();
  console.log(list);
  const total = list.length;
  const page = 0;
  const limit = 200;
  const totalPage = Math.ceil(total / limit);

  const render = (page) => {
    if (page >= totalPage) return;
    setTimeout(() => {
      for (let i = page * limit; i < page * limit + limit; i++) {
        const item = list[i];
        const div = document.createElement('div');
        div.className = 'sunshine';
        div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`;
        container.appendChild(div);
      }
      render(page + 1);
    }, 0);
  };
  render(page);
  console.timeEnd('列表时间');
};
```

@tab 使用 requestAnimationFrame

```js
const renderList = async () => {
  console.time('列表时间');
  const list = await getList();
  console.log(list);
  const total = list.length;
  const page = 0;
  const limit = 200;
  const totalPage = Math.ceil(total / limit);

  const render = (page) => {
    if (page >= totalPage) return;
    // 使用requestAnimationFrame代替setTimeout
    requestAnimationFrame(() => {
      for (let i = page * limit; i < page * limit + limit; i++) {
        const item = list[i];
        const div = document.createElement('div');
        div.className = 'sunshine';
        div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`;
        container.appendChild(div);
      }
      render(page + 1);
    });
  };
  render(page);
  console.timeEnd('列表时间');
};
```

@tab 使用文档碎片 + requestAnimationFrame

```js
const renderList = async () => {
  console.time('列表时间');
  const list = await getList();
  console.log(list);
  const total = list.length;
  const page = 0;
  const limit = 200;
  const totalPage = Math.ceil(total / limit);

  const render = (page) => {
    if (page >= totalPage) return;
    requestAnimationFrame(() => {
      // 创建一个文档碎片
      const fragment = document.createDocumentFragment();
      for (let i = page * limit; i < page * limit + limit; i++) {
        const item = list[i];
        const div = document.createElement('div');
        div.className = 'sunshine';
        div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`;
        // 先塞进文档碎片
        fragment.appendChild(div);
      }
      // 一次性appendChild
      container.appendChild(fragment);
      render(page + 1);
    });
  };
  render(page);
  console.timeEnd('列表时间');
};
```

:::

## 无限列表源码

```js
import throttle from 'throttle-debounce/debounce';
import {
  isHtmlElement,
  isFunction,
  isUndefined,
  isDefined,
} from 'element-ui/src/utils/types';
import { getScrollContainer } from 'element-ui/src/utils/dom';

const getStyleComputedProperty = (element, property) => {
  if (element === window) {
    element = document.documentElement;
  }

  if (element.nodeType !== 1) {
    return [];
  }
  // NOTE: 1 DOM access here
  const css = window.getComputedStyle(element, null);
  return property ? css[property] : css;
};

const entries = (obj) => {
  return Object.keys(obj || {}).map((key) => [key, obj[key]]);
};

const getPositionSize = (el, prop) => {
  return el === window || el === document
    ? document.documentElement[prop]
    : el[prop];
};

const getOffsetHeight = (el) => {
  return getPositionSize(el, 'offsetHeight');
};

const getClientHeight = (el) => {
  return getPositionSize(el, 'clientHeight');
};

const scope = 'ElInfiniteScroll';
const attributes = {
  delay: {
    type: Number,
    default: 200,
  },
  distance: {
    type: Number,
    default: 0,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  immediate: {
    type: Boolean,
    default: true,
  },
};

// 获取滚动父级上面的属性
const getScrollOptions = (el, vm) => {
  if (!isHtmlElement(el)) return {};

  return entries(attributes).reduce((map, [key, option]) => {
    const { type, default: defaultValue } = option;
    let value = el.getAttribute(`infinite-scroll-${key}`);
    value = isUndefined(vm[value]) ? value : vm[value];
    switch (type) {
      case Number:
        value = Number(value);
        value = Number.isNaN(value) ? defaultValue : value;
        break;
      case Boolean:
        value = isDefined(value)
          ? value === 'false'
            ? false
            : Boolean(value)
          : defaultValue;
        break;
      default:
        value = type(value);
    }
    map[key] = value;
    return map;
  }, {});
};

const getElementTop = (el) => el.getBoundingClientRect().top;

const handleScroll = function (cb) {
  // 首先 this 指向 el
  const { el, vm, container, observer } = this[scope];
  const { distance, disabled } = getScrollOptions(el, vm);
  // 如果时禁用状态 不再执行
  if (disabled) return;
  // 如果滚动容器的父级，宽度 高度 都没有 ，也是 不执行
  const containerInfo = container.getBoundingClientRect();
  if (!containerInfo.width && !containerInfo.height) return;

  let shouldTrigger = false;
  if (container === el) {
    // be aware of difference between clientHeight & offsetHeight & window.getComputedStyle().height
    const scrollBottom = container.scrollTop + getClientHeight(container);
    // distance 触底加载的阈值
    shouldTrigger = container.scrollHeight - scrollBottom <= distance;
  } else {
    // 如果滚动容器 与 el 元素不是同一个的话
    const heightBelowTop =
      getOffsetHeight(el) + getElementTop(el) - getElementTop(container);
    const offsetHeight = getOffsetHeight(container);
    const borderBottom = Number.parseFloat(
      getStyleComputedProperty(container, 'borderBottomWidth')
    );
    shouldTrigger = heightBelowTop - offsetHeight + borderBottom <= distance;
  }
  // 原理： 父级高度是必须的固定高度，当内容，没有充满 容器的高度时，会不断执行 传入进来的cd 回调函数
  // 根据 container.scrollHeight - scrollBottom <= distance; 算法逻辑，当 容器的滚动高度 - 父级的滚动位置 + 父级的可见高度（内容+内边距）
  // 小于等于 阈值  默认是 0 .则设置 shouldTrigger true 否则 false
  if (shouldTrigger && isFunction(cb)) {
    cb.call(vm);
  } else if (observer) {
    observer.disconnect();
    this[scope].observer = null;
  }
  // 当我们的 shouldTrigger 为 false 时，此时表示，容器的滚动位置是大于 我们的 阈值 时，则会关闭观察器
};

export default {
  name: 'InfiniteScroll',
  inserted(el, binding, vnode) {
    // 获取执行 回调函数
    const cb = binding.value;
    // 获取vm 实例
    const vm = vnode.context;
    // 获取直接滚动父级容器
    const container = getScrollContainer(el, true);
    // 获取到节点上的属性options
    const { delay, immediate } = getScrollOptions(el, vm);
    // 节流实现, 核心逻辑实现
    const onScroll = throttle(delay, handleScroll.bind(el, cb));

    el[scope] = { el, vm, container, onScroll };

    if (container) {
      container.addEventListener('scroll', onScroll);

      if (immediate) {
        const observer = (el[scope].observer = new MutationObserver(onScroll));
        observer.observe(container, { childList: true, subtree: true });
        onScroll();
      }
    }
  },
  unbind(el) {
    const { container, onScroll } = el[scope];
    if (container) {
      container.removeEventListener('scroll', onScroll);
    }
  },
};
```


## 无限列表 和 虚拟列表 有什么区别？

最大的不同点： 无限列表 的DOM 节点 是不断 递增的 , 而 虚拟列表，永远只会渲染可见区域的内容,DOM结构 是 复用的

:::tip
本次示例中使用 的是 `element-ui@2.15.14`
:::
