---
title: CSS.registerProperty CSS自定义属性
author: 李嘉明
createTime: 2024/07/19 15:15:45
permalink: /article/iis1kmob/
tags:
  - BOM
---

CSS 属性和值 API（CSS Properties and Values API）——CSS Houdini API 的一部分——允许开发者显式地定义它们的 CSS 自定义属性，允许设置属性类型检查、默认值以及是否可继承其值。[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CSS_Properties_and_Values_API)

:::normal-demo

```html
<section>
  <p class="outer">
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non consequuntur,
    quibusdam tenetur repudiandae quasi quam veniam deserunt, impedit molestiae
    ab error cum. Error a, facere vero fugiat laudantium aliquam debitis.
  </p>
</section>
```

```js
window.CSS.registerProperty({
  name: '--my-color',
  syntax: '<color>',
  inherits: false,
  initialValue: '#f90',
});
```

```css
p.outer {
  color: var(--my-color);
}
```
:::
