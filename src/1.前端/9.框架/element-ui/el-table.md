---
title: 表格组件 el-table
author: 李嘉明
createTime: 2024/06/22 11:30:26
permalink: /article/9m4byfow/
tags:
  - element-ui
---
## el-table

表格组件是 element-ui 中 比较复杂的一个组件，也是公司使用频率最高的一个组件，只要你是 B 端项目，基本都会有 表格的存在。

表格组件的实现，是将 表头`table-header`，表体`table-body`，表尾`table-footer` 单独抽离为三个不同的组件，进行组合，由于表格有 列固定 的功能，所以 el-table 根据你是否有列固定，`v-if` 渲染不同的一个表格组合。

**几个核心问题**

## `el-table` 数据源和数据绑定

### 1. 我们传递的 data 数据 到哪里去？

当我们传递 data 数据，后，`el-table` 会监听 data 数据的变化，从而执行 `this.store.commit('setData', value)` 将数据，设置到 自己内部实现的 `Watcher` 对象上进行集中管理。

并且在我们的 `table-body`中根据 data 数据，生成渲染 `table-row`

### 2. columns 的列数据是怎么来的?

我们在 `table-row`的组件中发现，是通过 `columns.map(...)`去渲染列单元格的，那么这个 columns 是 父级传递过来的，父级的又是从哪里来的？ 渲染 `cell` 单元格， 是根据 `column.renderCell` 进行渲染的 那么这个 `renderCell` 从哪里来的呢？

---

首先呢 `el-table-column` 组件搭配 `el-table`组件使用的，数据的来源就来自每一个 table-column ，在 table-column `mounted`的时候，调用 `$parent` 对象上的 Watcher 实例对象，执行 `commit` 将数据 通过 `insertColumn` 方法进行 添加到 `_columns`上==有几个 el-table-column insertColumn 就会执行几次==。然后执行 `updateColumns` 设置 states.columns 的响应式数据源。

在 `table-body` 中 通过 `mapStates` 拿到我们的数据，那么`table-body` 中的 columns 就是这样得到的

## 使用方式

```html
<el-table :data="tableData" style="width: 100%">
  <el-table-column prop="date" label="日期"> </el-table-column>
  <el-table-column prop="name" label="姓名"> </el-table-column>
  <el-table-column prop="address" label="地址"> </el-table-column>
</el-table>
```

## 删减 的 部分源码文件内容

::: tabs

@tab table.vue

