---
title: css 函数
author: 李嘉明
createTime: 2024/05/12 18:12:49
permalink: /defensive-css/f4hdxmxi/
---


## calc方法：
`calc() `我们可以把它当做一个函数，其实他是calculate（计算）缩写。是css3提供的一个新功能，主要用来计算长度, 我们可以用它来给padding margin width height font-size等等计算大小值 值是一个动态的

1. 使用+ - * /进行运算
2. 可以使用百分比 px em rem等单位
3. 可以单位混合计算
4. 在使用的时候，尽量在 + - * / 前后添加一个空格


## counter方法：

在css中定义自增函数  counter-increment:name ：那个元素需要自增，就在这个元素样式中书写

name 是 变量
name是自增函数的名字

每次选择器选择到的元素 每检测一个  后边的name的值就加1   从1开始
在每一个元素上使用counter（name）来获取当前自增的值
