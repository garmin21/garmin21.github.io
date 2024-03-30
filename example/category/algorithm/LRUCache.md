---
title: LRU缓存机制算法
date: '2023-03-20'
categories:
  - 算法
tags:
  - 算法
publish: true
---

```js
// 第一步代码
class LRUCache {
  constructor(n) {
    this.size = n // 初始化最大缓存数据条数n
    this.data = new Map() // 初始化缓存空间map
  }

  put(domain, info) {
    // 最新添加的也会放至在栈顶
    if (this.data.has(domain)) {
      this.data.delete(domain) // 移除数据
      this.data.set(domain, info) // 在末尾重新插入数据
      return
    }
    if (this.data.size >= this.size) {
      // 一但超出内存大小，就删除一定等量的栈底数据
      // 删除最不常用数据
      // 不必当心data为空，因为this.size 一般不会取0，满足this.data.size >= this.size时，this.data自然也不为空。
      const firstKey = this.data.keys().next().value
      this.data.delete(firstKey)
    }
    this.data.set(domain, info) // 写入数据
  }

  get(domain) {
    // 就是说，频繁读取的数据，会被持续性的放至到最栈顶
    if (!this.data.has(domain)) {
      return -1
    }
    const info = this.data.get(domain) //获取结果
    this.data.delete(domain) // 移除数据
    this.data.set(domain, info) // 重新添加该数据
    return info
  }
}

const cache = new LRUCache(5)

cache.put('jack', '数据1')
cache.put('odd2', '数据2')
cache.put('odd3', '数据3')
cache.put('odd4', '数据4')
cache.put('odd5', '数据5')

// ⚠️ Map 的数据格式 size 是从 0开始
// cache.put({name: 'odd6'}, '数据6')
// cache.put({name: 'odd7'}, '数据7')

// console.log(cache.get('odd2'))

console.log(cache.data, 'data')
```