```vue
<template>
  <div class="el-table">
    <div class="hidden-columns" ref="hiddenColumns"><slot></slot></div>
    <div
      v-if="showHeader"
      v-mousewheel="handleHeaderFooterMousewheel"
      class="el-table__header-wrapper"
      ref="headerWrapper"
    >
      <table-header
        ref="tableHeader"
        :store="store"
        :border="border"
        :default-sort="defaultSort"
        :style="{
          width: layout.bodyWidth ? layout.bodyWidth + 'px' : '',
        }"
      >
      </table-header>
    </div>
    <div
      class="el-table__body-wrapper"
      ref="bodyWrapper"
      :class="[
        layout.scrollX ? `is-scrolling-${scrollPosition}` : 'is-scrolling-none',
      ]"
      :style="[bodyHeight]"
    >
      <table-body
        :context="context"
        :store="store"
        :stripe="stripe"
        :row-class-name="rowClassName"
        :row-style="rowStyle"
        :highlight="highlightCurrentRow"
        :style="{
          width: bodyWidth,
        }"
      >
      </table-body>
      <div
        v-if="!data || data.length === 0"
        class="el-table__empty-block"
        ref="emptyBlock"
        :style="emptyBlockStyle"
      >
        <span class="el-table__empty-text">
          <slot name="empty">{{ emptyText || t('el.table.emptyText') }}</slot>
        </span>
      </div>
      <div
        v-if="$slots.append"
        class="el-table__append-wrapper"
        ref="appendWrapper"
      >
        <slot name="append"></slot>
      </div>
    </div>
    <div
      v-if="showSummary"
      v-show="data && data.length > 0"
      v-mousewheel="handleHeaderFooterMousewheel"
      class="el-table__footer-wrapper"
      ref="footerWrapper"
    >
      <table-footer
        :store="store"
        :border="border"
        :sum-text="sumText || t('el.table.sumText')"
        :summary-method="summaryMethod"
        :default-sort="defaultSort"
        :style="{
          width: layout.bodyWidth ? layout.bodyWidth + 'px' : '',
        }"
      >
      </table-footer>
    </div>
  </div>
</template>

<script type="text/babel">
let tableIdSeed = 1;
export default {
  name: 'ElTable',
  props: {
    data: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  computed: {
    // ...

    ...mapStates({
      selection: 'selection',
      columns: 'columns',
      tableData: 'data',
      fixedColumns: 'fixedColumns',
      rightFixedColumns: 'rightFixedColumns',
    }),
  },

  watch: {
    //...
    data: {
      immediate: true,
      handler(value) {
        this.store.commit('setData', value);
      },
    },
  },

  created() {
    this.tableId = 'el-table_' + tableIdSeed++;
    this.debouncedUpdateLayout = debounce(50, () => this.doLayout());
  },

  mounted() {
    this.bindEvents();
    this.store.updateColumns();
    this.doLayout();

    //....

    this.$ready = true;
  },

  data() {
    const { hasChildren = 'hasChildren', children = 'children' } =
      this.treeProps;
    this.store = createStore(this, {
      rowKey: this.rowKey,
      defaultExpandAll: this.defaultExpandAll,
      selectOnIndeterminate: this.selectOnIndeterminate,
      // TreeTable 的相关配置
      indent: this.indent,
      lazy: this.lazy,
      lazyColumnIdentifier: hasChildren,
      childrenColumnName: children,
    });
    const layout = new TableLayout({
      store: this.store,
      table: this,
      fit: this.fit,
      showHeader: this.showHeader,
    });
    return {
      layout,
      isHidden: false,
      renderExpanded: null,
      resizeProxyVisible: false,
      resizeState: {
        width: null,
        height: null,
      },
      // 是否拥有多级表头
      isGroup: false,
      scrollPosition: 'left',
    };
  },
};
</script>
```

@tab table-store.js

```js
import Vue from 'vue';
import Watcher from './watcher';
import { arrayFind } from 'element-ui/src/utils/util';

Watcher.prototype.mutations = {
  setData(states, data) {
    const dataInstanceChanged = states._data !== data;
    states._data = data;

    this.execQuery();
    // 数据变化，更新部分数据。
    // 没有使用 computed，而是手动更新部分数据 https://github.com/vuejs/vue/issues/6660#issuecomment-331417140
    this.updateCurrentRowData();
    this.updateExpandRows();
    if (states.reserveSelection) {
      this.assertRowKey();
      this.updateSelectionByRowKey();
    } else {
      if (dataInstanceChanged) {
        this.clearSelection();
      } else {
        this.cleanSelection();
      }
    }
    this.updateAllSelected();

    this.updateTableScrollY();
  },

  insertColumn(states, column, index, parent) {
    let array = states._columns;
    if (parent) {
      array = parent.children;
      if (!array) array = parent.children = [];
    }

    if (typeof index !== 'undefined') {
      array.splice(index, 0, column);
    } else {
      array.push(column);
    }

    if (column.type === 'selection') {
      states.selectable = column.selectable;
      states.reserveSelection = column.reserveSelection;
    }

    if (this.table.$ready) {
      this.updateColumns(); // hack for dynamics insert column
      this.scheduleLayout();
    }
  },
  //   ...
};

Watcher.prototype.commit = function (name, ...args) {
  const mutations = this.mutations;
  if (mutations[name]) {
    mutations[name].apply(this, [this.states].concat(args));
  } else {
    throw new Error(`Action not found: ${name}`);
  }
};

Watcher.prototype.updateTableScrollY = function () {
  Vue.nextTick(this.table.updateScrollY);
};

export default Watcher;
```

@tab Watcher.js

