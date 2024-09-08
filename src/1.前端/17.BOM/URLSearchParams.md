---
title: URLSearchParams
author: 李嘉明
createTime: 2024/09/08 14:30:31
permalink: /article/kjbamvv6/
---

在实际开发中，这个界面跳转到另一个界面是很常见的需求，只要涉及到跳转，就是涉及到两个界面之前的参数传递，这个时候一般都会拼接一些查询参数，然后另一个界面解析这个查询参数，拿到相应的值，进行对应的处理

为了简化这一过程，js 提供了`URLSearchParams` URLSearchParams 是一个用于`解析`和`生成`URL 查询参数的实用工具

## URLSearchParams

> URLSearchParams 接口定义了一些实用的方法来处理 URL 的查询字符串。

<https://i-blog.csdnimg.cn/direct/fe5dbfbce4b44055895a8ec8dd48171e.png>

### 1.1 URLSearchParams 的构造函数

> URLSearchParams() `构造函数`创建并返回一个新的 `URLSearchParams 对象`。

```js
new URLSearchParams();
new URLSearchParams(options);
```

**参数**

- `options`：`可选`，可以是以前情况之一
  - 一个`字符串`，会按 application/x-www-form-urlencoded 的格式进行解析。开头的 ‘?’ 字符会被忽略
  - 一系列基于字面量的字符串键值对，或者任何对象
  - 一个由字符串键和字符串值组成的键值对对象。请注意，不支持嵌套

**返回值**

- 一个 `URLSearchParams 实例`。

**示例**

```js
// 通过 url.search 检索参数，传递到构造函数
const url = new URL('https://example.com?foo=1&bar=2');
console.log('url', url);
const params1 = new URLSearchParams(url.search);

// 直接从 URL 对象获取 URLSearchParams 对象
const params1a = url.searchParams;
console.log(params1a);
// 传入字符串
const params2 = new URLSearchParams('foo=1&bar=2');
const params2a = new URLSearchParams('?foo=1&bar=2');
console.log('params2a', params2a);

// 传入一系列键值对
const params3 = new URLSearchParams([
  ['foo', '1'],
  ['bar', '2'],
]);
console.log('params3', params3);

// 传入记录
const params4 = new URLSearchParams({ foo: '1', bar: '2' });
console.log('params4', params4);
```

<https://i-blog.csdnimg.cn/direct/a97496fb922e4d48890a17462d61e7bc.png>

> 一般最常见的就是以下情况

1.  传入 `?`号，开头的查询参数；如：`?foo=1&bar=2`
2.  传入 `不带问号`的 查询参数；如：`foo=1&bar=2`
3.  传入一个对象；这个一般是为了跳转到其他界面，参数过多的时候，不方便自己拼接

### 1.2 append() 方法

> URLSearchParams 接口的 append() 方法将指定的键/值对附加为新的查询参数。

**语法**

```js
append(name, value);
```

**参数**

- `name`：要添加参数的键名
- `value`：要添加参数的值

**返回值**

- 无

**示例**

```js
let params = new URLSearchParams('?foo=1&bar=2');

params.append('foo', 4);
params.append('foo', 4);
params.append('foo', 4);
console.log(params.toString()); // foo=1&bar=2&foo=4&foo=4&foo=4
```

> 注意：`相同的键名`追加多次，`不会覆盖`  
> 控制台输出结果如下

<https://i-blog.csdnimg.cn/direct/7e102defde63411f9bb80c97241c3724.png>

### 1.3 delete() 方法

> URLSearchParams 接口的 delete() 方法从所有查询参数的列表中`删除指定的参数及其关联值`。

**语法**

```js
delete name;
delete (name, value);
```

**参数**

- `name`：要删除的键名称
- `value`：要删除的键值，`可选`

**示例**

```js
let params = new URLSearchParams('?foo=1&bar=2&name=ddg');

params.append('foo', 4);
params.append('foo', 4);
params.append('foo', 4);
console.log(params.toString());

console.log('删除 bar 前', params.toString());
params.delete('bar');
console.log('删除 bar 后', params.toString());

console.log('删除 foo 前', params.toString());
params.delete('foo');
console.log('删除 foo 后', params.toString());
```

<https://i-blog.csdnimg.cn/direct/6ea6f7f2d09349b2b9ba16b983bd5b1d.png>

