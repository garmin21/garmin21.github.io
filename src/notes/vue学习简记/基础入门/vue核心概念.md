---
title: vue核心概念
author: 李嘉明
createTime: 2024/03/31 20:46:37
permalink: /learn-vue/base/
---


# Vue 基础

> 以官方文档为主，学习笔记为辅，来记录，vue 官网: https://cn.vuejs.org/

```html
<div id="app">
  <p>{{msg}}</p>
</div>
<script>
  const vm = new Vue({ // 传入一个配置对象
         el : '#app', // 根据选择器获取html中对应的容器,目的是为了操作容器中模版的内容
         data : {  // 数据对象,存放着 el 要用到的数据
             msg : 'hello'
         },
         methods: {}, // 在这个里面可以定义当前vue实例。所有可用的方法
         computed : {} // 某个数据的值改变,相关联的数据会自动的变化
         watch : {} // 某个数据变化了,想要做相关的事情
     })
</script>
```

1. 需要明白什么是插值表达式？
   以`{{msg}}`这里的{{}}是插值语法,括号中间放的是表达式,在其里面可以写有效的 js 代码,但是不能是语句
2. vm 实例能直接访问`data`吗？
   不能，因为实例身上没有这个属性，如果想要访问 data 中的数据可以直接通过 this.msg,其原因是 vue 做了数据代理
3. 具有$的属性或对象，都是属于 vm 实例的属性

4. 组件中 data 和 props 的区别?
   1. data 上的数据是组件身上私有的，props 中的数据，是通过父组件传递过来的，子组件身上并没有
   2. props 是只读的，无法重新赋值，data 上的数据才是可读可写

### 指令

1. v-cloak : 可以用于解决插值表达式因网速问题，加载出现闪烁问题
   写法：` [v-cloak]{ // 样式 display: none; } <p v-cloak>{{msg}}<p> // html`
2. v-text : 不会出现加载 闪烁问题，他会覆盖元素中原本的内容 === innerText
   写法：`<p v-text="msg"></p> // html`
3. v-html : 渲染带有 html 标签的数据,会覆盖元素中原本的内容 === innerHTML
   写法：`<p v-html="msg"></p>`
4. v-bind : 用于绑定属性的指令，它可以写合法的 js 表达式，他会将后面的变量当做 js 去执行
   写法: `<p v-bind:title="msg + 123"></p>`
   简写: `<p :title="msg + 123"></p>`
5. v-if,v-else,v-else if,v-show : 控制流程
   写法: ` <p v-if="flag">呵呵呵呵</p> <p v-show="flag">呵呵呵呵</p>`
   区别：
   v-if : 每次都会重新的删除和替换元素，会造成性能消耗
   v-show : 只是切换元素的 display:none 样式,DOM 存在于 DOM 树中
6. v-on : 用于绑定事件指令
   写法: `<button v-on:click="add">btn</button>`
   简写: `<button @click="add"></button>`
7. v-model : 用于双向数据绑定,只能应用于表单元素中
   写法：`<input v-model="msg" />`
8. v-for : 用于渲染数据列表,
   场景 ：
   1. 遍历数组对象
   2. 遍历对象`<div v-for="(val, key, i) in userInfo">{{val}} --- {{key}} --- {{i}}</div>`
   3. 多层 `v-for`遍历，数组中有对象，对象中还有对象
   4. `<li v-for="n in 10">{{ n }}</li>` 遍历数字
   5. 你也可以使用 `v-for="n of list"`更加符合迭代器的语法
   6. 在组件中使用 `v-for`时，key 是必须的，推荐使用 `v-for`就一定要书写 `key`属性
9. ref : 不是指令，是一个属性：可以用来获取 DOM 元素 1. 如何获取 DOM 元素,可以通过$refs对象来获取`this.$refs.ele` 2. $refs 还可以来获取组件，同时还可以去调用 【元素或组件】上的方法

> 注意在 VM 实例中，如果想要获取 data 上的数据，或者想要使用 methods 中的方法必须通过`this`来访问，这里的`this`，就代表我们的`VM实例`
>
> 但是：如果访问的数据类型是原始数据类型，则是字符串的表示形式，引用类型除外

