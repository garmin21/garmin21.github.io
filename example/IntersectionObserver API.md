温馨提示：本文目前仅适用于在 Chrome 51 及以上中浏览。

> 2016.11.1 追加，Firefox 52 也已经实现。
> 
> > 2016.11.29 追加，Firefox 的人担心目前规范不够稳定，未来很难保证向后兼容，所以[禁用了这个 API](https://bugzilla.mozilla.org/show_bug.cgi?id=1320704)，需要手动打开 dom.IntersectionObserver.enabled 才行。
> > 
> > > 2017.5.1 追加，Firefox 也默认开启了。

IntersectionObserver API 是用来监视某个元素是否滚动进了浏览器窗口的可视区域（视口）或者滚动进了它的某个祖先元素的可视区域内。它的主要功能是用来实现延迟加载和展现量统计。先来看一段视频简介：

再来看看名字，名字里第一个单词 intersection 是交集的意思，小时候数学里面就学过：

![](https://images2015.cnblogs.com/blog/116671/201606/116671-20160605130218196-286840212.jpg)

不过在网页里，元素都是矩形的：

![](https://images2015.cnblogs.com/blog/116671/201606/116671-20160605131111086-768036414.png)

第二个单词 observer 是观察者的意思，和 MutationObserver 以及已死的 Object.observe 中的 observe(r) 一个意思。

下面列出了这个 API 中所有的参数、属性、方法：

// 用构造函数生成观察者实例
let observer = new IntersectionObserver((entries, observer) => {
  // 回调函数中可以拿到每次相交发生时所产生的交集的信息
  for (let entry of entries) {
    console.log(entry.time)
    console.log(entry.target)
    console.log(entry.rootBounds)
    console.log(entry.boundingClientRect
    console.log(entry.intersectionRect)
    console.log(entry.intersectionRatio)
  }
}, { // 构造函数的选项
  root: null,
  threshold: \[0, 0.5, 1\],
  rootMargin: "50px, 0px"
})

// 实例属性
observer.root
observer.rootMargin
observer.thresholds

// 实例方法
observer.observe()
observer.unobserve()
observer.disconnect()
observer.takeRecords()

然后分三小节详细介绍它们：

构造函数
----

new IntersectionObserver(callback, options)

callback 是个必选参数，当有相交发生时，浏览器便会调用它，后面会详细介绍；options 整个参数对象以及它的三个属性都是可选的：

### root

IntersectionObserver API 的适用场景主要是这样的：一个可以滚动的元素，我们叫它根元素，它有很多后代元素，想要做的就是判断它的某个后代元素是否滚动进了自己的可视区域范围。这个 root 参数就是用来指定根元素的，默认值是 null。

如果它的值是 null，根元素就不是个真正意义上的元素了，而是这个浏览器窗口了，可以理解成 window，但 window 也不是元素（甚至不是节点）。这时当前窗口里的所有元素，都可以理解成是 null 根元素的后代元素，都是可以被观察的。

下面这个 demo 演示了根元素为 null 的用法：

<div id\="info"\>我藏在页面底部，请向下滚动</div\>
<div id\="target"\></div\>

<style\>
  #info {
    position: fixed;
  }

  #target {
    position: absolute;
    top: calc(100vh + 500px);
    width: 100px;
    height: 100px;
    background: red;
  }
</style\>

<script\>
  let observer \= new IntersectionObserver(() \=> {
    if (!target.isIntersecting) {
      info.textContent \= "我出来了"
      target.isIntersecting \= true
    } else {
      info.textContent \= "我藏在页面底部，请向下滚动"
      target.isIntersecting \= false
    }
  }, {
    root: null // null 的时候可以省略
  })

  observer.observe(target)
</script\>

需要注意的是，这里我通过在 target 上添加了个叫 isIntersecting 的属性来判断它是进来还是离开了，为什么这么做？先忽略掉，下面会有一小节专门解释。

根元素除了是 null，还可以是目标元素任意的祖先元素：

<div id\="root"\>
  <div id\="info"\>向下滚动就能看到我</div\>
  <div id\="target"\></div\>
</div\>

<style\>
  #root {
    position: relative;
    width: 200px;
    height: 100vh;
    margin: 0 auto;
    overflow: scroll;
    border: 1px solid #ccc;
  }
  
  #info {
    position: fixed;
  }
  
  #target {
    position: absolute;
    top: calc(100vh + 500px);
    width: 100px;
    height: 100px;
    background: red;
  }
</style\>

<script\>
  let observer \= new IntersectionObserver(() \=> {
    if (!target.isIntersecting) {
      info.textContent \= "我出来了"
      target.isIntersecting \= true
    } else {
      info.textContent \= "向下滚动就能看到我"
      target.isIntersecting \= false
    }
  }, {
    root: root
  })

  observer.observe(target)
</script\>

需要注意的一点是，如果 root 不是 null，那么相交区域就不一定在视口内了，因为 root 和 target 的相交也可能发生在视口下方，像下面这个 demo 所演示的：

<div id\="root"\>
  <div id\="info"\>慢慢向下滚动</div\>
  <div id\="target"\></div\>
</div\>

