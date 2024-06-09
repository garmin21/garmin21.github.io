---
title: vue3 减少大型不可变数据的响应性开销
tags:
  - vue
createTime: 2024/03/31 20:46:37
permalink: /article/iezashvr/
author: 李嘉明
---

## 简介

**Vue 的响应性系统默认是深度的。虽然这让状态管理变得更直观，但在数据量巨大时，深度响应性也会导致不小的性能负担，** 因为每个属性访问都将触发代理的依赖追踪。好在这种性能负担通常这只有在处理超大型数组或层级很深的对象时，例如一次渲染需要访问 100,000+ 个属性时，才会变得比较明显。因此，它只会影响少数特定的场景。

Vue 确实也为此提供了一种解决方案，通过使用 `shallowRef()` 和 `shallowReactive()` 来绕开深度响应。浅层式 API 创建的状态只在其顶层是响应式的，对所有深层的对象不会做任何处理。这使得对深层级属性的访问变得更快，但代价是，我们现在必须将所有深层级对象视为不可变的，并且只能通过替换整个根状态来触发更新：

```tsx
import { defineComponent, shallowRef, shallowReactive, triggerRef } from 'vue'

const ShallowRef = defineComponent({
  setup() {
    const number = shallowRef(0)
    const person = shallowRef({ count: 0 })

    const jack = shallowReactive({
      name: 'jack',
      age: 18,
      nested: {
        bar: 2,
      },
    })

    return () => (
      <>
        <h1>减少大型不可变数据的响应性开销</h1>
        <p>{number.value}</p>
        <p>{person.value.count}</p>
        <p>
          {jack.age} + {jack.name} + {jack.nested.bar}
        </p>
        <button onClick={() => number.value++}>按钮</button>
        <button
          onClick={() => {
            person.value.count++
            {
              /* 方式一：引用覆盖 */
            }
            person.value = { count: person.value.count }
            {
              /* 方式二：强制触发依赖更新 */
            }
            triggerRef(person)
          }}
        >
          {' '}
          person 按钮
        </button>
        <button
          onClick={() => {
            jack.name = 'jack-111'
            jack.nested.bar = 20
          }}
        >
          jack按钮
        </button>
      </>
    )
  },
})

export default ShallowRef
```

## 总结

1. `shallowRef(0)` 如果是原始值和 ref 是一样的效果、
2. `shallowRef({ count: 0 })` 对象型类型，就是一个非响应式数据，只能通过覆盖 或者 `triggerRef(person)` 强制触发依赖更新
3. `shallowReactive({name: 'jack', age: 18, nested: { bar: 2, },})` 只会是第一层具有响应式处理，深层就没有了，但是可以通过，将其先 `jack.name = 'jack-111'` ，页面重新渲染会造成 `jack.nested.bar` 也会发生更新的操作

## 参考

- <a target="_blank" href="https://gitee.com/hhhh-ddd/jm-vue3-tsx/blob/garming21/src/page/shallowRef.tsx">https://gitee.com/hhhh-ddd/jm-vue3-tsx/blob/garming21/src/page/shallowRef.tsx</a>
