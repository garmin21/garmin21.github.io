---
title: BroadcastChannel 浏览上下文通信
author: 李嘉明
createTime: 2024/07/11 17:49:20
permalink: /article/fugnpm9p/
tags:
  - BOM
---

![浏览上下文通信](https://developer.mozilla.org/zh-CN/docs/Web/API/Broadcast_Channel_API/broadcastchannel.png)

浏览上下文（browsing context）是浏览器（browser）展示文档的环境。在现代浏览器中，通常是一个标签页（tab），也可能是一个窗体（window）或只是页面的一部分，如 frame 或 iframe。

每个浏览上下文都有一个活动文档的源（origin）和一个记录所有展示文档的有序历史（history）。

浏览上下文之间的通讯被严格限制，只有两个同源的浏览上下文，才能打开和使用通讯接口

[新开tab窗口](https://garmin21.github.io/article/teos1sm3/)


::: normal-demo 浏览上下文通信

```html
<h1>标签页1</h1>
<button onclick="sendMessage()">发送消息到标签页2</button>
```

```js
const channel = new BroadcastChannel('my_channel');

function sendMessage() {
  const message = {
    text: 'Hello from 标签页1!',
    timestamp: new Date().toLocaleTimeString(),
  };
  channel.postMessage(message);
}
```

:::
