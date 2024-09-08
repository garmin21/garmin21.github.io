---
title: 前端模块
author: 李嘉明
createTime: 2024/05/27 22:26:24
permalink: /learn-build/umd/
---

:::tip
UMD 是 AMD 和 CommonJS 的一个糅合。AMD 是浏览器优先，异步加载；CommonJS 是服务器优先，同步加载。
既然要通用，怎么办呢？那就先判断是否支持 node.js 的模块，存在就使用 node.js；再判断是否支持 AMD（define 是否存在），存在则使用 AMD 的方式加载。这就是所谓的 UMD。
:::


## UMD 模块格式

```js
!function(e, t) {
    
    if("object" == typeof exports && "object" == typeof module) { // 判断是否支持 node
        console.log('1')
        module.exports = t()
    } else if("function" == typeof define && define.amd) { // 判断 是否支持 amd
        console.log('2')

        define([], t)
    } else if("object" == typeof exports) { // 这里判断是否有 exports ,上面已经有判断了
        console.log('3')

        exports.VueJsonPretty = t()
    } else { // 实在找不到，就挂载到 window 上
        console.log('4', e)
        e.VueJsonPretty = t()
    }
}(this, (function() {
    const component =  function() {
        // ...
    }()
    console.log(component,'这里返回的就是我们编写的内容')
    return component
}
));
```