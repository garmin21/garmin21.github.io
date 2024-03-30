---
title: 3-09 React记录报错信息1
date: '2023-03-09'
categories:
    - Error
tags:
    - Error
publish: true
---

1. `类型“{children:Element；router:router；}”不能分配给类型“IintrinicAttributes&RouterProviderProps”。类型“InternsicAttributes&RouterProviderProps”上不存在属性“children”。`

新的数据路由器的工作方式与旧的传统路由器稍有不同
RouterProvider 组件不接受 children，因此将 App 作为子组件删除。

```tsx
root.render(<RouterProvider router={router} />)
```
