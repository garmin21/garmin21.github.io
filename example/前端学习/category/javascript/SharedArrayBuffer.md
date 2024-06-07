---
title: SharedArrayBuffer + Atomics
date: '2024-03-17'
categories:
  - javascript
tags:
  - javascript
publish: true
---

## 1. 什么是 SharedArrayBuffer

haredArrayBuffer(以下简称 SAB) 是一个 javascript 对象，用于网站线程之间的内存数据共享，比如 worker。同样由于 WebAssembly 使用 worker 模拟了多线程，所以在这种情况下同样会使用到 SAB 做数据共享访问。

## 2. Atomics 对象

Atomics 对象 提供了一组静态方法用来对 SharedArrayBuffer 对象进行原子操作。
