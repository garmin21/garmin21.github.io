---
title: 3-16 使用vue3 应该避免的4个错误
date: '2023-03-16'
categories:
    - Error
tags:
    - Error
publish: true
---

## 1. 使用 Reactive 声明原始值

使用 reactive 声明原始值，会产生一个错误

正确是使用规则是

1. 使用`reactive` 声明 object, array map set ...
2. 使用 `ref` 声明 string number boolean ...

## 2. 解构响应式数据

假设一个响应式对象，拥有 count 属性， 你可能会使用 javascript 解构来做这种事

```vue
<template>
    <div>Counter: {{ count }}</div>
    <button @click="add">Increase</button>
</template>

<script>
import { reactive } from 'vue'
export default {
    setup() {
        const state = reactive({ count: 0 })

        function add() {
            state.count++
        }

        return {
            ...state, //
            add,
        }
    },
}
</script>
```

**Vue 的响应式跟踪是通过属性访问进行的。这意味着我们不能赋值或解构一个响应式对象**，因为与第一个引用的响应式连接已经断开。这就是使用响应式帮助函数的局限性之一。

## 3. 声明附加选项

Options API 方法有几个属性在`script setup`中是不被支持的

1. `name`
2. `inheritAttrs`
3. 插件或库所需的自定义选项

解决办法是按照 `script setup`RFC 的定义，在同一个组件中设置两个不同的脚本。

```vue
<script>
export default {
    name: 'CustomName',
    inheritAttrs: false,
    customOptions: {},
}
</script>

<script setup>
// script setup logic
</script>
```

## 4. 使用错误的生命周期

**所有的组件生命周期事件都被重新命名，要么添加 on 前缀，要么完全改变名称。你可以在下面的图表中查看所有的变化。**

<img :src="$withBase('/18.webp')" width="100%" height="100%" />
