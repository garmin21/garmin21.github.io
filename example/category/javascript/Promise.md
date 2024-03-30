---
title: Promise
date: '2022-04-20'
categories:
  - javascript
tags:
  - javascript
publish: true
---

## 什么是 Promise

Promise 是异步编程的一种解决方案：
从语法上讲，promise 是一个对象，从它可以获取异步操作的消息；从本意上讲，它是承诺，承诺它过一段时间会给你一个结果。
promise 有三种状态：pending(等待态)，fulfiled(成功态)，rejected(失败态)；状态一旦改变，就不会再变。创造 promise 实例后，它会立即执行

## Promise 解决了什么问题

我们来看一张图片：

<img :src="$withBase('/6.webp')" width="100%" height="100%" alt="1" />

1. 回调地狱，代码难以维护， 常常第一个的函数的输出是第二个函数的输入这种现象
2. 代码的可读性的问题
3. 信任问题

## 认识 Promise API

> MDN: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise

### 认识 Promise 核心 then 方法

then() 方法返回一个 Promise 。它最多需要有两个参数：Promise 的成功和失败情况的回调函数 `p.then(onFulfilled[, onRejected]);`。

**then 返回值的特点**

1. 返回了一个值，那么 then 返回的 Promise 将会成为接受状态，并且将返回的值作为接受状态的回调函数的参数值。
2. 没有返回任何值，那么 then 返回的 Promise 将会成为接受状态，并且该接受状态的回调函数的参数值为 undefined。
3. 抛出一个错误，那么 then 返回的 Promise 将会成为拒绝状态，并且将抛出的错误作为拒绝状态的回调函数的参数值。
4. 返回一个已经是接受状态的 Promise，那么 下一个 Promise 的接受状态的回调函数的参数值是接受状态参数值。
5. 返回一个已经是拒绝状态的 Promise，那么 下一个 Promise 的拒绝状态的回调函数的参数值是接受拒绝参数值。
6. 返回一个未定状态（pending）的 Promise，那么 then 返回 Promise 的状态也是未定的

## 手写一个 JmPromise

### 1. 搞清楚 promise 构造器的特点

- Promise 构造器接收一个 函数，这个函数会立即执行， 并且这个函数接收 两个函数，一个成功的函数。一个失败的函数
- Promise 有三种状态
  - pending 待定
  - fulfilled 已兑现
  - rejected 已拒绝
- Promise 有自己的 value
- 发生错误 直接变成 rejected 状态

```ts
class JmPromise {
  public status: 'pending' | 'fulfilled' | 'rejected' = 'pending'
  public value: any

  constructor(func: (reslove: Function, reject: Function) => void) {
    func(this.reslove.bind(this), this.reject.bind(this))
  }

  public reslove(value: any) {
    if (this.status === 'pending') {
      this.status = 'fulfilled'
      this.value = value
    }
  }

  public reject(value: any) {
    if (this.status === 'pending') {
      this.status = 'rejected'
      this.value = value
    }
  }
}

const jmPromise = new JmPromise((reslove, reject) => {
  console.log('同步代码')
  reslove(123)
})

console.log('外部作用域代码’', jmPromise)
```

### 2. then 方法的实现

- then 的异步调用 看上一个 promise 的状态
  - 如果什么都没调， 什么都不执行
  - 如果调 reslove(111) , then 里面的成功回调会执行
  - 如果调 reject(111), then 里面的失败回调会执行
  - 如果抛出异常，那么会直接 then 里面的失败回调会执行
- 由于状态到改变是同步的立马就执行了，所以需要异步调去改变状态，在调用 reslove, reject 给其改变状态,所以 then 方法调回调函数，需要用到 一个存储 异步执行函数的地方
- try catch 在什么情况下无法捕获异常： https://zhuanlan.zhihu.com/p/347756673
- then 的链式调用
  - then 一定返回一个 promise
  - 下一个 then 方法看上一个 then 的状态
  - 如果没有手动的修改状态，那么他的状态还是成功,就会去调下一个 then 的成功回调
- 注意点 ⚠️
  - 注意 pending 需要返回一个 JmPromise 对象
  - 注意 pending 存储的两个回调方法，重写为新函数的一定要 写形参 ，不写，就无法将参数传递下去

