---
title: 8-05 Object
date: '2022-08-05'
categories:
    - javascript
tags:
    - javascript
publish: true
---

## 1. Object.getOwnPropertyDescriptors(Target.prototype);

获取一个对象的所有自身属性的描述符。(包括 get 和 set)

## 2. Object.defineProperty(obj, prop, descriptor)

属于 Object 构造函数的方法，用于向一个对象向中添加任意类型的数据，vue 通过此方法实现了数据的双向数据绑定,最后来看一下这个`双向数据绑定的实现`

-   语法：Object.defineProperty(obj, prop, descriptor)
    -   obj【Object】 ： 要在其上定义属性的对象。
    -   prop【string】： 要定义或修改的属性的名称。
    -   descriptor【Object】：将被定义或修改的属性描述符。
        -   configurable ： 是否可以将这个属性删除， 默认是 false
        -   writable : 是否可以被赋值运算符修改， 默认是 false
        -   enumerable ： 是否允许遍历，默认是 false
-   返回值: 被传递给函数的对象。obj

```html
<body>
    <input
        type="text"
        id="txt"
        onkeyup="change(event)"
        style="width: 100%;border: 1px solid black;"
    />
    <br />
    <p id="myp" style="width: 100%;border: 1px solid black;"></p>

    <script>
        let myInput = document.getElementById('txt')
        let myP = document.getElementById('myp')

        let obj = {} // 初始化默认对象
        let info = '鹅鹅鹅，曲项向天歌，白猫葫芦丝' // 初始化默认数据
        // 赋予内容
        myInput.value = info
        myP.textContent = info

        Object.defineProperty(obj, 'props', {
            set(newValue) {
                info = newValue
                myInput.value = newValue
                myP.textContent = newValue

                console.log(info)
            },
            get() {
                return info
            },
        })

        function change(e) {
            obj.props = myInput.value
        }

        let cont = 0
        setInterval(() => {
            obj.props = cont++
        }, 1000)
    </script>
</body>
```

## 3. hasOwnProperty()

Object 的 hasOwnProperty()方法返回一个布尔值，判断对象是否包含特定的自身（非继承）属性。判断自身属性是否存在

## 4. isProtypeOf()

isPrototypeOf()  方法用于测试一个对象是否存在于另一个对象的原型链上。

```js
let obj = { name: 'jkkkk' }
let obj1 = { name: 'jvvvvv' }

obj.isPrototypeOf(obj1) // false
//---------
function Foo() {}
function Bar() {}
Bar.prototype = Object.create(Foo.prototype)
```

## 5. Object.preventExtensions() 防止扩展

此方法可防止向现有对象添加新属性，preventExtensions()  是不可逆的操作，我们永远不能再向对象添加额外的属性。

```js
Object.isExtensible(myTesla) // true
Object.preventExtensions(myTesla)
Object.isExtensible(myTesla) // false
myTesla.color = 'blue'
console.log(myTesla.color) // undefined
```

## 6. Object.seal() 密封

它可以防止添加或删除属性，seal()  还可以防止修改属性描述符。

```js
Object.isSealed(myTesla) // false
Object.seal(myTesla)
Object.isSealed(myTesla) // true

myTesla.color = 'blue'
console.log(myTesla.color) // undefined

delete myTesla.batteryLife // false
console.log(myTesla.batteryLife) // 300

Object.defineProperty(myTesla, 'batteryLife') // TypeError: Cannot redefine property: batteryLife
```

## 7. Object.freeze() 冻结

它的作用与  Object.seal()  相同，而且它使属性不可写。

```js
Object.isFrozen(myTesla) // false
Object.freeze(myTesla)
Object.isFrozen(myTesla) // true

myTesla.color = 'blue'
console.log(myTesla.color) // undefined

delete myTesla.batteryLife
console.log(myTesla.batteryLife) // 300

Object.defineProperty(myTesla, 'batteryLife') // TypeError: Cannot redefine property: batteryLife

myTesla.batteryLife = 400
console.log(myTesla.batteryLife) // 300
```
