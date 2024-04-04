---
title: React中代码分割
createTime: 2024/03/31 20:46:37
permalink: /learn-react/code-division/
author: 李嘉明
---

代码分割的好处，就是在需要的时候，才去加载资源，假如页面初始化 就加载 100 个页面脚本，应用就会白屏

## `Suspense` + `Lazy`

**`Lazy` 必须和 `Suspense`元件配合使用，否则当路由无法匹配到，就会跳转到`ErrorPage`页面**

```tsx
const Lazy = React.lazy(() => import('@/views/lazy'))

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'lazy',
                element: (
                    <Suspense fallback={<>loading...</>}>
                        <Lazy />
                    </Suspense>
                ),
            },
        ],
    },
])
```

## 懒加载兜底处理

假设，标签切换 的每一个 card 都是一个懒加载的组件，当我们切换标签时，加载进来的组件此时还没有 准备好渲染其内容，此时，react 的内部将组件的渲染暂停，导致 error 页，另一种设置 `Suspense` 兜底，但是会有页面闪烁效果，我们可以通过`startTransition` 来改善一点用户体验

1. startTransition 的作用就是，标记加载组件不为紧急更新，而是标记为需要一些时间准备，react 则会保留和旧的 UI 进行交互，这样的场景切换至下一页时候，还能看到旧的页面

```tsx
function About() {
    const [tab, setTab] = useState('1')

    function onChange(tab: string) {
        console.log(tab)

        startTransition(() => {
            setTab(tab)
        })
    }

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Tab 1`,
            children: <Card1 />,
        },
        {
            key: '2',
            label: `Tab 2`,
            children: <Card2 />,
        },
    ]

    return (
        <>
            <div>
                <Suspense fallback={'loading....'}>
                    <Tabs
                        defaultActiveKey="1"
                        items={items}
                        onChange={onChange}
                    />
                </Suspense>
            </div>
        </>
    )
}
```
