---
title: table 表格相关的元素
author: 李嘉明
createTime: 2024/05/26 21:04:05
permalink: /article/vgugrup6/
tags:
  - DOM
---

## table元素

```js
属性：
	rows  所有tr的集合
	cells  所有td和th的集合
	
方法：
	insertRow(index) 创建并插入一个tr
	deleteRow(index) 删除一行
```

### tr元素 tableRow

```js
属性：
	cells  行内所有的单元格的集合
	rowIndex   行的索引
	
方法：
	insertCell(index)  创建并添加一个td
	deleteCell(index)  删除一个单元格
```

### td\th 单元格元素

```js
属性：
	cellIndex  单元格的索引（在行内）
```
