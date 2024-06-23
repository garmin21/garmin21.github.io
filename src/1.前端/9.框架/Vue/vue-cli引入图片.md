---
title: vue项目图片错误引入导致编译报错
tags:
  - vue
createTime: 2024/03/31 20:46:37
permalink: /article/imxvshvr/
author: 李嘉明
---

## 1. 示例

```vue
<template>
  <div>
    <div v-for="item in items" :key="item.id">
      <img :src="item.image" alt="Item Image" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { id: 1, image: '../image/image1.png' },
        { id: 2, image: '../image/image2.png' },
        // 其他图片数据
      ],
    }
  },
}
</script>
```

我们会发现，这样子会导致编译报错，

## 2. 解决

在 Vue CLI 中，必须使用 `require` 的方式引入图片，然后才能循环渲染到页面的原因是因为在 Vue CLI 默认的 webpack 配置中，图片文件会被处理为模块，并且需要通过 `require` 或 `import` 来引入。

当你在 Vue 单文件组件中直接使用路径引入图片时，webpack 会将这些图片视为模块，而不是普通的 URL。因此，你需要使用 `require` 或 `import` 来告诉 webpack 去加载这些图片模块，并将其作为组件的一部分进行处理。这也是为什么在循环渲染组件时，需要先通过 `require` 将图片引入，以便 webpack 能够正确处理图片并将其渲染到页面上。

举个例子，在循环渲染组件时，你需要像下面这样使用 `require` 引入图片：

```vue
<template>
  <div>
    <div v-for="item in items" :key="item.id">
      <img :src="require(`@/assets/images/${item.image}`)" alt="Item Image" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { id: 1, image: 'image1.png' },
        { id: 2, image: 'image2.png' },
        // 其他图片数据
      ],
    }
  },
}
</script>
```

在上面的例子中，`require` 被用来动态引入图片，这样 webpack 就能正确处理图片模块并将其渲染到页面上。
总之，使用 `require` 或 `import` 来引入图片可以让 webpack 正确处理这些图片模块，并使其能够在页面上正确显示。
