---
title: ECMAScript内置对象
author: 李嘉明
createTime: 2024/05/26 20:19:36
permalink: /article/h63f8eca/
tags:
  - javascript
---

### 1 Boolean对象

```js
true // 真
false // 假
```

### 2 Number

#### ① 属性

```js
Number.POSITIVE_INFINITY // ：正的无限，指向Infinity。  
Number.NEGATIVE_INFINITY // ：负的无限，指向-Infinity。  
Number.NaN // ：表示非数值，指向NaN。  
Number.MAX_VALUE // ：表示最大的正数，相应的，最小的负数为-Number.MAX_VALUE。  
Number.MIN_VALUE // ：表示最小的正数（即最接近0的正数，在64位浮点数体系中为5e-324），相应的，最接近0的负数为-Number.MIN_VALUE。  
Number.MAX_SAFE_INTEGER // ：表示能够精确表示的最大整数，即9007199254740991。  
Number.MIN_SAFE_INTEGER // ：表示能够精确表示的最小整数，即-9007199254740991。
```

#### ① 方法

```js
toFixed()  //保留指定位数的小数,会主动进行四舍五入
isInteger() // 判断传入值是否为整数
toString()   //用来将一个数值转为字符串形式.可以接受一个参数，表示输出的进制。如果省略这个参数，默认将数值先转为十进制，再输出字符串；否则，就根据参数指定的进制，将一个数字转化成某个进制的字符串。
toExponential()  //用于将一个数转为科学计数法形式。可传入一个参数，参数表示小数点后有效数字的位数，范围为0到20，超出这个范围，会抛出一个RangeError。
toPrecision()  //用于将一个数转为指定位数的有效数字。不会四舍五入
```



### 3 String

#### ① 属性

```
length   字符串长度
```

#### ③ 方法

```js
str.charAt(index) // 返回指定索引的字符
str.charCodeAt(index) // 返回指定索引字符的Unicode 码点
str.endsWith(str) // 判断字符串是否给定字符串结尾
str.startsWith(str) //
indexOf()    // 返回字符串/字符在某个字符串第一次出现的位置 没有-1
lastIndexOf() // 返回字符串/字符在某个字符串最后一次出现的位置 没有-1
split()  // 把字符串分割为数组，
		 // 第二个参数可以决定返回数组的成员数，
		 // 没有参数数组的唯一成员就是原字符串
slice(start, end)   
// ① 截取字符串,含头不含尾,
// ② 如果参数是负值，表示从结尾开始，倒数计算的位置
// ③ 如果第一个参数大于第二个参数，slice返回一个空字符串
substring（start, end） // 同上
substr(start, length) 	// 截取字符串
toUpperCase()		// 转大写
toLowerCase()		// 转小写
charCodeAt()    	// 返回字符对应的unicode编码   与codePointAt()效果是一样的
replaceAll()
String.fromCharCode();  // 根据unicode编码生成指定字符 （不是字符串对象的方法，是String构造函数的方法）
str.padEnd(Length，String)
str.padStart(Length，String);
str.repeat(count) // 重复字符串
str.trim() // 清除两端的空格
str.trimEnd(); // 别名 str.trimRight();
str.trimStart(); // 别名 str.trimLeft();
// 正则三剑客：
str.search(regexp)// 如果匹配成功，则 search() 返回正则表达式在字符串中首次匹配项的索引;否则，返回 -1。
match(regexp) // 方法检索返回一个字符串匹配正则表达式的结果。
matchAll(regexp) // 方法返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器。
str.replace(regexp|subsSr, newSubStr|function) // 替换
str.replaceAll(regexp|subStr, newSubStr|function)
spit()
```



### 4 Math

> math 是javascript的原生对象，提供各种数学功能，该对象不是构造函数，不能生成实例，所有的属性和方法都必须在   _Math_ 	对象上调用

#### ①属性

```
PI   圆周率
```

#### ② 方法

```js
abs() // 取绝对值, 正数的绝对值是正数，负数的绝对值还是正数， 0 的绝对值是 0 
sqrt() // 求平方根
pow()  // 求某个数的几次方
round() //  四舍五入取整
floor() // 舍一取整
ceil() // 进一取整
max()  // 取参数里面最大的（任意次数参数）
min()  // 取参数里面最小的（任意次数参数）
random() // 随机取0~1之间的小数，0有可能取到的，1不可能取到 (tips: 取 3-17 之间的随机数 为 Math.random() * 15 + 3)

// 三角函数类：
sin() // 返回参数的正弦(参数为弧度值)
cos() // 返回参数的余弦(参数为弧度值)
tan() // 返回参数的正切(参数为弧度值)
asin() // 返回参数的反正弦(返回值为弧度值)
acos() // 返回参数的反余弦(返回值为弧度值)
atan() // 返回参数的反正切(返回值为弧度值)
atan2(y,x) // 返回从原点(0,0)到(x,y)点的线段与x轴正方向之间的平面角度【弧度值】

```

![三角函数](/images/三角函数.png)



### 5 Date日期

作为构造函数时，`Date`对象可以接受多种格式的参数，返回一个该参数对应的时间实例

> var date = new Date(2012-1-1 00:00:00)

#### 方法

```js
getFullYear()   // 年 公元纪年
getMonth()      // 范围是0~11 需要+1
getDate()       // 日 几号
getDay()        // 星期几
getHours()      // 几点（24）
getMinutes()    // 几分
getSeconds()    // 几秒
getMilliseconds()  // 几毫秒
getTime()       // 时间戳（毫秒） 1970年月1日0时0分0秒至今的毫秒数

set...           // 设置年月日时分秒

getUTC...       // 得到标准时区的 年月日时分秒
setUTC...        // 设置标准时区的年月日时分秒

toLocaleString() // 根据本地时间把 Date 对象转换为字符串：
toLocaleTimeString() // 把 Date 对象的时间部分转换为字符串：
toLocaleDateString() // 把 Date 对象的日期部分转换为字符串:

// 静态方法
Date.now() // 等同于 +(new Date())
```



