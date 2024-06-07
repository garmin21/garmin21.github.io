---
title: Typescript 操作符
date: '2023-03-17'
categories:
    - Typescript
tags:
    - Typescript
publish: true
---

## 键值获取 keyof

keyof 可以获取一个类型所有键值，返回一个联合类型，如下：

```ts
type Person = {
    name: string
    age: number
}

type p = keyof Person // 得到联合类型 'name' | 'age'
```

keyof 的典型用法就是访问对象的 key 合法化，因为 any 做索引是不被接受的

```ts
function getValue(p: Person, k: keyof Person) {
    return p[k] // 如果k不如此定义，则无法以p[k]的代码格式通过编译
}
```

## 实例类型获取 typeof

typeof 是获取一个对象/实例的类型，如下：

```ts
// vue3中获取组件ref 实例类型
const mailRef = ref<InstanceType<typeof CommonForm> | null>(null)

// 普通例子
const me: Person = { name: 'gzx', age: 16 }
type P = typeof me // { name: string, age: number | undefined }
const you: typeof me = { name: 'mabaoguo', age: 69 } // 可以通过编译
```

## 遍历属性 in

in 只能用在类型的定义中，可以对枚举类型进行遍历

```ts
// 这个类型可以将任何类型的键值转化成number类型
type TypeToNumber<T> = {
    [key in keyof T]: number
}
```

keyof 返回泛型 T 的所有键枚举类型，key 是自定义的任何变量名，中间用 in 链接，外围用[]包裹起来(这个是固定搭配)，冒号右侧 number 将所有的 key 定义为 number 类型。

于是可以这样使用了：

```ts
interface Person {
    name: string
    age: number
}

const obj: TypeToNumber<Person> = { name: 10, age: 10 }
```
