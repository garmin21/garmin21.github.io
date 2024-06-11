---
title: 前端导出excel方案
author: 李嘉明
createTime: 2024/04/05 22:47:41
permalink: /article/qreh42my/
tags:
  - development
---

## url 下载

::: tip
在这种方式中，我们的目标是后端生成 Excel 文件并提供一个地址，前端通过访问这个地址来下载导出的 Excel 文件。

:::

- 后端根据前端的请求，生成需要导出的数据，并将数据转换为 Excel 格式的文件。

- 后端将生成的 Excel 文件保存到服务器的某个临时目录，并为该文件生成一个临时的访问地址。

- 后端将生成的临时地址返回给前端作为响应。

- 前端收到后端返回的地址后，可以通过创建一个隐藏的 `<a>` 标签，并设置其 href 属性为后端返回的地址，然后触发点击该标签的操作，从而实现文件下载。

- 前端完成下载后，可以根据需求决定是否删除服务器上的临时文件。

```js
// 后端接口：/api/export/excel
// 请求方式：GET
// 假设后端接口返回导出地址的数据格式为 { url: "https://example.com/excel_exports/exported_file.xlsx" }

export const exportExcelViaURL = () => {
  // 发起后端接口请求获取导出地址
  fetch('/api/export/excel')
    .then((response) => response.json())
    .then((data) => {
      const { url } = data
      // 创建一个隐藏的<a>标签并设置href属性为后端返回的地址
      const link = document.createElement('a')
      link.href = url
      link.target = '_blank'
      link.download = `exported_data_${dayjs().format(
        'YYYY-MM-DD_hh.mm.ss_a'
      )}.xlsx`
      // 触发点击操作，开始下载文件
      link.click()
    })
    .catch((error) => {
      console.error('导出Excel失败:', error)
    })
}
```

## Blob 文件流

::: tip
后端直接返回 Blob 文件流数据，前端通过接收到的 Blob 数据进行文件下载。

:::

- 后端根据前端的请求，生成需要导出的数据，并将数据转换为 Excel 格式的文件。

- 后端将生成的 Excel 数据以 Blob 文件流的形式返回给前端，通常是通过设置响应的 Content-Type 和 Content-Disposition 头，使其以文件下载的方式呈现给用户。

- 前端通过接收到的 Blob 数据，可以创建一个 Blob URL，然后创建一个隐藏的 `<a>` 标签，并将其 `href `属性设置为`Blob URL`，再触发点击该标签的操作，从而实现文件下载。

```js
// 后端接口：/api/export/excel/blob
// 请求方式：GET

export const exportExcelViaBlob = () => {
  // 发起后端接口请求获取Blob文件流数据
  fetch('/api/export/excel/blob')
    .then((response) => response.blob())
    .then((blobData) => {
      // 创建Blob URL
      const blobUrl = URL.createObjectURL(blobData)
      // 创建一个隐藏的<a>标签并设置href属性为Blob URL
      const link = document.createElement('a')
      link.href = blobUrl
      link.target = '_blank'
      link.download = `exported_data_${dayjs().format(
        'YYYY-MM-DD_hh.mm.ss_a'
      )}.xlsx`
      // 触发点击操作，开始下载文件
      link.click()
      // 释放Blob URL
      URL.revokeObjectURL(blobUrl)
    })
    .catch((error) => {
      console.error('导出Excel失败:', error)
    })
}
```

## 基于 XLSX

::: tip
XLSX 是一款功能强大的 JavaScript 库，用于在浏览器和 Node.js 中读取、解析、处理和写入 Excel 文件。

:::

### 1. 读取 Excel 文件

使用 XLSX 库，你可以读取现有的 Excel 文件，提取其中的数据和元数据。例如，假设你有一个名为"data.xlsx"的 Excel 文件，你可以通过以下方式读取它：

```js
import * as XLSX from 'xlsx'

const file = 'data.xlsx' // 文件路径或URL
const workbook = XLSX.readFile(file)
const sheetName = workbook.SheetNames[0] // 假设我们读取第一个工作表

const worksheet = workbook.Sheets[sheetName]
const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
console.log(data)
```

