---
title: require API
author: 李嘉明
createTime: 2024/05/17 22:53:53
permalink: /learn-build/require/
---


## require

我们平常`require`是在运行时加载模块并且生成一个对象,特点是**每次引入一个,需要指定路径,不支持传入变量**.

```js
require("./template/" + name + ".ejs");
```

在`webpack`中,`webpack`为我们提供了`require.context`这个 api,他和`require`最大的区别就在于**就是可以在一个路径下,获取一个特定的上下文,可以用正则去查找并导入多个模块**

## require.context

可以给这个函数传入四个参数：

1.  一个要搜索的目录，
2.  一个标记表示是否还搜索其子目录，
3.  一个匹配文件的正则表达式。
4.  **第四个参数:mode,处理 import 的时机和类型**

## 前端自动化引入(vue)

### 1.用来在组件内引入多个组件

```javascript
// 从@/components/home目录下加载所有.vue后缀的组件
const files = require.context("@/components/home", false, /\.vue$/);
const components = {};

// 遍历files对象，构建components键值
files.keys().forEach((key) => {
  components[key.replace(/(\.\/|\.vue)/g, "")] = files(key).default;
});

export default {
  components
};
```

### 2. 在 main.js 中引入大量公共组件

```javascript
import Vue from "vue";
// 自定义组件
const requireComponents = require.context("../views/components", true, /\.vue/);
// 打印结果
// 遍历出每个组件的路径
requireComponents.keys().forEach((fileName) => {
  // 组件实例
  const reqCom = requireComponents(fileName);
  // 截取路径作为组件名
  const reqComName = reqCom.name || fileName.replace(/\.\/(.*)\.vue/, "$1");
  // 组件挂载
  Vue.component(reqComName, reqCom.default || reqCom);
});
```

### 3. 用在 vuex 中加载 module 或加载多个 api 接口

```javascript
const files = require.context(".", false, /\.js$/);
const modules = {};

files.keys().forEach((key) => {
  if (key === "./index.js") return;
  modules[key.replace(/(\.\/|\.js)/g, "")] = files(key).default;
});

export default modules;
```

### 4. vue 路由懒加载

```js
const item = {
  path: `/${pathName}`,
  name: pathName,
  component: () =>
    import(
      /* webpackChunkName: "[page]" */ `@/views/car/${pathName}/index.vue`
    ),
};
```

上面这块代码,在平常的时候可以生效,但是在`require.context`中,会发现这个公认的懒加载方案不生效了! 左改右改,都不行,最后通过看打包后的`app.js`进行控制变量对比才发现问题就出在`require.context`中 仔细查阅了外面的其他文档和看了内部代码,来引入今天的头号嘉宾`webpackMode`

## 第四个参数 **webpackMode**

webpack 4 的文档中并没有找到这个参数,在 5 中虽然提到了这个参数,文档中并没有很明确的说明 mode 的含义. 我们从源码中拉出对应的`typeof`

`/** @typedef {"sync" | "eager" | "weak" | "async-weak" | "lazy" | "lazy-once"} ContextMode Context mode */`

**webpackMode**属性定义了 resolve 动态模块时的模式。支持以下六种模式：

- **sync** 默认属性,不生成额外的`chunk`。所有导入的模块被包含在当前模块内，所以不需要再发额外的网络请求。它仍然返回一个`Promise`，但它被自动 resolve。使用`sync`模式的动态导入与静态导入的区别在于，整个模块只有当`import()`调用之后才执行.
- **lazy** 为动态引入的模块建立动态`chunk`
- **lazy-once** 使用它，会为满足导入条件的所有模块创建单一的异步`chunk`。
- **eager** 在`require.context`选项里可以基本等同于`sync`(个人理解)
- **weak** 在`sync`的基础上添加一个`weak`标识,彻底阻止额外的网络请求。只有当该模块已在其他地方被加载过了之后，`Promise`才被 resolve，否则直接被 reject。
- **async-weak** 在`require.context`选项里可以基本等同于`weak`(个人理解)

我们在上面遇到懒加载不生效就是因为`require.context`里默认是使用`sync`模式进行对引入组件的处理,导致分包被阻断,我们只要加上`lazy`或者`lazy-once`便可以解决问题.

`lazy`和`lazy-once`的区别便是一个按文件数量生成`chunk`,`lazy-once`把上下文内符合规则的模块打到一起,只生成一个`chunk`

<!-- ## webpackMode 注释

我们默认大家已经知道和了解 webpack 的一些魔法注释,但这边还是稍加解释一下`webpackMode`指定 webpack 引入包的类型 在 `webpack import` 中,默认会使用`lazy`作为

`route: () => import(/* webpackMode: "eager" */ "./.vue")`

**这里要注意,如果上面配了`lazy-once`的话,在下面引入的地方也要加上魔法注释类型为`lazy-once`** 这里感觉牵扯到一个优先级的问题,此处的`webpackMode注释`和`require.context`中的可选类型是一支,只是在`import`中注释会有更多功能

### webpackChunkName

我们继续默认大家已经知道和了解 webpack 的一些魔法注释,但这边还是稍加解释一下`webpackChunkName`这个分包命名的注释. 他的使用方式很简单,在引入模块的地方添加一段注释便可以给分出来包重新命名

`/* webpackChunkName: "[request]" */`

里面有两个特殊的变量 `[index]`和`[request]`, **以下两个变量生效的前提是有多个动态导入的文件**

`[index]`表示在当前动态导入声明中表示文件的索引。 `[request]`表示可以根据动态导入的文件名进行命名. -->
