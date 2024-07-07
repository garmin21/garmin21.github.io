---
title: 分页组件 el-pagination
author: 李嘉明
createTime: 2024/07/06 15:18:14
permalink: /article/27nfa58j/
tags:
  - element-ui
---

## el-pagination

`el-pagination` 作为一个渲染展示的组件，他的功能主要是，切换到某一个页抛出自定义的事件，以及展示当前在那一页上

今天看到了分页组件，才知道，正确的编码格式，应该是怎么样的，切记自己不要去做 `template` 模板工程师。
🆗，整体来说 分页组件 的代码量 不多，只有 一个 `pagination.js` 文件，加 `Pager.vue`组件，Pager.vue 的内容主要是作为中间的数字内容进行展示，是一个纯展示组件，pagination.js 文件是整个组件的整体

**几个需要知道的问题**

1. `el-pagination` 是如何去渲染的，它的渲染原理是什么？

```js
// 首先 分页组件最主要是根据 layout 属性进行渲染组件内容的，在我们 pagination.js 中分别定义了 next prev jumper ... 等的组件，pagination 正是根据 layout 的内容按照一定的规则去渲染需要的组件

render(h) {
    // 获取到 layout 内容
    const layout = this.layout;
    if (!layout) return null;
    if (this.hideOnSinglePage && (!this.internalPageCount || this.internalPageCount === 1)) return null;

    let template = <div class={['el-pagination', {
      'is-background': this.background,
      'el-pagination--small': this.small
    }] }></div>;
    // 这里的所有组件内容，都是通过 在 components 中定义好的
    const TEMPLATE_MAP = {
      prev: <prev></prev>,
      jumper: <jumper></jumper>,
      pager: <pager currentPage={ this.internalCurrentPage } pageCount={ this.internalPageCount } pagerCount={ this.pagerCount } on-change={ this.handleCurrentChange } disabled={ this.disabled }></pager>,
      next: <next></next>,
      sizes: <sizes pageSizes={ this.pageSizes }></sizes>,
      slot: <slot>{ this.$slots.default ? this.$slots.default : '' }</slot>,
      total: <total></total>
    };
    // 通过 逗号 分割内容，匹配对应的内容
    const components = layout.split(',').map((item) => item.trim());
    const rightWrapper = <div class="el-pagination__rightwrapper"></div>;
    let haveRightWrapper = false;

    template.children = template.children || [];
    rightWrapper.children = rightWrapper.children || [];
    components.forEach(compo => {
      if (compo === '->') {
        haveRightWrapper = true;
        return;
      }

      if (!haveRightWrapper) {
        // 追加到 children 的内容中
        template.children.push(TEMPLATE_MAP[compo]);
      } else {
        // 如果是 --> 放置在右边的 添加到 rightWrapper 中
        rightWrapper.children.push(TEMPLATE_MAP[compo]);
      }
    });

    if (haveRightWrapper) {
        // 当有右边的组件内容时，向模板 children 开头添加 右边的内容
      template.children.unshift(rightWrapper);
    }
    // 最后将模板内容返回
    return template;
}
```

2. 。。。

## 使用方式

```html
<el-pagination layout="prev, pager, next" :total="50"> </el-pagination>
```

我们可以发现，分页组件没有必填prop，他有自己默认的prop, 进行渲染的。


## 分析总结

1. 分页组件的效果实现并没有使用都各种强大的库进行支持，而是直接通过 vue render 渲染函数 + JSX 的方式直接编写组件内容

:::tip
本次示例中使用 的是 `element-ui@2.15.14`
:::