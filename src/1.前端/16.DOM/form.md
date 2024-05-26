---
title: form 表单相关的元素
author: 李嘉明
createTime: 2024/05/26 21:02:29
permalink: /article/nzehjxgy/
tags:
  - DOM
---

## 获取表单元素以及表单控件元素（了解）

```js
document.forms   // 获取页面中所有form元素组成的集合
document.formName   // 通过form元素的name属性值
formElement.inputName   // 通过表单控件的name属性值
formElement.elements    // 所有的表单控件组成的集合 (类数组)
formElement[index]      // form元素本身也可以取索引   
```

### form 元素

```js
// 属性：
length   // 返回所有表单控件的数量
elements  // 所有表单控件组成的集合


// 方法：
submit()
reset()
```

### input元素

```js
方法：
blur()  失去焦点
focus()  获取焦点
select()  选中里面的文字
```

###  textarea

```js
方法：
select()  选中文本
```

#### select元素

```js
属性：
	options  所有option元素的集合
	selectedIndex  被选中的option的索引（如果选中了多个，取第一个）
	length   option元素的个数
	
方法：
	add(option元素)  追加一个option
	remove(index)  删除指定的索引
	focus()
	blur()

创建option元素：
	new Option(innerText值， value值)
```