1.  如若指定了删除的`键名称`，这个键名称存在`一个`，那么只会`删除这一个`
2.  如若指定了删除的`键名称`，这个键名称存在`多个`，那么这`多个都会删除`
3.  如若指定了删除的`键名称`、`键的值`，那么只会`删除 键名称、键值一样的`，如若这俩一样还存在多个，那么这多个都会删除，`只要这俩一样都会删除`

```js
let params = new URLSearchParams('?foo=1&bar=2&name=ddg');

params.append('foo', 4);
params.append('foo', 4);
params.append('foo', 4);
console.log(params.toString());

console.log('删除 bar 前', params.toString());
params.delete('bar');
console.log('删除 bar 后', params.toString());

// console.log('删除 foo 前', params.toString());
// params.delete("foo");
// console.log('删除 foo 后', params.toString());
console.log('删除 foo = 1 前', params.toString());
params.delete('foo', '1');
console.log('删除 foo = 1 后', params.toString());
```

<https://i-blog.csdnimg.cn/direct/c220f6b4d10d44cbb4a6742b6e6eaa8d.png>

### 1.4 entries() 方法

> URLSearchParams 接口的 entries() 方法返回一个用于遍历该对象中包含的所有键/值对的迭代器。迭代器按照查询字符串中出现的顺序`返回键/值`对，`每一组键和值都是字符串对象`。

**语法**

```js
entries();
```

**参数**

- 无

**返回值**

- `迭代器`

**示例**

```js
let params = new URLSearchParams('?foo=1&bar=2&name=ddg');

params.append('foo', 4);
params.append('foo', 4);
params.append('foo', 4);

// 显示键/值对
for (const item of params.entries()) {
  // console.log(`${key}, ${value}`);
  console.log(item);
}
```

<https://i-blog.csdnimg.cn/direct/1afb4aae4d62457bb93821af12b3b99c.png>

> 这里的 `item` 就是一个数组，第一项是 key，第二项是 value，这个地方和 Object.entries 是一样的

> 可以直接用数组解构

```js
let params = new URLSearchParams('?foo=1&bar=2&name=ddg');

params.append('foo', 4);
params.append('foo', 4);
params.append('foo', 4);

// 显示键/值对
for (const [key, value] of params.entries()) {
  console.log(`${key}, ${value}`);
  // console.log(item);
}
```

<https://i-blog.csdnimg.cn/direct/51f719d15d33404ba4405037508e1aa3.png>

### 1.5 forEach() 方法

> URLSearchParams 接口的 forEach() 方法允许通过回调函数来`遍历实例对象上的键值对`。 和 Array.forEach 类似

**语法**

```js
forEach(callback);
forEach(callback, thisArg);
```

**参数**  
<https://i-blog.csdnimg.cn/direct/dd5332bde856463dadbf1861268a1746.png>
**返回值**

- 无

**示例**

```js
let params = new URLSearchParams('?foo=1&bar=2&name=ddg');

params.append('foo', 4);
params.append('foo', 4);
params.append('foo', 4);

params.forEach((value, key) => {
  console.log(`${key}, ${value}`);
});
```

<https://i-blog.csdnimg.cn/direct/7ce90f4fd9964c0796d9221b421d8893.png>

### 1.6 get() 方法

> URLSearchParams 接口的 get() 方法返回`第一个`与查询参数对应的值。

**语法**

```js
get(name);
```

**参数**

- `name`：要返回的参数的键名。

**返回值**

- 如果找到了给定的查询参数，则返回一个`字符串`；否则返回 `null`。

**示例**

```js
let params = new URLSearchParams('?foo=1&bar=2&name=ddg');

params.append('foo', 4);
params.append('foo', 4);
params.append('foo', 4);

console.log(params.get('foo'));
console.log(params.get('age'));
```

<https://i-blog.csdnimg.cn/direct/6a529161b6164a0097a4daf2ead6427f.png>

> 获取 `foo` 的时候，返回的是 `1` ，因为如若这个 键对应的值有多个，那么会返回`第一个`，如若这个键没有找到，则返回 null

### 1.7 getAll() 方法

> URLSearchParams 接口的 getAll() 方法以`数组的形式返回与指定查询参数对应的所有值`。

**语法**

```js
getAll(name);
```

**参数**

- `name`：要返回的参数的键名。

**返回值**

- 一个字符串的`数组`，如果没有找到给定参数的值，则其可以是`空`的。

**示例**

