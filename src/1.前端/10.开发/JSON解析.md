---
title: JSON.parse 解析报错
createTime: 2022/05/10 09:00:41
permalink: /article/i1wc1ulx/
author: 李嘉明
tags:
  - development
---

在我们开发中，我们需要对 JSON 格式的数据进行 parse 进行解析为对象形式。
正常来说，这样就可以完成，但是 也会有 JSON 格式不正确的时候，

1. 比如 实际上你复制的 json 数据会有 `/\u00a0/` 这样的空格数据，会导致解析失败

```js
// 解决
const item = this.payload.tableData.at(this.payload.order_id);
JSON.parse(JSON.stringify(item).replace(/\u00a0/g, ' '));
```

2. 为了使程序更加健壮，需要加上 `try catch ` 以应付一些非正常的数据

```js
try {
  params.content = JSON.parse(params.content);
} catch (error) {
  params.content = JSON.parse(
    JSON.stringify(params.content).replace(/\u00a0/g, ' ')
  );
}
```
