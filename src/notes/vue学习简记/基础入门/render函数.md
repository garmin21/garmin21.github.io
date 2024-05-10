---
title: render函数
author: 李嘉明
createTime: 2024/05/02 00:23:30
permalink: /learn-vue/3gen9bza/
---

:::tip
在日常使用 vue2 开发的过程中，我们大多是使用文档推崇的模版语法的方式进行界面 HTML 结构的编写
但其实在 vue 文档中还介绍了另外一个编写 HTML 的方式：render 函数（渲染函数）
由于 render 函数更接近 vue 的渲染器底层，所以它具备更好的灵活性，
同时也由于贴近底层，导致写出的代码具备可读性较差，维护难度大的特点。
:::

## render 详解

在 vue 中 render 的优先级最高，如果有 render 的情况下，就不走 模版编译阶段.

render 中 我们的 h 函数 全称为 `createNodeDescription`返回的是一个虚拟节点, 所包含的信息会告诉 Vue 页面上需要渲染什么样的节点，包括及其子节点的描述信息。我们把这样的节点描述为“虚拟节点 (virtual node)”，也常简写它为“VNode”。“虚拟 DOM”是我们对由 Vue 组件树建立起来的整个 VNode 树的称呼。

## h 函数有三个参数

::: tip
参数一:

要渲染的类型 可以是 `{String | Object | Function }`

必填

- a 当我们传入的时 string vue 就会使用该参数作为 `vnode`的标签名 tagName, 如果你传入的是一个非 HTML5 标准的标签名， 那 就会去 vue 实例上去寻找是否有该名称的全局组件，如果有则使用该组件的内容创建 vnode
- b 当传入的是 Object 类型时，h 函数 就会使用该 object 作为子组件的配置，会创建一个子组件 `vnode`
- c 当我们传入的是一个 async 函数类型时， h 函数会调用该 async 函数，并以它 resolve 返回的内容，按照 a b 两种情况，进行 vnode 创建，

:::
::: tip
参数二:

是 一个与模板中 attribute 对应的数据对象

可选

也可以是参数三，接收 `{String | Array}`， 不传 `Object` 的情况下, 会将其当作 参数三来处理
:::

::: tip
参数三:

渲染子节点 的类型 `{String | Array}`

子级虚拟节点 (VNodes)，由 h 函数 构建而成， 也可以使用字符串来生成“文本虚拟节点”。

可选。

1. 当我们传入是一个 String 类型时，h 会把它当成文本节点进行处理，文本节点也是 vnode 的一种
2. 当我们传入是一个 Array 类型时，h 会把它当成多个子 vnode 进行处理，在挂载时，作为 dom 的 children 进行渲染
:::

## 使用

在学习之前我们将学习一下的目录

```html
<script>
  new Vue({
    data: {
      message: 'Hello Vue!',
    },
    render(h) {
      return h('section', [
        h('h1', 'vue render 函数学习'),
        // 全局组件
        h('my-component'),
        // 异步组件
        h(domeAsync),
        // props
        h(propsCom, { props: { list: ['jack', 'andy', 'mom'] } }),
        // attrs
        h(arrtsCom),
        // 指令
        h(directivesCom),
        // 事件
        h(eventCom, {
          on: {
            handleClick: (val) => {
              alert(val)
            },
          },
        }),
        // 原生事件
        h(nativeCom),
        // 插槽
        h(
          slotCom,
          {
            scopedSlots: {
              names: function (props) {
                return h(
                  'span',
                  props.list.map((name) => h('span', `, ${name}`))
                )
              },
            },
          },
          [h('div', '12345'), h('div', { slot: 'test' }, ['54321', '12345'])]
        ),
        // 无状态组件
        h(functionalCom, { props: { message: '无状态组件' } }),
      ])
    },
  }).$mount('#app')
</script>
```

## 全局组件

```js
// 全局组件
Vue.component('my-component', {
  render(h) {
    return h('h2', '这是一全局组件')
  },
})
```

## 异步组件

```js
// 异步组件
function domeAsync() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data() {
          return {
            message: '异步组件',
          }
        },
        render(h) {
          return h('h2', '这是一个自定义的' + this.message)
        },
      })
    }, 3000)
  })
}
```

## props

```js
// props
const propsCom = {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  render(h) {
    return h('div', [
      h('h2', 'props 传递演示'),
      h(
        'ul',
        this.list.map((name) => h('li', name))
      ),
    ])
  },
}
```

## attrs