```js
let params = new URLSearchParams('?foo=1&bar=2&name=ddg');

params.append('foo', 4);
params.append('foo', 4);
params.append('foo', 4);

// // 显示键/值对
// for (const [key, value] of params.entries()) {
//   console.log(`${key}, ${value}`);
//   // console.log(item);
// }

// params.forEach((value, key) => {
//   console.log(`${key}, ${value}`);
// });
console.log(params.getAll('foo'));
console.log(params.getAll('age'));
```

<https://i-blog.csdnimg.cn/direct/f24fe7e5f58840ce8ef0dc74474cf517.png>

> `foo` 本来是一个，然后又添加了三个，所以用 `getAll` 获取的时候，会返回四个  
> 如若没有找到这个 键名称，那么返回的就是一个`空数组`

### 1.8 has() 方法

> URLSearchParams 接口的 has() 方法返回一个`布尔值`，表示指定的键名对应的值是`否存在于查询参数中`。

**语法**

```js
has(name);
has(name, value);
```

**参数**

- `name`：要匹配的参数的名称
- `value`：要匹配的参数值以及给定的名称

**返回值**

- `一个布尔值`

**示例**

```js
let params = new URLSearchParams('?foo=1&bar=2&name=ddg');

params.append('foo', 2);
params.append('foo', 3);
params.append('foo', 4);

console.log(params.has('foo'));
console.log(params.has('age'));
console.log(params.has('foo', 4));
console.log(params.has('foo', 5));
```

<https://i-blog.csdnimg.cn/direct/c389825c3b044858b12f13049389c304.png>

- `has('foo')` 返回的是 `true`，因为查询参数中有这个
- `params.has('age')` 返回的是 `false`，因为查询参数中没有这个
- `params.has('foo', 4)` 返回的是 `true`，因为查询参数中有这个
- `params.has('foo', 5)` 返回的是 `false` ，因为查询参数中没有这个，但是有，1，2，3，4

### 1.9 keys() 方法

> URLSearchParams 接口的 keys() 方法`返回一个用于遍历对象中包含的所有键的迭代器`。这些键都是字符串对象。

**语法**

```js
keys();
```

**参数**

- `无`

**返回值**

- 迭代器

**示例**

```js
let params = new URLSearchParams('?foo=1&bar=2&name=ddg');

params.append('foo', 2);
params.append('foo', 3);
params.append('foo', 4);

for (const key of params.keys()) {
  console.log(key);
}
```

<https://i-blog.csdnimg.cn/direct/397809c9f4ff4b9c988ca7a3cbe6f4af.png>

### 1.10 set() 方法

> URLSearchParams 接口的 set() 方法用于`设置和查询参数相关联的值`。如果设置前已经存在`多个匹配的值`，此方法会`删除重复的查询参数`；如果查询参数`不存在`，则`创建`它。

**语法**

```js
set(name, value);
```

**参数**

- `name`：要设置的参数的键名
- `value`：要设置的参数的值

**返回值**

- `无`

**示例**

```js
let params = new URLSearchParams('?foo=1&bar=2&name=ddg');

params.append('foo', 2);
params.append('foo', 3);
params.append('foo', 4);

console.log('set 之前', params.toString());
params.set('foo', 4);
params.set('age', 22);
console.log(params.toString());
```

<https://i-blog.csdnimg.cn/direct/4373aa3780e8491bbb1dcfd25f58c8dc.png>

### 1.11 toString() 方法

> URLSearchParams 接口的 toString() 方法返回适用于 URL 中的查询字符串。

**语法**

```js
toString();
```

**参数**

- `无`

**返回值**

- `一个不带问号的字符串，如若未设置查询参数则返回空字符串`

**示例**

```js
let params = new URLSearchParams('?foo=1&bar=2&name=ddg');

params.append('foo', 2);
params.append('foo', 3);
params.append('foo', 4);

console.log(params.toString());
```

<https://i-blog.csdnimg.cn/direct/ec2f868c02fb426894332f79aedbf564.png>

### 1.12 values() 方法

> URLsearchParams 接口的 values() 方法返回一个用于遍历对象中包含的所有键的`值`的`迭代器`。这些键都是字符串对象。

**语法**

```js
values();
```

**参数**

- `无`

**返回值**

- 迭代器

**示例**

```js
let params = new URLSearchParams('?foo=1&bar=2&name=ddg');

params.append('foo', 2);
params.append('foo', 3);
params.append('foo', 4);

console.log('查询参数', params.toString());
for (const item of params.values()) {
  console.log(item);
}
```

<https://i-blog.csdnimg.cn/direct/47140dfe49a04e45b7d3dd8848873765.png>

### 参考链接

- [URLSearchParams MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams)
