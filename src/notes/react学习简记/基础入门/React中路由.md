---
title: React路由
createTime: 2024/03/31 20:46:37
permalink: /learn-react/router/
author: 李嘉明
---

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.8.2"
}

```

# React 中路由的使用 1

## 1. 基本使用

```tsx
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createBrowserRouter, Link } from 'react-router-dom'

import Formily from '@/playground/details'
import About from '@/views/about'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <h1>Hello World</h1>
        <Link to="about">About</Link>
        <br />
        <Link to="details">details</Link>
      </div>
    ),
  },
  {
    path: 'about',
    element: <About />,
  },
  {
    path: 'details',
    element: <Formily />,
  },
])

export default router

// 导出后，在根组件注册即可.

import { RouterProvider } from 'react-router-dom'
import router from './routers'

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}>
        <h1>路由</h1>
      </RouterProvider>
    </div>
  )
}

export default App
```

## 2. 嵌套路由

```tsx
import { createBrowserRouter, Link, Outlet } from 'react-router-dom'
import About from '@/views/about'
import ErrorPage from './error-page'

export function Root() {
  return (
    <>
      <div id="sidebar">
        <nav>
          <ul>
            <li>
              <Link to={`contacts/1`}>Your Name</Link>
            </li>
            <li>
              <Link to={`formily`}>Your Name</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'contacts/:contactId',
        element: <About />,
      },
    ],
  },
])

export default router
```

## 3. 动态路由 + 路由参数获取

1. `useParams`hook 获取 params
2. `useMatch` hook 解析一段 url 片段

```tsx
const params = useParams()
params.projectId // abc
params.taskId // 3

// ============>
const match = useMatch('/projects/:projectId/tasks/:taskId')

match.params.projectId // abc
match.params.taskId // 3
```

```tsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'contacts/:contactId', // 动态路由
        element: <About />,
      },
    ],
  },
])
```

## 4. 加载器函数`loader` 和 `action` 操作

### loader

每个路由都可以定义一个“加载器”函数，在呈现之前向路由元素提供数据。

```tsx
import {
  createBrowserRouter,
  useLoaderData,
  Link,
  Outlet,
} from 'react-router-dom'
import Formily from '@/playground/details'
import About from '@/views/about'
import ErrorPage from './error-page'
import data from '@/json/index.json'

export function Root() {
  const data = useLoaderData()
  console.log(data, '获取loader数据,可以是本地，也可以是接口返回')
  return (
    <>
      <div id="detail">
        <Outlet />
      </div>
    </>
  )
}

function loaderData() {
  return data
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: loaderData,
    children: [
      {
        path: 'contacts/:contactId',
        element: <About />,
        loader: ({ params }) => {
          console.log(
            { params },
            'loader 中也可以拿到 params, 必须要有返回值，否则警告报错'
          )

          return params
        },
      },
      {
        path: 'formily',
        element: <Formily />,
      },
    ],
  },
])

export default router
```

### action

**此功能仅在使用数据路由器时有效，如 createBrowserRouter**

当你在当前路由中发送非 get 方式的其他['post','delete','put','patch'] 就会调用此操作

暂时还没有尝试

```tsx
<Route
  path="/song/:songId/edit"
  element={<EditSong />}
  action={async ({ params, request }) => {
    let formData = await request.formData()
    return fakeUpdateSong(params.songId, formData)
  }}
  loader={({ params }) => {
    return fakeGetSong(params.songId)
  }}
/>
```

## 参考文章

- https://reactrouter.com/en/main



# React 中路由的使用 2

## 1. 路由重定项

### 1. 使用 `Navigate` 组件进行重定向

```tsx
const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        loader: loaderData,
        children: [
            {
                index: true, // <-- match on parent, i.e. "/"
                element: <Navigate to="/preview" replace />, // <-- redirect
            },
            {
                path: 'contacts/:contactId',
                element: <About />,
                loader: ({ params }) => {
                    console.log({ params }, '{ params }====>')

                    return params
                },
                action: actionData,
            },

            {
                path: 'preview',
                element: <Preview />,
            },
        ],
    },
    {
        path: '/formily',
        element: <Formily />,
    },
])
```

### 2. 在 `loader` + `redirect` 中进行初始化跳转

```tsx
<Route
    path="dashboard"
    loader={async () => {
        const user = await fake.getUser()
        if (!user) {
            // if you know you can't render the route, you can
            // throw a redirect to stop executing code here,
            // sending the user to a new route
            throw redirect('/login')
        }

        // otherwise continue
        const stats = await fake.getDashboardStats()
        return { user, stats }
    }}
