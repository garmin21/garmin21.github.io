---
title: 7-29 Symbol
date: '2022-07-29'
categories:
    - javascript
tags:
    - javascript
publish: true
---

## 1. Symbol.unscopables

Symbol.unscopables 指用于指定对象值，其对象自身和继承的从关联对象的 with 环境绑定中排除的属性名称。（可以将某个属性设置为无法访问）

```javascript
const object1 = {
    property1: 42,
}

object1[Symbol.unscopables] = {
    property1: true,
}
console.log(object1.property1)

with (object1) {
    console.log(property1)
    // expected output: Error: property1 is not defined
}
```
