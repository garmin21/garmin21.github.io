---
title: RegExp 正则
author: 李嘉明
createTime: 2024/05/26 21:13:46
permalink: /defensive-javascript/64dyxuj5/
---

### 属性

- global		RegExp 对象是否具有标志 g。	
- ignoreCase	RegExp 对象是否具有标志 i。	
- lastIndex	一个整数，标示开始下一次匹配的字符位置。	
- multiline	RegExp 对象是否具有标志 m。	
- source		正则表达式的源文本。

### 方法
- exec()		检索字符串中指定的值。返回找到的值，并确定其位置。	
- test()		检索字符串中指定的值。返回 true 或 false。

### 1.1 在JS中如何定义正则

```js
//第一种 直接量
var reg = /hello/;

// 第二种 转换函数
var reg = RegExp('hello');

// 第三种 构造函数方式
var reg = new RegExp('hello');
```

### 1.2 字符串对象提供的方法

```js
search(reg | str)   	返回第一个匹配的字符串的位置，没有匹配返回-1
match()		返回数组，数组成员是第一个匹配的内容和模式单元匹配的内容；// 如果全局模式，数组中是每一个匹配到的内容。 匹配不成功null
replace(reg | fn)	替换。// 默认只替换一个，全局模式替换所有； 与模式单元配合反向引用。
split()     把字符串分割为数组。可以用正则指定多个分隔符。
```

### 1.3 RegExp对象提供的方法

```js
test()  匹配成功true，匹配不成功false
exec()	返回数组，数组成员是第一个匹配的内容和模式单元匹配的内容；
// 全局模式没用；匹配不成功null 应用场景为匹配url
```

## 3. 正则的基本语法

### 3.1 原子

```js
原子是正则表达式的最基本组成单位
正则表达式由 原子 和 对原子的修饰组成
// 一个原子匹配一个字符,多个原子匹配多个字符
```

#### 1⃣️ 任意一个字符都是原子

```
任意的字母、数字、标点符号以及需要转义的特殊字符 都是原子
```

#### 2⃣️ 具有特殊意义的原子

```js
有些符号在正则表达式中具有特殊意义，如果要匹配符号本身，加转义 `\`
```

 #### 3⃣️ 字符类

```json
// todo 整个[]相当于一个原子
[...]  匹配指定的任意一个字符  例: [abcd] [a-z] [a-zA-Z0-9] 
[^...] 匹配除了指定字符之外的任意一个字符  例：[^abc_%]  [^a-z]  [^a-zA-Z0-9_$]
.	  匹配除了换行符之外任意一个字符 [^\n]
\w	  匹配任意一个数字、字母或者下划线  [a-zA-Z0-9_]
\W	  匹配除了数字、字母、下划线之外的任意字符     [^a-zA-Z0-9_]
\d	  匹配任意一个数字		[0-9]
\D    匹配任意一个非数字    [^0-9]
\s	  匹配任意一个空白字符   [\n\t\v\f\r ]
\S    匹配任意一个非空白字符  [^\n\t\v\f\r ]
```

```js
//特殊意义原子
console.log('hello'.search(/./)); // 0
console.log('he.llo'.search(/\./)); // 2

//字符类
console.log(''.search(/./)); // 空字符串没有原子 -1
console.log('\n'.search(/./)); // -1
console.log('\nabc'.search(/./)); // 1

console.log('abc'.search(/[bcd]/)); // 1
console.log(/[abc]/.exec('apple')); // a
console.log(/[^abc]/.exec('apple')); // p

console.log(/[a-z]/.exec('apple')); //匹配任意一个小写字母 // a
console.log(/[a-zA-Z]/.exec('HellWorld')); //匹配任意一个大小写字母 // H
console.log(/[a-zA-Z0-9_$]/.exec('HellWorld')); //匹配任意一个大小写字母或数字或下划线或$ // H
console.log(/[^a-zA-Z]/.exec('Hell World')); //匹配任意除了大小写字母 // ""
		

console.log(/\w/.exec('我100hello')); // 1
console.log(/\W/.exec('我100hello')); // 我
console.log(/\W/.exec('100hello')); // null


console.log(/\d/.exec('hello100')); // 1
console.log(/\D/.exec('hello100')); // h

console.log(/\s/.exec('hello world')); // ""
console.log(/\s/.exec('hello\nworld')); // \n
console.log(/\s/.exec('hello\tworld')); // \t
console.log(/\S/.exec('hello\tworld')); // h
console.log(/hello/.exec('hello world'));// hello

```



### 3.2 原子的数量修饰【不会参与匹配】

#### 1⃣️ 数量修饰符

```
{n}    前面的原子连续出现n次
{n,m}  前面的原子连续出现n次到m次
{n,}   前面的原子连续出现n次以及以上
?	     前面的原子0次或一次   {0,1}
+	     前面的原子出现1次以及以上  {1,}
*	     0次、1次或多次任意次  {0，}     
万能匹配： /[.\n]*/
```

```js
console.log(/h{5}llo/.exec('hello')); // null
console.log(/h{5}llo/.exec('hellohhhh')); // null
console.log(/h{5}llo/.exec('hhhhhel')); // null
console.log(/h{5}llo/.exec('hhhhhllo')); // hhhhhllo
```



#### 2⃣️ 贪婪匹配

```
尽可能多的匹配
阻止贪婪匹配  在数量修饰符的后面加个?
```

