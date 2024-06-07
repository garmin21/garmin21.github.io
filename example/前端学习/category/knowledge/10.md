---
title: 12-03 大文件分片上传
date: '2022-12-03'
categories:
    - 案例研究
tags:
    - 案例研究
publish: true
---

```html
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
    </head>
    <body>
        <input type="file" id="file" />
        <script>
            const file = document.querySelector('#file')
            let progress = 0
            file.addEventListener(
                'change',
                async function (ev) {
                    const target = ev.target
                    let offsetSize = 10 * 1024 * 1024 // 定义每次上传的大小：10M
                    let startSize = 0 // 定义开始偏移
                    let index = 0 // 定义分片标识，用于给后端进行合并
                    if (target?.files) {
                        const file = target.files[0]
                        const { name, size, type } = file
                        // 切片
                        while (startSize < size) {
                            let blob = null
                            // 剩余不足10M,大小的边界处理
                            if (startSize + offsetSize > size) {
                                blob = file.slice(startSize, size)
                            } else {
                                blob = file.slice(
                                    startSize,
                                    startSize + offsetSize
                                )
                            }
                            startSize += offsetSize
                            let blobFile = new File([blob], name)
                            let formData = new FormData()
                            formData.append('file', blobFile)
                            formData.append('index', index + '')
                            // await 你的请求函数
                            index++
                            progress = (startSize / size) * 100
                        }

                        // 分片完成之后，调用后端提供的 合并接口，告诉后端进行合并操作
                    }
                },
                false
            )
        </script>
    </body>
</html>
```
