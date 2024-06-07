---
title: Array对象
date: '2023-05-25'
categories:
  - javascript
tags:
  - javascript
publish: true
---

## 1. 数组的概念

1. 数组是值的有序集合
2. 数组是一种引用数据类型，具有 length 属性
3. 数组的每一个值称之为元素，每一个元素都有一个索引，通过索引可以访问到这个元素
4. 数组的索引是从 0 开始
5. 数组的元素可以是任意类型
6. 数组可存放的最大长度为 2^32-2

## 2. 创建数组

1. 使用数组直接量的方式创建数组
2. 使用 构造函数 array 来创建数组

## 3. 读写数组

1. 通过索引来读写数组 nameList[12]
2. 通过索引来修改数组 nameList[2] = 100;

## 4. 数组的实例方法

数组的实例方法可以分为两大类，影响数组本身 和 不影响数组本身

首先我们来看影响数组本身的有哪些：

### push() 方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度。

语法：arr.push(element1, ..., elementN)

```js
Array.prototype.arrPush = function (...args) {
    const self = this
    let len = args.length
    for (let i = 0; i < len; i++) {
        self[self.length] = args[i]
    }
    return self.length
}
let arr = [1, 2, 3]

arr.arrPush(4, 5, 6, 7, 8, 9，{ name: "小明"，age: 16 },null,undefined);
console.log(arr);

//[1,2,3,4,5,6,7,8,9，{name:'小明’，age: 16 }, null, undefined ]
```

### unshift() 方法将一个或多个元素添加到数组的开头，并返回该数组的新长度(该方法修改原有数组)。

语法： arr.unshift(element1, ..., elementN)

```js
Array.prototype.arrUnShift = function (...args) {
    const self = this
    let intermediate = [...this]
    let len = args.length
    for (let i = 0; i < len; i++) {
        se1f[i] = args[i]
    }
    for (let j = 0; j < intermediate.length; j++) {
        self[self.length] = intermediate[j]
    }
    return self.length
}
let arr = [1, 2, 3];
arr.arrUnShift(4, 5，6, 7, 8, 9, { name: "小明"， age: 16 } , null，undefined);
console.1og(arr);
```

不影响数组本身:

### map 操作数组

```js
Array.prototype.myMap = function (callback) {
    const arr = []
    for (let i = 0; i < this.length; i++) {
        arr.push(callback(this[i], i))
    }
    return arr
}

console.1og([1, 2，3, 4].myMap((item, index) => item + index))
```

### ForEach 遍历

```js
//数组的forEach方法
Array.prototype.myForEach = function (callback) {
    for (let i = 0; i < this.length; i++) {
        callback(this[i], i)
    }
    //函数默认什么都不返回，默认就是undefined
    return null
}
console.1og([1, 2, 3, 4, 5]. myForEach( (item, index) => console. log(item, index)))
```

### Some 满足一个即是 true

```js
Array.prototype.mySome = function (callback) {
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i)) {
            return true
        }
        return false
    }
}
console.1og([1, 2, 3, 4]. mySome((item, index) => item > 4))
```

### at 接收一个整数值并返回该索引对应的元素，允许正数和负数。负整数从数组中的最后一个元素开始倒数。

```js
const array1 = [5, 12, 8, 130, 44]

console.log(array1.at(1)) // 12
```

### concat 用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

```js
const array1 = ['a', 'b', 'c']
const array2 = ['d', 'e', 'f']
const array3 = array1.concat(array2)
// ["a", "b", "c", "d", "e", "f"]
```

### copyWithin 浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。

1. 会改变原数组，但不会改变其长度
2. copyWithin 的参数
   - 第一个参数 target ，表示 从该位置开始替换数据。如果为负值，表示倒数，
   - 第二个参数 start 从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算
   - 第三个参数 end 到该位置前停止读取数据(不包含该位置)，默认等于数组长度。如果为负值，表示从末尾开始计算。

```js
const a = [1, 2, 3, 4, 5]

// 1. 会改变原数组，但不会改变其长度
// 2. 形参第三个，含头不含尾，跟 slice 一样
console.log('将4 复制到 索引 0 的位置', a.copyWithin(0, 3, 4)) // [4, 2, 3, 4, 5]

console.log('将 2 复制到 索引的最后一位', a.copyWithin(-1, 1, 2)) // [4, 2, 3, 4, 2]

console.log('将 3,4,2 复制到 开始的位置', a.copyWithin(0, -3)) // [3, 4, 2, 4, 2]

console.log('将索引为 3 的数字复制到 索引 0 到位置')
// 类数组，长度为 5，通过call 改变this 引用，调用了 copyWithin 将索引 为 3 值为 1 复制到 索引为 0 到位置
console.log([].copyWithin.call({ length: 5, 3: 1 }, 0, 3)) // {0: 1, 3: 1, length: 5}

console.log('将索引为 0 的数字复制到 索引 -1 到位置')
console.log([].copyWithin.call({ length: 5, 3: 1, 0: 1 }, -1, 0)) // { 4: 1, 0: 1, 3: 1, length: 5}
```

