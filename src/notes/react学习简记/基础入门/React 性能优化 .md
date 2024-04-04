---
title: React 性能优化 useMemo + React.memo
createTime: 2024/03/31 20:46:37
permalink: /learn-react/performance/
author: 李嘉明
---

## 1. useMemo 到底是做什么的，工作原理是什么。

简而言之，useMemo 是用来缓存计算属性的。它缓存的是函数的返回值，`useMemo` 可以优化当前组件也可以优化子组件，优化当前组件主要是通过 返回值 来将一些复杂的计算逻辑进行缓存 (**Tips: 类似于 vue 的计算属性，当依赖发生改变后重新计算**)

## 2. useMemo 在什么情况下使用

### 1. 优化计算量庞大

#### 反例：

```tsx
const Com = () => {
    const [params1, setParams1] = useState(0)
    const [params2, setParams2] = useState(0)

    const handleFun1 = () => {
        setParams1((val) => val + 1)
    }

    //这种被称为计算属性，不需要手动调用，在渲染阶段就会执行的。
    const computedFun2 = () => {
        // TODO: 每次都会重新计算，如果这是的计算量非常大怎么办？
        console.log('我又执行计算了')
        return params2
    }

    return (
        <div onClick={handleFun1}>
            每次重新渲染的时候我就会执行 computed:{computedFun2()}
        </div>
    )
}
```

#### 正例：

```tsx
const Com = () => {
    const [params1, setParams1] = useState(0)
    const [params2, setParams2] = useState(0)

    const handleFun1 = () => {
        setParams1((val) => val + 1)
    }

    //这种被称为计算属性，不需要手动调用，在渲染阶段就会执行的。
    const computedFun2 = useMemo(() => {
        console.log(
            '被 useMemo 保护后，只有依赖发生改变才会执行，否则只有初始化第一次被执行'
        )
        return params2
    }, [])

    return (
        <div onClick={handleFun1}>
            每次重新渲染的时候我就会执行 computed:{computedFun2}
        </div>
    )
}
```

### 2. 优化 父组件发生渲染，势必也会让子组件重新渲染

#### 反例：

```tsx
const Parent = () => {
    const [parentState, setParentState] = useState(0) //父组件的state
    const [params2, setParams2] = useState(0)

    return (
        <>
            <Button onClick={() => setParentState((val) => val + 1)}>
                点击我改变父组件中与Child组件无关的state
                {parentState}
            </Button>

            <Child list={params2}></Child>
        </>
    )
}
```

#### 正例：

```tsx
const Parent = () => {
    const [parentState, setParentState] = useState(0) //父组件的state
    const [params2, setParams2] = useState(0)

    return (
        <>
            <Button onClick={() => setParentState((val) => val + 1)}>
                点击我改变父组件中与Child组件无关的state
                {parentState}
            </Button>
            {useMemo(() => {
                return <Child list={params2}></Child>
            }, [params2])}
        </>
    )
}
```

### 3. 使用 React.memo 优化子组件渲染

1. React.memo 是采用浅比较的方式，校验 Props 中的数据的内存地址是否改变来决定组件是否重新渲染组件的一种技术。

2. React.memo 的原理是 缓存 组件，它会对传入的组件加上缓存功能生成一个新组件，然后返回这个新组件。在传给组件的 props 的属性和值没有发生改变的情况下，它会使用最近一次缓存的结果，而不会进行重新的渲染，实现跳过组件渲染的效果。

3. React.memo 是一个高阶组件，第一个参数是`缓存组件` 第二个参数是，自定义比较的方式，默认采用的是`Object.is` 只比较第一层，你可以使用第二个参数，更细粒度的比较，从而决定组件是否更新

```ts
const Parent = () => {
    const [parentState, setParentState] = useState(0) //父组件的state
    const [params2, setParams2] = useState(0)

    return (
        <>
            <Button onClick={() => setParentState((val) => val + 1)}>
                点击我改变父组件中与Child组件无关的state
                {parentState}
            </Button>
            <Child list={params2}></Child>
        </>
    )
}

const Child = memo(
    (props: { list: number }) => {
        console.log('我被打印了就说明子组件重新构建了')
        return <>{props.list}</>
    },
    (prevProps, nextProps) => {
        console.log(prevProps, nextProps, 'prevProps, nextProps')
        if (prevProps === nextProps) {
            return false
        }
        return true
    }
)
```

## 3. 源码分析

```ts
function mountMemo<T>(
    nextCreate: () => T,
    deps: Array<mixed> | void | null
): T {
    const hook = mountWorkInProgressHook()
    const nextDeps = deps === undefined ? null : deps
    const nextValue = nextCreate()
    hook.memoizedState = [nextValue, nextDeps]
    return nextValue
}

function updateMemo<T>(
    nextCreate: () => T,
    deps: Array<mixed> | void | null
): T {
    const hook = updateWorkInProgressHook()
    const nextDeps = deps === undefined ? null : deps
    const prevState = hook.memoizedState
    if (prevState !== null) {
        if (nextDeps !== null) {
            const prevDeps: Array<mixed> | null = prevState[1]
            // 依赖没发生变化，返回旧值
            if (areHookInputsEqual(nextDeps, prevDeps)) {
                return prevState[0]
            }
        }
    }
    // 依赖发生变化，重新计算
    const nextValue = nextCreate()
    hook.memoizedState = [nextValue, nextDeps]
    return nextValue
}
```

## 4. useMemo 是不是用的越多越好 ?

**不是！！！**

**缓存是需要成本的**

缓存并不是免费的，所有被 useMemo 保护的函数都会被加入 useMemo 的工作队列。
在组件进行渲染并且此组件内使用了 useMemo 之后，为了校验改组件内被 useMemo 保护的这个计算属性是否需要重新计算，它会先去 useMemo 的工作队列中找到这个函数，然后还需要去校验这个函数都依赖是否被更改。
这其中,寻找到需要校验的计算属性和进行校验这两个步骤都需要成本。
当我们大量的使用 useMemo 之后，非但不能给项目带来性能上的优化，反而会为项目增加负担，我们将这种情况戏称为：反向优化。

## 5. 总结

1. useMemo 是用来缓存计算属性的，它会在发现依赖未发生改变的情况下返回旧的计算属性值的地址。
2. useMemo 绝不是用的越多越好，缓存这项技术本身也需要成本。
3. useMemo 的使用场景之一是:只需要给拥有巨大计算量的计算属性缓存即可。
4. useMemo 的另一个使用场景是，当某一个子组件的更新是依赖某一个 state 时，可以操控子组件的更新时机

## 参考

-   <a target="_blank" href="https://juejin.cn/post/7108278900085489671#heading-6">https://juejin.cn/post/7108278900085489671#heading-6</a>

-   <a target="_blank" href="https://gitee.com/hhhh-ddd/jm-framework/blob/master/%E4%BD%8E%E4%BB%A3%E7%A0%81/my-react-formily/src/views/useMemo.tsx">https://gitee.com/hhhh-ddd/jm-framework/blob/master/%E4%BD%8E%E4%BB%A3%E7%A0%81/my-react-formily/src/views/useMemo.tsx</a>
