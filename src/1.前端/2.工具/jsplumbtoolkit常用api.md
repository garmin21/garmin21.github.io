---
title: jsplumbtoolkit常用api
author: 李嘉明
createTime: 2024/04/18 21:52:42
permalink: /article/dn66xp9s/
tags:
  - 工具
---

## jsplumbtoolkit 常用 api

### 1. `newInstance` 初始化实例
我们在页面上应该只有一个实例，所以我们只需要初始化一次 即可。后续使用 实例对象 的API 进行操作
```js{1}
this.jsplumbInstance = newInstance({
  container: document.getElementById('id'),
  paintStyle: { strokeWidth: 2, stroke: '#FF5555' },
  endpoint: 'Blank',
  anchor: 'AutoDefault',
})
```

### 2. `ready` 等待 jsplumbtoolkit 加载完毕

```js
ready(() => {
  // ....进行绘制等操作
})
```

### 3. `destroy` 将整个 jsplumbtoolkit 实例销毁

```js
this.jsplumbInstance.destroy()
```

### 4. `batch` 暂停绘图，并批量处理某些逻辑，加快处理性能

第二个参数 true or false ，用于指定，是否在批量处理完成后，重新绘制，默认情况下将早最后进行重绘，你也可手动覆盖为 true

```js
this.jsplumbInstance.batch(() => {
  this.lineMaps.forEach((item) => {
    if (item) {
      this.jsplumbInstance.connect({
        ...item,
        anchor: 'AutoDefault',
        ...this.getLineWeight(item.line_thickness),
      })
    }
  })
}, true)
```

### 5. `connect` 连接

jsplumbtoolkit 使用 connect 来进行连接，必须要有 source, target 的两个元素节点

```js
this.jsplumbInstance.connect({
  source: document.getElementById('id'),
  target: document.getElementById('id'),
})
```

### 6. `bind` 事件绑定

6.x 中将事件全部，用常量进行命名了，可以直接 导出 使用

```js
import { EVENT_CONNECTION_CLICK } from '@jsplumb/browser-ui'

this.jsplumbInstance.bind(EVENT_CONNECTION_CLICK, (element) => {
  this.ERR_DETAILS.caller = element.source?.getAttribute('id') // 获取起点元素ID
  this.ERR_DETAILS.callee = element.target?.getAttribute('id') // 获取终点元素ID
})
```

### 7. `repaintEverything` 重绘

重新绘制页面

```js
this.jsplumbInstance.repaintEverything()
```

### 8. `deleteEveryConnection` 删除连接

使用 deleteEveryConnection 删除连接后，所有 连接都被删除

```js
this.jsplumbInstance.deleteEveryConnection()
```

### 9. `reset` 重置

使用 reset 重置后，相当于清空了所有的状态，你可以认为 当前实例的 已经恢复为默认状态, 任何东西都没有了

```js
this.jsplumbInstance.reset()
```

### 10. `getConnections` 获取所有连接器实例

使用 getConnections 你可以得到当前 绘制的所有线条实例，你可以操作其 线条实例 ，比如显示线条和隐藏线条，
你还可以根据，connections 是否有值来判断，上一个实例 是否被reset过. reset 会把所有的都清空

:::tip
注意，如果没有连接了，你就需要重新再来一遍生成连接线，否则使用 connection 的方法是没有效果的
:::

```js
const connections = this.jsplumbInstance.getConnections()
connections.forEach(function (connection) {
  connection.setVisible(false) // 隐藏连接线
  connection.setVisible(true)  // 显示连接线
})
```

### 11. `deleteConnection` 删除连接

与 `deleteEveryConnection` 相比，显然 这种方式更加可靠，删除连接再次 连接 是可以的
```js
const connections = this.jsplumbInstance.getConnections()
connections.forEach((item) => this.jsplumbInstance.deleteConnection(item))
```

### 12. `revalidate` 更新容器元素信息
:::tip
当我们页面的布局发生很大改变，就需要更新我们的容器信息，再次去绘制，否则 插件就无法找到 实时更新到节点的位置
:::

```js
const container = document.getElementById('dapan-monitoring-container')
this.jsplumbInstance.revalidate(container)
```
 
## 注意事项

### 1. 当我们使用轮询 + screenfull 全屏 显示，轮询，重新绘制 会影响线的位置

:::tip
这个问题，影响了 我好几天，原本是 将 我们的绘制 `根容器` 也就是 在 newInstance 中设置的 container, 进行全屏显示，但是 但文档中内容过多，导致出现滚动条的时候，你移动到中间一半的位置，轮询 重新绘制 线条的数据时，线的位置发生偏移。这是一个很严重的问题！！

:::

- 如何解决？

我们说了，我们将 根容器 进行全屏显示了，毫无疑问，这样是有问题了，正确的做法 应该是将 根容器的 父元素 设置为 全屏元素，不影响到根容器

```html
<!-- 全屏显示元素 -->
<div class="container" id="real-container">
  <!-- 根容器，跟容器必须设置 position: relative， 、
       因为 jsPlumb 使用绝对定位，
       浏览器相对于设置了相对定位的第一个祖先进行计算 -->
  <div id="dapan-monitoring-container" style="position: relative"></div>
</div>
```


### 2. 等待DOM 加载完毕

这也是新手，刚开始常犯的问题，一定要等待 DOM 加载完毕，否则 通过 `document.getElementById` 获取不到节点，自然就连接不上了.


### 3. 给连接对象使用定位到连线偏移
:::tip
从业务角度，一般来说，我给连接的 元素。 基本都会有这种情况，需要给，连接对象悬浮一个什么东西，这样 你使用了 定位来处理，你会发现，当你，刷新后，页面的上连接点，出现了问题。所以这个问题，一定要注意。你可以在其他元素上使用定位，也可以使用其他的办法处理。 测试刷新页面是否可以 定位
:::


### 4. 布局发生变化，如何重新绘制

```js
// 1. 更新容器信息
const container = document.getElementById('id')
this.jsplumbInstance.revalidate(container)
// 2. 绘制连接
this.jsplumbInstance.connect({
  ...item,
  anchor: 'AutoDefault',
  ...this.getLineWeight(item.line_thickness),
})
// 重新绘制
this.jsplumbInstance.repaintEverything()
```