### 6  Array

#### 属性

```js
length // 长度

// 每个对象身上都有的方法：
toString() // 返回数组的字符串形式，没有方括号了
valueOf() // 返回数组本身
```


#### ES5新增的方法

> 重点，ES5新增方法都不会改变数组本身
```js
// 遍历数组  forEach具有第二个参数可以用于指定callback里面的this指向
//特点:无法使用 [return,break,continue] 中断运行, 除非你可以把它放进一个try中，通过抛出异常进行终止它
forEach(callback(currentValue, index, array), thisArg)	
filter()	// 过滤。 回调函数返回布尔值（true-->当前的元素留下， false-->当前的元素去掉）
map()		// map用于对数组的每个元素都进行处理， 回调函数返回什么，最终得到的数组的元素就是什么。
every()     // 数组的每个元素都满足某个条件，返回true
some()      // 数组中只要有元素满足条件，返回true
reduce()	// 对数组的元素进行组合  从左到右
reduceRight()  // 对数组元素进行组合  从右到左
indexOf()		// 某个元素在数组中第一次出现的位置
lastIndexOf()	// 某个元素在数组中最后一次出现的位置
```

#### 注意点
```js
map() 对数组中的每一个元素进行处理，如果元素是一个引用值，想要返回完整的一个数组，请不要直接return
```

![ES5数组新增方法](/ecma/es5.svg)

### 7 Function

#### ① 属性

```js
length // 这里获取的是函数的形参个数
prototype // 构造函数实例的原型	
```

#### 方法

```js
call()	// 在调用函数的同时设置this的指向；  call任意参数，第一个参数就是 this 的指向
apply() // 在调用函数的同时设置 this 的指向； apply两个参数，第一个参数是 this 的指向，第二个是数组
bind()	// 返回新的函数，新函数内的 this 已经被重新设置了 （ES5新增的）1. bind 不会让方法执行 2. 返回值的function，返回的 function 里面的 this 已经修改了
```

### 8 Object对象

> Object广义来讲就是一个对象，是所有 js对象的一个公有祖先

```js
Object.keys() // 返回对象属性名组成的数组
Object.assign() // 合并对象,返回合并后的对象
Object.defineProperties() // 定义/修改对象的属性，并返回此对象
Object.defineProperty() // 定义/修改对象的属性，并返回此对象,只是参数不同
Object.getOwnPropertyName() // 返回一个由指定对象的所有自身属性的属性名,(不含Symbol值的属性名)
Object.create() // 创建一个新对象，可以指定其原型，传递null则会创建一个空白的对象
Object.freeze() // 冻结一个对象，使得这个对象不能被修改了，可以用来提升性能
Object.fromEntries() // 将一个二维由的数组，转成对象的键值对
Object.getOwnPropertyDescriptor() // 获取对象的属性,返回这个属性描述符对象，如果第一个参数不是对象，会报错，会被强制转为对象
Object.getOwnPropertyDescriptors() // 方法用来获取一个对象的所有自身属性的描述符。
Object.getOwnPropertySymbols() // 方法返回一个给定对象自身的所有 Symbol 属性的数组。
Object.getPrototypeOf() // 获取对象的原型
Object.is() // 方法判断两个值是否为同一个值。
Object.isExtensible() // 方法判断一个对象是否是可扩展的(是否可以添加新的属性)
Object.isFrozen() // 方法判断一个对象是否被冻结。
Object.preventExtensions() //将一个对象变成不可扩展，同时也会变成个密封对象.
Object.isSealed() // 方法判断一个对象是否被密封。
Object.setPrototypeOf() // 方法设置一个指定的对象的原型
Object.values() // 方法返回一个给定对象自身的所有可枚举value的数组
```

```js
// 实例方法
valueOf() // ：返回当前对象对应的值。  
toString() // ：返回当前对象对应的字符串形式。  
toLocaleString() // ：返回当前对象对应的本地字符串形式。  
hasOwnProperty() // ：判断某个属性是否为当前对象自身的属性，还是继承自原型对象的属性。 
isPrototypeOf() // ：判断当前对象是否为另一个对象的原型。
propertyIsEnumerable() // ：判断某个属性是否可枚举。
```




### 9 Global对象

```js
// global是ECMAScript就有的全局对象
// window是浏览器提供的全局对象，在一定意义在他们两是相等
// 比如在 node 的环境下，就是 global ,并没有 window的说法，并且 node 中是没有 DOM 和 BOM的

escape() // 把中文和特殊符号转为unicode编码
unescape() // unicode解码
eval()  // 把字符串当做代码执行（不建议）
```


### 10 JSON对象

> json 是一种数据格式，也是一个对象

```js
parse()   // 把json格式的字符串转为数组或对象
stringify()  // 把对象或数组转为json格式的字符串
var obj = eval ("(" + txt + ")"); // 还可以使用 eval 将字符串转成对象【不推荐使用】

// 注意点：使用 `parse()` 解析的不是一个合法的数据类型会报错
// toJSON 在你调用 `JSON.stringify()`转为json数据时，会被调用，可以过滤数据
```
## 严格模式

```js
'use strict';  //开启严格模式
```

```txt
严格模式，有些JS的老旧不可用
	声明必须使用var
	eval() 无法执行字符串代码
```
