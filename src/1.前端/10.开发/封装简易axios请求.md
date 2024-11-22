---
title: 封装简易axios请求
author: 李嘉明
createTime: 2024/11/17 19:32:06
permalink: /article/pceps8qm/
tags:
  - FE
---

## 前言

在日常的程序开发中，我们基本上都会使用到 axios 作为 我们前端的请求库存在，但是每次，启动一个新项目时都需要 从别处 copy 或者 重新编写这些配置，太浪费时间了。在比如，项目中需要请求 4 到 5 个不同的 ip 地址，那就不得不复制
好几个 axios 的 js 文件，实在不美观，所以我打算封装一个 js 文件，可以 实例化多个 axios 供项目使用。

## Axios 拦截器的 use 方法

axios.interceptors 提供了请求和响应拦截器，use 方法用于注册拦截器。其基本用法如下：

```js
axios.interceptors.request.use(
  onFulfilled, // 请求成功的回调
  onRejected // 请求失败的回调
);

axios.interceptors.response.use(
  onFulfilled, // 响应成功的回调
  onRejected // 响应失败的回调
);
```

## jm-http

仓库地址: <https://gitee.com/hhhh-ddd/jm-http>

我们定义了一个类，JAxios 用于封装 axios， 在使用 axios 时，我们知道 需要 通过 axios.create 创建一个 axios 实例， 通过定义的 请求拦截器 ，响应拦截器，对请求体 或者响应体做 不同的业务处理，但是基本的处理逻辑是这样

1. 在请求拦截器中 添加 token 用于后端服务识别 用户信息

2. 在响应体拦截器中 对请求的错误编码做提醒处理，或者退出系统等业务逻辑处理

以上 二 步 如果是正常运行的，基本上都可以拿到 我们需要的数据在业务中使用

那么封装的 axios 也需要满足这个需求，需要提供到用户 灵活的在拦截器中修改数据的功能，由此 我们定义了`transform` 对象，在其中有 4 个 钩子 传递给了 axios

```js
const transform = {
  // 请求拦截器钩子
  requestInterceptors: (config) => {
    config.headers['Authorization'] = `Bearer ${getToken()}`;
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  // 请求失败拦截器钩子
  requestInterceptorsCatch: () => {},
  // 响应成功拦截器钩子
  responseInterceptors: (res) => {
    return res.data;
  },
  // 响应失败拦截器钩子
  responseInterceptorsCatch: (error) => {
    checkStatus(error, router);
    return Promise.resolve(error);
  },
};
```

**定义 axios 的基本配置**

```js
const service = new JAxios(
  Object.assign(
    {
      // 基础请求路径
      baseURL: getBaseURL(process.env.VUE_APP_API),
      timeout: 50000, // 超时
      withCredentials: false,
      transform,
      requestOptions: {},
    },
    ops
  )
);
```

我们通过实例化多个 JAxios 可以用于创建多个实例， 将 service 导出 即可供应给业务使用了 内部提供了 `request` 等方法 等同 与 `axios.request` 方法，你可以直接使用

```js
service.request({
  method: 'GET',
  url: ``,
  params: {}
})


service.request({
  method: 'POST',
  url: ``,
  data: {}
})
```
