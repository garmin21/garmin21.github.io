---
title: SCSS
author: 李嘉明
createTime: 2024/05/14 16:45:14
permalink: /defensive-css/220id51m/
---

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