### 事件修饰符

1. .stop :`<button @click.stop="add"></button>` // 阻止冒泡
2. .prevent :`<button @click.prevent="add"></button>` // 阻止默认行为
3. .capture :`<button @click.capture="add"></button>` // 使用事件捕获机制
4. .self :`<button @click.self="add"></button>` // 只允许当前元素触发事件
5. .once :`<button @click.stop="add"></button>` // 只允许事件触发一次

6. 事件修饰符，可以多个串联使用
7. stop 与 self 的区别?
   1. 都可以阻止冒泡行为
   2. 但是 self 只能阻止自身的冒泡不被触发
   3. stop 可以阻止全部的冒泡行为

事件对象：$event

1.  `<button @click="add($event)"></button>`
2.  ` <button @click="add"></button>`

### 按键修饰符

```json
// 回车键
.enter
// 自定义键值码
Vue.config.keyCodes.f1 = 122; // 通过 v-on:keyup.f1 使用
```

### 自定义指令

```json
// 定义全局指令，所有VM实例共享
Vue.directive('focus',{}) // 通过 v-focus 绑定到元素上即可
1. 参数一 : 指令的名称，注意在定义的时候，指令名称的前面不需要加 `v-`前缀
2. 是一个配置对象，在这个对象身上，有一些指令相关的钩子函数，这些函数在特定的阶段，执行相关的操作
	  bind : function(el,binding){ // 当指令绑定到元素上后，会立即执行这个 bind 函数 只执行一次
                el.focus()};
    inserted : function(el,binding){   // 插入到 dom 中 ，会执行 inserted 函数 触发一次
                el.focus()}
    updated : function(el,binding){ // 组件(vNode) 更新时 ，会执行updated 函数 可能会 触发多次
                el.focus()}
钩子函数参数
    1、el：指令所绑定的元素，可以用来直接操作 `DOM`。
    2、 binding：一个对象，包含以下 `property`：
        name：指令名，不包括 `v- 前缀`。
        value：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 2。
        oldValue：指令绑定的前一个值，仅在 `update 和 componentUpdated` 钩子中可用。无论值是否改变都可用。
        expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
        arg：传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `foo`。
        modifiers：一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`。
        vnode：Vue 编译生成的虚拟节点。`移步 VNode API 来了解更多详情`。
        oldVnode：上一个虚拟节点，`仅在 update 和 componentUpdated 钩子中可用`。

详解：
  1. bind 表示指令绑定到元素上后触发，但是并没有插入到DOM树中，所以调用 `focus()` 没有作用
  2. inserted 表示 元素已经插入到了DOM树，所以调用 `focus()` 有作用
  3. updated 表示。。。

指令的几种用法形式:
  1. `v-copy="message"`, message 可以在 binding.value 中获取 指令的绑定值
  2. `v-copy:name="message"`, name 可以在 binding.arg 中获取 传给指令的参数
  3. `v-copy.stop="message"`, name 可以在 binding.modifiers 中获取 一个包含修饰符的对象
```

```json
// 自定义私有指令：
const vm = new Vue({
    el : '#app',
    data : {},
    directives: {
        'focus' : (){
        	....这里有一系列的指令相关的钩子函数
    	}
    }
})
```

```json
// 自定义指令钩子函数简写:
Vue.directive('focus',(el,binding) => {el.focus()})
// 注意： 这个回调函数相当在 bind 和 updated ，等同于两个钩子函数中都写了一遍
```

## `watch`、`computed`和`methods`之间的对比

1. `computed`属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
2. `methods`方法表示一个具体的操作，主要书写业务逻辑；
3. `watch`一个对象，键是需要观察的表达式，值是对应回调函数。主要用来监听某些特定数据的变化，从而进行某些具体的业务逻辑操作；可以看作是`computed`和`methods`的结合体；

### `computed`

> 某个属性的值改变，相关联的属性的值会自动发生改变

```json
计算属性 :
	computed : {
         // 获取的操作---get操作
        fullName1() {
            // 当 firstName 发生改变，对应的 fullName1 自动发生改变
          return this.firstName + '_' + this.lastName
        },
        fullName2: {
          get() {
            return this.firstName + '_' + this.lastName
          },
          set(val) { //val中就会存储你设置的值
            const name = val.split('_')
            this.firstName = name[0]
            this.lastName = name[1]
          }
        }
    }
