---
title: 11-05 从0到1搭建微服务架构
date: '2022-11-05'
categories:
    - 工程化
tags:
    - 工程化
publish: true
---

## 前置需要了解知识

1. systemjs，是一个通用的模块加载器，他能在浏览器上动态加载模块，微前端的核心就是去加载应用，我们将应用打包成模块，在浏览器中通过 systemjs 来加载

## 认识 API

-   System.import('url')

动态加载，模块，内部会自动的去寻找`<script type="systemjs-importmap"></script>` 中的依赖，并下载下来