<style\>
  #root {
    position: relative;
    width: 200px;
    height: calc(100vh + 500px);
    margin: 0 auto;
    overflow: scroll;
    border: 1px solid #ccc;
  }
  
  #info {
    position: fixed;
  }
  
  #target {
    position: absolute;
    top: calc(100vh + 1000px);
    width: 100px;
    height: 100px;
    background: red;
  }
</style\>

<script\>
  let observer \= new IntersectionObserver(() \=> {
    if (!target.isIntersecting) {
      info.textContent \= "我和 root 相交了，但你还是看不见"
      target.isIntersecting \= true
    } else {
      info.textContent \= "慢慢向下滚动"
      target.isIntersecting \= false
    }
  }, {
    root: root
  })

  observer.observe(target)
</script\>

总结一下：这一小节我们讲了根元素的两种类型，null 和任意的祖先元素，其中 null 值表示根元素为当前窗口（的视口）。 

### threshold

当目标元素和根元素相交时，用相交的面积除以目标元素的面积会得到一个 0 到 1（0% 到 100%）的数值：

![](https://images2015.cnblogs.com/blog/116671/201606/116671-20160608175232261-11872166.png)

下面这句话很重要，IntersectionObserver API 的基本工作原理就是：**当目标元素和根元素相交的面积占目标元素面积的百分比到达或跨过某些指定的临界值时就会触发回调函数**。threshold 参数就是用来指定那个临界值的，默认值是 0，表示俩元素刚刚挨上就触发回调。有效的临界值可以是在 0 到 1 闭区间内的任意数值，比如 0.5 表示当相交面积占目标元素面积的一半时触发回调。而且可以指定多个临界值，用数组形式，比如 \[0, 0.5, 1\]，表示在两个矩形开始相交，相交一半，完全相交这三个时刻都要触发一次回调函数。如果你传了个空数组，它会给你自动插入 0，变成 \[0\]，也等效于默认值 0。

下面的动画演示了当 threshold 参数为 \[0, 0.5, 1\] 时，向下滚动页面时回调函数是在何时触发的： 

 

不仅当目标元素从视口外移动到视口内时会触发回调，从视口内移动到视口外也会：

你可以在这个 demo 里验证上面的两个动画：

<div id\="info"\>  
  慢慢向下滚动，相交次数：
  <span id\="times"\>0</span\>
</div\>
<div id\="target"\></div\>

<style\>
  #info {
    position: fixed;
  }
  
  #target {
    position: absolute;
    top: 200%;
    width: 100px;
    height: 100px;
    background: red;
    margin-bottom: 100px;
  }
</style\>

<script\>
  let observer \= new IntersectionObserver(() \=> {
    times.textContent \= +times.textContent + 1
  }, {
    threshold: \[0, 0.5, 1\]
  })

  observer.observe(target)
</script\>

threshold 数组里的数字的顺序没有强硬要求，为了可读性，最好从小到大书写。如果指定的某个临界值小于 0 或者大于 1，浏览器会报错：

<script\>
new IntersectionObserver(() \=> {}, {
  threshold: 2 // SyntaxError: Failed to construct 'Intersection': Threshold values must be between 0 and 1.
})
</script\> 

### rootMagin

本文一开始就说了，这个 API 的主要用途之一就是用来实现延迟加载，那么真正的延迟加载会等 img 标签或者其它类型的目标区块进入视口才执行加载动作吗？显然，那就太迟了。我们通常都会提前几百像素预先加载，rootMargin 就是用来干这个的。rootMargin 可以给根元素添加一个假想的 margin，从而对真实的根元素区域进行缩放。比如当 root 为 null 时设置 rootMargin: "100px"，实际的根元素矩形四条边都会被放大 100px，像这样：

![](https://images2015.cnblogs.com/blog/116671/201606/116671-20160606131900605-2121804167.png)

效果可以想象到，如果 threshold 为 0，那么当目标元素距离视口 100px 的时候（无论哪个方向），回调函数就提前触发了。考虑到常见的页面都没有横向滚动的需求，rootMargin 参数的值一般都是 "100px 0px"，这种形式，也就是左右 margin 一般都是 0px. 下面是一个用 IntersectionObserver 实现图片在距视口 500px 的时候延迟加载的 demo：

<div id\="info"\>图片在页面底部，仍未加载，请向下滚动</div\>
<img id\="img" src\="data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA="
              data-src\="https://img.alicdn.com/bao/uploaded/i7/TB1BUK4MpXXXXa1XpXXYXGcGpXX\_M2.SS2"\>

<style\>
  #info {
    position: fixed;
  }

  #img {
    position: absolute;
    top: 300%;
  }
</style\>

<script\>
  let observer \= new IntersectionObserver(() \=> {
    observer.unobserve(img)
    info.textContent \= "开始加载图片！"
    img.src \= img.dataset.src
  }, {
    rootMargin: "500px 0px"
  })

  observer.observe(img)
</script\>

注意 rootMargin 的值虽然和 CSS 里 margin 的值的格式一样，但存在一些限制，rootMargin 只能用 px 和百分比两种单位，用其它的单位会报错，比如用 em：