```

### `watch`

> 我可以监视一个属性,如果该属性变化了,我就在监视中做相应的操作

```json
写法一:
watch: {
    // 监视firstName 如果这个数据变化了,fullName2也要变化
    firstName(val) { // 这里接收两个形参 newVal, oldVal ，
        this.fullName2 = val + '_' + this.lastName
    }
}
写法二:
vm.$watch('lastName', function (val) { // 参数1:要监视的属性的名字,参数2是一个回调,要做的事情,都在回调中完成
    this.fullName2 = this.firstName + '_' + val
})
```

## 在 Vue 中使用样式

### 使用 class 样式

1. 数组

   ```html
   <h1 :class="['red', 'thin']">这是一个邪恶的H1</h1>
   ```

2. 数组中使用三元表达式

   ```html
   <h1 :class="['red', 'thin', isactive?'active':'']">这是一个邪恶的H1</h1>
   ```

3. 数组中嵌套对象

   ```html
   <h1 :class="['red', 'thin', {'active': isactive}]">这是一个邪恶的H1</h1>
   ```

4. 直接使用对象

   ```html
   <h1 :class="{red:true, italic:true, active:true, thin:true}">
     这是一个邪恶的H1
   </h1>
   ```

### 使用内联样式

1. 直接在元素上通过 `:style` 的形式，书写样式对象

   ```html
   <h1 :style="{color: 'red', 'font-size': '40px'}">这是一个善良的H1</h1>
   ```

2. 将样式对象，定义到 `data` 中，并直接引用到 `:style` 中

   - 在 data 上定义样式：

   ```json
   data: {
           h1StyleObj: { color: 'red', 'font-size': '40px', 'font-weight': '200' }
   }
   ```

   - 在元素中，通过属性绑定的形式，将样式对象应用到元素中：

   ```html
   <h1 :style="h1StyleObj">这是一个善良的H1</h1>
   ```

3. 在 `:style` 中通过数组，引用多个 `data` 上的样式对象

   - 在 data 上定义样式：

   ```json
   data: {
      h1StyleObj: {
        color: 'red',
        'font-size':
        '40px',
        'font-weight': '200'
      },
      h1StyleObj2: { fontStyle: 'italic' }
   }
   ```

   - 在元素中，通过属性绑定的形式，将样式对象应用到元素中：

   ```html
   <h1 :style="[h1StyleObj, h1StyleObj2]">这是一个善良的H1</h1>
   ```

## [vue 实例的生命周期](https://cn.vuejs.org/v2/guide/instance.html#实例生命周期)

- 什么是生命周期：从 Vue 实例创建、运行、到销毁期间，总是伴随着各种各样的事件，这些事件，统称为生命周期！
- [生命周期钩子](https://cn.vuejs.org/v2/api/#选项-生命周期钩子)：就是生命周期事件的别名而已；
- 生命周期钩子 = 生命周期函数 = 生命周期事件

* 创建期间的生命周期函数：

  - `beforeCreate`：实例刚在内存中被创建出来，此时，还没有初始化好 data 和 methods 属性
  - `created`：实例已经在内存中创建 OK，此时 data 和 methods 已经创建 OK，此时还没有开始 编译模板
  - `beforeMount`：此时已经完成了模板的编译，但是还没有挂载到页面中
  - `mounted`：此时，已经将编译好的模板，挂载到了页面指定的容器中显示

* 更新期间的生命周期函数：

  - `beforeUpdate`：状态更新之前执行此函数， 此时 data 中的状态值是最新的，但是界面上显示的 数据还是旧的，因为此时还没有开始重新渲染 DOM 节点
  - `updated`：实例更新完毕之后调用此函数，此时 data 中的状态值 和 界面上显示的数据，都已经完成了更新，界面已经被重新渲染好了！

* 销毁期间的生命周期函数：

  - `beforeDestroy`：实例销毁之前调用。在这一步，实例仍然完全可用。
  - `destroyed`：Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
  - 另外的三个生命周期函数
  - `activated`: 被 keep-alive 缓存的组件激活时调用 , **该钩子在服务器端渲染期间不被调用**
  - `deactivated`:被 keep-alive 缓存的组件停用时调用，**该钩子在服务器端渲染期间不被调用**
  - `errorCaptured`: 当捕获一个来自子孙组件的错误时被调用

## 组件通信

Vue 中组件间进行通信的方式:

1. props ---> 父子
2. 自定义事件方式 ----> 父子
3. PubSub 消息订阅 ----> 任意组件 , 不属于 vue 中的东西，react,中已经有了
4. 事件总线 ---> 任意组件通信
5. 插槽 ----> 父子
6. VueX ---> 任意组件通信
7. vm 实例方法
8. $attrs / $listeners
9. eventHub

### ① props

```js
// 主要用于父子组件之间的传值：
//   1. 父组件通过 v-bind: 动态绑定属性的方式向子组件传递数据，
//   2. 子组件只需要定义 props 即可使用 父组件传递过来的数据
// 示例：
/ app.vue 中
<div>
    <Son :data="msg"></Son>
