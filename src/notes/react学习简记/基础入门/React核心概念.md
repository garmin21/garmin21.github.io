---
title: React核心概念
createTime: 2024/03/31 20:46:37
permalink: /learn-react/core/
author: 李嘉明
---

## jsx 是一个 JavaScript 的语法扩展

<img :src="$withBase('/20.png')" width="100%" height="100%" />

## 元素渲染

想要将一个 React 元素渲染到根 DOM 节点中，只需把它们一起传入 `ReactDOM.render()`

## 函数组件和 props

这里我不说 class 组件，因为 class 组件逐渐没人用了

**组件名称必须以大写字母开头。React 会将以小写字母开头的组件视为原生 DOM 标签**

```tsx
function Welcome() {
    return <h1>Hello</h1>
}

ReactDOM.render(<Welcome />, document.getElementById('root'))
```

**Props**

1. props 是只读的，组件无论是使用函数声明还是通过 class 声明，都决不能修改自身的 props

```tsx
function Avatar(props: { user: { avatarUrl: string; name: string } }) {
    return (
        <img
            className="Avatar"
            src={props.user.avatarUrl}
            alt={props.user.name}
        />
    )
}
```

## state 和 生命周期 hook

state 允许 React 组件随用户操作、网络响应或者其他变化而动态更改输出内容。

1. `useState` hook 声明 state 使用，相当于 vue3 的 ref API

```tsx
const [count, setCount] = useState(0)
```

2. `useEffect` 相当于 componentDidMount(挂载)、componentDidUpdate(更新) 和 componentWillUnmount(卸载) 的组合体。

**默认情况下，useEffect 会在第一次渲染之后和每次更新之后执行，每次运行 useEffect 时，DOM 已经更新完毕。**

**为了控制 useEffect 的执行时机与次数，可以使用第二个可选参数施加控制。**

---

```tsx
// mounted + updated

useEffect(function () {
    console.log('======>')
})
```

```tsx
// watch 监听依赖执行
useEffect(
    function () {
        console.log('deps 值发生变化后会再次执行')
    },
    [deps]
)
```

**传递一个空数组（[]）作为第二个参数，这个 Effect 将永远不会重复执行，因此可以达到 componentDidMount 的效果。**

**useEffect 可以返回一个函数，该函数将在组件被卸载时的执行，可以等效于 componentWillUnmount。**

```tsx
function Tick(props: { date: Date }) {
    const [date, setDate] = useState(props.date)
    let [timeId, setTimeId] = useState<number | undefined | NodeJS.Timer>()

    useEffect(() => {
        // mounted: 在这里可以拿到真实DOM
        const id = setInterval(() => {
            setDate(new Date())
            setTimeId(id)
        }, 1000)

        return function () {
            // unmount
            clearInterval(timeId)
        }
    }, [])

    return (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {date.toLocaleTimeString()}.</h2>
        </div>
    )
}
```

## 事件处理

React 搞了一套自己的事件类型，所以你没办法使用 TypeScript 内置提供的 MouseEvent 等等。在需要定义事件类型的时候，需要从 React 中导入：

```tsx
import React from 'react'
function Tick() {
    const handle = (event: React.MouseEvent) => {
        console.log('处理事件====>', event)
    }

    return (
        <div>
            <button onClick={handle}>按钮处理事件</button>
        </div>
    )
}
```

React 提供的事件类型有：

AnimationEvent,
ChangeEvent,
ClipboardEvent,
CompositionEvent,
DragEvent,
FocusEvent,
FormEvent,
KeyboardEvent,
MouseEvent,
PointerEvent,
TouchEvent,
TransitionEvent,
WheelEvent。

还有一个 SyntheticEvent，用于其他所有的事件

## 条件渲染

React 中的条件渲染和 JavaScript 中的一样，使用 JavaScript 运算符 if 或者条件运算符去创建元素来表现当前的状态，然后让 React 根据它们来更新 UI。

```tsx
function Children(props: { show: boolean }) {
    if (props.show) {
        return <h1>显示</h1>
    }
    return <h1>隐藏</h1>
}
```

**阻止组件渲染:**

你可以显示的 `return null` 来不进行任何渲染。

在组件的 返回 null 并不会影响组件的生命周期

## 列表渲染

key 必须是唯一的字符串

```tsx
function Maps() {
    return (
        <>
            <ul>
                {[1, 2, 3, 4, 5].map((item) => (
                    <li key={item.toString()}>{item}</li>
                ))}
            </ul>
        </>
    )
}
```

## 受控组件和非受控组件

-   受控组件: **能被代码控制**表示可以显示控制元素的数据，比如`input, textarea ...` 他们的 value 都是可写的
-   非受控组件: **不能被代码控制**指动作无法控制，浏览器的默认行为产生，数据也是无法控制的元素，比如 `<input type='file' />`

```tsx
function Controlled() {
    const [desc, setDesc] = useState('')

    function handelChange(event: React.ChangeEvent<HTMLInputElement>) {
        setDesc(event.target.value)
    }

    return (
        <>
            <h2>受控组件</h2>
            <input value={desc} onChange={handelChange} />
            <p>{desc}</p>
        </>
    )
}

function NoControlled() {
    function handelChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log(event.target.files, 'files')
    }
    return (
        <>
            <h2>非受控组件</h2>
            <input type="file" onChange={handelChange} />
        </>
    )
}
```

## react 中实现 slot 的效果

```tsx
function DefaultSlot(props: { children: React.ReactNode }) {
    return (
        <>
            <h1>嵌入代码</h1>
            {props.children}
        </>
    )
}
```
