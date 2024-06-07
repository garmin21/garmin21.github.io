网页开发时，常常需要了解某个元素是否进入了"视口"（viewport），即用户能不能看到它。

传统的实现方法是，监听到 scroll 事件后，调用目标元素的 getBoundingClientRect()方法，得到它对应于视口左上角的坐标，再判断是否在视口之内。这种方法的缺点是，由于 scroll 事件密集发生，计算量很大，容易造成性能问题。

目前有一个新的 IntersectionObserver API，可以自动"观察"元素是否可见，Chrome 51+ 已经支持。由于可见（visible）的本质是，目标元素与视口产生一个交叉区，所以这个 API 叫做"交叉观察器"。

### api

IntersectionObserver 是浏览器原生提供的构造函数，接受两个参数：callback 是可见性变化时的回调函数，option 是配置对象（该参数可选）

1. instance.observe(element) 开始观察，允许观察多个节点
2. instance.unobserve(element) 停止观察
3. instance.disconnect() 关闭观察器

### 特征

callback 会在页面渲染后初始化执行一次
相比于 getBoundingClientRect，它的优点是不会引起重绘回流

```ts
var io = new IntersectionObserver((entries) => {
  console.log(entries);
});
```

callback 函数的参数（entries）是一个数组，每个成员都是一个 IntersectionObserverEntry 对象。举例来说，如果同时有两个被观察的对象的可见性发生变化，entries 数组就会有两个成员。

1. time：可见性发生变化的时间，是一个高精度时间戳，单位为毫秒
2. target：被观察的目标元素，是一个 DOM 节点对象
3. isIntersecting: 目标是否可见
4. rootBounds：根元素的矩形区域的信息，getBoundingClientRect()方法的返回值，如果没有根元素（即直接相对于视口滚动），则返回 null
5. boundingClientRect：目标元素的矩形区域的信息
6. intersectionRect：目标元素与视口（或根元素）的交叉区域的信息
7. intersectionRatio：目标元素的可见比例，即 intersectionRect 占 boundingClientRect 的比例，完全可见时为 1，完全不可见时小于等于 0

### 应用场景

1. 图片懒加载
2. 无限滚动
