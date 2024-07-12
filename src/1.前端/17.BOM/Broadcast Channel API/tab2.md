---
title: 浏览上下文通信2
author: 李嘉明
createTime: 2024/07/11 17:55:00
permalink: /article/teos1sm3/
article: false
---

浏览上下文（browsing context）是浏览器（browser）展示文档的环境。在现代浏览器中，通常是一个标签页（tab），也可能是一个窗体（window）或只是页面的一部分，如 frame 或 iframe。

每个浏览上下文都有一个活动文档的源（origin）和一个记录所有展示文档的有序历史（history）。

浏览上下文之间的通讯被严格限制，只有两个同源的浏览上下文，才能打开和使用通讯接口

::: normal-demo 浏览上下文通信

```html
<h1>标签页2</h1>
<div id="messageContainer"></div>
```

```js
const channel = new BroadcastChannel('my_channel');

channel.onmessage = function (event) {
  const message = event.data;
  document.getElementById(
    'messageContainer'
  ).innerHTML = `<p>${message.text} (接收时间: ${message.timestamp})</p>`;
};
```

:::
