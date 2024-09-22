---
title: import.meta.glob
author: 李嘉明
createTime: 2024/09/21 16:11:24
permalink: /learn-build/aiuqpgu7/
---

> 批量全局注册场景：我们写好一堆组件，又不想每次要用的时候单独 import 导入。这时就可以考虑全局批量注册啦，比如布局组件

## import.meta.glob

```js
const modulesFiles = import.meta.glob('./src/*.vue');
```

上述会转译成如下样子：

```js
// vite 转译生成的代码
const modulesFiles = {
  './src/foo.vue': () => import('./src/foo.vue'),
  './src/bar.vue': () => import('./src/bar.vue'),
};
```

然后遍历 `modulesFiles` 对象的 path 来注册对应的模块

根据官方文档 [功能 | Vite 官方中文文档](https://link.juejin.cn?target=https%3A%2F%2Fcn.vitejs.dev%2Fguide%2Ffeatures.html%23glob-import 'https://cn.vitejs.dev/guide/features.html#glob-import') 说明，`import.meta.glob`方式匹配到的文件默认是懒加载的，通过动态导入实现，并会在构建时分离为独立的 chunk。如果你倾向于直接引入所有的模块（例如依赖于这些模块中的副作用首先被应用），你可以传入 `{ eager: true }` 作为第二个参数，那么其转译的形式就与`import.meta.globEager`完全一致啦，如下：

import.meta.glob 函数并设置 { eager: true } 参数的特点如下：

1. **即时（Eager）导入**：当使用 { eager: true } 参数时，import.meta.glob 会在模块加载时立即执行，而不是等到模块被导入时再执行。这意味着模块的匹配和导入会在整个应用程序启动时立即发生。
2. **提前加载**：通过设置 { eager: true } 参数，匹配的模块会在应用程序启动时提前加载，而不是在需要时才动态导入。这有助于提前加载和准备特定模块，以优化应用程序的性能和加载时间。
3. **适用场景**：适合在启动时需要立即加载并准备的模块，以确保在后续代码执行时这些模块已经准备就绪。这对于一些必要的全局设置、工具类函数或共享逻辑模块非常有用。
4. **模块匹配**: import.meta.glob('./dir/\*.js') 会匹配指定目录下所有以 .js 结尾的文件，并返回一个对象，对象的键是匹配到的文件路径，值是一个异步加载函数。

glob 中的 `import` 选项表示具名导入，`import: 'default'`表示导入模块中的 default 空间的内容，此处内容对应于 `export default` 导出的内容

```vue
<script>
export default {
  name: 'foo',
};
</script>
```

## 导入模式

```js
const modules = import.meta.glob('./dir/*.js', {
  // import 有以下 几个参数
  // 1. default 默认导入
  // 2. setup 具名导入： 如果 你只想要导入模块中的部分内容，那么就可以使用具名导入
  import: 'setup',
  // query 参数表示 将资源作为 什么方式导入，
  // 具体可以查看文档的描述 https://cn.vitejs.dev/guide/features#custom-queries
  query: '?raw',
});
```

具名导入 vite 生成的代码：

```js
const modules = {
  './dir/foo.js': () => import('./dir/foo.js').then((m) => m.setup),
  './dir/bar.js': () => import('./dir/bar.js').then((m) => m.setup),
};
```

## 最后执行批量全局注册组件如下：

```js
const modulesFiles = import.meta.glob('./*/*.vue', {
  import: 'default',
  eager: true, // 表示
});

export default (app) => {
  for (const path in modulesFiles) {
    const componentName = modulesFiles[path].name; // 获取组件默认名称
    app.component(componentName, modulesFiles[path]);
  }
};
```
