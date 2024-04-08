---
title: vueRouter
author: 李嘉明
createTime: 2024/03/31 20:46:37
permalink: /learn-vue/vue-router/
---

::: tip

vue-router 是官方的路由器。用于实现前端路由跳转， 用于构建单页面应用程序

什么是路由?

1. 一个路由就是一个映射关系(key:value)
2. key 为路由路径, value 可能是 function/component
   路由分类:
3. 后台路由: node 服务器端路由, value 是 function, 用来处理客户端提交的请求并返回一个响应数据
4. 前台路由: 浏览器端路由, value 是 component, 当请求的是路由 path 时, 浏览器端前没有发送 http 请求, 但界面会更新显示对应的组件
   :::

## 基本使用

1. 下载 vue-router 组件类库：

```cmd
yarn add vue-router
```

2. 使用 router-link 组件来导航

```js
;<router-link to="/login">登录</router-link>
// or
this.$router.push('url')
```

3. 使用 router-view 组件来显示匹配到的组件

```vue
<router-view></router-view>
```

4. 创建一个路由器 router 实例

```js
// 通过 routers 属性来定义路由匹配规则
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/xxx' }, // 使用 redirect 实现路由重定向
    { path: '/login', component: login },
    {
      path: '/register',
      component: register,
      children: [
        // 通过 children 数组属性，来实现路由的嵌套
        { path: 'xxx', component: xxx }, // 注意，子路由的开头位置，不要加 / 路径符
        { path: 'xxxx', component: xxx },
        {
          // 路由参数的验证处理 ---> 保护路由安全
          path: '/xxx/:id(\\d{2})',
          component: content,
        },
      ],
    },
  ],
})
export default router
```

5. 在 Vue 配置对象中，挂载路由器实例

```json
new Vue({
    el: '#app',
    router 	// 挂载路由器实例来使用路由规则
});
```

### 介绍

### router-link

```json
属性：
to : 必填，表示目标路由的链接,值可以是一个字符串或者是描述目标位置的对象。
....等，看文档
```

### router-view

> 用于填坑， router-view 组件会显示匹配到的路由组件

```json
属性：
name : 用于命名视图
```

### Router

> 路由器实例 `new VueRouter`

```json
属性：
routes ： //用于定义路由的匹配规则，是一个数组
mode ： //用于定义当前路由器所用的风格`hash`or`history`
currentRoute : //当前路由对应的路由信息对象。=== Route
```

### Route

> 路由信息对象

...具体看文档

## 路由传参

#### name

```js
<p>{{ $route.name}}</p> // 这样拿到当前路由的名字
```

#### params

> **注意**如果你提供的是 `path`，那么`params`就会被忽略

```js
// 写法1 <router-link :to="{name:xxx,params:{key:value}}">valueString</router-link>
// 写法2 <router-link to="/xxx/1">我是路由链接</router-link>
// 写法5 this.$router.push({name:xxx,params:{key:value}})
// 写法6 this.$router.push('/xxx/1')
```

#### query

```js
// 写法3 <router-link :to="{name:xxx,query:{key:value}}">valueString</router-link>
// 写法4 <router-link to="/xxx?id=1">我是路由链接</router-link>

// 写法7 this.$router.push({ path: 'register', query: { id: 1 }})
// 写法8 this.$router.push('/register?id=1')
```

```js
// {{$route.location.query.xxx}}
```

#### meta

```json
{
    path: "/login",
    component: Login,
	  meta:{
        isShow:true
    }
}
```

#### 路由三模式

```js
// 1. 布尔模式 ： 如果 props 被设置为 true，route.params 将会被设置为组件属性
 {
     path: "/login/:id",
     component: Login,
     name: "login",
     props: true
 }
------------
props : ['id'],
```

```js
// 2. 对象模式：如果 props 是一个对象，它会被按原样设置为组件属性。当 props 是静态的时候有用。
{
    path: "/login",
    component: Login,
    name: "login",
    props: { newsletterPopup: false }
}
------------
props : ['newsletterPopup'],
```

```js
// 3. 函数模式：你可以创建一个函数返回 props。这样你便可以将参数转换成另一种类型，将静态值与基于路由的值结合等等。
{
    path: "/login/:id",
    component: Login,
    name: "login",
    props: (route) => ({ id: route.params.id })
}
------------
props : ['id'],
```

## 命名视图

1. 标签代码结构：

```html
<div id="app">
  <router-view></router-view>
  <div class="content">
    <router-view name="a"></router-view>
    <router-view name="b"></router-view>
  </div>
</div>
```

2. JS 代码：

```vue
<script>
var header = Vue.component('header', {
  template: '<div class="header">header</div>',
})

var sidebar = Vue.component('sidebar', {
  template: '<div class="sidebar">sidebar</div>',
})

var mainbox = Vue.component('mainbox', {
  template: '<div class="mainbox">mainbox</div>',
})

// 创建路由对象
var router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: header,
        a: sidebar,
        b: mainbox,
      },
    },
  ],
})
</script>
```

## Vue-router 进阶

## 路由守卫

### 参考文章

[什么是前端路由](https://blog.csdn.net/weixin_40851188/article/details/90377025)
