---
title: 308-Permanent-Redirect
author: 李嘉明
createTime: 2024/12/02 13:21:42
permalink: /article/j37phl7j/
tags:
  - http
---

今天记录一个代理 http-proxy-middleware 我所遇到的问题

后端原本是给了一个 `http:xxxxx.xxx.xx` 的地址，我也采用了这个地址去进行 代理

```js

{
  proxy: {
      '/devops/cicd/v1': {
        target: 'http://aiops-dev.ky-tech.com.cn/devops/cicd/v1',
        changeOrigin: true,
        pathRewrite: { '^/devops/cicd/v1': '' }
      }
    }
}
```


但是我如果想代理访问 UAT 环境 时，结果响应了 308 的 状态码服务，同时还重定向到 一个域名的地址上去了


![308](/http/1.png)


我一直在想 怎么会有308 ，直到我看到线上环境 不是 http 而是 https, http不能访问https链接，才想着问题是不是出在这里
于是开始往这个方向搜寻，最后将上述代理换成了如下，加入了https访问允许, 并且将.env 环境里面代理地址改为 https 的，问题迎刃而解

![env](/http/2.png)