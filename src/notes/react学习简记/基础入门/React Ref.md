---
title: React Ref
createTime: 2024/03/31 20:46:37
permalink: /learn-react/refs/
author: 李嘉明
---

## 1. 简介

**什么是 Ref?**

Ref 就是 允许用户直接访问 DOM 节点或 React 元素。

## 2. 案例

```tsx
export default function MyRefs() {
    const btnRef = useRef<HTMLButtonElement | null>(null)

    function handleClick() {
        console.log(btnRef, '>>>>>>')
    }

    return (
        <>
            <button ref={btnRef} onClick={handleClick}>
                按钮
            </button>
        </>
    )
}
```

## 3. React.createRef 和 React.useRef 的区别

1. **createRef 和 useRef 都可以在函数组件中可以使用， 但是推荐 在函数组件中使用 useRef**

2. **createRef 每次渲染都会返回一个新的引用，而 useRef 每次都会返回相同的引用**

```tsx
function IRefs() {
    const [val, setVal] = useState(1)
    const uRef = useRef<number>()
    const cRef = createRef<number>()
    if (!uRef.current) {
        console.log('useRef 创建了')
        uRef.current = val
    }
    if (!cRef.current) {
        console.log('createRef 创建了')
        // @ts-ignore
        cRef.current = val
    }
    return (
        <div>
            <button
                onClick={() => {
                    setVal(val + 1)
                }}
            >
                +1
            </button>
            <p>val: {val}</p>
            <p>useRef: {uRef.current}</p>
            <p>createRef: {cRef.current}</p>
        </div>
    )
}
```

这里可以得到，每次组件重新渲染，都会打印`console.log('createRef 创建了')`,createRef 每次组件重新渲染都会得到到不同的引用、 useRef 始终绑定是一个相同的引用。

## 4. Refs 转发 `forwardRef`

当前使用函数式组件向下传递时，React 会抛出报错信息，警告你初始化渲染时，ref 不是正常的值，所以需要使用`forwardRef` 来专门为函数组件转发 ref.

```tsx
export default function MyRefs() {
    const myRef = useRef<HTMLButtonElement | null>(null)
    return (
        <>
            <ChildRef ref={myRef}>link me!</ChildRef>
        </>
    )
}

const ChildRef = forwardRef((props: any, ref: any) => {
    return (
        <>
            <button ref={ref}>{props.children}</button>
        </>
    )
})
```

## 5. `useImperativeHandle` 暴露私有属性和方法

**useImperativeHandle 可以用来暴露一些，私有的属性和方法，类似于 vue3 的 defineExpose**

```tsx
const ChildRef = forwardRef((props: any, ref: any) => {
    useImperativeHandle(ref, () => {
        return {
            func: () => {
                console.log('向外暴露的方法')
            },
        }
    })
    return (
        <>
            <button ref={ref}>{props.children}</button>
        </>
    )
})
```

## 6. 总结

1. Ref 就是 允许用户直接访问 DOM 节点或 React 元素。
2. createRef 和 useRef 都可以在函数组件中可以使用， 但是推荐 在函数组件中使用 useRef
3. createRef 每次渲染都会返回一个新的引用，而 useRef 每次都会返回相同的引用
4. useImperativeHandle 可以用来暴露一些，私有的属性和方法，类似于 vue3 的 defineExpose

## 参考

-   <a target="_blank" href="https://react.docschina.org/docs/forwarding-refs.html">https://react.docschina.org/docs/forwarding-refs.html</a>

-   <a target="_blank" href="https://juejin.cn/post/7076228504576065544">https://juejin.cn/post/7076228504576065544</a>

-   <a target="_blank" href="https://juejin.cn/post/7036776658258362399#heading-2">https://juejin.cn/post/7036776658258362399#heading-2</a>

-   <a target="_blank" href="https://gitee.com/hhhh-ddd/jm-framework/blob/master/%E4%BD%8E%E4%BB%A3%E7%A0%81/my-react-formily/src/views/refs.tsx">https://gitee.com/hhhh-ddd/jm-framework/blob/master/%E4%BD%8E%E4%BB%A3%E7%A0%81/my-react-formily/src/views/refs.tsx</a>
