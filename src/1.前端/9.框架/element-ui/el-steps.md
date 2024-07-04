---
title: 步骤组件 el-steps
author: 李嘉明
createTime: 2024/06/16 21:28:44
permalink: /article/6sdldacj/
tags:
  - element-ui
---

:::tip
本次示例中使用 的是 `element-ui@2.15.14`
:::

## el-steps

**几个核心问题**

1. 线是怎么被限制在中间的？
   - 使用`position: absolute;` 定位到 图标的中间 一根线的高度为 2px，默认线的宽度为 父元素的一半 也就是 50%, 通过图标掩盖了部分线。
2. prop `space` 属性是如何控制 线的大小的？
   - 通过开发者传入 space 可以控制 线的长度，支持 number string 百分比，内部通过 `style.flexBasis = space;` 来控制线的长度

## 使用方式

```vue
<template>
  <steps :active="active" finish-status="success" space="100px">
    <step title="步骤 1"></step>
    <step title="步骤 2"></step>
    <step title="步骤 3"></step>
  </steps>
</template>
```

通过控制 `active` 来控制 步骤条的状态

:::tip
整体来说 steps 的原理比较简单，主要是通过 样式来控制，并且通过了 `$parent` 来获取父组件的响应式属性
:::

```vue
<template>
  <div
    class="el-step"
    :style="style"
    :class="[
      !isSimple && `is-${$parent.direction}`,
      isSimple && 'is-simple',
      isLast && !space && !isCenter && 'is-flex',
      isCenter && !isVertical && !isSimple && 'is-center'
     ]">
    <!-- icon & line -->
  </div>
</template>

<script>
export default {
  name: 'ElStep',
  // ....
  computed: {
    // ....
    style: function() {
      const style = {};
      const parent = this.$parent;
      const len = parent.steps.length;

      const space = (typeof this.space === 'number'
        ? this.space + 'px'
        : this.space
          ? this.space
          : 100 / (len - (this.isCenter ? 0 : 1)) + '%');
      style.flexBasis = space;
      if (this.isVertical) return style;
      if (this.isLast) {
        style.maxWidth = 100 / this.stepsCount + '%';
      } else {
        style.marginRight = -this.$parent.stepOffset + 'px';
      }

      return style;
    }
  },
  mounted() {
    const unwatch = this.$watch('index', val => {
      this.$watch('$parent.active', this.updateStatus, { immediate: true });
      this.$watch('$parent.processStatus', () => {
        const activeIndex = this.$parent.active;
        this.updateStatus(activeIndex);
      }, { immediate: true });
      unwatch();
    });
  }
};
</script>
```
