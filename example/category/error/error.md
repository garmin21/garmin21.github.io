---
title: 3-20 报错
date: '2023-03-20'
categories:
    - Error
tags:
    - Error
publish: true
---

1. `prettier.config.js is treated as an ES module file as it is a .js file whose nearest parent package.json contains "type": "module" which declares all .js files in that package scope as ES modules.`

因为你的项目被创建为 ES module。你可以看下 package.json，里面应该有 `type: module` 的项目。于是 .js 被默认为使用了 ES module 规范，如果自动生成的配置文件使用了 CommonJS，就会出错。.cjs 的 js 会告诉 node.js 它使用了 CommonJS 规范，所以就不会出错

2. `vue3 拿不到 instance 暴露的方法`

当我使用 call 将 this 绑定 外部的脚本，通过，`instance.setupState` 在开发环境可以拿到暴露的方法，在生产环境拿不到了

解决：exposed 可以拿到

```ts
console.log(this)
const { exposed } = <any>this
if (!exposed) return
const selectValue = exposed.getSelectionData()
```

3.  解决 eslint 报错 双引号问题

解决：在根目录下的 .eslintrc.js 文件加个配置：

```js
'prettier/prettier': [
    'warn',
     {
        singleQuote: true
     }
 ]
```

---

4.  找不到模块“xxx”或其相应的类型声明

解决：在 tsconfig 中 新增

```ts
{
    "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
    "paths": { // 路径映射，相对于baseUrl
        "@": ["src"],
        "@/*": ["src/*"]
    }
}
```

---

5. `Error: ESLint configuration in .eslintrc.cjs is invalid: - Unexpected top-level property "prettier/prettier".`

解决：在.eslintrc.js 中配置

```js
"rules": {
    "prettier/prettier": [
        "off",
        {
            "singleQuote": true,
            "parser": "flow"
        }
    ]
}
```

---

6. `Vue组件命名报错 “Component name “XXX“ should always be multi-word”`

解决：在.eslintrc.js 中配置

```js
"rules": {
    "vue/multi-word-component-names":"off", // 关闭组件命名规则
}
```

---

7. `Runtime directive used on component with non-element root node. The directives will not function as intended. `

意思是对于运行时指令，不能放在非元素上，比如自定义组件

解决：

```vue
<div v-show="xxxx">
    <svg-icon></svg-icon>
</div>
```

---

8. `Component inside <Transition> renders non-element root node that cannot be animated.`

＜ Transition ＞中的组件渲染无法 设置动画的非元素根节点。

意思就是说，如果 Transition 包裹的元素设置了动画，就必须加上一层根节点

解决：

```html
<Transition name="fade">
    <div>
        <el-dialog
            draggable
            :model-value="show"
            width="750px"
            :show-close="false"
            :close-on-click-modal="false"
            :before-close="handleClose"
            class="login-dialog-box"
        >
        </el-dialog>
    </div>
</Transition>
```

---

9.  `vuedraggable Cannot read properties of undefined (reading 'header')`

vue3.0 使用低版本的 vuedraggable 所以需要安装高版本的包

`pnpm i vue-draggable-next`

---