### entries 返回一个新的数组迭代器对象，该对象包含数组中每个索引的键/值对。

```js
const array1 = ['a', 'b', 'c']

const iterator1 = array1.entries()

for (const [key, value] of iterator1) {
  console.log(key, value)
  // 0 'a'
  // 1 'b'
  // 2 'c'
}
```

### every 测试一个数组内的所有元素是否都能通过指定函数的测试。它返回一个布尔值。

```js
const isBelowThreshold = (currentValue) => currentValue < 40

const array1 = [1, 30, 39, 29, 10, 13]

console.log(array1.every(isBelowThreshold))
```

### fill 用一个固定值填充一个数组中从起始索引（默认为 0）到终止索引（默认为 array.length）内的全部元素。它返回修改后的数组。

1. 会改变原数组，
2. fill 到参数
   - 第一个参数 value ，表示 填充的值
   - 第二个参数 start 从该索引位置开始填充， 默认不写则为 0, 支持负数
   - 第三个参数 end 到该位置前停止填充数据(不包含该位置)，默认不写则 使用数组的长度 致所有索引都被填充。 支持负数

```js
const array1 = [1, 2, 3, 4]

console.log(array1.fill(9, 0, 2)) // [9,9,3,4]

console.log(array1.fill(9)) // [9, 9, 9, 9]

console.log(array1.fill(9, 1)) // [1, 9, 9, 9]

console.log(array1.fill(9, -3, -1)) // [1, 9, 9, 4]

console.log(array1.fill(9, -1)) // [1, 2, 3, 9]
```

### includes 用于判断一个数组是否包含某个指定的元素，并返回布尔值。

```js
let arr = [1, 2, 3, 4, 6]
console.log(arr.includes(5)) //false
console.log(arr.includes(6)) //true
```

### findLast + findLastIndex 用法跟 find() 和 findIndex() 完全一致，区别是从数组的最后一个元素开始向前查找。

```js
const list = [1, 2, 3, 4, 5]

//从后往前遍历
const resultBackward = list.findLast((element) => element > 2) // 5
const indexBackward = list.findLastIndex((element) => element > 2) // 4
```

### toReversed() 翻转, toSorted()排序, toSpliced() 替换

1. toReversed === reverse
2. toSorted === sort
3. toSpliced === Splice

区别在于原来的 `reverse ` `sort` `Splice` 会改变原数组，而 `toReversed` `toSorted` `toSpliced` 会返回一个新数组。不改变原数组

```js
let original = [1, 3, 2, 4]

// 不改变原数组，返回处理后的新数组
const toReversed = original.toReversed()
console.log(original) // [ 1, 3, 2, 4 ]
console.log(toReversed) // [ 4, 2, 3, 1 ]

const toSorted = original.toSorted()
console.log(original) // [ 1, 3, 2, 4 ]
console.log(toSorted) // [ 1, 2, 3, 4 ]

const toSpliced = original.toSpliced(0, 2, 'a')
console.log(original) // [ 1, 3, 2, 4 ]
console.log(toSpliced) // [ 'a', 2, 4 ]
```

### with 方法是使用<< 方括号表示法 >>修改指定索引值的复制方法版本。它会<< 返回一个新数组 >>，其指定索引处的值会被新值替换。

1. with 就是直接通过 索引的 方式来修改 数组元素
2. 返回一个新的数组，并不会对原数组产生影响

```js
const origin = [1, 3, 2, 4]
const withed = original.with(1, 'a')
console.log(original) // 原数组 [ 1, 3, 2, 4 ]
console.log(withed) // 新数组 [ 1, 'a', 2, 4 ]
```

### flat(),flatMap()

1. `flat()` 创建一个新的数组，并根据指定深度递归地将所有子数组元素拼接到新的数组中。
2. `flatMap()`，等价于在调用 map() 方法后再调用深度为 1 的 flat() 方法

```js
let arr = [1, 2, [3, 4, [5, 6, [7, 8]]]]
const flatArr = arr.flat()
console.log(flatArr) // 从外层开始展开数据，默认深度为1，得到输出：[1,2,3,4,[5,6,[7,8]]]

// ======
let arr = [1, 2, 3, 4, 5, 6, 7, 8]
const result = arr.flatMap((num) => [num * 2])
console.log(result) // [2,4,6,8,10,12,14,16];
```
