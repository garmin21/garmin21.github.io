---
title: 树形组件 el-tree
author: 李嘉明
tags:
  - element-ui
createTime: 2024/04/21 18:33:04
permalink: /article/w45r5ews/
---


## el-tree

首先，在 vue 中，我们可以理解为，组件就是一个具有自己方法和属性的 js 对象。想象一棵 `tree 树结构`，它具有 `id` `name` `children` 属性，children 包含中所有的 子 对象，层层包含着，所以 需要生成类似这样的组件，据必须重复重复的调用自己。

```html
<!-- tree -->
<div class="el-tree" role="tree">
  <!-- 注意遍历的是 root.childNodes -->
  <el-tree-node
    v-for="child in root.childNodes"
    :node="child"
    :props="props"
    :render-after-expand="renderAfterExpand"
    :show-checkbox="showCheckbox"
    :key="getNodeKey(child)"
    :render-content="renderContent"
    @node-expand="handleNodeExpand"
  >
  </el-tree-node>
</div>
```

```html
<!-- tree-node 自己调用自己，本身自己就是 el-tree-node对象 -->
<div class="el-tree-node">
  <div>
    <el-tree-node
      :render-content="renderContent"
      v-for="child in node.childNodes"
      :key="getNodeKey(child)"
      :node="child"
    >
    </el-tree-node>
  </div>
</div>
```

## created

我们可以看到 `tree.vue` 在 做了这些事情

```js
created(){
  // 是否是一个tree
  this.isTree = true;
  // 生成了一个 TreeStore 的实例 进行管理
  this.store = new TreeStore({
    //...
  });
  //
  this.root = this.store.root;
  // 初始化拖拽
  let dragState = this.dragState;
  // 订阅事件 -》 节点拖拽开始
  this.$on('tree-node-drag-start', (event, treeNode) => {
    // ...
    this.$emit('node-drag-start', treeNode.node, event);
  });
  // 订阅事件 -> 节点拖拽中
  this.$on('tree-node-drag-over', (event, treeNode) => {
    // .....
    this.$emit('node-drag-over', draggingNode.node, dropNode.node, event);
  });
  // 订阅事件 -> 节点拖拽结束
  this.$on('tree-node-drag-end', (event) => {
    // ....
  });
}
```

## mounted

```js
mounted() {
  // 初始化tabIndex
  this.initTabIndex();
  // 监听键盘事件
  this.$el.addEventListener('keydown', this.handleKeydown);
}
```

## tree-node.vue

tree-node 显然就是代表每一个节点，

```js
created() {
  // 获取父级
  const parent = this.$parent;
  // 父级的 isTree 存在 tree.vue
  if (parent.isTree) {
    this.tree = parent;
  } else {
    this.tree = parent.tree;
  }

  const tree = this.tree;
  if (!tree) {
    console.warn('Can not find node\'s tree.');
  }

  const props = tree.props || {};
  const childrenKey = props['children'] || 'children';

  // 监听节点 node.data.children 发生变化更新
  this.$watch(`node.data.${childrenKey}`, () => {
    // 更新节点信息
    this.node.updateChildren();
  });
  // 节点是否展开
  if (this.node.expanded) {
    this.expanded = true;
    this.childNodeRendered = true;
  }
  // 手风琴模式，当前节点展开，其他节点关闭
  if(this.tree.accordion) {
    this.$on('tree-node-expand', node => {
      if(this.node !== node) {
        this.node.collapse();
      }
    });
  }
}
```

## 总结

在 tree 中，大量使用了 $on 的事件订阅机制。并且 我们 丢给 tree 的数据 都会被 tree 中的 `tree-store.js` 和 `node.js`进行包装，最后遍历 也是进行包装过的 树结构，此时每一个 node 数据都有对应的 一个 Node 对象。

## 如何通过代码，控制节点点击

```js
this.$nextTick(() => {
  const node = this.$refs.tree.getNode(key)
  if (node) {
    this.$refs.tree.setCurrentKey(key) // 设置当前选中节点
    this.$refs.tree.$emit('node-click', node.data, node) // 触发节点的点击事件
  }
})
```

在上面我们已经介绍了 el-tree 组件的大体的 特点和原理，所以 我们通过 `getNode` 获取到节点的信息，
判断节点是否存在，存在 接下来，设置 `setCurrentKey` 内部实际上调用了 `tree-store` 上的 `setCurrentNodeKey`

```js

{
  setCurrentNode(currentNode) {
    // 获取上一个节点，如果上一个节点存在，就设置 isCurrent = false
    const prevCurrentNode = this.currentNode;
    if (prevCurrentNode) {
      prevCurrentNode.isCurrent = false;
    }
    // 如果不存在，就设置当前节点 isCurrent true
    this.currentNode = currentNode;
    this.currentNode.isCurrent = true;
  },
   setCurrentNodeKey(key) {
    // 判断是否存在
    if (key === null || key === undefined) {
      this.currentNode && (this.currentNode.isCurrent = false);
      this.currentNode = null;
      return;
    }
    // 获取到节点信息
    const node = this.getNode(key);
    if (node) {
      // 设置当前打开的 node
      this.setCurrentNode(node);
    }
  }
}

```


:::tip
本次示例中使用 的是 `element-ui@2.15.14`
:::