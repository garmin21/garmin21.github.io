---
title: JAVASCRIPT学习简记
author: 李嘉明
createTime: 2024/08/03 17:51:03
permalink: /defensive-javascript/
---

## JavaScript简介

### 1.1 JavaScript是什么？

* 是一门编程语言

### 1.2 编程语言

* 编程语言就是人与计算机交流的语言

* 图灵完备性(一切可计算的问题都能计算)，所以说HTML和CSS不能算作编程语言

### 1.3 编程语言分类

* 机器语言
  ```
  0101010001110000111000011
  ```

* 汇编语言
  ```
  SET 1
  ```

* 高级语言
  * 编译型语言	;**先编译，再运行**； 如 Java、C、C++ ... 运行效率更高
  * 解释型语言   ;**边编译，边运行**； 如JavaScript、PHP、Python...    开发效率更高

### 1.4 JavaScript能做什么

* 浏览器端JS，页面特效（表单验证、各种特效）
* 手机App （ios 编程语言 OC和swift；  安卓：Java）（js开发混合App，一键打包到安卓、ios、windowsphone）
* 游戏（页游，代替flash）
* 后端开发（nodejs）

### 1.5 JavaScript的特点

* 是一种**脚本语言**
* 是一种**解释型语言**；  解释器是浏览器或Node；
* 是**动态语言**，==数据自动分配类型，声明变量无需指定类型==； 静态语言，声明变量指定类型；
* 弱类型； ==数据类型可以自动转换== （强类型：数据类型不可以自动转换）
* **基于对象的编程语言**（面向对象）

### 1.6 浏览器端JavaScript 组成

* **ECMAScript** 基本语法 （使用ES的编程语言：JavaScript、ActionScript）
* **BOM** （浏览器对象模型） 浏览器提供的一系列API啊（使用代码直接调用的方法）
* **DOM** （文档对象模型）HTML文档提供的一系列API

### 1.7 nodeJs端JavaScript 组成

* **ECMAScript** 基本语法 （使用ES的编程语言：JavaScript、ActionScript）