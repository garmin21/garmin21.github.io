---
title: 数组 sort 方法
author: 李嘉明
createTime: 2024/05/25 00:47:57
permalink: /article/b2zkr77t/
tags:
  - javascript
---

## Array.sort 根据持有顺序对列表进行排序

```js
// 列表数据
const list = ['大数据平台', '其他系统', 'ome系统', '数据分析平台'];

// 书写的顺序
const desiredOrder = ['大数据平台', 'ome系统'];

// 自定义比较函数
const customSort = (a, b) => {
  console.log(a, b, '============');

  const indexA = desiredOrder.indexOf(a);
  const indexB = desiredOrder.indexOf(b);
  if (indexA === -1) {
    return 1;
  }

  if (indexB === -1) {
    return -1;
  }

  return indexA - indexB;
};

// 应用排序
list.sort(customSort);

// 输出排序结果
console.log(list);
```

具体的比较原理如下：

1. 对于每个要比较的元素 a 和 b，我们使用 indexOf() 方法来获取它们在书写顺序数组 desiredOrder 中的索引。
    - indexA 表示元素 a 在书写顺序数组中的索引。
    - indexB 表示元素 b 在书写顺序数组中的索引。
2. 接下来，我们根据以下条件比较 indexA 和 indexB 的值：
    - 如果 indexA 等于 -1，表示元素 a 不在书写顺序数组中，我们将其放在后面（即 a 大于 b）。
    - 如果 indexB 等于 -1，表示元素 b 不在书写顺序数组中，我们将其放在前面（即 a 小于 b）。
    - 如果 indexA 和 indexB 都不等于 -1，表示两个元素都在书写顺序数组中，我们将根据它们在书写顺序数组中的索引进行排序。返回 indexA - indexB 的值：
        - 如果 indexA 小于 indexB，则 indexA - indexB 的结果为负数，表示 a 应该排在 b 前面（即 a 小于 b）。
        - 如果 indexA 等于 indexB，则 indexA - indexB 的结果为零，表示 a 和 b 的相对顺序不变。
        - 如果 indexA 大于 indexB，则 indexA - indexB 的结果为正数，表示 b 应该排在 a 前面（即 a 大于 b）。