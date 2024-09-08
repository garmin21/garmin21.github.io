---
title: Node.js 版本管理工具 n
author: 李嘉明
createTime: 2024/04/10 00:15:14
permalink: /article/7955d0z4/
tags:
  - 工具
---

::: tip
Node.js 对于现在的前端开发人员来说是不可或缺的需要掌握的技能，但我们在使用时避免不了会需要切换不同的 Node.js 的版本来使用不同版本的特性，例如：稳定版本和最新版本（含最新特性的版本）。
这里我就详细介绍一下如何使用 n 管理 Node.js 的版本。
:::


> [!WARNING]
> 如果你是 Mac 的电脑，切换 可能会没有权限 需要 `sudo` root 权限， 比如 `sudo n 18.16.0` 切换node版本

## 安装 n

```bash

npm install n -g
```



## 安装 Node
```bash

# 安装指定版本
n [install/i] <version>

# 安装稳定版本
n lts/stable

# 安装最新版本
n latest/current

# 安装文件中对应 node 版本 [.n-node-version, .node-version, .nvmrc, or package.json]
n auto

# 安装 package.json 对应 node 版本
n engine

# 通过发布流的代码名 例如[ boron, carbon]
n boron/carbon
```


## 切换Node

```bash
# 切换已有的版本
n <version>

# 未安装到node，可以指定安装并切换到指定版本
n [install/i] <version>
```


## 删除 Node

```bash
# 删除当前版本
n uninstall

# 删除指定版本
n rm/- <version>

# 删除除当前版本之外的所有版本
n prune

```