</div>

/ Son.vue中
export default {
  props : ['data'] // 这种不推荐使用
  props:{
    .....
  }
};
```

### ② 自定义事件

```js
// 主要用于父子组件之间通信:

1. 父组件通过 @func="show",绑定自定义事件，
2. 子组件只需要通信 `this.$emit('func','lijiaming');` 调用父组件的方法，并向父组件方法内传递数据


示例:

/ app.vue
<div>
    <Son @func="show"></Son>
</div>

/ Son.vue
this.$emit('func',123)
```

### ③ 事件总线

```js
// 任意组件之间都可以相互通信:

1. $on() : 绑定事件,
2. $off() : 解绑事件,
3. $emit() : 触发事件,
4. $once() 绑定一次性事件

/ main.js
  Vue.prototype.$but = new Vue();

/ app.vue

  this.$but.$on('func',(data) => console.log(data))

/ Son.vue
  this.$but.$emit('func',123)
```

### ⑤ VueX

> Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式** ,帮助集中式管理组件的状态数据，任意组件之间可以进行通信

### ⑥ vm 实例方法

> 我们还可以通过访问 `$parent `或者` $children` 对象来访问组件实例中的方法和数据。

```js
子组件调用父组件的方法，实现向父组件传递数据
```

### ⑦ $listeners / $attrs

1. 一般来说往子组件通过`props`的方式传递数据时，都需要显示的`props:['msg']`进行定义
2. `$sttrs解释为`: 父组件往子组件传没有在`props`里声明过的值时，子组件可以通过`$attrs`接受，且只包含父组件没有在`props`里声明的值。
3. 通常我们如果需要从父组件接收传递很多个值，那么我们就需要在 `props` 里声明需要接受的值，如果孙子组件也需要，那么就又要重复在`props`中声明，显得非常繁琐。
4. `$listeners`与`$attrs`的用法比较类似
5. 组件内未被注册的属性将作为`普通html元素属性`被渲染 ,所以为了避免不必要的重复代码, 在 Vue2.4.0,可以在组件定义中添加`inheritAttrs：false ` 组件将不会把未被注册的 props 呈现为普通的 HTML 属性 ,我们仍然可以通过`$attrs`去访问到组件传递过来的数据

```html
<!-- $attrs 父组件向后辈组件传递数据 App组件: -->
<template>
  <a :msg="msg" :desc="desc" />
</template>

<!-- A组件: 此时A组件可以通过 this.$attrs 拿到传递过来的数据 -->
<template>
  <b v-bind="$attrs" />
</template>

