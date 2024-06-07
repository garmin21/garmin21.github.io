<!-- ---
title: "面试"
---

### 一年半经验如何准备阿里巴巴前端面试

- https://juejin.cn/post/6844904072345026574

### 2021 年前端面试必读文章【超三百篇文章/赠复习导图】

- https://juejin.cn/post/6844904116339261447

### 用 vue 想要那 20k，面试题要这样回答（源码版）

- https://juejin.cn/post/7017693252820303903#heading-3

### 字节跳动最爱考的前端面试题：JavaScript 基础

- https://juejin.cn/post/6934500357091360781

### 浏览器相关原理(面试题)详细总结一

- https://juejin.cn/post/6844903962216824839

### 前端面试常见的手写功能

- https://juejin.cn/post/6873513007037546510

### 20 道 JS 原理题助你面试一臂之力！

- https://juejin.cn/post/6844903891591495693

### 由浅入深，66 条 JavaScript 面试知识点

- https://juejin.cn/post/6844904200917221389

### 前端面试准备的 50 道算法题上

- https://juejin.cn/post/7080174781508616206


### 如何让页面首次渲染不触发 watch ?

```vue
<script>
export default {
  mounted() {
    this.$watch("info.observation_value", function () {
      if (this.lijiaming_callback) {
        this.lijiaming_callback({ union_id: this.union_id });
      }
    });
  },
};
</script>
``` -->
