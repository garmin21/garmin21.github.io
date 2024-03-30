---
title: sass 实现 自定义主题切换
date: '2022-11-20'
categories:
    - 工程化
tags:
    - 工程化
publish: true
---

## 前言

采用的技术：

1. "vue": "^2.6.14"
2. "sass": "^1.56.1",
3. "sass-loader": "^13.2.0",
4. webpack5.x

### 起步

1. 新建 \_themes.scss

```scss
//当HTML的data-theme为dark时，样式引用dark
//data-theme为其他值时，就采用组件库的默认样式
//这里我只定义了两套主题方案，想要再多只需在`$themes`里加就行了
//注意一点是，每套配色方案里的key可以自定义但必须一致，不然就会混乱

$themes: (
    light: (
        //字体
        font_color1: #414141,
        font_color2: white,

        //背景
        background_color1: #fff,
        background_color2: #f0f2f5,
        background_color3: red,
        background_color4: #2674e7,

        //边框
        border_color1: #3d414a,
    ),
    dark: (
        //字体
        font_color1: #a7a7a7,
        font_color2: white,

        //背景
        background_color1: #1b2531,
        background_color2: #283142,
        background_color3: #1e6ceb,
        background_color4: #323e4e,

        //边框
        border_color1: #3d414a,
    ),
);
```

2. 新建 \_handle.scss

```scss
@import './_themes.scss';

//遍历主题map
@mixin themeify {
    @each $theme-name, $theme-map in $themes {
        //!global 把局部变量强升为全局变量
        $theme-map: $theme-map !global;
        //判断html的data-theme的属性值  #{}是sass的插值表达式
        //& sass嵌套里的父容器标识   @content是混合器插槽，像vue的slot
        [data-theme='#{$theme-name}'] & {
            @content;
        }
    }
}

//声明一个根据Key获取颜色的function
@function themed($key) {
    @return map-get($theme-map, $key);
}

//获取背景颜色
@mixin background_color($color) {
    @include themeify {
        background-color: themed($color) !important;
    }
}

//获取字体颜色
@mixin font_color($color) {
    @include themeify {
        color: themed($color) !important;
    }
}

//获取边框颜色
@mixin border_color($color) {
    @include themeify {
        border-color: themed($color) !important;
    }
}
```

3. 使用

```vue
<template>
    <div id="app">
        <el-button @click.native="theme('light')">light</el-button>
        <el-button type="primary" @click.native="theme('dark')">dark</el-button>
        <div class="common-util">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias non
            tempore aperiam, tenetur praesentium laudantium reiciendis unde quam
            odit, nesciunt voluptatum repellendus, odio enim! Ipsa, quisquam.
            Error praesentium sint necessitatibus.
        </div>
    </div>
</template>

<script>
export default {
    name: 'App',
    methods: {
        //换主题
        theme(type) {
            window.document.documentElement.setAttribute('data-theme', type)
        },
    },
}
</script>

<style lang="scss">
@import '@/theme/_handle.scss';

.common-util {
    font-size: 18px;
    @include font_color('font_color1');
    @include background_color('background_color1');
    @include border_color('border_color1');
}
body {
    @include background_color('background_color1');
}
</style>
```

### 参考

-   https://juejin.cn/post/6844904141983072264
