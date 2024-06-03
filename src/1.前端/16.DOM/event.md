---
title: 自定义事件 CustomEvent
author: 李嘉明
createTime: 2024/06/02 21:37:55
permalink: /article/e6ze2pvq/
tags:
  - DOM
---

:::normal-demo

```html
<button id="emit" onclick="emit(this)">emit onClick</button>
```

```js
const myEvent = new CustomEvent('click-event', {
  bubbles: true, // 是否冒泡
  detail: 'hello', // 事件传递数据
});

// 添加事件监听器
const element = document.getElementById('emit');

document.addEventListener('click-event', (event) => {
  window.alert('Custom event triggered:' + event.detail);
  console.log(event, 'event');
});

function emit(self) {
  // 触发自定义事件
  self.dispatchEvent(myEvent);
}
```
:::
