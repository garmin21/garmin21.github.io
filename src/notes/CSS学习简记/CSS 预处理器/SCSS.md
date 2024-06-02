---
title: SCSS 基础教程
author: 李嘉明
createTime: 2024/05/14 16:45:14
permalink: /defensive-css/220id51m/
---


## 简介
引用官网的一段话
:::tip
Sass 是一款强化 CSS 的辅助工具，它在 CSS 语法的基础上增加了变量 (variables)、嵌套 (nested rules)、混合 (mixins)、导入 (inline imports) 等高级功能，这些拓展令 CSS 更加强大与优雅。使用 Sass 以及 Sass 的样式库（如 Compass）有助于更好地组织管理样式文件，以及更高效地开发项目。
:::

[中文文档](https://www.sass.hk/docs/)

## 变量

使用 $ 符号命名变量

```scss
$myColor: #f90;

.dome {
  color: $myColor
}
```

## 嵌套

scss中允许你像编写 html 一样的 视觉 层次结构

```scss
.outer {
  display: block;
  .inner {
    display: block;
  }
}

```

## 创建片段的scss文件，使用 @use 引入 

```scss
// _variables.scss

$primary-color: #ff0000;
$secondary-color: #00ff00;

```

```scss
// styles.scss
/*
@use “Address” as spacename;
  Adress: scss文件路径
  spacename: 命名空间(防止加载多个文件导致引用混淆)
*/
@use '@src/assets/scss/variables' as vars;

body {
  background-color: vars.$primary-color;
  color: vars.$secondary-color;
}
```


## mixins 混入

mixin 允许您创建要在整个站点中**重复使用**的CSS声明组。您甚至可以**传递值**以使您的 mixin 更加灵活


```scss
@mixin theme($theme: DarkGray) {
  background: $theme;
  box-shadow: 0 0 1px rgba($theme, 0.25);
  color: #fff;
}

.info {
  @include theme;
}
.alert {
  @include theme($theme: DarkRed);
}
.success {
  @include theme($theme: DarkGreen);
}
```


## 继承 @extend

使用 占位符  `%` 声明一个样式组， 使用 ` @extend` 继承样式
```scss
%dot-status {
  font-size: 18px;
}

.all-dot-status-1 {
  @extend %dot-status;
  background: #13ce66;
}
```


## BEM 规范

Element UI 是一个基于 BEM（块、元素、修饰符）命名规范的组件库。BEM 是一种用于命名和组织 CSS 类的方法，旨在提高样式的可维护性和可重用性。
在 Element UI 中，BEM 命名规范通常用于组件的类名命名。
BEM 命名规范由以下三个部分组成：

1. 块（Block）：表示独立的可重用组件。块是一个高级别的抽象，它代表一个完整的实体或独立的组件。在 Element UI 中，块通常对应于一个组件，例如 el-button、el-input 等。
2. 元素（Element）：表示块的组成部分。元素是块的一部分，不能独立存在，其命名需要与块相互关联。在 Element UI 中，元素通常对应于组件内部的子元素，例如 el-button__text、el-input__inner 等。
3. 修饰符（Modifier）：表示块或元素的不同状态或变体。修饰符用于修改块或元素的外观或行为。在 Element UI 中，修饰符通常用于表示组件的不同状态，例如 el-button--primary 表示主要样式的按钮，el-input--disabled 表示禁用状态的输入框等。

通过使用 BEM 命名规范，可以将样式分割为更小的模块，提高样式的可维护性和可重用性。它还可以减少样式之间的冲突，使不同组件之间的样式独立。

下面是一个使用 BEM 命名规范的示例：

```html
<div class="el-button el-button--primary">
  <span class="el-button__text">Submit</span>
</div>
```


## BEM 规范 编写一个 mixins，动态生成样式结构

```scss
$namespace: 'element-ui';

@mixin b($block) {
  $B: $namespace + '-' + $block !global;

  .#{$B} {
    @content;
  }
}

@include b(div) {
  background-color: pink;
}
```

编译生成：

```css
.element-ui-div {
  background-color: pink;
}
```


## `!default`标志


我们在一些UI主题库中经常会看到这样的一些写法：

```scss
$--color-primary: #f90;

$--color-primary: #409EFF !default;
```

为什么要加一个 `!default` 呢？看下ChatGPT 的解释:

:::tip
也就是说 在scss 文件中，相当于是使用 !default 定义了变量为默认值，如果有相同的变量则使用那个变量，如果没有 则使用默认值 ,所以以上生效的颜色值就是  `#f90`
:::