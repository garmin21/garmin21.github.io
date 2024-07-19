---
title: CSS 容器查询
author: 李嘉明
createTime: 2024/07/19 11:37:13
permalink: /defensive-css/ec9ivkvv/
---

容器查询使你能够根据元素容器的大小应用样式。例如，如果容器在周围的上下文中可用的空间更少，你可以隐藏某些元素或使用较小的字体。容器查询是媒体查询的另一种选择，后者根据视口大小或其他设备特征为元素应用样式。[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_containment/Container_queries)

![CSS 容器查询](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_containment/Container_queries/container-query.svg)

> 这是一种类似于媒体查询的 css 代码，浏览器 可以监听 通过 `container-type` 属性声明的局限上下文，根据条件去生效不同的样式

## 简单效果

:::normal-demo

```html
<div class="post">
  <div class="card">
    <h2>卡片标题</h2>
    <p>通过控制台窗口，放大缩小视口，查看效果</p>
  </div>
</div>
```

```css
.post {
  container-type: inline-size;
}
/* 默认的卡片标题样式 */
.card h2 {
  font-size: 1em;
  color: green;
}

/* 如果容器宽度大于 700px */
@container (min-width: 700px) {
  .card h2 {
    font-size: 2em;
    color: pink;
  }
}
```

:::

## 复杂效果

在开发中有一种效果，就是 **点击展开更多，按钮跟随 文字**, 这个效果，在一些，博客或者文章列表的网站也非常参见，目的就是为了让用户不点击进去详情，可以更加快速的通过展开更多，查看到感兴趣的消息，这个功能也提高了用户的体验

:::normal-demo

```html
<div class="text-wrap">
  <div
    class="text"
    title="欢迎关注前端侦探，这里有一些有趣的、你可能不知道的HTML、CSS、JS小技巧技巧。这次我们通过容器查询来实现多行文本展开收起欢迎关注前端侦探，这里有一些有趣的、你可能不知道的HTML、CSS、JS小技巧技巧。这次我们通过容器查询来实现多行文本展开收起欢迎关注前端侦探，这里有一些有趣的、你可能不知道的HTML、CSS、JS小技巧技巧。这次我们通过容器查询来实现多行文本展开收起"
  >
    <div class="text-size">
      <div class="text-flex">
        <div class="text-content">
          <label class="expand"><input type="checkbox" hidden /></label>
          欢迎关注前端侦探，这里有一些有趣的、你可能不知道的HTML、CSS、JS小技巧技巧。这次我们通过容器查询来实现多行文本展开收起欢迎关注前端侦探，这里有一些有趣的、你可能不知道的HTML、CSS、JS小技巧技巧。这次我们通过容器查询来实现多行文本展开收起欢迎关注前端侦探，这里有一些有趣的、你可能不知道的HTML、CSS、JS小技巧技巧。这次我们通过容器查询来实现多行文本展开收起
        </div>
      </div>
    </div>
  </div>
  <div class="text-content text-place">
    欢迎关注前端侦探，这里有一些有趣的、你可能不知道的HTML、CSS、JS小技巧技巧。这次我们通过容器查询来实现多行文本展开收起欢迎关注前端侦探，这里有一些有趣的、你可能不知道的HTML、CSS、JS小技巧技巧。这次我们通过容器查询来实现多行文本展开收起欢迎关注前端侦探，这里有一些有趣的、你可能不知道的HTML、CSS、JS小技巧技巧。这次我们通过容器查询来实现多行文本展开收起
  </div>
</div>
```

```css
.text-wrap {
  display: flex;
  position: relative;
  width: 300px;
  padding: 8px;
  outline: 1px dashed #9747ff;
  border-radius: 4px;
  line-height: 1.5;
  text-align: justify;
  font-family: cursive;
}
.expand {
  font-size: 80%;
  padding: 0.1em 0.5em;
  background-color: #9747ff;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}
.expand::after {
  content: '展开';
}
.text-content {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.text {
  position: absolute;
  inset: 8px 8px auto;
}
.text-size {
  position: absolute;
  inset: 0;
  container-type: size;
}
@container (height <= 4.5em) {
  .text-size .expand {
    display: none;
  }
}
.text::before {
  content: attr(title);
  opacity: 0;
}
.text-content::before {
  content: '';
  float: right;
  height: calc(min(100%, 100cqh) - 1.4em);
}
.expand {
  float: right;
  clear: both;
  position: relative;
}
.text-flex {
  display: flex;
}
.text-place {
  visibility: hidden;
}
.text-wrap:has(:checked) .text-content {
  -webkit-line-clamp: 999;
}
.text-wrap:has(:checked) .expand::after {
  content: '收起';
}
```
:::


## 分析效果实现