<!-- B组件：此时在B组件中就可以通过this.$attrs 拿到A组件传递过来的数据 -->
<template>
  <C v-bind="$attrs" />
</template>

<!-- C组件: 也能拿到组件传递过来的数据 -->
<template>
  <C />
</template>
```

```html
<!-- $listeners 后辈组件向父组件传递数据 App组件: -->
<template>
  <a :msg="msg" :desc="desc" @fucn="chang" />
</template>

<!-- A组件: -->
<template>
  <b v-on="$listeners" />
</template>

<!-- B组件: 在B组件中打印this.$listeners 会得到一个对象，对象里面有对应的事件 -->
<template>
  <b v-on="$listeners" />
</template>

<!-- 通过 this.$emit('fucn',123) 去发射数据 -->
```

### eventHub

> 在我们 `mian.js`文件中挂载`new Vue`中的配置对象中，data 属性中的数据，是可以被子孙组件通过`this.$root.属性名`访问的

```js
// main.js文件:

new Vue({ data:{ msg: '123', eventHub: new Vue() } })

// App组件：
mounted() {
  this.$root.eventHub.$on("update", (data) => { console.log(data); });
},
beforeDestroy() {
  this.$root.eventHub.$off("update");
},

// 子孙组件:
mounted(){
  console.log(this.$root.msg)
}
// 以后在所有子、子孙组件中只需要分发事件就可以向父组件中传递数据了
this.$root.eventHub.$emit('update',{ msg : 'hello world' })
```

> https://www.jianshu.com/p/485e5c0e63c1

### [使用第三方 CSS 动画库](https://cn.vuejs.org/v2/guide/transitions.html#自定义过渡类名)

1. 导入动画类库：

```html
<link rel="stylesheet" type="text/css" href="./lib/animate.css" />
```

2. 定义 transition 及属性：

```vue
<!-- 自定义过度类名 -->
<transition
  enter-active-class="fadeInRight"
  leave-active-class="fadeOutRight"
  :duration="{ enter: 500, leave: 800 }"
>
    <div class="animated" v-show="isshow">动画哦</div>
</transition>
```

### 使用动画钩子函数

1. 定义 transition 组件以及三个钩子函数：

```js
<div id="app">
    <input type="button" value="切换动画" @click="isshow = !isshow">
    <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter">
      <div v-if="isshow" class="show">OK</div>
    </transition>
</div>
```

2. 定义三个 methods 钩子方法：

```js
methods: {
    beforeEnter(el) { // 动画进入之前的回调
      el.style.transform = 'translateX(500px)';
    },
    enter(el, done) { // 动画进入完成时候的回调
      el.offsetWidth;
      el.style.transform = 'translateX(0px)';
      done();
    },
    afterEnter(el) { // 动画进入完成之后的回调
      this.isshow = !this.isshow;
    }
  }
```

3. 定义动画过渡时长和样式：

```css
.show {
  transition: all 0.4s ease;
}
```

### 列表的排序过渡

`<transition-group>` 组件还有一个特殊之处。不仅可以进入和离开动画，**还可以改变定位**。要使用这个新功能只需了解新增的 `v-move` 特性，**它会在元素的改变定位的过程中应用**。

- `v-move` 和 `v-leave-active` 结合使用，能够让列表的过渡更加平缓柔和：

```css
.v-move {
  transition: all 0.8s ease;
}
.v-leave-active {
  position: absolute;
}
```

## 定义 Vue 组件

什么是组件： 组件的出现，就是为了拆分 Vue 实例的代码量的，能够让我们以不同的组件，来划分不同的功能模块，将来我们需要什么样的功能，就可以去调用对应的组件即可；
组件化和模块化的不同：

- 模块化： 是从代码逻辑的角度进行划分的；方便代码分层开发，保证每个功能模块的职能单一；
- 组件化： 是从 UI 界面的角度进行划分的；前端的组件化，方便 UI 组件的重用；

### 全局组件定义的三种方式

1. 使用 Vue.extend 配合 Vue.component 方法：

```js
var login = Vue.extend({
  template: '<h1>登录</h1>',
})
Vue.component('login', login)
```

2. 直接使用 Vue.component 方法：

```js
Vue.component('register', {
  template: '<h1>注册</h1>',
})
```

3. 将模板字符串，定义到 script 标签种：

```js
<script id="tmpl" type="x-template">
  <div>
    <a href="#">登录</a> | <a href="#">注册</a>
  </div>
