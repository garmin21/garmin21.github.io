---
title: 8-05 css-utils-style
date: '2022-08-05'
categories:
    - CSS
tags:
    - CSS
publish: true
---

### 1. 清除移动端点击按钮的背景

```less
.update-tab-bg() {
    -webkit-tap-highlight-color: transparent;
    -webkit-user-select: none;
    -moz-user-focus: none;
    -moz-user-select: none;
}
```

### 2. 文字显示特定行数，多余的显示省略号

```less
.text-line-clamp(@row: 2) {
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    overflow: hidden; /** 隐藏超出的内容 **/
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: @row; /** 显示的行数 **/
}
```

### 3. 自定义数字框

```less
.clear-number-style() {
    &[type='number'] {
        outline: none; /*去掉外边框*/
        -moz-appearance: textfield; /*给火狐浏览器去掉上下加减号*/
    }
    /*数字框旁边的加减号去掉*/
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    // 去掉text 文本框 在IE浏览器中的叉叉
    &::-ms-clear {
        display: none;
    }
}
```

### 4. 一像素的线

```less
.line(@color: #333) {
    height: 1px;
    overflow: hidden;
    background-color: @color;
}
```

### 5. 每逢大的灾难的时候，很多网站变成了灰色，如何让网站快速变灰？css 代码是很简单的，用的是 css 的 filter 功能。

```css
html {
    filter: grayscale(100%); //IE浏览器
    -webkit-filter: grayscale(100%); //谷歌浏览器
    -moz-filter: grayscale(100%); //火狐
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
    -webkit-filter: grayscale(1); //谷歌浏览器
}
```

### 6. DIV 可编辑，就是让一个 div 变成一个类似 input 输入框的效果。contentEditable="true" 属性

```html
<div id="div1" contenteditable="true"></div>
```

### 7. 有些网站为了不让用户复制，设置了 div 禁止选择的功能，设置如下属性：

```html
<div unselectable="on" onselectstart="return false;">不能复制</div>
```

### 8. 滚动条美化

```css
::-webkit-scrollbar {
    padding-left: 1px;
    background-color: #fafafa;
    overflow: visible;
    width: 9px;
}
::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1);
    background-clip: padding-box;
    border-left-width: 2px;
    min-height: 10px;
    box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.07);
}
::-webkit-scrollbar-thumb:vertical:hover {
    background-color: rgba(0, 0, 0, 0.2);
}
::-webkit-scrollbar-thumb:vertical:active {
    background-color: rgba(0, 0, 0, 0.2);
}
::-webkit-scrollbar-button {
    height: 0;
    width: 0;
}
::-webkit-scrollbar-track {
    background-clip: padding-box;
    border: solid transparent;
    border-width: 0 0 0 2px;
}
::-webkit-scrollbar-corner {
    background: transparent;
}
::-webkit-scrollbar-track-piece {
    margin: 10px 0;
    -webkit-border-radius: 0;
    -webkit-border-bottom-right-radius: 4px;
    -webkit-border-bottom-left-radius: 4px;
}
```

### 9. CSS 强制换行和不换行

```css
/* 自动换行 */
div {
    word-wrap: break-word;
    word-break: normal;
}
/* 强制英文单词断行 */
div {
    word-break: break-all;
}
/* 强制不换行 */
div {
    white-space: nowrap;
}
```
