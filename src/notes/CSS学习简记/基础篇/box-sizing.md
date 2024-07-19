---
title: 盒子模型
author: 李嘉明
createTime: 2024/04/13 14:53:55
permalink: /defensive-css/Box-model/
---

:::tip
盒子模型的概念：

1. 在 html 中，把每一个元素都当做成一个盒子，拥有盒子的平面外形和空间
2. 标准盒模型实际所占内容由内容（content）+内边距（padding）+边框（border）+外边距（margin）4 部分构成
   - 内容区域：你书写的内容或者子元素能够显示的区域
   - 内边距：撑开内容与边框的距离
   - 边框：元素的边框
   - 外边距：撑开元素和其他元素之间的距离
3. 怪异盒模型实际所占内容是由 width + 外边距（margin） 部分构成
:::

盒子模型-内容区域（在标准盒子模型下）：

## 标准盒子模型下设置的 width 和 height 都是 content（内容）区域的宽高

width：
-  默认是 auto。auto 分为 4 种情况：
-  fill-available：充分利用可使用空间（块标签）
-  fit-content:收缩到合适（浮动，定位）
-  min-content:收缩到最小（表格中常见）
-  max-content:超出容器限制（英文单词较长，或者设置了不换行，就会超出容器限制

height
-  auto：其高度由内部元素堆叠而成，也就是内部元素撑起来的
-  默认情况下基本都是标准盒模型
-  怪异盒模型：ie6 或者是 没有正确书写版本声明 或者是设置了 box-sizing
-  将一个元素设置盒模型显示

## box-sizing 属性：

- content-box:标准盒模型
- border-box:怪异盒模型

:::caution STOP
标准盒模型：元素占用的空间大小为：内容区域(content) + 内边距(padding) +边框(border) + 外边距(margin)

怪异盒模型：元素所占用的空间大小为： width = 内容(content + padding + border) + 外边距(margin)
:::