</script>
```

同时，需要使用 Vue.component 来定义组件：

```js
Vue.component('account', {
  template: '#tmpl',
})
```

> 注意： 组件中的 DOM 结构，有且只能有唯一的根元素（Root Element）来进行包裹！

### 【面试题】为什么组件中的 data 属性必须定义为一个方法并返回一个对象

```js
// 因为如果定义组件上的data是一个对象，则会被其他组件共用data,这样就造成，我改你也改的的特点
// 如果组件data是一个函数，并且返回一个对象，那么每次调用data时，就会返回一个不同的对象，这样就不会影响到其他组件
```

# Vue 扩展

## 混合[ mixin ]

> 复用组件之间**公共代码** ，减少代码量，实现代码重用，尽量不用，影响继承实例下所有的组件实例

```js
export default {
    data(){},
    methods:{},
    ....
}
```

### 使用

```js
new Vue({
  el: '#app',
  data: {
    num: 1,
  },
  methods: {
    add: function () {
      this.num++
    },
  },
  mixins: [`这里填写你暴露的对象`], // 局部混入
})
```

```js
import Vue from 'vue'

// 全局混入
Vue.mixin({
  mounted() {
    console.log('我是全局被混入的')
  },
})
```

当你使用了混合后是混合先被执行，然后执行你组件中的代码

## 过滤器

概念：Vue.js 允许你自定义过滤器，**可被用作一些常见的文本格式化**。过滤器可以用在两个地方：**mustache 插值和 v-bind 表达式**。过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符指示；

### 全局过滤器

```html
<div id="app"><p>{{ msg | msgForm(1) }}</p></div>

<script>
  /* 全局过滤器，任何vm实例，都可以使用 */
  // 1. 参数一： `|` 前面的数据
  // 2. 参数二： 是 msgForm 调用执行传递过来的数据，跟函数传参一致
  // 注意 ： 过滤器也允许多次调用

  Vue.filter('msgForm', (msg，arg) => {
      return msg + '123' + arg
  })

  const vm = new Vue({
      el: '#app',
      data: {
          msg: '我是一个帅气的人'
      }
  })
</script>
```

### 私有过滤器

```js
// 定义私有过滤器
const vm = new Vue({
    el: '#app',
    data: {msg: '我是一个帅气的人'}，
    filters : {
      msgForm : function(msg, arg) {
        return data + '123'+arg
      }
    }}
)
```

注意：当有局部和全局两个名称相同的过滤器时候，会以就近原则进行调用，即：局部过滤器优先于全局过滤器被调用！

## 组件

1. 通过 `import` 引入的组件，叫做`静态组件`，在项目打包时，会将所有的静态组件都打包
2. 通过异步加载组件，叫做`动态组件`，会被单独打包，当你需要时，就会被加载
   1. 动态打包两种写法`[require, import]`

### 动态组件

```html
<!-- 使用`component`标签，来引用组件，并通过`:is`属性来指定要加载的组件： -->
<div id="app">
  <a href="#" @click.prevent="comName='login'">登录</a>
  <a href="#" @click.prevent="comName='register'">注册</a>
  <hr />
  <component :is="comName"></component>
</div>
```

### 缓存组件

```js
// 使用<keep-alive>进行包裹,此时这个组件就是缓存组件,缓存组件是不会被卸载的
<keep-alive>
    <component :is="current"></component>
</keep-alive>
```

### 异步组件

```js
// 1)工厂函数,直接写组件的定义代码
Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    // 向 `resolve` 回调传递组件定义
    resolve({
      template: '<div>I am async!</div>',
    })
  }, 1000)
})

