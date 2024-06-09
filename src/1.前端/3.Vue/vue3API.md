---
title: vue3 API
tags:
  - vue
createTime: 2024/03/31 20:46:37
permalink: /article/iezsshvr/
author: 李嘉明
---

## 常规

### version

获取当前 vue 的版本

```js
import { version } from 'vue'

console.log(version)
```

### nextTick()

等待下一次 DOM 更新刷新的工具方法。

```vue
<script setup>
import { ref, nextTick } from 'vue'

const count = ref(0)

async function increment() {
  count.value++

  // DOM 还未更新
  console.log(document.getElementById('counter').textContent) // 0

  await nextTick()
  // DOM 此时已经更新
  console.log(document.getElementById('counter').textContent) // 1
}
</script>

<template>
  <button id="counter" @click="increment">{{ count }}</button>
</template>
```

### defineComponent

在定义 Vue 组件时提供类型提示的帮助函数。

```js
function defineComponent(
  component: ComponentOptions | ComponentOptions['setup']
): ComponentConstructor
```

获取组件实例

```js
const Foo = defineComponent(/* ... */)

type FooInstance = InstanceType<typeof Foo>
```

### defineAsyncComponent

创建一个异步组件，

适用场景：某一个组件需要等待数据回来在进行显示

例子：骨架屏

特点：打包会帮助我们进行 分包 处理，减少的 js 大小，减少加载时间

```js
// 简单使用
const asyncSelect = defineAsyncComponent(() => {
  return import(/* select */ './components/select.vue')
})
```

> https://blog.csdn.net/gpj065/article/details/117419752

> https://www.jianshu.com/p/ff9fde39e9b0

> https://juejin.cn/post/6912749734818447374

加载远程组件方案

> https://www.jianshu.com/p/7336055b0264

### defineCustomElement()

使用 vue 来构建 原生自定义元素

## 引用

### createApp()

创建一个应用实例, 第一个参数是根组件。第二个参数可选，它是要传递给根组件的 props

```js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
```

### createSSRApp()

创建一个 ssr 应用实例

### app.mount()

将应用程序实例挂载在一个容器元素中。

### app.unmount()

将一个应用实例卸载，会触发这个组件树上所有的 卸载 钩子

### app.provide()

注入，向当前 父级的 所有后代，注入 信息

返回应用实例本身，说明可以链式调用

### app.component()

注册全局组件

### app.directive()

注册全局指令

### app.use()

安装一个插件

### app.mixin()

应用一个全局 mixin（适用于该应用程序的范围）

### app.version

返回当前的版本

### app.config

返回当前的应用配置

### app.config.errorHandler

全局监听，应用发生的报错

### app.config.warnHandler

全局监听应用运行时的警告

### app.config.performance

将此设置为 true 在浏览器开发工具性能/时间线面板中启用组件初始化、编译、渲染和修补性能跟踪。仅适用于开发模式和支持 performance.mark API 的浏览器。

### app.config.compilerOptions

设置应用的自定义配置，会影响到整个应用程序中所有组件，组件自己也可以配置覆盖其配置

### app.config.globalProperties

注册全局属性的对象，可在应用程序内的任何组件实例上访问这些属性

### app.config.optionMergeStrategies

没搞懂

## Composition API

### setup 入口函数

```js
export default {
  setup(props, { attrs, slots, emit, expose }) {
    // props
    // attrs 相当于 $attrs
    // slots 相当于 $slots
    // expose 属性公开，可以将当前组件实例上的属性，和方法，公开
  },
}
```

### 响应式工具

#### isRef()

判断是否是一个 ref

#### unref()

解构 ref , 如果是一个 ref 就得到 原始值，如果是 原始值 ，就返回 原始值

### toRef(object, key, defaultValue)

将对象的某一个 key 转为 ref, 也可以设置默认值