<script\>
new IntersectionObserver(() \=> {}, {
  rootMargin: "10em" // SyntaxError: Failed to construct 'Intersection': rootMargin must be specified in pixels or percent.
})
</script\>

rootMargin 用百分比的话就是相对根元素的真实尺寸的百分比了，比如 rootMargin: "0px 0px 50% 0px"，表示根元素的尺寸向下扩大了 50%。

如果使用了负 margin，真实的根元素区域会被缩小，对应的延迟加载就会延后，比如用了 rootMargin: "-100px" 的话，目标元素滚动进根元素可视区域内部 100px 的时候才有可能触发回调。

实例
--

### 实例属性

#### root

该观察者实例的根元素（默认值为 null）：

new IntersectionObserver(() => {}).root // null
new IntersectionObserver(() => {}, {root: document.body}).root // document.body

#### rootMargin

rootMargin 参数（默认值为 "0px"）经过序列化后的值：

new IntersectionObserver(() => {}).rootMargin // "0px 0px 0px 0px"
new IntersectionObserver(() => {}, {rootMargin: "50px"}).rootMargin // "50px 50px 50px 50px"
new IntersectionObserver(() => {}, {rootMargin: "50% 0px"}).rootMargin // "50% 0px 50% 0px"
new IntersectionObserver(() => {}, {rootMargin: "50% 0px 50px"}).rootMargin // 50% 0px 50px 0px" 
new IntersectionObserver(() => {}, {rootMargin: "1px 2px 3px 4px"}).rootMargin  // "1px 2px 3px 4px"

#### thresholds

threshold 参数（默认值为 0）经过序列化后的值，即便你传入的是一个数字，序列化后也是个数组，目前 Chrome 的实现里数字的精度会有丢失，但无碍：

new IntersectionObserver(() => {}).thresholds // \[0\]
new IntersectionObserver(() => {}, {threshold: 1}).thresholds // \[1\]
new IntersectionObserver(() => {}, {threshold: \[0.3, 0.6\]}).thresholds // \[\[0.30000001192092896, 0.6000000238418579\]\]
Object.isFrozen(new IntersectionObserver(() => {}).thresholds) // true, 是个被 freeze 过的数组

这三个实例属性都是用来标识一个观察者实例的，都是让人来读的，在代码中没有太大用途。

### 实例方法

#### observe()

观察某个目标元素，一个观察者实例可以观察任意多个目标元素。注意，这里可能有同学会问：能不能 delegate？能不能只调用一次 observe 方法就能观察一个页面里的所有 img 元素，甚至那些未产生的？答案是不能，这不是事件，没有冒泡。

#### unobserve()

取消对某个目标元素的观察，延迟加载通常都是一次性的，observe 的回调里应该直接调用 unobserve() 那个元素.

#### disconnect()

取消观察所有已观察的目标元素

#### takeRecords()

理解这个方法需要讲点底层的东西：在浏览器内部，当一个观察者实例在某一时刻观察到了若干个相交动作时，它不会立即执行回调，它会调用 window.requestIdleCallback() （目前只有 Chrome 支持）来异步的执行我们指定的回调函数，而且还规定了最大的延迟时间是 100 毫秒，相当于浏览器会执行：

requestIdleCallback(() => {
  if (entries.length > 0) {
    callback(entries, observer)
  }
}, {
  timeout: 100
})

你的回调可能在随后 1 毫秒内就执行，也可能在第 100 毫秒才执行，这是不确定的。在这不确定的 100 毫秒之间的某一刻，假如你迫切需要知道这个观察者实例有没有观察到相交动作，你就得调用 takeRecords() 方法，它会同步返回包含若干个 IntersectionObserverEntry 对象的数组（IntersectionObserverEntry 对象包含每次相交的信息，在下节讲），如果该观察者实例此刻并没有观察到相交动作，那它就返回个空数组。

注意，对于同一个相交信息来说，同步的 takeRecords() 和异步的回调函数是互斥的，如果回调先执行了，那么你手动调用 takeRecords() 就必然会拿到空数组，如果你已经通过 takeRecords() 拿到那个相交信息了，那么你指定的回调就不会被执行了（entries.length > 0 是 false）。

这个方法的真实使用场景很少，我举不出来，我只能写出一个验证上面两段话（时序无规律）的测试代码：

<script\>
  setInterval(() \=> {
    let observer \= new IntersectionObserver(entries \=> {
      if (entries.length) {
        document.body.innerHTML += "<p>异步的 requestIdleCallback() 回调先执行了"
      }
    })

    requestAnimationFrame(() \=> {
      setTimeout(() \=> {
        if (observer.takeRecords().length) {
          document.body.innerHTML += "<p>同步的 takeRecords() 先执行了"
        }
      }, 0)
    })

    observer.observe(document.body)

    scrollTo(0, 1e10)
  }, 100)
</script\>  

回调函数
----