// 2)工厂函数,内部通过require引入外部组件
Vue.component('AsyncComponent2', function (resolve) {
  // 这个特殊的 `require` 语法将会告诉 webpack
  // 自动将你的构建代码切割成多个包，这些包
  // 会通过 Ajax 请求加载
  require(['./AsyncComponent2'], resolve)
})

// 3)工厂函数,内部通过import引入外部组件
Vue.component(
  'AsyncComponent3',
  // 这个 `import` 函数会返回一个 `Promise` 对象。
  () => import('./AsyncComponent3')
)
```

### 函数式组件

(使用`render方法后`不能是`.vue`结尾的文件，必须是`.js`结尾的文件),所谓的函数式组件就是，
没有`状态`,`生命周期`类似与 react 中的无状态组件，
因为是函数，所以渲染的开销很低，
因此可以优化我们的代码，
我们可以把函数式组件想像成组件里的一个函数，
入参是渲染上下文(render context)，
返回值是渲染好的 HTML

##### 模版渲染方式

需要加上 functional 关键字, 就是一个渲染视图，没有任何交互状态等

```vue
<template functional>
  <ul>
    <li v-for="item in props.list" :key="item.id">{{ item.title }}</li>
  </ul>
</template>
```

##### render 渲染函数

```js
export default {
  name: 'button',
  functional: true,
  render(createElement, context) {
    console.log('this', this) // => null
    console.log(context)

    return createElement(
      'button',
      {
        attrs: context.props,
        on: {
          click: context.listeners.click,
        },
      },
      context.children
    )
  },
}
```

## Vue 中原生事件和自定义事件

### 使用原生事件

1. 在普通的标签上直接使用 DOM 的事件(DOM 中自带的事件名字) ,在组件标签上使用 DOM 事件之后,加上一个.native 修饰符
2. 如果是组件使用了事件,一定要在该事件后面使用.native 修饰符,此时这个事件才是真正的原生事件,此时在该组件内容中最外面的包裹的这个标签上会添加这个事件

```html
<button @click="show">按钮</button>
<Model @click.native="show">我是组件，必须使用native来触发原生事件</Model>
```

#### 自定义事件

1. 自定义事件就是你自己定义的事件，通过 $emit
2. 自定义事件不能使用 `.native` 修饰符

```html
<Model @type-event="() => {}" />
```

```html
<!-- Model组件内部: -->
<button @click="$emit('type-event','hhhh')">按钮</button>
```

## 双向数据绑定

> 自己实现双向数据绑定: **<input :value="msg" @input="msg=$event.target.value">**

```js
// 通过调用组件，传入v-model实现双向数据绑定
<Model v-model="msg" /> // v-model等同于 :value="msg" @input="msg=$event.target.value"

Model组件内部:
<input :value="value" @input="$emit('input',$event.target.value)" />
props:['value']
```

```js
// 调用组件，不传v-model实现双向数据绑定
<Model :value="msg" @input="msg=$event" />

Model组件内部:
<input :value="value" @input="$emit('input',$event.target.value)" />
props:['value']
```

## 路由守卫

保护路由,路由守卫分为全局的路由守卫，和组件内的局部路由守卫

```js
//监视跳转的地址,限制跳转的连接方向,如果路由通过路由守卫进行限制后,那么路由在跳转的时候,就会有条件进行限制
router.beforeEach((to, from, next) => {
  to: () => {}, // 即将要进入的目标对象
  from: // 当前导航正要离开的路由对象
  next:  // 放行, 可以无参数, 可以传地址, 可以传入回调
})
```

```js
// 当一个路由被`<keep-alive>`缓存起来的，叫缓存路由，如果此时切换路由，缓存路由组件，并没有被销毁，其生命周期函数中的定时器还是会执行
// 如何去解决这个问题？
可以使用路由组件守卫:
// 在每次准备进入前
beforeRouteEnter (to, from, next) {
    next(vm => {
        vm.intervalId = setInterval(() => {
            console.log('做些事件...')
        }, 1000)
    })
},
// 在当前组件离开前调用, 可以访问this
beforeRouteLeave (to, from, next) {
      clearInterval(this.intervalId)
      next()
   }
```