```ts
// 完整的then 方法实现

interface AsyncCallback {
  [key: string]: Function
}

class JmPromise {
  public status: 'pending' | 'fulfilled' | 'rejected' = 'pending'
  public value: any
  public asyncCallback: AsyncCallback = {}

  constructor(func: (reslove: Function, reject: Function) => void) {
    const newReslove = this.reslove.bind(this)
    const newReject = this.reject.bind(this)
    try {
      // try 无法捕获到异常有哪些： https://zhuanlan.zhihu.com/p/347756673
      func(newReslove, newReject)
    } catch (error) {
      this.reject(error)
    }
  }

  public reslove(value: any) {
    if (this.status === 'pending') {
      this.status = 'fulfilled'
      this.value = value
      if (this.asyncCallback['resloveFunc']) {
        this.asyncCallback['resloveFunc'](this.value)
      }
    }
  }

  public reject(value: any) {
    if (this.status === 'pending') {
      this.status = 'rejected'
      this.value = value
      if (this.asyncCallback['rejectFunc']) {
        this.asyncCallback['rejectFunc'](this.value)
      }
    }
  }

  public then(resloveFunc: Function, rejectFunc: Function) {
    const value = this.value
    const status = this.status
    if (status === 'fulfilled') {
      return new JmPromise((reslove, reject) => {
        try {
          const result = resloveFunc(value)
          if (result instanceof JmPromise) {
            result.then(reslove, reject)
          } else {
            reslove(result)
          }
        } catch (error) {
          reject(error)
        }
      })
    }

    if (status === 'rejected') {
      return new JmPromise((reslove, reject) => {
        try {
          const result = rejectFunc(value)
          if (result instanceof JmPromise) {
            result.then(reslove, reject)
          } else {
            reslove(result)
          }
        } catch (error) {
          reject(error)
        }
      })
    }

    if (status === 'pending') {
      // 需要把异步回调填充到 asyncCallback 中
      return new JmPromise((reslove, reject) => {
        this.asyncCallback['resloveFunc'] = (value) => {
          try {
            const result = resloveFunc(value)
            if (result instanceof JmPromise) {
              result.then(reslove, reject)
            } else {
              reslove(result)
            }
          } catch (error) {
            reject(error)
          }
        }
        this.asyncCallback['rejectFunc'] = (value) => {
          try {
            const result = rejectFunc(value)
            if (result instanceof JmPromise) {
              result.then(reslove, reject)
            } else {
              reslove(result)
            }
          } catch (error) {
            reject(error)
          }
        }
      })
    }
  }
}

const jmPromise = new JmPromise((reslove, reject) => {
  setTimeout(() => {
    reject(122)
  }, 2000)
})

jmPromise
  .then(
    (value) => {
      console.log('成功', value)
    },
    (value) => {
      console.log('失败', value)
      return 9527
    }
  )
  .then(
    (value) => {
      console.log('成功2', value)
    },
    (value) => {
      console.log('失败2', value)
    }
  )
```

### 3. 优化 then 方法

抽离复用逻辑

```ts
document.body.innerHTML = '<h1>自定义promise</h1>'

interface AsyncCallback {
  [key: string]: Function
}

interface ReusingOption {
  func: Function
  value: any
  reslove: Function
  reject: Function
}

class JmPromise {
  public status: 'pending' | 'fulfilled' | 'rejected' = 'pending'
  public value: any
  public asyncCallback: AsyncCallback = {}

  constructor(func: (reslove: Function, reject: Function) => void) {
    const newReslove = this.reslove.bind(this)
    const newReject = this.reject.bind(this)
    try {
      // try 无法捕获到异常有哪些： https://zhuanlan.zhihu.com/p/347756673
      func(newReslove, newReject)
    } catch (error) {
      this.reject(error)
    }
  }

  public reslove(value: any) {
    if (this.status === 'pending') {
      this.status = 'fulfilled'
      this.value = value
      if (this.asyncCallback['resloveFunc']) {
        this.asyncCallback['resloveFunc'](this.value)
      }
    }
  }

  public reject(value: any) {
    if (this.status === 'pending') {
      this.status = 'rejected'
      this.value = value
      if (this.asyncCallback['rejectFunc']) {
        this.asyncCallback['rejectFunc'](this.value)
      }
    }
  }

  public then(resloveFunc: Function, rejectFunc: Function) {
    const value = this.value
    const status = this.status
    if (status === 'fulfilled') {
      return new JmPromise((reslove, reject) => {
        this.reusing({
          reslove,
          reject,
          value,
          func: resloveFunc,
        })
      })
    }

    if (status === 'rejected') {
      return new JmPromise((reslove, reject) => {
        this.reusing({
          reslove,
          reject,
          value,
          func: rejectFunc,
        })
      })
    }

    if (status === 'pending') {
      // 需要把异步回调填充到 asyncCallback 中
      return new JmPromise((reslove, reject) => {
        this.asyncCallback['resloveFunc'] = (value) => {
          this.reusing({
            reslove,
            reject,
            value,
            func: resloveFunc,
          })
        }
        this.asyncCallback['rejectFunc'] = (value) => {
          this.reusing({
            reslove,
            reject,
            value,
            func: rejectFunc,
          })
        }
      })
    }
  }

  // 抽离复用逻辑
  public reusing(options: ReusingOption) {
    try {
      const result = options.func(options.value)
      if (result instanceof JmPromise) {
        result.then(options.reslove, options.reject)
      } else {
        options.reslove(result)
      }
    } catch (error) {
      options.reject(error)
    }
  }
}

const jmPromise = new JmPromise((reslove, reject) => {
  reslove(123)
})

jmPromise
  .then(
    (value) => {
      console.log('成功', value)
      return '22222'
    },
    (value) => {
      console.log('失败', value)
      return 9527
    }
  )
  .then(
    (value) => {
      console.log('成功2', value)
    },
    (value) => {
      console.log('失败2', value)
    }
  )
```