new IntersectionObserver(function(entries, observer) {
  for (let entry of entries) {
    console.log(entry.time)
    console.log(entry.target)
    console.log(entry.rootBounds)
    console.log(entry.boundingClientRect
    console.log(entry.intersectionRect)
    console.log(entry.intersectionRatio)
  }
})

回调函数共有两个参数，第二个参数就是观察者实例本身，一般没用，因为实例通常我们已经赋值给一个变量了，而且回调函数里的 this 也是那个实例。第一个参数是个包含有若干个 IntersectionObserverEntry 对象的数组，也就是和 takeRecords() 方法的返回值一样。每个 IntersectionObserverEntry 对象都代表一次相交，它的属性们就包含了那次相交的各种信息。entries 数组中 IntersectionObserverEntry 对象的排列顺序是按照它所属的目标元素当初被 observe() 的顺序排列的。

### time

相交发生时距离页面打开时的毫秒数（有小数），也就是相交发生时 performance.now() 的返回值，比如 60000.560000000005，表示是在页面打开后大概 1 分钟发生的相交。在回调函数里用 performance.now() 减去这个值，就能算出回调函数被 requestIdleCallback 延迟了多少毫秒：

<script\>
  let observer \= new IntersectionObserver((\[entry\]) \=> {
    document.body.textContent += \`相交发生在 ${performance.now() \- entry.time} 毫秒前\`
  })

  observer.observe(document.documentElement)
</script\>

你可以不停刷新上面这个 demo，那个毫秒数最多 100 出头，因为浏览器内部设置的最大延迟就是 100。

### target

相交发生时的目标元素，因为一个根元素可以观察多个目标元素，所以这个 target 不一定是哪个元素。

### rootBounds

一个对象值，表示发生相交时根元素可见区域的矩形信息，像这样：

{
  "top": 0,
  "bottom": 600,
  "left": 0,
  "right": 1280,
  "width": 1280,
  "height": 600
}

### boundingClientRect

发生相交时目标元素的矩形信息，等价于 target.getBoundingClientRect()。

### intersectionRect

根元素和目标元素相交区域的矩形信息。

### intersectionRatio

0 到 1 的数值，表示相交区域占目标元素区域的百分比，也就是 intersectionRect 的面积除以 boundingClientRect 的面积得到的值。

贴边的情况是特例
--------

上面已经说过，IntersectionObserver API 的基本工作原理就是检测相交率的变化。每个观察者实例为所有的目标元素都维护着一个上次相交率（previousThreshold）的字段，在执行 observe() 的时候会给 previousThreshold 赋初始值 0，然后每次检测到新的相交率满足（到达或跨过）了 thresholds 中某个指定的临界值，且那个临界值和当前的 previousThreshold 值不同，就会触发回调，并把满足的那个新的临界值赋值给 previousThreshold，依此反复，很简单，对吧。

但是不知道你有没有注意到，前面讲过，当目标元素从距离根元素很远到和根元素贴边，这时也会触发回调（假如 thresholds 里有 0），但这和工作原理相矛盾啊，离的很远相交率是 0，就算贴边，相交率还是 0，值并没有变，不应该触发回调啊。的确，这和基本工作原理矛盾，但这种情况是特例，目标元素从根元素外部很远的地方移动到和根元素贴边，也会当做是满足了临界值 0，即便 0 等于 0。

还有一个反过来的特例，就是目标元素从根元素内部的某个地方（相交率已经是 1）移动到和根元素贴边（还是 1），也会触发回调（假如 thresholds 里有 1）。

目标元素宽度或高度为 0 的情况也是特例
--------------------

很多时候我们的目标元素是个空的 img 标签或者是一个空的 div 容器，如果没有设置 CSS，这些元素的宽和高都是 0px，那渲染出的矩形面积就是 0px2，那算相交率的时候就会遇到除以 0 这种在数学上是非法操作的问题，即便在 JavaScript 里除以 0 并不会抛异常还是会得到 Infinity，但相交率一直是 Infinity 也就意味着回调永远不会触发，所以这种情况必须特殊对待。

特殊对待的方式就是：0 面积的目标元素的相交率要么是 0 要么是 1。无论是贴边还是移动到根元素内部，相交率都是 1，其它情况都是 0。1 到 0 会触发回调，0 到 1也会触发回调，就这两种情况：

由于这个特性，所以为 0 面积的目标元素设置临界值是没有意义的，设置什么值、设置几个，都是一个效果。 

但是注意，相交信息里的 intersectionRatio 属性永远是 0，很烧脑，我知道：

<div id\="target"\></div\>

<script\>
  let observer \= new IntersectionObserver((\[entry\]) \=> {
    alert(entry.intersectionRatio)
  })

  observer.observe(target)
</script\>

observe() 之前就已经相交了的情况是特例吗？
--------------------------

不知道你们有没有这个疑问，反正我有过。observe() 一个已经和根元素相交的目标元素之后，再也不滚动页面，意味着之后相交率再也不会变化，回调不应该发生，但还是发生了。这是因为：在执行 observe() 的时候，浏览器会将 previousThreshold 初始化成 0，而不是初始化成当前真正的相交率，然后在下次相交检测的时候就检测到相交率变化了，所以这种情况不是特殊处理。

浏览器何时进行相交检测，多久检测一次？
-------------------

我们常见的显示器都是 60hz 的，就意味着浏览器每秒需要绘制 60 次（60fps），大概每 16.667ms 绘制一次。如果你使用 200hz 的显示器，那么浏览器每 5ms 就要绘制一次。我们把 16.667ms 和 5ms 这种每次绘制间隔的时间段，称之为 frame（帧，和 html 里的 frame 不是一个东西）。浏览器的渲染工作都是以这个帧为单位的，下图是 Chrome 中每帧里浏览器要干的事情（我在[原图](https://aerotwist.com/blog/the-anatomy-of-a-frame/)的基础上加了 Intersection Observations 阶段)：

![Intersection Observations In A Frame](http://ossgw.alicdn.com/creatives-assets/oss/uploads/2016/06/12/0d8f8d00-304f-11e6-8c3b-9f99e4055e29.svg)

可以看到，相交检测（Intersection Observations）发生在 Paint 之后 Composite 之前，多久检测一次是根据显示设备的刷新率而定的。但可以肯定的是，每次绘制不同的画面之前，都会进行相交检测，不会有漏网之鱼。

一次性到达或跨过的多个临界值中选一个最近的
---------------------

如果一个观察者实例设置了 11 个临界值：\[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1\]，那么当目标元素和根元素从完全不相交状态滚动到相交率为 1 这一段时间里，回调函数会触发几次？答案是：不确定。要看滚动速度，如果滚动速度足够慢，每次相交率到达下一个临界值的时间点都发生在了不同的帧里（浏览器至少绘制了 11 次），那么就会有 11 次相交被检测到，回调函数就会被执行 11 次；如果滚动速度足够快，从不相交到完全相交是发生在同一个帧里的，浏览器只绘制了一次，浏览器虽然知道这一次滚动操作就满足了 11 个指定的临界值（从不相交到 0，从 0 到 0.1，从 0.1 到 0.2 ··· ），但它只会考虑最近的那个临界值，那就是 1，回调函数只触发一次：

<div id\="info"\>相交次数：
  <span id\="times"\>0</span\>
  <button onclick\="document.scrollingElement.scrollTop = 10000"\>一下滚动到最低部</button\>
</div\>
<div id\="target"\></div\>

<style\>
  #info {
    position: fixed;
  }

  #target {
    position: absolute;
    top: 200%;
    width: 100px;
    height: 100px;
    background: red;
    margin-bottom: 100px;
  }
</style\>

<script\>
  let observer \= new IntersectionObserver(() \=> {
    times.textContent \= +times.textContent + 1
  }, {
    threshold: \[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1\] // 11 个临界值
  })

  observer.observe(target)
</script\>

离开视口的时候也一个道理，假如根元素和目标元素的相交率先从完全相交变成了 0.45，然后又从 0.45 变成了完全不相交，那么回调函数只会触发两次。 

如何判断当前是否相交？
-----------

我上面有几个 demo 都用了几行看起来挺麻烦的代码来判断目标元素是不是在视口内：

if (!target.isIntersecting) {
  // 相交
  target.isIntersecting = true
} else {
  // 不想交
  target.isIntersecting = false
}

为什么？难道用 entry.intersectionRatio > 0 判断不可以吗：

<div id\="info"\>不可见，请非常慢的向下滚动</div\>
<div id\="target"\></div\>

<style\>
  #info {
    position: fixed;
  }

  #target {
    position: absolute;
    top: 200%;
    width: 100px;
    height: 100px;
    background: red;
  }
</style\>

<script\>
  let observer \= new IntersectionObserver((\[entry\]) \=> {
    if (entry.intersectionRatio \> 0) {
      // 快速滚动会执行到这里
      info.textContent \= "可见了"
    } else {
      // 慢速滚动会执行到这里
      info.textContent \= "不可见，请非常慢的向下滚动"
    }
  })

  observer.observe(target)
</script\>

粗略一看，貌似可行，但你别忘了上面讲的贴边的情况，如果你滚动页面速度很慢，当目标元素的顶部和视口底部刚好挨上时，浏览器检测到相交了，回调函数触发了，但这时 entry.intersectionRatio 等于 0，会进入 else 分支，继续向下滚，回调函数再不会触发了，提示文字一直停留在不可见状态；但如果你滚动速度很快，当浏览器检测到相交时，已经越过了 0 那个临界值，存在了实际的相交面积，entry.intersectionRatio > 0 也就为 true 了。所以这样写会导致代码执行不稳定，不可行。

除了通过在元素身上添加新属性来记录上次回调触发时是进还是出外，我还想到另外一个办法，那就是给 threshold 选项设置一个很小的接近 0 的临界值，比如 0.000001（或者干脆用 Number.MIN\_VALUE），然后再用 entry.intersectionRatio > 0 判断，这样就不会受贴边的情况影响了，也就不会受滚动速度影响了：

<div id\="info"\>不可见，以任意速度向下滚动</div\>
<div id\="target"\></div\>

<style\>
  #info {
    position: fixed;
  }

  #target {
    position: absolute;
    top: 200%;
    width: 100px;
    height: 100px;
    background: red;
  }
</style\>

<script\>
  let observer \= new IntersectionObserver((\[entry\]) \=> {
    if (entry.intersectionRatio \> 0) {
      info.textContent \= "可见了"
    } else {
      info.textContent \= "不可见，以任意速度向下滚动"
    }
  }, {
    threshold: \[0.000001\]
  })

  observer.observe(target)
</script\>

目标元素不是根元素的后代元素的话会怎样？
--------------------

如果在执行 observe() 时，目标元素不是根元素的后代元素，浏览器也并不会报错，Chrome 从 53 开始会对这种用法发出警告（[是我提议的](https://bugs.chromium.org/p/chromium/issues/detail?id=617393)），从而提醒开发者这种用法有可能是不对的。为什么不更严格点，直接报错？因为元素的层级关系是可以变化的，可能有人会写出这样的代码：

<div id\="root"\></div\>
<div id\="target"\></div\>

<style\>
  #target {
    width: 100px;
    height: 100px;
    background: red;
  }
</style\>

<script\>
  let observer \= new IntersectionObserver(() \=> alert("看见我了"), {root: root})
  observer.observe(target) // target 此时并不是 root 的后代元素，Chrome 控制台会发出警告：target element is not a descendant of root.
  root.appendChild(target) // 现在是了，触发回调
</script\>

又或者被 observe 的元素此时还未添加到 DOM 树里：

<div id\="root"\></div\>

<style\>
  #target {
    width: 100px;
    height: 100px;
    background: red;
  }
</style\>

<script\>
  let observer \= new IntersectionObserver(() \=> alert("看见我了"), {root: root})
  let target \= document.createElement("div") // 还不在 DOM 树里
  observer.observe(target) // target 此时并不是 root 的后代元素，Chrome 控制台会发出警告：target element is not a descendant of root.
  root.appendChild(target) // 现在是了，触发回调
</script\>

也就是说，只要在相交发生时，目标元素是根元素的后代元素，就可以了，执行 observe() 的时候可以不是。

是后代元素还不够，根元素必须是目标元素的祖先包含块
-------------------------

要求目标元素是根元素的后代元素只是从 DOM 结构上说的，一个较容易理解的限制，另外一个不那么容易理解的限制是从 CSS 上面说的，那就是：根元素矩形必须是目标元素矩形的祖先包含块（包含块也是链式的，就像原型链）。比如下面这个 demo 所演示的，两个做随机移动的元素 a 和 b，a 是 b 的父元素，但它俩的 position 都是 fixed，导致 a 不是 b 的包含块，所以这是个无效的观察操作，尝试把 fixed 改成 relative 就发现回调触发了：

<div id\="a"\>
  <div id\="b"\></div\>
</div\>
<div id\="info"\>0%</div\>

<style\>
  #a, #b {
    position: fixed; /\* 尝试改成 relative \*/
    width: 200px;
    height: 200px;
    opacity: 0.8;
  }

  #a {
    background: red
  }

  #b {
    background: blue
  }

  #info {
    width: 200px;
    margin: 0 auto;
  }

  #info::before {
    content: "Intersection Ratio: ";
  }
</style\>

<script\>
  let animate \= (element, oldCoordinate \= {x: 0, y: 0}) \=> {
    let newCoordinate \= {
      x: Math.random() \* (innerWidth \- element.clientWidth),
      y: Math.random() \* (innerHeight \- element.clientHeight)
    }
    let keyframes \= \[oldCoordinate, newCoordinate\].map(coordinateToLeftTop)
    let duration \= calcDuration(oldCoordinate, newCoordinate)

    element.animate(keyframes, duration).onfinish \= () \=> animate(element, newCoordinate)
  }

  let coordinateToLeftTop \= coordinate \=> ({
    left: coordinate.x + "px",
    top: coordinate.y + "px"
  })

  let calcDuration \= (oldCoordinate, newCoordinate) \=> {
    // 移动速度为 0.3 px/ms
    return Math.hypot(oldCoordinate.x \- newCoordinate.x, oldCoordinate.y \- newCoordinate.y) / 0.3
  }

  animate(a)
  animate(b)
</script\>

<script\>
  let thresholds \= Array.from({
    length: 200
  }, (k, v) \=> v / 200) // 200 个临界值对应 200px

  new IntersectionObserver((\[entry\]) \=> {
    info.textContent \= (entry.intersectionRatio \* 100).toFixed(2) + "%"
  }, {
    root: a,
    threshold: thresholds
  }).observe(b)
</script\>

从 DOM 树中删除目标元素会怎么样？
-------------------

假设现在根元素和目标元素已经是相交状态，这时假如把目标元素甚至是根元素从 DOM 树中删除，或者通过 DOM 操作让目标元素不在是根元素的后代元素，再或者通过改变 CSS 属性导致根元素不再是目标元素的包含块，又或者通过 display:none 隐藏某个元素，这些操作都会让两者的相交率突然变成 0，回调函数就有可能被触发：

<div id\="info"\> 删除目标元素也会触发回调
  <button onclick\="document.body.removeChild(target)"\>删除 target</button\>
</div\>
<div id\="target"\></div\>

<style\>
  #info {
    position: fixed;
  }
  
  #target {
    position: absolute;
    top: 100px;
    width: 100px;
    height: 100px;
    background: red;
  }
</style\>

<script\>
  let observer \= new IntersectionObserver(() \=> {
    if (!document.getElementById("target")) {
      info.textContent \= "target 被删除了"
    }
  })

  observer.observe(target)
</script\>

关于 iframe
---------

在 IntersectionObserver API 之前，你无法在一个跨域的 iframe 页面里判断这个 iframe 页面或者页面里的某个元素是否出现在了顶层窗口的视口里，这也是为什么要发明 IntersectionObserver API 的一个很重要的原因。请看下图演示：

![](https://images2015.cnblogs.com/blog/116671/201606/116671-20160609142921465-150402871.gif)

无论怎么动，无论多少层 iframe， IntersectionObserver 都能精确的判断出目标元素是否出现在了顶层窗口的视口里，无论跨域不跨域。

前面讲过根元素为 null 表示实际的根元素是当前窗口的视口，现在更明确点，应该是最顶层窗口的视口。

如果当前页面是个 iframe 页面，且和顶层页面跨域，在根元素为 null 的前提下触发回调后，你拿到的 IntersectionObserverEntry 对象的 rootBounds 属性会是 null；即便两个页面没有跨域，那么 rootBounds 属性所拿到的矩形的坐标系统和 boundingClientRect 以及 intersectionRect 这两个矩形也是不一样的，前者坐标系统的原点是顶层窗口的左上角，后两者是当前 iframe 窗口左上角。

鉴于互联网上的广告 90% 都是跨域的 iframe，我想 IntersectionObserver API 能够大大简化这些广告的延迟加载和真实曝光量统计的实现。 

根元素不能是其它 frame 下的元素
-------------------

如果没有跨域的话，根元素可以是上层 frame 中的某个祖先元素吗？比如像下面这样：

<div id\="root"\>
  <iframe id\="iframe"\></iframe\>
</div\>

<script\>
  let iframeHTML \= \`
    <div id\="target"\></div>

    <style\>
      #target {
        width: 100px;
        height: 100px;
        background: red;
      }
    </style>

    <script\>
      let observer \= new IntersectionObserver(() \=> {
        alert("intersecting")
      }, {
        root: top.root
      })

      observer.observe(target)
    <\\/script>\`
  iframe.src \= URL.createObjectURL(new Blob(\[iframeHTML\], {"type": "text/html"}))
</script\>

我不清楚上面这个 demo 中 root 算不算 target 的祖先包含块，但规范明确规定了这种观察操作无效，根元素不能是来自别的 frame。总结一下就是：根元素要么是 null，要么是同 frame 里的某个祖先包含块元素。

真的只是判断两个元素相交吗？
--------------

实际情况永远没表面看起来那么简单，浏览器真的只是判断两个矩形相交吗？看下面的代码：

<div id\="parent"\>
  <div id\="target"\></div\>
</div\>

<style\>
  #parent {
    width: 20px;
    height: 20px;
    background: red;
    overflow: hidden;
  }

  #target {
    width: 100px;
    height: 100px;
    background: blue;
  }
</style\>

<script\>
  let observer \= new IntersectionObserver((\[entry\]) \=> {
    alert(\`相交矩形为: ${entry.intersectionRect.width} x ${entry.intersectionRect.width}\`)
  })

  observer.observe(target)
</script\>

这个 demo 里根元素为当前视口，目标元素是个 100x100 的矩形，如果真的是判断两个矩形的交集那么简单，那这个相交矩形就应该是 100 x 100，但弹出来的相交矩形是 20 x 20。因为其实在相交检测之前，有个裁减目标元素矩形的步骤，裁减完才去和根元素判断相交，裁减的基本思想就是，把目标元素被“目标元素和根元素之间存在的那些元素”遮挡的部分裁掉，具体裁减步骤是这样的（用 rect 代表最终的目标元素矩形）：

1.  让 rect 为目标元素矩形
2.  让 current 为目标元素的父元素
3.  如果 current 不是根元素，则进行下面的循环：
    1.  如果 current 的 overflow 不是 visible（是 scroll 或 hidden 或 auto) 或者 current 是个 iframe 元素（iframe 天生自带 overflow: auto），则：
        1.  让 rect 等于 rect 和 current 的矩形（要排除滚动条区域）的交集
    2.  让 current 为 current 的父元素（iframe 里的 html 元素的父元素就是父页面里的 iframe 元素）

也就是说，实际上是顺着目标元素的 DOM 树一直向上循环求交集的过程。再看上面的 demo，目标元素矩形一开始是 100x100，然后和它的父元素相交成了 20x20，然后 body 元素和 html 元素没有设置 overflow，所以最终和视口做交集的是 20x20 的矩形。 

关于双指缩放
------

移动端设备和 OS X 系统上面，允许用户使用两根手指放大页面中的某一部分：

![](https://images2015.cnblogs.com/blog/116671/201606/116671-20160610153410590-260701193.png)

如果页面某一部分被放大了，那同时也就意味着页面边缘上某些区域显示在了视口的外面：

![](https://images2015.cnblogs.com/blog/116671/201606/116671-20160610152153402-937718107.png)

这些情况下 IntersectionObserver API 都不会做专门处理，无论是根元素还是目标元素，它们的矩形都是缩放前的真实尺寸（就像 getBoundingClientRect() 方法所表现的一样），而且即便相交真的发生在了那些因缩放导致用户眼睛看不到的区域内，回调函数也照样触发。如果你用的 Mac 系统，你现在就可以测试一下上面的任意一个 demo。

关于垃圾回收
------

一个观察者实例无论对根元素还是目标元素，都是弱引用的，就像 WeakMap 对自己的 key 是弱引用一样。如果目标元素被垃圾回收了，关系不大，浏览器就不会再检测它了；如果是根元素被垃圾回收了，那就有点问题了，根元素没了，但观察者实例还在，如果这时使用哪个观察者实例会怎样：

<div id\="root"\></div\>
<div id\="target"\></div\>

<script\>
  let observer \= new IntersectionObserver(() \=> {}, {root: root}) // root 元素一共有两个引用，一个是 DOM 树里的引用，一个是全局变量 root 的引用
  document.body.removeChild(root) // 从 DOM 树里移除
  root \= null // 全局变量置空
  setTimeout(() \=> {
    gc() // 手动 gc，需要在启动 Chrome 时传入 --js-flags='--expose-gc' 选项
    console.log(observer.root) // null，观察者实例的根元素已经被垃圾回收了
    observer.observe(target) // Uncaught InvalidStateError: observe() called on an IntersectionObserver with an invalid root，执行 observer 的任意方法都会报错。
  })
</script\>

也就是说，那个观察者实例也相当于死了。这个报错是从 Chrome 53 开始的（[我提议的](https://bugs.chromium.org/p/chromium/issues/detail?id=617396)），51 和 52 上只会静默失败。

后台标签页
-----

由于 Chrome 不会渲染后台标签页，所以也就不会检测相交了，当你切换到前后才会继续。你可以通过 Command/Ctrl + 左键打开上面任意的 demo 试试。

吐槽命名
----

### threshold 和 thresholds

构造函数的参数里叫 threshold，实例的属性里叫 thresholds。道理我都懂，前者既能是一个单数形式的数字，也能是一个复数形式的数组，所以用了单数形式，而后者序列化出来只能是个数组，所以就用了复数了。但是统一更重要吧，我觉的都用复数形式没什么问题，一开始研究这个 API 的时候我尝试传了 {thresholds: \[1\]}，试了半天才发现多了个 s，坑死了。

> 2017-5-27 追记：[https://github.com/WICG/IntersectionObserver/issues/215](https://github.com/WICG/IntersectionObserver/issues/215) 有人和我一样被坑了，他问能不能改一下 API，我回到：“太晚了”。

### disconnect

什么？disconnect？什么意思？connect 什么了？我只知道 observe 和 unobserve，你他么的叫 unobserveAll 会死啊。这个命名很容易让人不明觉厉，结果是个很简单的东西。叫这个其实是为了和 MutationObserver 以及 PerformanceObserver 统一。

### rootBounds & boundingClientRect & intersectionRect

这三者都是返回一个矩形信息的，本是同类，但是名字没有一点规律，让人无法记忆。我建议叫 rootRect & targetRect & intersectionRect，一遍就记住了，真不知道写规范的人怎么想的。

Polyfil
-------

写规范的人会在 [Github 仓库](https://github.com/WICG/IntersectionObserver)上维护一个 polyfill，目前还未完成。但 polyfill 显然无法支持 iframe 内元素的检测，不少细节也无法模拟。

其它浏览器实现进度
---------

Firefox：[https://bugzilla.mozilla.org/show\_bug.cgi?id=1243846](https://bugzilla.mozilla.org/show_bug.cgi?id=1243846)

Safari：[https://bugs.webkit.org/show\_bug.cgi?id=159475](https://bugs.webkit.org/show_bug.cgi?id=159475)

Edge：[https://developer.microsoft.com/en-us/microsoft-edge/platform/status/intersectionobserver](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/intersectionobserver/)

总结
--

虽然目前该 API 的规范已经有一年历史了，但仍非常不完善，大量的细节都没有规定；Chrome 的实现也有半年了，但还是有不少 bug（大多是疑似 bug，毕竟规范不完善）。因此，本文中有些细节我故意略过，比如目标元素大于根元素，甚至根元素面积为 0，支不支持 svg 这些，因为我也不知道什么是正确的表现。 

> 2016-8-2 追记：今天被同事问了个真实需求，“统计淘宝搜索页面在页面打开两秒后展现面积超过 50% 的宝贝”，我立刻想到了用 IntersectionObserver：
> 
> setTimeout(() => {
>   let observer \= new IntersectionObserver(entries => {
>     entries.forEach(entry \=> {
>       console.log(entry.target) // 拿到了想要的宝贝元素
>     })
>     observer.disconnect() // 统计到就不在需要继续观察了
>   }, {
>     threshold: 0.5 // 只要展现面积达到 50% 的宝贝元素 
>   })
> 
>   // 观察所有的宝贝元素
>   Array.from(document.querySelectorAll("#mainsrp-itemlist .item")).forEach(item => observer.observe(item))
> }, 2000)
> 
> 不需要你进行任何数学计算，真是简单到爆，当然，因为兼容性问题，这个代码不能被采用。

本文转自 <https://www.cnblogs.com/ziyunfei/p/5558712.html>，如有侵权，请联系删除。