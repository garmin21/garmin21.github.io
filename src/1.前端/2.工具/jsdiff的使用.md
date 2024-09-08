---
title: jsdiff的使用
author: 李嘉明
createTime: 2024/04/06 22:12:23
permalink: /article/npdy9k51/
tags:
  - 工具
---

## 介绍

jsDiff 是一个 javascript 文本差异对比处理库，是基于 [An O（ND） Difference Algorithm and its Variations”（Myers，1986）](http://www.xmailserver.org/diff2.pdf) 提出的算法

## 安装

```cmd
npm install diff --save
```

## 用法

```js
import * as Diff from 'diff'

// 默认都会对空格进行比较

const oldStr = '你好 ，中国'

const newStr = '你好，世界'

// 以字符维度，进行比较
const diffChars = Diff.diffChars(oldStr, newStr)

console.table(diffChars)

/**
 * count 字符数
 * value 内容
 * removed 是否被删除
 * added 是否被添加
 * [
    {
        "count": 3, 
        "value": "你好，"
    },
    {
        "count": 2,
        "removed": true,
        "value": "中国"
    },
    {
        "count": 2,
        "added": true,
        "value": "世界"
    }
]
 */

const oldStr1 = 'hello , friend.'
const newStr1 = 'Hello, brother.'

// 以单词的维度进行比较
// const diffWords = Diff.diffWords(oldStr1, newStr1, {
// ignoreCase: true, 是否忽略大小写进行比较
// ignoreWhitespace: true, 设置为true时，将忽略开头和结尾处的空格
// })
const diffWords = Diff.diffWords(oldStr1, newStr1, { ignoreCase: true })

console.table(diffWords)

const oldStr2 = ' hello, friend.'
const newStr2 = 'Hello, brother.'

// 还是以单词的维度进行比较，但是也会对空格进行比较 等同于 Diff.diffWords(oldStr1, newStr1, {ignoreWhitespace: false})
// 设置 options  {ignoreWhitespace: true} 设置没有效果
const diffWordsWithSpace = Diff.diffWordsWithSpace(oldStr2, newStr2)
console.table(diffWordsWithSpace)

const oldStr3 = ` hello, 
                        friend.`
const newStr3 = `Hello, brother.`

// 比较的维度是行
const diffLines = Diff.diffLines(oldStr3, newStr3, {
  // ignoreWhitespace: true, 设置为true时，将忽略开头和结尾处的空格
  // newlineIsToken: true 设置为true时，将换行符看作是分隔符
  // ignoreCase: true 是否忽略大小写
})

console.table(diffLines)

const oldStr4 = ` hello, 
                        friend.`
const newStr4 = `Hello, brother.`
/**
 * 比较两段文字，比较的维度是行，忽略开头和结尾处的空格
 * 在去除前导和尾随空格后，将两个文本块逐行比较。等效于使用 diffLines + ignoreWhitespace: true
 */
const diffTrimmedLines = Diff.diffTrimmedLines(oldStr4, newStr4)

console.table(diffTrimmedLines)

const oldStr5 = `
枯藤老树昏鸦，
小桥流水人家
`

const newStr5 = `
枯藤老树昏鸦，
我爱说实话
`
/**
 * 比较两段文字，比较的维度是句子
 */
const diffSentences = Diff.diffSentences(oldStr5, newStr5)

console.table(diffSentences)

const css1 = `
.box {
  width: 500px;
  height: 500px;
}
`

const css2 = `
.box {
  width: 200px;
  height: 200px;
}
`
/**
 * 比较两段内容，比较基于css中的相关符号和语法。返回一个由描述改变的对象组成的列表。
 */

const diffCss = Diff.diffCss(css1, css2)

console.table(diffCss)

const json1 = JSON.stringify({
  name: 'jack',
  age: 18,
  sex: 'man',
})

const json2 = JSON.stringify({
  name: 'jack1',
  age: 30,
  sex: 'man',
})

/**
 * diff json
 */
const diffJson = Diff.diffJson(JSON.parse(json1), JSON.parse(json2))

console.table(diffJson)

const arr1 = [1, 2, 3, 4, 5]

const arr2 = [1, 3, 5, 7, 8]

/**
 * diff array
 */
const diffArrays = Diff.diffArrays(arr1, arr2)

console.table(diffArrays)
```


[diff.js使用指南](https://juejin.cn/post/6855129008007774216#heading-6)

[diff-npm](https://www.npmjs.com/package/diff#change-objects)