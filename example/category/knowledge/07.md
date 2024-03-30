---
title: 12-03 服务端 和 客户端
date: '2022-12-03'
categories:
    - 案例研究
tags:
    - 案例研究
publish: true
---

## 服务端 和 客户端

```js
// 服务端
const http = require('http')

const createServer = http.createServer

let server = createServer((request, response) => {
    console.log(request.url) // /?username=jack&password=123

    response.write('<h1>你好👋</h1>')

    response.end()
})

server.listen(8080, () => console.log('http://localhost:8080'))
```

```js
// 客户端
const http = require('http')

const request = http.request

const req = request(
    'http://localhost:8080?username=jack&password=123',
    { methed: 'GET' },
    (res) => {
        // console.log(res) 可读流
        res.on('data', (chunk) => {
            console.log(chunk.toString())
        })
    }
)

req.end()
```

http 服务既可以当做服务器，也可以当作客户端向其他服务发送请求
