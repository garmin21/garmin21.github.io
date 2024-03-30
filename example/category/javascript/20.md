---
title: 12-03 Intl.NumberFormat
date: '2022-12-03'
categories:
    - javascript
tags:
    - javascript
publish: true
---

```js
/**
 * Intl.NumberFormat
 * Intl.NumberFormat是对语言敏感的格式化数字类的构造器类
 */

const NumberFormat = Intl.NumberFormat

/**
 * 金钱格式化千分位
 */

let num = 1331231

console.log(new NumberFormat().format(num)) // 1,331,231

/**
 * 中文十进制数字
 */

console.log(new NumberFormat('zh-Hans-CN-u-nu-hanidec').format(num)) // 一,三三一,二三一

/**
 * 保险措施：当请求的语言不被支持,例如巴里,包含一个回滚语言印尼,
 */

// console.log(new NumberFormat(['zh-Hans-CN-u-nu-hanidec', 'id']).format(num))

/**
 * 转化为货币格式
 */

// EUR: 欧元
// JPY: 日元
// CNY: 人民币
console.log(
    new NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
        num
    )
) // 1.331.231,00 €
console.log(
    new NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(
        num
    )
) // ￥1,331,231
console.log(
    new NumberFormat('zh-CN', { style: 'currency', currency: 'CNY' }).format(
        num
    )
) // ¥1,331,231.00

/**
 * currencyDisplay:'code'
 * currencyDisplay:'name'
 */
console.log(
    new NumberFormat('zh-CN', {
        style: 'currency',
        currency: 'CNY',
        currencyDisplay: 'code',
    }).format(num)
) // CNY 1,331,231.00
console.log(
    new NumberFormat('zh-CN', {
        style: 'currency',
        currency: 'CNY',
        currencyDisplay: 'name',
    }).format(num)
) // 1,331,231.00人民币

/**
 * 百分比
 */
var num2 = 0.375
console.log(new NumberFormat('en-IN', { style: 'percent' }).format(num2)) // 38% 自动进一

/**
 * arr 转 字符串
 */

console.log([131, 131, 131].toString()) // 131,131,131
```
