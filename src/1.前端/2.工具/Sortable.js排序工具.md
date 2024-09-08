---
title: Sortable.js排序工具
author: 李嘉明
createTime: 2024/04/27 23:54:37
permalink: /article/lm4lecta/
tags:
  - 工具
---

:::tip
在我们日常，项目开中，经常会遇到 这一类的需求，需要对 某一列表的数据进行拖放排序，当然 我们也可以简单的通过 js 来实现无拖放式的排序。
现在呢，我们来介绍一个拥有 start 数 非常高的一个 js 拖拽排序库 `Sortable.js`。

**官网介绍： 用于可重新排序的拖放列表的 JavaScript 库**
:::

- [Sortable.js 文档](https://sortablejs.github.io/Sortable/#simple-list)
- [github](https://github.com/SortableJS/Sortable)

## 安装使用

- 如果你使用的是 项目工程的模式开发

```bash
npm install sortablejs --save

```

- 采用 原生的 `html` 开发

`<script src="https://cdn.jsdelivr.net/npm/sortablejs@1.15.2/Sortable.min.js"></script>`

## 特征

### 拖拽

- 定义动画 `animation`
- 定义拖拽时的类 `ghostClass`

```html
<div id="simple-list" class="row">
  <h4 class="col-12">Simple list example</h4>
  <div id="example1" class="list-group col">
    <div class="list-group-item">Item 1</div>
    <div class="list-group-item">Item 2</div>
    <div class="list-group-item">Item 3</div>
    <div class="list-group-item">Item 4</div>
    <div class="list-group-item">Item 5</div>
    <div class="list-group-item">Item 6</div>
  </div>
</div>

<script>
  new Sortable(document.getElementById('example1'), {
    animation: 150, // 定义动画时长
    ghostClass: 'blue-background-class', // 拖拽时的类
  })
</script>
```

### 分组

- 开启分组 `group`

```html
<div id="example1" class="list-group col">
  <div class="list-group-item">Item 1</div>
  <div class="list-group-item">Item 2</div>
  <div class="list-group-item">Item 3</div>
  <div class="list-group-item">Item 4</div>
  <div class="list-group-item">Item 5</div>
  <div class="list-group-item">Item 6</div>
</div>

<div id="example2" class="list-group col">
  <div class="list-group-item tinted">Item 1</div>
  <div class="list-group-item tinted">Item 2</div>
  <div class="list-group-item tinted">Item 3</div>
  <div class="list-group-item tinted">Item 4</div>
  <div class="list-group-item tinted">Item 5</div>
  <div class="list-group-item tinted">Item 6</div>
</div>

<script>
  new Sortable(document.getElementById('example1'), {
    animation: 150,
    group: 'shared', // 开启分组
    ghostClass: 'blue-background-class',
  })
</script>
<script>
  new Sortable(document.getElementById('example2'), {
    animation: 150,
    group: 'shared', // 开启分组
    ghostClass: 'blue-background-class1',
  })
</script>
```

### 克隆

当我们从一个集合中拖拽子项到另一个集合中，我们允许，克隆

- 开启克隆 `pull: 'clone'`

```html
<div id="example1" class="list-group col">
  <div class="list-group-item">Item 1</div>
  <div class="list-group-item">Item 2</div>
  <div class="list-group-item">Item 3</div>
  <div class="list-group-item">Item 4</div>
  <div class="list-group-item">Item 5</div>
  <div class="list-group-item">Item 6</div>
</div>

<div id="example2" class="list-group col">
  <div class="list-group-item tinted">Item 1</div>
  <div class="list-group-item tinted">Item 2</div>
  <div class="list-group-item tinted">Item 3</div>
  <div class="list-group-item tinted">Item 4</div>
  <div class="list-group-item tinted">Item 5</div>
  <div class="list-group-item tinted">Item 6</div>
</div>
<script>
  new Sortable(document.getElementById('example1'), {
    animation: 150,
    group: {
      name: 'shared',
      pull: 'clone', // 设置克隆
    },
    ghostClass: 'blue-background-class',
  })
</script>
<script>
  new Sortable(document.getElementById('example2'), {
    animation: 150,
    group: {
      name: 'shared',
      pull: 'clone', // 设置克隆
    },
    ghostClass: 'blue-background-class1',
  })
</script>
```

### 禁止拖拽

- 禁止拖拽 `put: false`
- 禁止排序 `sort: false`

```html
<div id="example1" class="list-group col">
  <div class="list-group-item">Item 1</div>
  <div class="list-group-item">Item 2</div>
  <div class="list-group-item">Item 3</div>
  <div class="list-group-item">Item 4</div>
  <div class="list-group-item">Item 5</div>
  <div class="list-group-item">Item 6</div>
</div>

<div id="example2" class="list-group col">
  <div class="list-group-item tinted">Item 1</div>
  <div class="list-group-item tinted">Item 2</div>
  <div class="list-group-item tinted">Item 3</div>
  <div class="list-group-item tinted">Item 4</div>
  <div class="list-group-item tinted">Item 5</div>
  <div class="list-group-item tinted">Item 6</div>
</div>
<script>
  new Sortable(document.getElementById('example1'), {
    animation: 150,
    sort: false, // 禁用排序
    group: {
      name: 'shared',
      pull: 'clone', // 设置 接收元素 为克隆体
      put: false, // false 不允许拖动到此列表
    },
    ghostClass: 'blue-background-class',
  })
</script>
<script>
  new Sortable(document.getElementById('example2'), {
    animation: 150,
    group: {
      name: 'shared',
      pull: 'clone',
    },
    ghostClass: 'blue-background-class1',
  })
</script>
```

### 设置可以进行拖拽的元素

可以指定设置那些元素可以被拖拽，设置某些元素不允许拖拽

- 设置允许拖拽 `handle: '.handle'`

```html
<div id="example1" class="list-group col">
  <div class="list-group-item">
    <i class="fas fa-arrows-alt handle"></i>&nbsp;&nbsp;Item 1
  </div>
  <div class="list-group-item">
    <i class="fas fa-arrows-alt "></i>&nbsp;&nbsp;Item 2
  </div>
  <div class="list-group-item">
    <i class="fas fa-arrows-alt handle"></i>&nbsp;&nbsp;Item 3
  </div>
  <div class="list-group-item">
    <i class="fas fa-arrows-alt handle"></i>&nbsp;&nbsp;Item 4
  </div>
  <div class="list-group-item">
    <i class="fas fa-arrows-alt handle"></i>&nbsp;&nbsp;Item 5
  </div>
  <div class="list-group-item">
    <i class="fas fa-arrows-alt handle"></i>&nbsp;&nbsp;Item 6
  </div>
</div>
<script>
  new Sortable(document.getElementById('example1'), {
    handle: '.handle', // 设置可以拖动的元素
    animation: 150,
    group: {
      name: 'shared',
      pull: 'clone', // To clone: set pull to 'clone'
    },
    ghostClass: 'blue-background-class',
  })
</script>
```

### 设置禁用某一个元素，不允许拖拽

可以指定设置那些元素可以被禁用拖拽

- 设置禁用 `filter: '.filtered'`

```html
<div id="example1" class="list-group col">
  <div class="list-group-item">Item 1</div>
  <div class="list-group-item">Item 2</div>
  <div class="list-group-item">Item 3</div>
  <div class="list-group-item bg-danger filtered">Filtered</div>
  <div class="list-group-item">Item 4</div>
  <div class="list-group-item">Item 5</div>
</div>
<script>
  new Sortable(document.getElementById('example1'), {
    filter: '.filtered', // 设置禁用某一个元素，不允许拖拽
    animation: 150,
    group: {
      name: 'shared',
      pull: 'clone', // To clone: set pull to 'clone'
    },
    ghostClass: 'blue-background-class',
  })
</script>
```

### 设置可拖动的的阈值

···待完善

### 嵌套布局

需求：我们经常需要将某一个元素，拖动到某一个节点内部

- 是否可以将克隆的元素追加到 文档主体 `fallbackOnBody: true`
- 设置拖拽的阈值 `swapThreshold: 0.65`

```html{1,4,8,23}
<div id="nestedDemo" class="list-group col nested-sortable">
  <div class="list-group-item nested-1">
    Item 1.1
    <div class="list-group nested-sortable">
      <div class="list-group-item nested-2">Item 2.1</div>
      <div class="list-group-item nested-2">
        Item 2.2
        <div class="list-group nested-sortable">
          <div class="list-group-item nested-3">Item 3.1</div>
          <div class="list-group-item nested-3">Item 3.2</div>
          <div class="list-group-item nested-3">Item 3.3</div>
          <div class="list-group-item nested-3">Item 3.4</div>
        </div>
      </div>
      <div class="list-group-item nested-2">Item 2.3</div>
      <div class="list-group-item nested-2">Item 2.4</div>
    </div>
  </div>
  <div class="list-group-item nested-1">Item 1.2</div>
  <div class="list-group-item nested-1">Item 1.3</div>
  <div class="list-group-item nested-1">
    Item 1.4
    <div class="list-group nested-sortable">
      <div class="list-group-item nested-2">Item 2.1</div>
      <div class="list-group-item nested-2">Item 2.2</div>
      <div class="list-group-item nested-2">Item 2.3</div>
      <div class="list-group-item nested-2">Item 2.4</div>
    </div>
  </div>
  <div class="list-group-item nested-1">Item 1.5</div>
</div>
<script>
  var nestedSortables = [].slice.call(document.querySelectorAll('.nested-sortable'));
  for (var i = 0; i < nestedSortables.length; i++) {
    new Sortable(nestedSortables[i], {
      group: 'nested',
      animation: 150,
      fallbackOnBody: true, // 将克隆的DOM元素追加到文档主体中
      swapThreshold: 1, // 阈值
    })
  }
</script>
```

### 多选拖拽

- 开启多选 `multiDrag: true`
- 设置多选时的 class `selectedClass: 'selected'`
- 设置手机端多选数 `fallbackTolerance: 3`

```html
<div id="multiDragDemo" class="list-group col">
  <div class="list-group-item">Item 1</div>
  <div class="list-group-item">Item 2</div>
  <div class="list-group-item">Item 3</div>
  <div class="list-group-item">Item 4</div>
  <div class="list-group-item">Item 5</div>
  <div class="list-group-item">Item 6</div>
</div>

<script>
  new Sortable(document.getElementById('multiDragDemo'), {
    multiDrag: true, // 多选
    selectedClass: 'selected', // 多选时的class
    fallbackTolerance: 3, // 开启手机端多选数
    animation: 150,
  })
</script>
```

### 设置项目交换但是不进行排序

- 开启交换 `swap: true`
- 设置交换的类 `swapClass: 'highlight'`

```html
<div id="swapDemo" class="list-group col">
  <div class="list-group-item">Item 1</div>
  <div class="list-group-item">Item 2</div>
  <div class="list-group-item">Item 3</div>
  <div class="list-group-item">Item 4</div>
  <div class="list-group-item">Item 5</div>
  <div class="list-group-item">Item 6</div>
</div>
<script>
  new Sortable(document.getElementById('swapDemo'), {
    swap: true,
    swapClass: 'highlight', // 交换的class
    animation: 150,
  })
</script>
```

## Options

```js
{
  Group: "name"， // 或{name: "…"，pull: [true, false， 'clone'， array]， put: [true, false, array]}
  Sort: true， //在列表内排序
  Delay: 0， //以毫秒为单位定义排序何时开始
  delayOnTouchOnly: false， //只在用户使用触摸时延迟
  touchStartThreshold: 0， // px，点在取消延迟拖动事件之前应该移动多少像素
  disabled: false， //如果设置为true则禁用可排序。
  store: null， // @see store
  animation:150，// ms，排序时移动项目的动画速度，' 0 ' -没有动画
  easing: "cubic-bezier(1,0,0,1)"， //动画的easing。默认为null。参见https://easings.net/获取示例。
  handle: ".my-handle", //在列表项中拖动句柄选择器
  filter: ".ignore-elements",， //不会导致拖拽的选择器(String或Function)
  preventOnFilter: true， //触发' filter '时调用' event.preventDefault() '
  draggable: ".item", //指定元素中哪些项是可拖动的

  dataIdAttr: 'data-id'， // ' toArray() '方法使用的HTML属性

  ghostClass: "sortable-ghost"， //放置占位符的类名
  chosenClass: "sortable-chosen"， //所选项目的类名
  dragClass: "sortable-drag"， //拖动项的类名

  swapThreshold: 1， //交换分区阈值
  inverswap: false， //如果设置为true，将始终使用反向交换区
  invertedSwapThreshold: 1， //反向交换区的阈值(默认设置为swapThreshold值)
  direction: "horizontal"，//可排序方向(如果没有给出，将自动检测)

  forceFallback: false， //忽略HTML5的DnD行为并强制回退

  fallbackClass: "sortable-fallback"， //使用forcfallback时克隆的DOM元素的类名
  fallbackOnBody: false， //将克隆的DOM元素追加到Document的Body中
  fallbackTolerance: 0， //以像素为单位指定鼠标在被认为是拖动之前应该移动的距离。

  dragoverBubble: false,
  removeCloneOnHide: true， //当克隆元素不显示时移除它，而不是仅仅隐藏它
  emptyInsertThreshold: 5， // px，距离鼠标必须从空可排序对象插入拖动元素


  setData: function (dataTransfer, dragEl) {
    dataTransfer.setData('Text',dragEl.textContent); // ' datattransfer '对象的HTML5 DragEvent
  },

  //选择元素
  onselect: function (evt) {
    evt.oldIndex; //父元素的索引
  },

  //元素未被选择
  onUnchoose: function(evt) {
    //与onEnd相同的属性
  },

  //开始拖动元素
  onStart: function (evt) {
    evt.oldIndex;//父元素的索引
  },

  //元素拖动结束
  onEnd: function (evt) {
    var itemEl = event .item; //拖拽HTMLElement
    evt.to; //目标列表
    evt.from;//前一个列表
    evt.oldIndex;//元素在旧父元素中的旧索引
    evt.newIndex;//元素在新父元素中的新索引
    evt.oldDraggableIndex;//元素在旧父元素中的旧索引，只计算可拖动元素
    evt.newDraggableIndex;//元素在新父元素中的新索引，只计算可拖动元素
    evt。Clone //克隆元素
    evt.pullMode;//当项目在另一个可排序列表中时:' clone '表示正在克隆，' true '表示正在移动
  },

  //从另一个列表中放入一个元素
  onAdd: function (evt) {
    //与onEnd相同的属性
  },

  //修改列表的排序
  onUpdate: function (evt) {
    //与onEnd相同的属性
  },

  //修改列表时调用(add / update / remove)
  onSort: function(evt) {
    //与onEnd相同的属性
  },

  //元素从列表中移除到另一个列表中
  onRemove: function(evt) {
    //与onEnd相同的属性
  },

  //尝试拖动一个已过滤的元素
  onFilter: function(evt) {
    var itemEl = event.item; // HTMLElement接收' mousedown|tapstart '事件。
  },

  //当你在列表中或在列表之间移动一个项目时发生事件
  onMove: function(evt， originalEvent) {
    //示例:https://jsbin.com/nawahef/edit?js,output
    evt.dragged;//拖拽HTMLElement
    evt.draggedRect;// DOMRect{左，上，右，下}
    evt.related;// HTMLElement
    evt.relatedRect;/ / DOMRect
    evt.willInsertAfter;//如果Sortable默认在目标后插入拖动元素，则为true的布尔值
    originalEvent.clientY;//鼠标位置

    //返回false;-表示取消
    //返回-1;-在目标前插入
    //返回1;-插入目标后
    //返回true;—根据方向保持默认插入点
    //返回void;—根据方向保持默认插入点
  },

  //创建元素克隆时调用
  onClone: function (evt) {
    var origEl = event.item;
    var clone = evt.clone;
  },

  //当拖动元素改变位置时调用
  onChange: function(evt) {
    //与onEnd相同的属性
    evt.newIndex //使用此事件最有可能的原因是获取拖动元素的当前索引
  }
}
```
