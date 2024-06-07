---
title: vue虚拟滚动插件 vue-virtual-scroller
author: 李嘉明
createTime: 2024/04/30 22:16:14
permalink: /article/kdz7kuwf/
tags:
  - 工具
---

:::tip
日常开发中，我们总会遇到一些性能瓶颈的问题，这个时候就需要有一些性能优化的方案，列如现在介绍的 `vue-virtual-scroller`, 它的原理
就是说再一个固定高度的容器中，放置一定的 元素，通过滚动，实时的计算替换动态的内容，这样页面不会有新增的 DOM，只会最大程度的复用 DOM 元素，性能自然会有很大的提升
:::

- [vue2-1.x 项目地址](https://github.com/Akryum/vue-virtual-scroller/tree/v1)
- [1.x 文档地址](https://github.com/Akryum/vue-virtual-scroller/blob/v1/packages/vue-virtual-scroller/README.md)
- [vue3-最新项目地址](https://github.com/Akryum/vue-virtual-scroller/tree/master/packages/vue-virtual-scroller)
- [next 文档地址](https://github.com/Akryum/vue-virtual-scroller/tree/master/packages/vue-virtual-scroller)

## 安装

```bash

npm install --save vue-virtual-scroller
```

## 默认导出

安装所有组件:

```js
import Vue from 'vue'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import VueVirtualScroller from 'vue-virtual-scroller'

Vue.use(VueVirtualScroller)
```

使用特定组件：

```js
import Vue from 'vue'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import { RecycleScroller } from 'vue-virtual-scroller'

Vue.component('RecycleScroller', RecycleScroller)
```

## 用法

`vue-virtual-scroller` 提供了二个组件,分别 `RecycleScroller` 以及 `DynamicScroller` + `DynamicScrollerItem` 为一组。
同时还提供了 一个 mixin `IdState` ,可以用来 简化 `RecycleScroller` 中重用组件的本地状态管理。

### RecycleScroller

RecycleScroller 是一个虚拟滚动器，仅呈现可见项。当用户滚动时，RecycleScroller 会重用所有组件和 DOM 节点以保持最佳性能。

```vue
<template>
  <RecycleScroller
    style="height: 150px; overflow-y: auto"
    class="scroller"
    :items="[]"
    :item-size="32"
    key-field="id"
    v-slot="{ item }"
  >
    <div class="user">
      {{ item.name }}
    </div>
  </RecycleScroller>
</template>
```

### 动态滚动 `DynamicScroller` + `DynamicScrollerItem`

这就像 RecycleScroller 一样工作，但它可以渲染大小未知的项目！

当我们的内容是动态的，也就是元素的高度不固定时，使用 这个组合

```vue
<template>
  <DynamicScroller :items="items" :min-item-size="54" class="scroller">
    <template v-slot="{ item, index, active }">
      <DynamicScrollerItem
        :item="item"
        :active="active"
        :size-dependencies="[item.message]"
        :data-index="index"
      >
        <div class="avatar">
          <img
            :src="item.avatar"
            :key="item.avatar"
            alt="avatar"
            class="image"
          />
        </div>
        <div class="text">{{ item.message }}</div>
      </DynamicScrollerItem>
    </template>
  </DynamicScroller>
</template>
```

- `minItemSize` 是项目的初始渲染所必需的。
- `DynamicScroller `不会自行检测大小变化，但可以在 DynamicScrollerItem 上放置可能影响项目大小的值。`size-dependencies`
- 您不需要在项目上设置字段。size

## 重要提示

1. ⚠️ 您需要设置 virtual-scroller 元素和 items 元素的大小（例如，使用 CSS）。除非您使用的是可变尺寸模式，否则所有项目都应具有相同的高度（或水平模式下的宽度），以防止显示故障。
2. ⚠️ 如果项目是对象，则滚动条需要能够识别它们。默认情况下，它将在项目上查找 id 字段。如果您使用其他字段名称，则可以使用 keyField 属性进行配置。
3. 不建议在 RecycleScroller 中使用功能组件，因为这些组件是重用的（因此实际上会更慢）。
4. 列表项组件必须对正在更新的道具做出反应，而无需重新创建（使用计算的道具或观察程序对道具更改做出正确反应！
5. 您不需要设置列表内容（但您应该设置所有嵌套元素以防止加载故障）
6. 浏览器对 DOM 元素有大小限制，这意味着目前虚拟滚动条不能显示超过 ~500k 的项目，具体取决于浏览器。
7. 由于 DOM 元素是重用到项的，因此建议使用提供的类而不是状态选择器来定义悬停样式（例如 或 ）`hover:hover.vue-recycle-scroller__item-view.hover.hover .some-element-inside-the-item-view`

:::tip

更多了解请查看文档
:::
