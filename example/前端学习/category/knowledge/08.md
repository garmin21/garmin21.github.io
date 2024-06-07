---
title: 12-03 co 源码阅读
date: '2022-12-03'
categories:
    - 案例研究
tags:
    - 案例研究
publish: true
---

1. https://github.com/tj/co/blob/master/index.js
2. https://juejin.cn/post/6844904088220467213#heading-11
3. https://es6.ruanyifeng.com/#docs/generator-async
4. https://es6.ruanyifeng.com/#docs/async
5. https://juejin.cn/post/6844903695335817229
6. https://www.yuque.com/ruochuan12/fnfzu7/getutc

### 简单使用

```js
co(function* () {
    var result = yield Promise.resolve(true)
    return result
})
```

源码执行步骤:

```js
function co(gen) {
    var ctx = this
    // 获取除了第一位参数是this 以外的全部参数，返回数组的表示形式
    var args = slice.call(arguments, 1)

    return new Promise(function (resolve, reject) {
        // gen = gen.apply(ctx, args); 执行下生成器，返回一个生成器实例
        if (typeof gen === 'function') gen = gen.apply(ctx, args)
        // 防止修改next 函数
        if (!gen || typeof gen.next !== 'function') return resolve(gen)

        onFulfilled()

        function onFulfilled(res) {
            var ret
            try {
                // {value: '生成器函数返回的值', done: 'next 执行下一步的条件'}
                ret = gen.next(res)
            } catch (e) {
                return reject(e)
            }
            next(ret)
            return null
        }

        function next(ret) {
            if (ret.done) return resolve(ret.value)
            var value = toPromise.call(ctx, ret.value)
            if (value && isPromise(value))
                return value.then(onFulfilled, onRejected)
            return onRejected(
                new TypeError(
                    'You may only yield a function, promise, generator, array, or object, ' +
                        'but the following object was passed: "' +
                        String(ret.value) +
                        '"'
                )
            )
        }
    })
}
```

1. co 函数，首先拿到 this ,以及除第一位是 this 以外的剩余参数
2. 返回一个 promise 内部判断 gen 是否是一个函数， 是一个函数，返回一个生成器实例

```js
var gen = function* () {}

gen() // 这就是返回了一个生成器实例
```

3. 判断防止修改 next 函数
4. 执行 onFulfilled 函数, 如果是一个 promise 对象就 reslove 返回值，内部执行 next 函数， 在 next 中将其包装为一个 promise , 并且通过 then 方法改变 promise 的状态，拿到 `yield Promise.resolve(true);` 的结果，返回的是一个 对象
5. 再次执行 next 函数，把返回的对象传入, 内部判断此时 done 已经是 true ,表示最后一个了，执行 reslove 改变 promise 状态，返回其 value 值

### co.wrap

```js
var fn = co.wrap(function* (val) {
    return yield Promise.resolve(val)
})
console.log(fn)
/**
 * 
 * ƒ createPromise() {
        return co.call(this, fn.apply(this, arguments));
    }
    *
    */

fn(true).then(function (val) {})
```

提供的这个函数只是简单的返回了一个 执行 co 函数

源码执行步骤：

```js
co.wrap = function (fn) {
    // 往函数对象上添加了一个 生成器函数
    createPromise.__generatorFunction__ = fn
    // 返回包装 co 函数
    return createPromise
    function createPromise() {
        //   这里的执行接 co 函数的执行，最后返回一个 promise 对象，可以通过 then 方法拿到值
        return co.call(this, fn.apply(this, arguments))
    }
}
```

### co 源码里面针对了几种类型的数据，将其转化为 promise 对象

```js
co(function* () {
    var result = yield () => 1
    return result
}).then((res) => {
    console.log(res, '成功返回的值')
})
```

拿一个源码的看，这里只是将 Promise.reslove 改为了一个普通函数

源码执行过程:

1. 前面的执行都是一样的，跳过前面的几步
2. `toPromise` 函数执行，内部判断，现在 `yield value` 是一个函数，`toPromise` 执行完毕,返回 next 函数

```js
function toPromise(obj) {
    if (!obj) return obj
    if (isPromise(obj)) return obj
    if (isGeneratorFunction(obj) || isGenerator(obj)) return co.call(this, obj)
    //  执行 thunkToPromise, 返回是一个promise 对象
    if ('function' == typeof obj) return thunkToPromise.call(this, obj)
    if (Array.isArray(obj)) return arrayToPromise.call(this, obj)
    if (isObject(obj)) return objectToPromise.call(this, obj)
    return obj
}
```

```js
function thunkToPromise(fn) {
    var ctx = this
    //   返回的promise 对象
    return new Promise(function (resolve, reject) {
        fn.call(ctx, function (err, res) {
            if (err) return reject(err)
            if (arguments.length > 2) res = slice.call(arguments, 1)
            resolve(res)
        })
    })
}
```

3. 返回一个 promise 对象后，执行 then 改变当前 co 里面 promise 对象的状态，
4. 内部执行 onFulfilled ，内部执行 gen.next 返回处理好的值 `{value: xxx, done: xxx}`
5. 最后再次跳用 next(ret), 将值 reslove 出去，返回