/>
```

### 3. 使用 useNavigate 编程式导航

```tsx
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export function Root() {
    const navigate = useNavigate()
    // TODO: 必须在dom已经加载完毕后进行重定向
    useEffect(() => {
        navigate('preview', {
            replace: true,
        })
    }, [])

    return <></>
}
```

## 2. 获取导航信息

可以用来给导航到当前页面加 loading 的效果

```tsx
import { useNavigation } from 'react-router-dom'

function SomeComponent() {
    const navigation = useNavigation()
    navigation.state // idle ==> loading ==> idle, 如果是Form 表单提交 为 submitting
    navigation.location // location 对象
    navigation.formData // formData 对象
    navigation.formAction // 表单的 action 地址
    navigation.formMethod // 表单的 method 请求方式
}
```

## 3. Suspense + Await + defer + useAsyncValue

设想一个场景，其中一个路由的加载程序需要检索一些数据，而这些数据由于某种原因非常慢。
假设您正在向用户显示要送到他们家中的包裹的位置

```tsx
import  { Suspense } from 'react'
import {
    defer, // loader 返回的数据，用 defer 包裹一层
    useLoaderData,
    Await,
    useAsyncValue,
} from 'react-router-dom'
function Maps() {
    const comments = useAsyncValue() as Array<{ label: string; value: string }>
    return (
        <>
            <ul>
                {comments.map(({ label, value }) => (
                    <li key={value.toString()}>
                        <p>
                            {label} | {value}
                        </p>
                    </li>
                ))}
            </ul>
        </>
    )
}

function About() {
    const { data } = useLoaderData() as { data: Array<any> }
    return (
        <>
                <Suspense fallback={<p>在等待一点</p>}>
                    <Await resolve={data}>
                        <Maps />
                    </Await>
                </Suspense>
            </ThemeContext.Provider>
        </>
    )
}
```

## 4. Form 表单行为的跳转路由

```tsx
function About() {
    function handleSubmit() {
        // 先触发这里，，
        // 如果当前路由有 action ，action 触发
        console.log('ok')
    }
    return (
        <>
            <Form action="/contacts/5" onSubmit={handleSubmit} method={'post'}>
                <label>
                    Project title
                    <input type="text" name="title" />
                </label>

                <label>
                    Target Finish Date
                    <input type="date" name="due" />
                </label>

                <button>提交</button>
            </Form>
        </>
    )
}
```

## 参考文章

-   https://reactrouter.com/en/main





# React 中路由的使用 3

## 1. Optimistic UI

不是很理解，这个东西

1. `useFetcher` API 配套使用

```tsx
function ToggleCompleteButton() {
    const fetcher = useFetcher()

    return (
        <fetcher.Form method="post" action="/toggle-complete">
            <fieldset disabled={fetcher.state !== 'idle'}></fieldset>
        </fetcher.Form>
    )
}
```

## 2. `errorElement` + `useRouteError`

当路由发生错误时，可以使用 errorElement 呈现错误的页面，`useRouteError` 中可以得到错误的信息

```tsx
function ErrorBoundary() {
    const error = useRouteError() as { data: string }
    console.error(error)
    return <div>{error.data}</div>
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorBoundary />,
    },
])
```

## 3. `<ScrollRestoration />` 页面滚动行为控制

不是很清楚，这个怎么用

## 4. Web Standard APIs

router `loader` 和 `action` 采用的 request 是采用的 web 标准 api `Fetch `也可以返回 Response 对象。取消使用 `new AbortController()` 完成取消，搜索参数使用 `URLSearchParams` 处理

## 参考文章

-   <a target="_blank" href="https://reactrouter.com/en/main"> https://reactrouter.com/en/main</a>
-   <a target="_blank" href="https://ithelp.ithome.com.tw/articles/10308492"> https://ithelp.ithome.com.tw/articles/10308492</a>
-   <a target="_blank" href="https://zhuanlan.zhihu.com/p/431389907"> https://zhuanlan.zhihu.com/p/431389907</a>
