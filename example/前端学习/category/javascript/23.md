---
title: 12-03 WeakMap
date: '2022-12-03'
categories:
    - javascript
tags:
    - javascript
publish: true
---

```js
const btn1 = document.querySelector('#but1')
const btn2 = document.querySelector('#but2')

const wek = new WeakMap()

wek.set(btn1, handleClick)
wek.set(btn2, handleClick2)

// WeakMap 的key 只能是对象
// WeakMap 的key 是弱引用， 也就是说，key 一但没有被引用了，就会被垃圾回收机制，清除

btn1.addEventListener('click', wek.get(btn1), false)

btn2.addEventListener('click', wek.get(btn2), false)

function handleClick() {}
function handleClick2() {}

/*
    好处： 
        不是你在手动的去 赋值为null 解除引用进行垃圾回收机制
        并且，你绑定的一些事件也会被清除引用
*/
```
