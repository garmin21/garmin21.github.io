---
title: vite搭建 formilyjs 提供 可视化表单设计器
tags:
  - formilyjs
createTime: 2024/03/31 20:46:37
permalink: /article/imjpofnr/
author: 李嘉明
---


## 简介

Formily 是一个与框架无关的表单解决方案，使用了 JSON Schema，多端适配,目前社区已经有 React、Vue 方案，更是支持了众多流行前端框架如 ant、next、element、element-plus、antdv、vant、semi、tdesign-react 等。按照作者的说法是：定位是 面向复杂场景的表单解决方案， 面向企业级表单的专业解决方案

## 预览

<img :src="$withBase('/17.webp')" width="100%" height="100%" />

## 搭建 designable 可视化表单设计器

### 1. 首先我才用 vite + react + ts 的方式来搭建服务

### 2. 将[designable 可视化表单设计器](https://github.com/alibaba/designable/tree/main/formily/antd) 下的 `playground`和`src`目录下相关文件拷贝下来,放在 src 下

将 `service` 和 `widgets` 单独提取出来，src 将其重命名为 formily 与其他文件夹同级就行，

<img :src="$withBase('/18.png')" width="100%" height="100%" />

**`formily`文件夹下的 index.ts,就是表单设计器的入口文件，它就是你看到的设计器视图的样子**

最后，我将 视图 直接渲染到 页面上，[dome 地址](https://gitee.com/hhhh-ddd/jm-framework/tree/master/%E4%BD%8E%E4%BB%A3%E7%A0%81/my-react-formily)

### 3. 安装对应的依赖，我这里安装的依赖有：**注意不同的版本可能还有不同的问题**

```json
{
    "name": "my-react-formily",
    "private": true,
    "version": "0.0.0",
    "type": "module",
    "scripts": {
        "dev": "vite",
        "build": "tsc && vite build",
        "preview": "vite preview"
    },
    "dependencies": {
        "@ant-design/pro-components": "^1.1.14",
        "@ant-design/pro-layout": "^6.5.0",
        "@designable/formily-antd": "^1.0.0-beta.45",
        "@formily/antd": "^2.1.9",
        "@formily/core": "^2.1.9",
        "@formily/react": "^2.1.9",
        "react": "^18.2.0",
        "react-dom": "^18.2.0"
    },
    "devDependencies": {
        "@types/node": "^18.14.2",
        "@types/react": "^18.0.27",
        "@types/react-dom": "^18.0.10",
        "@vitejs/plugin-react": "^3.1.0",
        "less": "^4.1.3",
        "less-loader": "^11.1.0",
        "typescript": "^4.9.3",
        "vite": "^4.1.0"
    }
}
```

## 使用 vite 服务 引出的问题

1. vite 并没有安装 less ，需要安装
2. [vite] Internal server error: '~ant-design-vue/es/style/themes/default.less' wasn't found. 运行项目时发现在 node_modules 中有些包是采用的 这种方式引入另一个包的 less 文件，但是 vite 好像无法解析知道文件的真正路径，导致系统报错。最后，给其配置路径解决

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [{ find: /^~/, replacement: '' }], // 匹配 ~ 开头的路径
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
            },
        },
    },
})
```

## 参考文章

1. https://zhuanlan.zhihu.com/p/413899979
2. https://juejin.cn/post/7127084467771932685
