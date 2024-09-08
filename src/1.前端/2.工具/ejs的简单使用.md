---
title: ejs的简单使用
author: 李嘉明
createTime: 2024/04/27 10:36:15
permalink: /article/h3wxj0bc/
tags:
  - 工具
---

## 什么是 EJS?

:::tip
EJS 是一种简单的模板语言，可让您使用纯 JavaScript 生成 生成 HTML 标记，也可以在程序中动态 替换某一段内容，输出替换后的文件。
:::

## 特征

- 快速编译和渲染
- 简单模板标签： <% %>
- 自定义分隔符（例如，使用 [？ ？] 而不是 <% %>）
- 子模板包括
- 随 CLI 一起提供
- 服务器 JS 和浏览器支持
- 中间 JavaScript 的静态缓存
- 模板的静态缓存
- 符合快速视图系统

## 安装

如果你只是简单在 html 中使用 ,可以使用 CDN 服务

```html
<html lang="en">
  <body>
    <!-- 加载CDN -->
    <script src="https://cdn.jsdelivr.net/npm/ejs@3.1.10/ejs.min.js"></script>

    <!-- 定义一个模板内容 -->
    <script type="text/ejs" id="myTemplate">
      <p>My name is <%= name %></p>
    </script>
    <!-- 定义输出 -->
    <div id="output"></div>

    <script>
      // 使用 ejs 的 进行转换
      var template = document.getElementById('myTemplate').innerHTML
      var renderedTemplate = ejs.render(template, { name: 'John' })
      document.getElementById('output').innerHTML = renderedTemplate
    </script>
  </body>
</html>
```
如果是在 项目中 通过 你可以通过任何包管理器 安装

```bash
npm install ejs --save

```


## 三种模式


1. 编译模式

```js
let template = ejs.compile(str, options);
console.log(template(data))
```

2. 渲染模式

```js
const template = ejs.render(str, data, options);
console.log(template)
```

3. 读取模式

```js
ejs.renderFile(filename, data, options, function(err, str){
   // str => Rendered HTML string
});
```

::: caution
大多数 EJS 将按预期工作;但是，有几点需要注意：
1. 由于您无权访问文件系统，因此“ejs.renderFile”将不起作用
2. 出于同样的原因，除非使用 include 回调，否则 include 不起作用。下面是一个示例：

```js
let str = "Hello <%= include('file', {person: 'John'}); %>",
      fn = ejs.compile(str, {client: true});

fn(data, null, function(path, d){ // include callback
  // path -> 'file'
  // d -> {person: 'John'}
  // Put your code here
  // Return the contents of file as a string
}); // returns rendered string
```
:::


## options 选项

```json
cache编译的函数是缓存的，需要filename
filename用于键缓存，用于 includescache
root使用绝对路径（例如，/file.ejs）设置包含的项目根目录。可以是数组来尝试解析包含来自多个目录。
views解析包含相对路径时要使用的路径数组。
context函数执行上下文
compileDebug未编译调试检测时false
client返回独立编译函数
delimiter用于内部分隔符的字符，默认为“%”
openDelimiter用于分隔符的字符，默认为“<”
closeDelimiter用于结束分隔符的字符，默认为“>”
debug输出生成的函数体
strict当设置为“true”时，生成的函数处于严格模式
_with是否使用构造。如果那样的话，局部变量将存储在对象中。（暗示 '--strict'）with() {}falselocals
localsName不使用 Defaults to 时用于存储局部变量的对象的名称withlocals
rmWhitespace删除所有可安全删除的空格，包括前导和尾随空格。它还为所有 scriptlet 标记启用更安全的行啜泣版本（它不会在行中间剥离新的标记行）。-%>
escape与 construct 一起使用的转义函数。它用于渲染，并用于生成客户端函数。（默认情况下转义 XML）。<%=.toString()
outputFunctionName设置为字符串（例如，或），以便函数在 scriptlet 标记中打印输出。'echo''print'
async当 时，EJS 将使用异步函数进行渲染。（取决于 JS 运行时中的 async/await 支持。true

```

## 标签

```json
<%'Scriptlet' 标签，用于控制流，无输出
<%_'whitespace Slurping' Scriptlet 标签，剥离其之前的所有空格
<%=将值输出到模板中（HTML 转义）
<%-将未转义的值输出到模板中
<%#注释标签，无执行，无输出
<%%输出文字“<%”
%>普通结束标签
-%>修剪模式（'newline slurp'）标记，在换行符之后修剪
_%>“空格啜饮”结束标签，删除其后的所有空格

```

更多理解，需要查看文档[EJS](https://ejs.co/#docs)