---
title: 8-16 web Components
date: '2022-08-16'
categories:
    - javascript
tags:
    - javascript
publish: true
---

浏览器原生支持的组件化，听说 Vue 也是借鉴了原生组件的思想

组件是前端的发展方向，现在流行的 React 和 Vue 都是组件框架。 谷歌公司由于掌握了 Chrome 浏览器，一直在推动浏览器的原生组件，即 Web Components API。相比第三方框架，原生组件简单直接，符合直觉，不用加载任何外部模块，代码量小。目前，它还在不断发展，但已经可用于生产环境。

1. 这种自定义的 HTML 标签，称为自定义元素（custom element）。根据规范，自定义元素的名称必须包含连词线，用与区别原生的 HTML 元素。所以，`<user-card>`【组件名】不能写成`<usercard>`。
2. customElements.define(string,class) 告诉浏览器定义了一个自定义的类
3. class 类中的 this 代表自定义元素实例，完成这一步以后，自定义元素内部的 DOM 结构就已经生成了。
4. Web Components API 提供了`<template>`标签，可以在它里面使用 HTML 定义 DOM。
5. 可以通过 props 的方式，往组件中传递自定义的属性
6. 我们不希望用户能够看到`<user-card>`的内部代码，Web Component 允许内部代码隐藏起来，这叫做 Shadow DOM ,自定义元素的 `this.attachShadow()` 方法开启 Shadow DOM，

## 1. 案例

```js
class JmButton extends HTMLElement {
    static get observedAttributes() {
        return ['@click']
    }

    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: 'open' })
        shadowRoot.innerHTML = `
            <style>
                .jm__button {
                    display: inline-block;
                    text-align: center;
                    width: 120px;
                    height: 42px;
                    line-height: 42px;
                    font-size: 14px;
                    color: white;
                    border-radius: 20px;
                    background-color: #f90;
                    border: none;
                    outline: none;
                    cursor: pointer;
                }
            </style>
            <button class="jm__button">按钮</button>
        `
    }

    get handleClick() {
        return this.getAttribute('@click')
    }

    connectedCallback() {
        this.addEventListener('click', function () {
            console.log('this.addEventListener')
        })

        const btn = this.shadowRoot.querySelector('.jm__button')

        btn.addEventListener('click', function () {
            console.log('btn.addEventListener')
            console.log(this.handleClick)
        })
    }
}

if (!customElements.get('jm-button')) {
    customElements.define('jm-button', JmButton)
}
```
