---
title: ES6 Class 类
author: 李嘉明
createTime: 2024/07/07 17:27:43
permalink: /defensive-javascript/7omqypsu/
---

[阮一峰ES6文档](https://es6.ruanyifeng.com/#docs/class)

## Class 语法

### 定义类(构造函数)

```js
class 类名(构造函数名) {
    //定义属性 只声明
    name = null;
    age = null;

    //构造方法 实例化的时候自动调用，可以接受参数，给属性赋值
    constructor(name,age) {
        this.name = name;
        this.age = age;
    }

    //定义方法
    say() {

    }
    eat() {

    }

}
```

> **注意：**
>
> class 定义的类 本质还是个函数; 但是不能被调用，只能被实例化
>
> typeof 类名 === 'funciton'

### 实例化

```js
// 等同
new 类名();
new 类名(构造方法的参数);
```

> **注意：**
>
> ① 类中定义的属性会添加到实例上
>
> ② 类中定义的方法会添加到原型上

### 静态方法

```js
// 静态方法没有添加给实例，添加给构造函数（类）本身
class Person {
  static 方法名() {}
}

Person.方法名();
```

### 私有属性或方法

```js
// 私有目前还在提案中，并不是正规的语法规范
class Person {
  #name = 'jack';
  get name() {
    return this.#name;
  }
}
const p = new Person();
console.log(p.name); // jack
```

### getter 和 setter

```js
class Person {
  firstName = 'Tom';
  lastName = 'NiGulasi';

  get fullName() {
    return this.firstName + '·' + this.lastName;
  }

  set fullName(value) {
    this.firstName = value.split('·')[0];
    this.lastName = value.split('·')[1];
  }
}

let p = new Person();

p.fullName; //读写
```

### 继承

```js
1. 使用 extends 来继承
2. 继承之后：
	子类的实例的原型指向父类的一个实例
	子类自己的原型指向父类 (静态方法也可以继承)
3. 可以在子类上添加属性和方法
4. 在子类上重写父类的方法，子类重写的方法必须调用super()
```

```js
class 子类 extends 父类 {
  constructor() {
    super();
  }
}
```