### 2. 写入 Excel 文件

除了读取现有的 Excel 文件，XLSX 库还允许你将数据写入到新的 Excel 文件中。例如，你可以将一个二维数组的数据写入到一个新的 Excel 文件：

```js
import * as XLSX from 'xlsx'

const data = [
  ['Name', 'Age', 'City'],
  ['John Doe', 30, 'New York'],
  ['Jane Smith', 25, 'San Francisco'],
]

const worksheet = XLSX.utils.aoa_to_sheet(data)
const workbook = XLSX.utils.book_new()
XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

const fileName = 'output.xlsx' // 导出的文件名
XLSX.writeFile(workbook, fileName)
```

### 3. 封装好的代码

为了实现前述两种方式的前端导出 Excel 功能，我们将使用 XLSX 库来处理数据并导出 Excel 文件。

```js
// 基于XLSX的前端导出Excel实现

import dayjs from 'dayjs'
import * as XLSX from 'xlsx'

/**
 * eg: .columns = [
 *    { header: 'Id', key: 'id', wpx: 10 },
 *    { header: 'Name', key: 'name', wch: 32 },
 *    { header: 'D.O.B.', key: 'dob', width: 10, hidden: true }
 * ]
 * data: [{id: 1, name: 'John Doe', dob: new Date(1970,1,1)}]
 * @param columns 定义列属性数组
 * @param data  数据
 * @param name  文件名
 */
export const generateExcel = (columns = [], data = [], name = '') => {
  const headers = columns.map((item) => item.header)
  // https://docs.sheetjs.com/docs/csf/features/#row-and-column-properties
  const otherConfigs = columns.map(({ key, header, ...item }) => item)

  const dataList = data.map((item) => {
    let obj = {}
    columns.forEach((col) => {
      obj[col.header] = item[col.key]
    })
    return obj
  })

  const workbook = XLSX.utils.book_new()
  workbook.SheetNames.push(name)
  const worksheet = XLSX.utils.json_to_sheet(dataList, {
    header: headers,
  })
  worksheet['!cols'] = otherConfigs
  workbook.Sheets[name] = worksheet

  // 生成Blob数据
  const excelData = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' })
  const blobData = new Blob([excelData], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })

  // 创建Blob URL
  const blobUrl = URL.createObjectURL(blobData)
  // 创建一个隐藏的<a>标签并设置href属性为Blob URL
  const link = document.createElement('a')
  link.href = blobUrl
  link.target = '_blank'
  link.download = `${name}-${dayjs().format('YYYY-MM-DD_hh.mm.ss_a')}.xlsx`
  // 触发点击操作，开始下载文件
  link.click()
  // 释放Blob URL
  URL.revokeObjectURL(blobUrl)
}
```

### 4. 下载全部

::: tip
我们可能需要一键下载所有表格的数据，这时候前端需要轮询后端的接口，拿到所有的数据，所以我们需要实现一个 loopReuqest 函数

:::

::: code-tabs
@tab request.js

```js
export default function awaitRequest(limit = 5) {
  let awaitTask = []
  let currentTaskNum = 0

  function run(event, ...args) {
    return new Promise((resolve, reject) => {
      function callbackEvent() {
        currentTaskNum++
        event(...args)
          .then((res) => {
            if (awaitTask.length) {
              const nextTask = awaitTask.shift()
              nextTask()
            }
            resolve(res)
          })
          .catch((e) => {
            console.error(e)
            reject(e)
          })
          .finally(() => {
            currentTaskNum--
          })
      }
      if (currentTaskNum >= limit) {
        awaitTask.push(callbackEvent)
      } else {
        callbackEvent()
      }
    })
  }
  Object.defineProperties(run, {
    clear: {
      value: () => {
        awaitTask = []
      },
    },
  })
  return run
}
```

@tab loopRequest.js