### 4. catch 方法

1. catch 实际上是一个只有失败回调的 then 方法

```ts

public catch(rejectFunc: Function) {
    return this.then(undefined, rejectFunc)
}
```

### 5. finally 方法

1. finally 会在最后一定会调用，不管你是什么状态
2. finally 没有 value 值

```ts
public finally(onFinally: Function) {
    return new JmPromise((reslove, reject) => {
        if(this.status === 'pending') {
            this.asyncCallback['resloveFunc'] = () => {
                this.reusing({
                    reslove,
                    reject,
                    value: undefined,
                    func: onFinally
                })
            }

            this.asyncCallback['rejectFunc'] = () => {
                this.reusing({
                    reslove,
                    reject,
                    value: undefined,
                    func: onFinally
                })
            }
        } else {
            this.reusing({
                reslove,
                reject,
                value: undefined,
                func: onFinally
            })
        }
    })
}
```

## JmPromise 静态方法

### 1. 静态方法 all

1. 该 promise 对象在 iterable 参数对象里所有的 promise 对象都成功的时候才会触发成功
2. 一旦有任何一个 iterable 里面的 promise 对象失败则立即触发该 promise 对象的失败。
3. 这个新的 promise 对象在触发成功状态以后，会把一个包含 iterable 里所有 promise 返回值的数组作为成功回调的返回值，顺序跟 iterable 的顺序保持一致
4. 如果这个新的 promise 对象触发了失败状态，它会把 iterable 里第一个触发失败的 promise 对象的错误信息作为它的失败错误信息。

```ts
// 静态方法
public static all(promiseList: Array<JmPromise>) {
    const result = [];
    const promisesLength = promiseList.length;
    return new JmPromise((reslove, reject) => {
        if (!Array.isArray(promiseList)) {
            return reject(new TypeError('arguments must be an array'));
        }
        promiseList.forEach((promise, i) => {
            promise.then(
                (value) => {
                    result.push(value);
                    if(i + 1 === promisesLength) {
                        reslove(result)
                    }
                },(err) => {
                    reject(err)
                })
        })
    }).then(undefined, (err) => {
        console.error('Uncaught (in promise)' + err)
        return new JmPromise((reslove, reject) => reject(err))
    })
}
```

### 2. 静态方法 reslove, reject

```ts
public static reslove(value: any) { // 返回一个成功状态的 JmPromise
    return new JmPromise((reslove, reject) => reslove(value))
}

public static reject(value: any) { // 返回一个失败状态的 JmPromise
    return new JmPromise((reslove, reject) => reject(value))
}
```

### 3. 静态方法 allSettled

1. 该方法传入一个可迭代的 jmPromise 数组
2. 返回的是一个处理好的，包含原始 promises 每个 promise 的结果。

```ts
public static allSettled(promiseList: Array<JmPromise>) {
    const _state = [];
    return new JmPromise((reslove, reject) => {
        if (!Array.isArray(promiseList)) {
            return reject(new TypeError('arguments must be an array'));
        }
        promiseList.forEach((promise,i) => {
            promise.then(
            (value)=> {
                _state[i] = {
                    status: 'fulfilled',
                    value
                }
            },(value)=> {
                _state[i] = {
                    status: 'rejected',
                    reason: value
                }
            }).finally(() => {
                if(!--promiseList.length) {
                    // 一定是需要等待所有 jmPromise 都执行完，在去改变外面promise的状态
                    reslove(_state)
                }
            })
        })
    })
}
```

