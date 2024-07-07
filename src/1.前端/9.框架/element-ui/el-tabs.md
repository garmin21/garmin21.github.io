---
title: 标签组件 el-tabs
author: 李嘉明
createTime: 2024/07/06 16:28:59
permalink: /article/ce7maaax/
tags:
  - element-ui
---

## el-tabs

el-tabs 的代码量也是非常之多，分别 由 `tabs.vue` `tab-nav.vue` `tab-pane.vue` `tab-bar.vue` 组成, 也并未使用到任何的库，


**几个需要知道的问题**

1. `tabs.vue` 是我们的主文件。其主要作用就是对子组件进行管理

```js
render(h) {
    let {
    type,
    handleTabClick,
    handleTabRemove,
    handleTabAdd,
    currentName,
    panes,
    editable,
    addable,
    tabPosition,
    stretch
    } = this;
    // 开启可编辑 或者 标签 是否可以添加  得到 新增 按钮
    const newButton = editable || addable
    ? (
        <span
        class="el-tabs__new-tab"
        on-click={ handleTabAdd }
        tabindex="0"
        on-keydown={ (ev) => { if (ev.keyCode === 13) { handleTabAdd(); }} }
        >
        <i class="el-icon-plus"></i>
        </span>
    )
    : null;

    const navData = {
    props: {
        currentName,
        onTabClick: handleTabClick,
        onTabRemove: handleTabRemove,
        editable,
        type,
        panes,
        stretch
    },
    ref: 'nav'
    };
    // 定义header 组件内容
    const header = (
    <div class={['el-tabs__header', `is-${tabPosition}`]}>
        {newButton}
        <tab-nav { ...navData }></tab-nav>
    </div>
    );
    // 定义 body 组件内容
    const panels = (
    <div class="el-tabs__content">
        {this.$slots.default}
    </div>
    );

    return (
    <div class={{
        'el-tabs': true,
        'el-tabs--card': type === 'card',
        [`el-tabs--${tabPosition}`]: true,
        'el-tabs--border-card': type === 'border-card'
    }}>
        { tabPosition !== 'bottom' ? [header, panels] : [panels, header] }
    </div>
    );
},

created() {
    if (!this.currentName) {
    this.setCurrentName('0');
    }
    // TODO 1. 监听 事件，由 tab-pane 抛出事件， 执行 calcPaneInstances 方法 过滤出  ElTabPane 组件。将其设置在 this.panes 上
    this.$on('tab-nav-update', this.calcPaneInstances.bind(null, true));
},

mounted() {
    this.calcPaneInstances();
},

updated() {
    this.calcPaneInstances();
}
```
