「这是我参与2022首次更文挑战的第3天，活动详情查看：[2022首次更文挑战](https://juejin.cn/post/7052884569032392740 "https://juejin.cn/post/7052884569032392740")」。

项目中存在许多svg图片，一开始我们在项目中使用ant-design-vue推荐的vue-svg-loader将 `svg` 图标作为 `Vue` 组件导入。vue-svg-loader使用中存在两个问题：

1.  图片使用时，先要导入，然后才能使用；
2.  不同的svg图片，编译之后存在id冲突，样式变乱。

今天学习并使用了svg-sprite-loader。该svg-sprite-loader，svg图片不存在id冲突，在使用时无需显示引入svg图片，大大提高开发效率。

svg-sprite-loader配置和使用步骤如下：

安装svg-sprite-loader
===================

js

 代码解读

复制代码

`npm i svg-sprite-loader -D`

配置vue.config.js
===============

js

 代码解读

复制代码

`chainWebpack: (config) => {     const svgRule = config.module.rule("svg");     // 清空默认svg规则     svgRule.uses.clear();     //针对svg文件添加svg-sprite-loader规则     svgRule       .test(/\.svg$/)       .use("svg-sprite-loader")       .loader("svg-sprite-loader")       .options({         symbolId: "icon-[name]",       });   },`

在components目录下创建SvgIcon/Index.vue组件
===================================

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e40e8379ad9b4efca431b2d7fae70a28~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

js

 代码解读

复制代码

``<template>   <svg :class="svgClass" aria-hidden="true">     <use :xlink:href="iconName" />   </svg> </template> <script> export default {   name: "SvgIcon",   props: {     iconClass: {       type: String,       required: true,     },     className: {       type: String,     },   },   computed: {     iconName() {       return `#icon-${this.iconClass}`;     },     svgClass() {       if (this.className) {         return "svg-icon " + this.className;       } else {         return "svg-icon";       }     },   }, }; </script> <style scoped> .svg-icon {   width: 1em;   height: 1em;   vertical-align: -0.15em;   fill: currentColor;   overflow: hidden; } </style>``

全局注册svg 组件
==========

在icons目录下，分别创建svg目录和index.js文件。svg目录存放.svg格式的文件。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2421533e62144e799976b6b1b5c57115~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

js

 代码解读

复制代码

`import Vue from "vue"; import SvgIcon from "../components/SvgIcon/Index"; //svg组件 //全局注册组件 Vue.component("svg-icon", SvgIcon); // 定义一个加载目录的函数 const requireAll = (r) => r.keys().map(r); // 加载目录下的所有的 svg 文件 requireAll(require.context("./svg", false, /\.svg$/));`

在 main.js 项目入口文件中导入 icons 文件
============================

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b4d5f7125488429e8f27d88e7ea4fd9c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

使用
==

js

 代码解读

复制代码

`//icon-class：svg图片的文件名 //class-name：svg图片的样式类名  <svg-icon icon-class="time" class-name="icon" />`

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ecffb651e5bb4ffe86d8e35aae33a0a1~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

\------------------------分割线，上面是vue2版本的代码，vue3需要稍微改一下---------------------------

1\. 将SvgIcon/Index.vue改成vue3语法
==============================

js

 代码解读

复制代码

``<template>   <svg :class="svgClass" aria-hidden="true">     <use :xlink:href="iconName" />   </svg> </template> <script lang="ts"> import { computed, defineComponent } from '@vue/runtime-core' export default defineComponent({   name: 'SvgIcon',   props: {     iconClass: {       type: String,       required: true,     },     className: {       type: String,     },   },   setup(props) {     const iconName = computed(() => {       return `#icon-${props.iconClass}`     })     const svgClass = computed(() => {       if (props.className) {         return 'svg-icon ' + props.className       } else {         return 'svg-icon'       }     })     return {       iconName,       svgClass,     }   }, }) </script> <style scoped> .svg-icon {   width: 1em;   height: 1em;   vertical-align: -0.15em;   fill: currentColor;   overflow: hidden; } </style>``

2\. SvgIcon/Index.vue组件全局注册方式有变化
================================

js

 代码解读

复制代码

`import { createApp } from 'vue' import App from './App.vue' import router from './router' import store from './store' import 'amfe-flexible' import { Button } from 'vant' import './icons' import SvgIcon from './components/SvgIcon.vue' createApp(App)   .use(store)   .use(router)   .use(Button)   .component('svg-icon', SvgIcon)   .mount('#app')`

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fb9b52190c2741c29dc101083c0db6e8~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

本文转自 <https://juejin.cn/post/7067165103547744263>，如有侵权，请联系删除。