```js
console.log(/\w{2,6}/.exec('helloworld')); // hellow
console.log(/\w{2,6}?/.exec('helloworld')); // he
console.log(/\w?/.exec('helloworld')); // h
console.log(/\w??/.exec('helloworld')); // ''
console.log(/\w+?/.exec('helloworld')); // h
```



### 3.3 原子的位置修饰【不会参与匹配】

#### 1⃣️ 单词边界

```js
\b	单词边界 （空格、标点符号、字符串的开始和结束、换行）
\B	非单词边界

// 单词边界不参与匹配,只代表一种位置修饰
// 看看当前原子是否有单词边界
```

```js
console.log(/\bre/.exec('express result are')); // ['re', index: 8]
console.log(/re\b/.exec('express result are')); // ['re', index: 16]

console.log(/\bre\b/.exec('express result are')); // null
console.log(/\bre\b/.exec('express,re\nresult are')); // ['re', index: 8]

console.log(/hello\bworld/.exec('hello world')); // null
console.log(/hello\b world/.exec('hello world')); // ['re', index: 8]

console.log(/re\B/.exec('express result are')); // ['re', index: 3]
console.log(/\bre\B/.exec('express result are'));// ['re', index: 8]
console.log(/\Bre\B/.exec('express result are')); // ['re', index:3]
```



#### 2⃣️ 字符串边界

```js
^	字符串开始边界  
$   字符串结束边界

// 做验证的时候很有用，
// 必须要第个原子开始，最后一个原子结束才匹配
```

```js
console.log(/hello/.exec('我和你 hello world')); // ['hello', index: 4]
console.log(/^hello$/.exec('我和你 hello world')); // null
console.log(/^hello$/.exec('hello'));// ['hello', index: 0]
console.log(/^hello$/.exec('hello world')); //null
console.log(/^hello/.exec('hello world')); // ['hello', index: 0]
```



### 3.4 选择修饰符【不会参与匹配】

``` js
|   类似于逻辑或
/apple|orange/ 匹配 apple或者orange
```

```js
var reg = /apple|orange/;
console.log(reg.exec('apple'));// ['apple', index:0]
console.log(reg.exec('orange'));//['orange', index:0]
console.log(reg.exec('applerange'));//['apple', index: 0]
```



### 3.5 模式单元 （）

```js
① 改变优先级
② 把多个原子当做一个整体
③ 会把模式单元匹配的内容暂存内存； 如果不想暂存内存 (?:)
④ 反向引用。 str.replace()方法中可以使用反向引用。
// 使用$N进行储存匹配内容
```

```js
//优先级变高
console.log(/appl(e|o)range/.exec('apple')); // null
console.log(/appl(e|o)range/.exec('orange')); // null
console.log(/appl(e|o)range/.exec('applerange'));// ['applerange','e', index: 0]
console.log(/appl(e|o)range/.exec('applorange'));// ['applerange','o', index: 0]

//把多个原子当做一个整体
console.log(/apple{3}/.exec('appleee'));//['appleee', index:0]
console.log(/(apple){3}/.exec('appleappleapple'));//['appleappleapple','apple',index:0]

//模式单元的内容，会暂存内存;会把模式单元的内容单独匹配出来
console.log(/apple/.exec('apple')); //['apple', index:0]
console.log(/a(pp)l(e)/.exec('apple'));//['apple','pp','e',index:0]

//告诉模式单元不暂存内存
console.log(/a(pp)l(?:e)/.exec('apple')); // ['apple','pp',index:0]

//反向引用 str.replace() 在使用模式单元后，可以使用 $1-9 表示获取的内容
```



### 3.6 先行断言/后行断言 （位置修饰）

```js
// 匹配一段原子，但要求后面必须紧跟另一段原子，否则不匹配
正向先行断言：  原子(?=)   正向预查
// 匹配一段原子，但要求后面不能是另一段原子，否则不匹配
负向先行断言：  原子(?!)   反向预查  
// 匹配一段原子，但要求前面是另一段原子，否则不匹配
正向后行断言：  (?<=)原子
// 匹配一段原子，但要求前面不能是另一段原子，否则不匹配
负向后行断言:   (?<!)原子
```

```js
// 断言本质上是位置修饰，不参与匹配。

// 正向先行断言
// 匹配apple,要求apple后面是orange
console.log(/apple(?=orange)/.exec('apple')); //null
console.log(/apple(?=orange)/.exec('appleorange')); //apple
console.log(/apple(?=orange)apple/.exec('appleorangeapple')); //null
console.log(/apple(?=orange)orange/.exec('appleorangeapple')); //appleorange

// 负向先行断言
// 匹配apple，要求apple的后面不能是orange
console.log(/apple(?!orange)/.exec('apple'));//apple
console.log(/apple(?!orange)/.exec('appleorange'));  // null

// 正向后行断言
// 匹配apple，要求apple的前面 是banana
console.log(/(?<=banana)apple/.exec('apple'));//null
console.log(/(?<=banana)apple/.exec('bananaapple')); //apple

// 负向后行断言
//匹配apple要求前面不能是 banana
console.log( /(?<!banana)apple/.exec('apple') );//apple
console.log( /(?<!banana)apple/.exec('bananaapple') );  //null
```

> 先行断言在后，后行断言在前。
>
> 要求紧跟，要求不紧跟

### 3.7 修饰符（模式修正符） （修饰整个正则表达式）

```js
i  不区分大小写
g  全局匹配
m  多行模式。 // 在多行模式下，换行被可以被当做字符串边界

// 修饰的是整个正则
```





















