### 4. 静态方法 any

1. 传入一个可迭代的 jmPromise 数组
2. jmPromise 数组的状态有一个是成功的，那么就返回成功的那个回调
3. jmPromise 数组的状态没有一个是成功的，则抛出一个 AggregateError 错误，返回一个失败的 jmPromise

```ts
public static any(promiseList: Array<JmPromise>) {
    return new JmPromise((resolve, reject) => {
        if (!Array.isArray(promiseList)) {
            return reject(new TypeError('arguments must be an array'));
        }
        promiseList.forEach((promise) => {
            promise.then((value)=> {
                resolve(value)
            }, (value) => {
                reject(value)
            })
        })
    })
}
```

### 5. 静态方法 race

MDN: 静态方法接受一个 promise 可迭代对象作为输入，并返回一个 Promise。这个返回的 promise 会随着第一个 promise 的敲定而敲定。

1. 它返回的是一个迭代 jmPromise 数组中，第一个被解决或拒绝 的 jmPromise

```ts

// 返回第一次被成功或者拒绝的那个 Promise
public static race(promiseList: Array<JmPromise>) {
    return new JmPromise(((reslove, reject) => {
        if (!Array.isArray(promiseList)) {
            return reject(new TypeError('arguments must be an array'));
        }
        promiseList.forEach(promise => {
            promise.then((value) => reslove(value) ,(value) => reject(value))
        })
    }))
}

```

### 6. Promise.withResolvers()

MDN: Promise.withResolvers() 静态方法返回一个对象，其包含一个新的 Promise 对象和两个函数，用于解决或拒绝它，对应于传入给 Promise() 构造函数执行器的两个参数。

```js
const { promise, resolve, reject } = Promise.withResolvers()

console.log(promise) // pending

setTimeout(() => {
  resolve(1)
  console.log(promise) // fulfilled
}, 4000)

// Promise.withResolvers() 完全等同于以下代码：

let resolve, reject
const promise = new Promise((res, rej) => {
  resolve = res
  reject = rej
})
```

---

## bug

### JmPromise.all 由于异步的调用导致顺序不一致

```ts
const promise1 = new JmPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
})

const promise3 = new JmPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(3)
  }, 3000)
})

const promise2 = new JmPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(2)
  }, 2000)
})
JmPromise.all([promise1, promise3, promise2]).then((value) => {
  console.log(value)
  Array.isArray(value) && value.forEach((k) => console.log(k))
})
// 理应输出 1 3 2
```

### 原代码这里

```ts
public static all(promiseList: Array<JmPromise>) {
    const result = [];
    const promisesLength = promiseList.length;
    return new JmPromise((reslove, reject) => {
        if (!Array.isArray(promiseList)) {
            return reject(new TypeError('arguments must be an array'));
        }
        promiseList.forEach((promise, i) => {
            promise.then(
                (value) => {
                  // 使用push 是同步执行，也就是说如果三个异步执行的代码 分别要 1秒 3秒 2秒 ，也就会按照 1秒 2秒 3秒 的情况返回
                  // 我们想要的是我给你什么顺序，你就给什么顺序
                    result.push(value);
                    if(i + 1 === promisesLength) {
                        reslove(result)
                    }
                },(err) => {
                    reject(err)
                })
        })
    }).then(undefined, (err) => {
        console.error('Uncaught (in promise)' + err)
        return new JmPromise((reslove, reject) => reject(err))
    })
}

```

### 修改 bug

```ts
 // 静态方法
public static all(promiseList: Array<JmPromise>) {
    const result = [];
    const promisesLength = promiseList.length;
    let count = 0;
    return new JmPromise((reslove, reject) => {
        if (!Array.isArray(promiseList)) {
            return reject(new TypeError('arguments must be an array'));
        }
        promiseList.forEach((promise, i) => { // i 已经就确定的 0 2 1 的顺序，因为已经是定义好了
            promise.then(
                (value) => {
                    count++;
                    // 使用下标解决：[promise1, promise3, promise2].forEach(xx, index) => result[index] = value
                    result[i] = value;
                    // result[0] = 1
                    // result[2] = 2
                    // result[1] = 3
                    if(count === promisesLength) {
                        reslove(result)
                    }
                },reject)
        })
    })
}

```