```js
/**
 * 循环分页请求，获取全部数据
 * @param {Function} request 请求
 * @param {Number} size 页大小
 * @param {Object} params 其余参数
 * @param {String} listLabel.pageLable 当前页字段名。默认page
 * @param {String} listLabel.sizeLabel 页大小字段名。默认page_size
 * @param {String} listLabel.totalLabel 总条数字段名。默认total
 * @param {String} listLabel.itemsLabel 数据列表字段名。默认list
 * @returns
 */
export async function loopRequest(
  request,
  size,
  params,
  listLabel = {
    totalLabel: 'total',
    pageLable: 'page',
    sizeLabel: 'page_size',
    itemsLabel: 'list',
  }
) {
  const {
    totalLabel = 'total',
    pageLable = 'page',
    sizeLabel = 'page_size',
    itemsLabel = 'list',
  } = listLabel
  try {
    const firstRes = await request({
      ...params,
      [sizeLabel]: size,
      [pageLable]: 1,
    })
    let list = firstRes.data[itemsLabel] || []
    const total = firstRes.data[totalLabel]
    if (total > size) {
      const limit = awaitRequest()
      const restRequest = Array.from({
        length: Math.floor(total / size),
      }).map((_, index) =>
        limit(() =>
          request({
            ...params,
            [sizeLabel]: size,
            [pageLable]: index + 2,
          })
        )
      )
      const resetRes = await Promise.all(restRequest)
      resetRes.forEach((res) => {
        if (res.code === 0 && res.data[itemsLabel]) {
          list.push(...res.data[itemsLabel])
        }
      })
    }
    return list
  } catch (e) {
    console.error(e)
  }
  return []
}
```

:::

## 原生JS导出 csv

```js
const tableToExcel = () => {
  // 要导出的json数据
  const jsonData = [
    {
      name: '路人甲',
      phone: '123456789',
      email: '000@123456.com',
    },
    {
      name: '炮灰乙',
      phone: '123456789',
      email: '000@123456.com',
    },
    {
      name: '土匪丙',
      phone: '123456789',
      email: '000@123456.com',
    },
    {
      name: '流氓丁',
      phone: '123456789',
      email: '000@123456.com',
    },
  ]
  // 列标题，逗号隔开，每一个逗号就是隔开一个单元格
  let str = `姓名,电话,邮箱`
  // 增加	为了不让表格显示科学计数法或者其他格式
  for (let i = 0; i < jsonData.length; i++) {
    for (const key in jsonData[i]) {
      str += `${jsonData[i][key] + '	'},`
    }
    str += ''
  }
  // encodeURIComponent解决中文乱码
  const uri = 'data:text/csv;charset=utf-8,ufeff' + encodeURIComponent(str)
  // 通过创建a标签实现
  const link = document.createElement('a')
  link.href = uri
  // 对下载的文件命名
  link.download = 'json数据表.csv'
  link.click()
}
```

## exceljs 插件
exceljs 是一款可导出，可读取的 Excel 操作工具，可以实现样式的修改以及 Excel 的高级功能，是非常值得推荐的一个处理 Excel 的库。


[Excel基础](https://segmentfault.com/a/1190000042028092)

## 技术方案

| 插件 | 介绍 | 推荐指数 |
|:------|:-------:|------:|
| 原生JS导出csv | 成本低，也是最方便的，仅支持csv格式**（功能最弱）** | :star: |
| url 下载 / Blob 文件流 | 后端实现，前端只是下载,  | :star::star::star::star::star: |
| XLSX | xlsx 是前端最热门的 Excel 导出方案，又叫做 SheetJS，默认不支持修改 Excel 的样式。若在工作业务需求上需要修改 Excel 的样式的话需要使用该作者的付费版本。或者使用 xlsx-style，但使用起来非常麻烦，需要修改 node_modules 源码，而且作者最近的提交的版本也在 6 年前，不建议使用。 | :star: |
| exceljs | exceljs 是一款可导出，可读取的 Excel 操作工具，可以实现样式的修改以及 Excel 的高级功能，是非常值得推荐的一个处理 Excel 的库，而 exceljs 也是本文介绍的主角！ | :star::star::star::star::star: |