```js
const arrtsCom = {
  data() {
    return {
      message: '局部组件',
    }
  },
  render(h) {
    setTimeout(() => {
      this.message = '======> 局部组件-- 依赖改变'
    }, 3000)

    return h('h2', [
      '属性设置演示',
      h('div', {
        class: 'title', // 设置class, 支持 string object array
        style: 'color: #f90;', // 设置行内样式 支持 string object array
        id: 'dome', // 设置id
        'data-name': '我是自定义属性',
        // ⚠， 设置就会覆盖内容
        // domProps: {
        //   innerHTML: `<p>${
        //     '这种方式无法根据diff算法去高效更新，每次都会重新渲染新的dom' +
        //     this.message
        //   }</p>`,
        // },
        // 设置 key
        key: 'uuid',
        // 设置ref
        ref: 'uuidRef',
        // 绑定事件
        on: {
          click: () => {
            event.stopPropagation()
            // 打印refs 对象
            console.log(this.$refs['uuidRef'].className, 'pppp')
          },
        },
      }),
    ])
  },
}
```

## 自定义指令

```js
// 自定义指令
const directivesCom = {
  // 定义局部指令
  directives: {
    demo: {
      bind: function (el, binding, vnode) {
        var s = JSON.stringify
        el.innerHTML =
          'name: ' +
          s(binding.name) +
          '<br>' +
          'value: ' +
          s(binding.value) +
          '<br>' +
          'expression: ' +
          s(binding.expression) +
          '<br>' +
          'argument: ' +
          s(binding.arg) +
          '<br>' +
          'modifiers: ' +
          s(binding.modifiers) +
          '<br>' +
          'vnode keys: ' +
          Object.keys(vnode).join(', ')
      },
    },
  },
  render(h) {
    return h('h2', [
      '自定义指令演示',
      h('p', {
        directives: [
          {
            name: 'demo',
            value: '2',
            expression: '1 + 1',
            arg: 'foo',
            modifiers: {
              bar: true,
            },
          },
        ],
      }),
    ])
  },
}
```

## 事件

```js
// vue自定义事件 内部事件
const eventCom = {
  data() {
    return {
      message: '🆗',
    }
  },
  render(h) {
    return h('h2', [
      '内部事件演示',
      h(
        'p',
        {
          on: {
            click: () => {
              alert(this.message)
            },
          },
        },
        '===========>'
      ),
      h(
        'button',
        {
          on: {
            click: () => {
              this.$emit('handleClick', 123)
            },
          },
        },
        '按钮'
      ),
    ])
  },
}
```

## 原生事件

```js
// 原生事件
const nativeCom = {
  methods: {
    clickHandler(event) {
      alert(1)
    },
  },
  render(h) {
    return h('h2', [
      '演示原生事件',
      h('p', '=============>'),
      h(
        {
          render(h) {
            return h('button', '按钮')
          },
        },
        {
          nativeOn: {
            click: this.clickHandler,
          },
        }
      ),
      h('input', {
        value: '按键修饰符',
        on: {
          keyup: (event) => {
            event.stopPropagation()
            if (event.keyCode === 13) {
              alert('回车')
            }
          },
        },
      }),
    ])
  },
}
```

## 插槽

```js
const slotCom = {
  render(h) {
    return h('div', [
      h('h2', '演示 组件的默认插槽与具名插槽与作用域插槽'),
      h('p', '================>'),
      '插槽内容:',
      this.$slots.default,
      'test插槽内容:',
      this.$slots.test,
      '作用域插槽内容:',
      this.$scopedSlots.names({
        list: ['苹果', '香蕉', '葡萄'],
      }),
    ])
  },
}
```

## 无状态组件

```js
// 无状态组件
const functionalCom = {
  functional: true,
  render(h, context) {
    let slots = context.slots()
    // props：提供所有 prop 的对象
    // children：VNode 子节点的数组
    // slots：一个函数，返回了包含所有插槽的对象
    // scopedSlots：(2.6.0+) 一个暴露传入的作用域插槽的对象。也以函数形式暴露普通插槽。
    // data：传递给组件的整个数据对象，作为 createElement 的第二个参数传入组件
    // parent：对父组件的引用
    // listeners：(2.3.0+) 一个包含了所有父组件为当前组件注册的事件监听器的对象。这是 data.on 的一个别名。
    // injections：(2.3.0+) 如果使用了 inject 选项，则该对象包含了应当被注入的 property。

    return h('div', [
      h('h2', '无状态组件无this, 有 context'),
      h('div', 'message:' + context.props.message),
      context.children,
      slots.default,
      slots.test,
    ])
  },
}
```


还有更多案例...
