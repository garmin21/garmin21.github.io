---
title: React Hook
createTime: 2024/03/31 20:46:37
permalink: /learn-react/hooks/
author: 李嘉明
---

# useReducer

还记得，第一次接触 react16.8 之前的版本，我们使用 `react-redux` 并配合一些中间件，来对一些大型项目进行状态管理,现在 我们普遍使用函数组件来构建我们的项目，React 提供了两种 Hook 来为函数组件提供状态支持，一种是我们常用的 `useState`,另一种就是 `useReducer`, 其实从代码底层来看 `useState` 实际上执行的也是一个 `useReducer`,这意味着 `useReducer` 是更原生的，你能在任何使用 `useState` 的地方都替换成使用 `useReducer`.

**useReducer 从字面上理解就是 借鉴 redux reducer 的一个 hook，Reducer 是一个函数(state, action) => newState：它接收两个参数，分别是当前应用的 state 和触发的动作 action，它经过计算后返回一个新的 state**

## 怎么使用？

useReducer 接受两个参数：

1. 第一个是 reducer 函数
2. 第二个参数是初始化的 state

返回的是个数组，

1. 数组第一项是当前最新的 state，
2. 第二项是 dispatch 函数,它主要是用来 dispatch 不同的 Action，从而触发 reducer 计算得到对应的 state.

```ts
const [state, dispatch] = useReducer(reducer, initState)
```

## 案例解析

```tsx
import { useReducer } from 'react'
import { Button } from 'antd'

// 定义操作
enum Action {
    ADD_TODO_LIST = 'ADD_TODO_LIST',
    DELETE_TODO_LIST = 'DELETE_TODO_LIST',
    UPDATE_TODO_LIST = 'UPDATE_TODO_LIST',
}

export interface IAction {
    type: Action
    payload: number
}

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// 定义 reducer 纯函数
function reducer(state: number, action: IAction) {
    const { type, payload } = action

    switch (type) {
        case Action.ADD_TODO_LIST:
            return payload
        case Action.DELETE_TODO_LIST:
            return payload - 1
        case Action.UPDATE_TODO_LIST:
            return payload
        default:
            return state
    }
}

export default function Card1() {
    const [state, dispatch] = useReducer(reducer, 0)

    const handleAdd = () => {
        dispatch({ type: Action.ADD_TODO_LIST, payload: state + 1 })
    }

    const handleDelete = () => {
        dispatch({ type: Action.DELETE_TODO_LIST, payload: state })
    }

    const handleUpdate = () => {
        dispatch({
            type: Action.UPDATE_TODO_LIST,
            payload: getRandomInt(0, 99),
        })
    }

    return (
        <>
            <h1>当前的数字为: {state}</h1>
            <Button type="primary" onClick={handleAdd}>
                加一
            </Button>

            <Button type="primary" onClick={handleDelete}>
                减一
            </Button>

            <Button type="primary" onClick={handleUpdate}>
                随机更新一个纯数字
            </Button>
        </>
    )
}
```

## 总结

1. useReducer 类似于 react-redux 的 reducer, 用于根据不同的 action, 对 state 计算，返回当前最新的 state
2. useReducer 接收两个参数，参数一是 `reducer 函数对state 处理`，参数二是 `initState`

## 参考

-   <a target="_blank" href="https://juejin.cn/post/7171001583239921672#comment">https://juejin.cn/post/7171001583239921672#comment</a>


# useContext

## 简介

`useContext`顾名思义，它是以 Hook 的方式使用 React Context。

Context 设计目的是为了共享那些对于一个组件树而言是**全局**的数据,它提供了一种在组件之间共享值的方式，而不用显式地通过组件树逐层的传递 props。(tips: **类型于 vue 的 `provide` `inject`**)

useContext:接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值,当前的 context 值由上层组件中距离当前组件最近的`<MyContext.Provider>`的 value prop 决定的

## 案例分析

```tsx
import React, { useContext, useState, useMemo } from 'react'

const themes = {
    light: {
        foreground: '#000000',
        background: '#eeeeee',
    },
    dark: {
        foreground: '#ffffff',
        background: '#222222',
    },
}

// 创建一个 context 上下文
const ThemeContext = React.createContext(themes.light)

export default function MyUseContext() {
    const [theme, setTheme] = useState(themes.dark)

    const handleClick = () => {
        console.log(theme.background)
        if (theme.foreground === '#000000') {
            setTheme(themes.dark)
        } else {
            setTheme(themes.light)
        }
    }

    return (
        <>
            <ThemeContext.Provider value={theme}>
                {useMemo(() => {
                    return <ThemedButton onClick={handleClick} />
                }, [theme])}
            </ThemeContext.Provider>
        </>
    )
}

function ThemedButton(props: { onClick: () => void }) {
    // 返回当前 context 当前值
    const theme = useContext(ThemeContext)

    return (
        <button
            onClick={props.onClick}
            style={{ background: theme.background, color: theme.foreground }}
        >
            I am styled by theme context!
        </button>
    )
}
```

## 总结

1. useContext 可以用来共享全局的状态数据，它提供了一种在组件之间共享值的方式，而不用显式地通过组件树逐层的传递 props
2. useContext 接收一个 context 值就是 `React.createContext` 返回的值

## 参考

-   <a target="_blank" href="https://juejin.cn/post/7171001583239921672#heading-3">https://juejin.cn/post/7171001583239921672#heading-3</a>

-   <a target="_blank" href="https://gitee.com/hhhh-ddd/jm-framework/blob/master/%E4%BD%8E%E4%BB%A3%E7%A0%81/my-react-formily/src/views/useContext.tsx">https://gitee.com/hhhh-ddd/jm-framework/blob/master/%E4%BD%8E%E4%BB%A3%E7%A0%81/my-react-formily/src/views/useContext.tsx</a>