```js
export default Vue.extend({
  data() {
    return {
      states: {
        // 3.0 版本后要求必须设置该属性
        rowKey: null,

        // 渲染的数据来源，是对 table 中的 data 过滤排序后的结果
        data: [],

        // 是否包含固定列
        isComplex: false,

        // 列
        _columns: [], // 不可响应的
        originColumns: [],
        columns: [],
        fixedColumns: [],
        rightFixedColumns: [],
        leafColumns: [],
        fixedLeafColumns: [],
        rightFixedLeafColumns: [],
        leafColumnsLength: 0,
        fixedLeafColumnsLength: 0,
        rightFixedLeafColumnsLength: 0,

        // 选择
        isAllSelected: false,
        selection: [],
        reserveSelection: false,
        selectOnIndeterminate: false,
        selectable: null,

        // 过滤
        filters: {}, // 不可响应的
        filteredData: null,

        // 排序
        sortingColumn: null,
        sortProp: null,
        sortOrder: null,

        hoverRow: null,
      },
    };
  },

  methods: {
    // 更新列
    updateColumns() {
      const states = this.states;
      // 在 insertColumn 添加的数据
      const _columns = states._columns || [];
      states.fixedColumns = _columns.filter(
        (column) => column.fixed === true || column.fixed === 'left'
      );
      states.rightFixedColumns = _columns.filter(
        (column) => column.fixed === 'right'
      );

      if (
        states.fixedColumns.length > 0 &&
        _columns[0] &&
        _columns[0].type === 'selection' &&
        !_columns[0].fixed
      ) {
        _columns[0].fixed = true;
        states.fixedColumns.unshift(_columns[0]);
      }

      const notFixedColumns = _columns.filter((column) => !column.fixed);
      states.originColumns = []
        .concat(states.fixedColumns)
        .concat(notFixedColumns)
        .concat(states.rightFixedColumns);

      const leafColumns = doFlattenColumns(notFixedColumns);
      const fixedLeafColumns = doFlattenColumns(states.fixedColumns);
      const rightFixedLeafColumns = doFlattenColumns(states.rightFixedColumns);

      states.leafColumnsLength = leafColumns.length;
      states.fixedLeafColumnsLength = fixedLeafColumns.length;
      states.rightFixedLeafColumnsLength = rightFixedLeafColumns.length;

      states.columns = []
        .concat(fixedLeafColumns)
        .concat(leafColumns)
        .concat(rightFixedLeafColumns);
      states.isComplex =
        states.fixedColumns.length > 0 || states.rightFixedColumns.length > 0;
    },
    //....
  },
});
```

:::

## 我们从源码中学习到了什么？

1. 当我们有多个组件需要共享数据时，正常来说，我们应该使用 `vuex`，那么如果不使用 vuex 我们直接编写一个 store 来帮助我们管理数据，应该怎么设计？

- 使用 `Vue.extend` 去创建一个子类构造函数，将实例化后，设置在其父组件实例上 `this.store`上。我们后续的操作都通过 `this.store` 去操作内部管理的数据

```js
// 我们在框架中编写的每一个组件实际上就是一个 VueComponent 的组件实例对象, 
// 我们可以通过 this.$root 拿到跟组件实例，他也是一个 VueComponent 对象，
// 当我们使用 Vue.extend 实例化生成的对象 也是一个 VueComponent
import Vue from 'vue';

const Store = Vue.extend({
  data() {
    return {
      msg: '你好，我叫 小张',
    };
  },
});

Store.prototype.changeName = function (msg) {
  this.msg = msg;
};

export function createStore() {
  return new Store();
}
```

2. `Vue.extend` 实例化生成的对象 和 ES6 关键字 `Class` 生成的对象有什么不一样？

    -  [Vue.extend](/learn-vue/w16ckh6m/)构造器生成的对象，会继承来着 Vue 实例的一些属性，生命周期等， 并且 拥有响应式属性 它的原型指向了 Vue, 
    -  ES6 `Class` 生成的对象，就是一个普通的Object 对象，他的原型指向的也是 `Object`，只能将其设置为 data 响应式数据源被vue递归劫持后才会拥有响应式



:::tip
本次示例中使用 的是 `element-ui@2.15.14`
:::