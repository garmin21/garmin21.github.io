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

### 1. `tabs` 是我们的主文件。其主要作用就是对子组件进行管理

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

### 2. `tab-nav` 是我们的导航组件，其作用就是为了生成导航所用的组件

根据 type 是否有值 使用对应的卡片组件，默认值 没有 ，可选值 为 `card/border-card`

- 取反 type 为 true，返回 `tab-bar.vue`组件，**tab-bar 组件 就是默认 tab 下的 颜色条块** 否则返回 null
- 使用 `this._l` 根据 有几个 panes 生成 几个 Vnode, 对应上导航内容

```js
render(h) {
    const {
        type,
        panes,
        editable,
        stretch,
        onTabClick,
        onTabRemove,
        navStyle,
        scrollable,
        scrollNext,
        scrollPrev,
        changeTab,
        setFocus,
        removeFocus
    } = this;
    // scrollable 当卡片过多，内容放不下时，就会出现左右两个前进后退的按钮
    const scrollBtn = scrollable
    ? [
        <span class={['el-tabs__nav-prev', scrollable.prev ? '' : 'is-disabled']} on-click={scrollPrev}><i class="el-icon-arrow-left"></i></span>,
        <span class={['el-tabs__nav-next', scrollable.next ? '' : 'is-disabled']} on-click={scrollNext}><i class="el-icon-arrow-right"></i></span>
    ] : null;
    // this._l 是 Vue.js 内部在模板编译过程中使用的一个辅助函数，用于生成列表渲染的 VNode（虚拟节点）。
    // 根据 有几个 panes 生成 几个 Vnode
    const tabs = this._l(panes, (pane, index) => {
        let tabName = pane.name || pane.index || index;
        const closable = pane.isClosable || editable;

        pane.index = `${index}`;

        const btnClose = closable
            ? <span class="el-icon-close" on-click={(ev) => { onTabRemove(pane, ev); }}></span>
            : null;

        const tabLabelContent = pane.$slots.label || pane.label;
        const tabindex = pane.active ? 0 : -1;
        return (
            <div
            class={{
                'el-tabs__item': true,
                [`is-${ this.rootTabs.tabPosition }`]: true,
                'is-active': pane.active,
                'is-disabled': pane.disabled,
                'is-closable': closable,
                'is-focus': this.isFocus
            }}
            id={`tab-${tabName}`}
            key={`tab-${tabName}`}
            aria-controls={`pane-${tabName}`}
            role="tab"
            aria-selected={ pane.active }
            ref="tabs"
            tabindex={tabindex}
            refInFor
            on-focus={ ()=> { setFocus(); }}
            on-blur ={ ()=> { removeFocus(); }}
            on-click={(ev) => { removeFocus(); onTabClick(pane, tabName, ev); }}
            on-keydown={(ev) => { if (closable && (ev.keyCode === 46 || ev.keyCode === 8)) { onTabRemove(pane, ev);} }}
            >
            {tabLabelContent}
            {btnClose}
            </div>
        );
    });
    return (
    <div class={['el-tabs__nav-wrap', scrollable ? 'is-scrollable' : '', `is-${ this.rootTabs.tabPosition }`]}>
        {scrollBtn}
        <div class={['el-tabs__nav-scroll']} ref="navScroll">
            <div
                class={['el-tabs__nav', `is-${ this.rootTabs.tabPosition }`, stretch && ['top', 'bottom'].indexOf(this.rootTabs.tabPosition) !== -1 ? 'is-stretch' : '']}
                ref="nav"
                style={navStyle}
                role="tablist"
                on-keydown={ changeTab }
            >
                {!type ? <tab-bar tabs={panes}></tab-bar> : null}
                {tabs}
            </div>
        </div>
    </div>
    );
}
```

### 3. `tab-pane` 也就是我们对应的内容组件，有几个 pane 就会有几个 tab

我们 知道 tab-nav 需要根据 panes 去生成对应的内容，那么这个 panes 列表数据又时如何收集的呢？

- 首先在 tabs 组件中就已经注册 好了 `this.$on('tab-nav-update', this.calcPaneInstances.bind(null, true))` 事件。
- 而在 tab-pane 中 则会在 `updated` 钩子 向父组件抛出 `this.$parent.$emit('tab-nav-update');` 事件。父组件执行事情所绑定的方法，生成 panes

## 使用方式

```html
<el-tabs v-model="activeName" @tab-click="handleClick">
  <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
  <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
  <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
  <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
</el-tabs>
```



:::tip
本次示例中使用 的是 `element-ui@2.15.14`
:::