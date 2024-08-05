---
title: 选择组件 el-select
author: 李嘉明
createTime: 2024/06/10 12:07:05
permalink: /article/nx2fj9pc/
tags:
  - element-ui
---

[基础版select实现](https://gitee.com/hhhh-ddd/jm-framework/blob/master/JM-G6/src/pages/select-example.vue)

## el-select

其原理，就是借用 `vue-popper.js` 的 mixin 文件，控制其定位的位置。底层使用还是 `popper.js`。

**几个核心问题**

1. 他是如何使用 popperJS 的？
   - 1. 当我们使其选择器，获取焦点时，他会使用`visible`响应式属性控制。下拉块的出现和隐藏
   - 2. 再调用` this.broadcast('ElSelectDropdown', 'updatePopper');` 方法，这个方法递归的寻找子组件，找到后，匹配对应的组件名称，进行 `$emit` 事件触发，在我们子组件中，使用了 `$on`去监听绑定事件
   - 3. 通过`$on`监听的绑定事件，从而去控制 创建 popper 或者 销毁 or 更新
2. 当选中某一个 option 时 触发的逻辑 是什么？
   - 1. 当我们采用`v-model` 进行数据双向绑定时，组件内部监听 value 变化。
   - 2. 点击 option 触发 select `$on` 绑定的 `handleOptionClick` 方法，向外抛出 `$emit('input')` 以及 `$emit('change')` 事件，从而更新 input 的 value。
   - 3. 改变 value 的值，继而触发 watch 绑定的方法，内部使用 `setSelected` 方法设置当前选项， value 对比不一样的情况下 执行 `this.dispatch('ElFormItem', 'el.form.change', val);` 触发不断循环找到父组件，触发其内部的方法，并且把值设置上去

## 使用方式

```html
<el-select v-model="value" placeholder="请选择">
  <el-option
    v-for="item in options"
    :key="item.value"
    :label="item.label"
    :value="item.value"
  >
  </el-option>
</el-select>
```

可以看到，默认情况下 只是使用了 `v-model` 进行双向数据绑定 input 的值

::: tabs

@tab emitter.js

```js
// 触发器 mixin
function broadcast(componentName, eventName, params) {
  this.$children.forEach((child) => {
    var name = child.$options.componentName;
    // 匹配子组件名称，找到了，就调用 $emit 方法
    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      // 不断的循环递归找子组件
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
export default {
  methods: {
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;
      // 不断的while 循环，找父组件，判断，组件名称是否找到了，找到了就结束循环
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        // 找到后，调用$emit 方法
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    },
  },
};
```
:::

[vue-popper.js](/article/w82r5ewm/)

## 分析总结

1. select 的 效果实现，还是通过 `vue-popper.js` 来进行实现，input 设置了`ref='reference'` 使用响应式变量 `visible` 控制其主体内容的显示和隐藏
2. `setSelected` 方法用于设置选项数据. 很重要的一个方法。



:::tip
本次示例中使用 的是 `element-ui@2.15.14`
:::
