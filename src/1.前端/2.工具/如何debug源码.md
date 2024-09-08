---
title: 如何debug源码
author: 李嘉明
createTime: 2024/05/25 21:34:48
permalink: /article/87oxxcmp/
tags:
  - 工具
---

## debug 源码搞清楚是如何调用 render 函数

有的小伙伴看到这里需要看源码就觉得头大了，别着急，其实很简单，我会一步一步的带着你去 debug 源码。

首先我们将 Enable JavaScript source maps 给取消勾选了，不然在 debug 源码的时候断点就会走到 vue 文件中，而不是走到编译会的 js 文件中。

![](/debug/39.png)

然后我们需要在设置里面的 Ignore List 看看 node_modules 文件夹是否被忽略。新版谷歌浏览器中会默认排除掉 node_modules 文件夹，所以我们需要将这个取消勾选。如果忽略了 node_modules 文件夹，那么 debug 的时候断点就不会走到 node_modules 中 vue 的源码中去了。
![](/debug/40.png)

接下来我们需要在浏览器中找到 vue 文件编译后的 js 代码，我们只需要在 network 面板中找到这个 vue 文件的 http 请求，然后在 Response 下右键选择 Open in Sources panel，就会自动在 sources 面板自动打开对应编译后的 js 文件代码。
![](/debug/41.png)

找到编译后的 js 文件，我们想 debug 看看是如何调用 render 函数的，所以我们给 render 函数加一个断点。然后刷新页面，发现代码已经走到了断点的地方。我们再来看看右边的 Call Stack 调用栈，发现 render 函数是由一个 vue 源码中的 renderComponentRoot 函数调用的。
![](/debug/42.png)

点击 Call Stack 中的 renderComponentRoot 函数就可以跳转到 renderComponentRoot 函数的源码，我们发现 renderComponentRoot 函数中调用 render 函数的代码主要是下面这样的：

```js
function renderComponentRoot(instance) {
  const {
    props,
    data,
    setupState,
    // 省略...
  } = instance

  render2.call(thisProxy, proxyToUse, renderCache, props, setupState, data, ctx)
}
```

这里我们可以看到前面的$setup 实际就是由 setupState 赋值的，而 setupState 是当前 vue 实例上面的一个属性。那么 setupState 属性是如何被赋值到 vue 实例上面的呢？

我们需要给 setup 函数加一个断点，然后刷新页面进入断点。通过分析 Call Stack 调用栈，我们发现 setup 函数是由 vue 中的一个 setupStatefulComponent 函数调用执行的。
![](/debug/43.png)
点击 Call Stack 调用栈中的 setupStatefulComponent，进入到 setupStatefulComponent 的源码。我们看到 setupStatefulComponent 中的代码主要是这样的：

```js
function setupStatefulComponent(instance) {
  const { setup } = Component
  // 省略
  const setupResult = callWithErrorHandling(setup, instance)
  handleSetupResult(instance, setupResult)
}
```

setup 函数是 Component 上面的一个属性，我们将鼠标放到 Component 上面，看看这个 Component 是什么东西？

![](/debug/44.png)

看到这个 Component 对象中既有 render 方法也有 setup 方法是不是感觉很熟悉，没错这个 Component 对象实际就是我们的 vue 文件编译后的 js 对象。
从 Component 对象中拿到 setup 函数，然后执行 setup 函数得到 setupResult 对象。然后再调用 handleSetupResult(instance, setupResult);

我们再来看看 handleSetupResult 函数是什么样的，下面是我简化后的代码：

```js
function handleSetupResult(instance, setupResult) {
  if (isFunction(setupResult)) {
    // 省略
  } else if (isObject(setupResult)) {
    instance.setupState = proxyRefs(setupResult)
  }
}
```

我们的 setup 的返回值是一个对象，所以这里会执行 instance.setupState = proxyRefs(setupResult)，将 setup 执行会的返回值赋值到 vue 实例的 setupState 属性上。

看到这里我们整个流程已经可以串起来了，首先会执行由 setup 语法糖编译后的 setup 函数。然后将 setup 函数中由顶层变量和 import 导入组成的返回值对象赋值给 vue 实例的 setupState 属性，然后执行 render 函数的时候从 vue 实例中取出 setupState 属性也就是 setup 的返回值。这样在 render 函数也就是 template 模版就可以访问到 setup 中的顶层变量和 import 导入。

![](/debug/45.png)