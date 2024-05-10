---
title: JSON.parse 解析报错
createTime: 2022/05/10 09:00:41
tags:
  - development
permalink: /article/i1wc1ulx/
author: jm-garming
---

在我们开发中，我们需要对JSON 格式的数据进行 parse 进行解析为对象形式。
正常来说，这样就可以完成，但是 也会有JSON 格式不正确的时候，

1. 比如 实际上你复制的json数据会有 `/\u00a0/` 这样的空格数据，会导致解析失败

```js
// 解决
const item = this.payload.tableData.at(this.payload.order_id)
JSON.parse(JSON.stringify(item))

```