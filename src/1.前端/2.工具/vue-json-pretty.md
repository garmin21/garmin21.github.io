---
title: vue-json-pretty
author: 李嘉明
createTime: 2024/05/01 15:49:33
permalink: /article/takk9cw2/
tags:
  - 工具
---

这个一个用于 JSON 数据呈现为 树结构的 Vue 组件

![vue-json-pretty](/images/screenshot.png)

[演示地址](https://leezng.github.io/vue-json-pretty/)

## 特征

- 作为 JSON 格式化程序。
- 用 TypeScript 编写，支持 d.ts.
- 支持从 JSON 获取项目数据。
- 支持大数据。
- 支持可编辑。

## 安装

```bash
# 安装最新版本
npm i vue-json-pretty --save

# 安装支持vue2的最新版本

npm i vue-json-pretty@v1-latest --save
```

## 封装使用

使用的版本为 支持 vue2 的`1.9.5` 的版本
```vue
<template>
  <div class="kye-json-pretty">
    <vue-json-pretty
      :data="json"
      :deep="_jsonOptions.deep"
      :show-double-quotes="_jsonOptions.showDoubleQuotes"
      :show-line="_jsonOptions.showLength"
      :show-line-number="_jsonOptions.showLineNumber"
      :highlight-mouseover-node="_jsonOptions.highlightMouseoverNode"
      :collapsed-on-click-brackets="_jsonOptions.collapsedOnClickBrackets"
      :show-icon="_jsonOptions.showIcon"
      :show-key-value-space="_jsonOptions.showKeyValueSpace"
      style="position: relative"
      :selected-value.sync="_jsonOptions.selectedValue"
      :selectable-type="selectableType"
    >
      <template #nodeKey="{ node, defaultKey }">
        <template v-if="node.key === 'title'">
          <a>"{{ node.key }}"</a>
        </template>
        <template v-else>{{ defaultKey }}</template>
      </template>

      <template #nodeValue="{ node, defaultValue }">
        <template
          v-if="
            typeof node.content === 'string' &&
            node.content.startsWith('http://')
          "
        >
          <a href="node.content" target="_blank">{{ node.content }}</a>
        </template>
        <template v-else>{{ defaultValue }}</template>
      </template>
    </vue-json-pretty>
  </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

const defaultData = {
  selectableType: 'single', // 是否切换为单选还是多选
  showSelectController: false, // 是否显示 多选组件
  showLength: true, // 显示长度
  showLine: true, // 显示json连接线
  showDoubleQuotes: true, // 是否显示双引号
  highlightSelectedNode: true, // 是否在选中高亮json
  selectOnClickNode: true, // 单击节点，修改 v-module
  rootPath: 'res', // root路径
  deep: 3, // 默认展开深度
  showIcon: false, // 是否显示 展开小三角icon
  collapsedOnClickBrackets: true, // 是否支持单击括号来进行折叠
  showLineNumber: false, // 是否显示行数
  showKeyValueSpace: true, // 是否将 value 进行缩进一段距离
  showLength: false, //是否显示折叠的长度
  highlightMouseoverNode: false, // 是否在移入的时候高亮
  itemHeight: 20, // 一个 子item 的高度
  collapsedNodeLength: 300, // 整个json 渲染的高度大于此值的时候，将会被折叠，设置 Infinity 将永远不被折叠
  selectedValue: 'res.error', // 选中的值，开启  highlightSelectedNode 后，会默认高亮选中

}

export default {
  name: 'kye-json-pretty',
  components: {
    VueJsonPretty,
  },
  props: {
    // 传入json数据
    jsonData: {
      type: Object,
      default: () => ({}),
      required: true,
    },
    jsonOptions: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    selectableType(newVal) {
      if (newVal === 'single') {
        this.value = 'res.error'
      } else if (newVal === 'multiple') {
        this.value = ['res.error', 'res.data[0].title']
      }
    },
  },
  data() {
    return {
      state: defaultData,
    }
  },
  methods: {},
  computed: {
    json() {
      return this.jsonData
    },
    _jsonOptions() {
      return Object.assign(this.state, this.jsonOptions)
    },
  },
}
</script>
```


属性太多了，更多的请查看文档吧

- [基本basic](https://github.com/leezng/vue-json-pretty/blob/v1.9.5/example/Basic.vue)
- [选中Selector](https://github.com/leezng/vue-json-pretty/blob/v1.9.5/example/SelectControl.vue)
- [虚拟列表Virtual List](https://github.com/leezng/vue-json-pretty/blob/v1.9.5/example/VirtualList.vue)
- [编辑Editable](https://github.com/leezng/vue-json-pretty/blob/v1.9.5/example/Editable.vue)