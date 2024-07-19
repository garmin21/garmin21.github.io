---
title: Clipboard API 剪贴板 拷贝内容
author: 李嘉明
createTime: 2024/05/27 13:32:27
permalink: /article/gbdkmju1/
tags:
  - BOM
---

浏览器, 复制, 粘贴, 剪切 API

<!-- more -->

:::tip
所有 Clipboard API 的方法都是异步的；它们返回一个 Promise 对象，在剪贴板访问完成后被兑现。如果剪贴板访问被拒绝，promise 也会被拒绝。
:::

## 方法

### readText 读取文本数据

:::normal-demo

```html
<section>
  <strong>操作须知：复制文本，再点 readText 按钮</strong>
  <div>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam quasi
    explicabo quia reprehenderit veritatis facilis ducimus iste! Ipsum dicta hic
    culpa vel adipisci! Incidunt, vel dicta quisquam placeat laboriosam quos?
  </div>
  <button id="readText">readText</button>
</section>
```

```js
document.getElementById('readText').addEventListener('click', () => {
  navigator.clipboard
    .readText()
    .then((text) => {
      // 在这里对获取到的文本进行处理
      console.log('读取剪贴板文本成功:', text);
      alert(text);
    })
    .catch((err) => {
      console.error('读取剪贴板文本失败:', err);
    });
});
```

:::

### writeText 写入文本数据

:::normal-demo

```html
<section>
  <strong>操作须知：点 writeText 按钮 复制文本，粘贴入 输入框中</strong>
  <div class="text1">你好 世界！</div>
  <div class="text2" style="border: 1px solid black;" contenteditable="true">
    <!-- writeText -->
  </div>
  <button id="writeText">writeText</button>
</section>
```

```js
document.getElementById('writeText').addEventListener('click', () => {
  navigator.clipboard.writeText(document.querySelector('.text1').textContent);
});
```
:::


## 兼容方式

```js
const copyCore = (value) => {
  const input = document.createElement("input");
  input.setAttribute("readonly", "readonly");
  input.style.cssText = 'position: absolute;left: -9999px'
  input.setAttribute("value", value);
  document.body.appendChild(input);
  input.select();
  input.setSelectionRange(0, input.value.length);
  document.execCommand("Copy");
  document.body.removeChild(input);
};
```