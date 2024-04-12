---
title: Gulp 入门
author: 李嘉明
createTime: 2024/04/12 03:40:46
permalink: /learn-build/gulp-start/
---

## 1、Gulp 介绍

Gulp 本身并不支持特定格式的文件，它只关心流 (Stream) 的处理。因此，您可以使用 Gulp 处理任何类型的文件，只需要使用适当的插件来解析或转换它们。
例如，您可以使用 `gulp-sass` 插件来编译 Sass 文件，使用 `gulp-typescript` 插件来编译 TypeScript 文件，使用 `gulp-babel` 插件来转换 ES6 语法等等。只要为您想要处理的文件类型选择合适的插件并配置适当的任务，Gulp 就能够处理它们。
需要注意的是，Gulp 更擅长处理文本文件，如 HTML、CSS、JS、JSON 等，而不是二进制文件 (如图片、视频等)。对于后者，您可能需要使用其他工具来处理。

## 2、重要 API 介绍

-   gulp.task(name, [deps], fn)

    -   => 语法: gulp.task( '任务名称', 函数 )
    -   => 作用: 创建 一个 任务 , 函数内书写该任务需要执行的代码
    -   => 例子: gulp.task('cssHandler', ( ) => { 根据 gulp 的语法对 css 文件进行打包 })

-   gulp.src(filePath/pathArr)

    -   => 语法: gulp.src( '路径地址' )
    -   => 作用: 标注源文件所在目录
    -   => 路径地址:

    ```
    ./src/css/a.css     指定找到某一个 css 文件
    ./src/css/*.css     指定找到 css 目录下的所有 .css 结尾的文件
    ./src/*/**          指定找到 src 目录下的所有文件
    ./src/*/*.css       指定找到 src 目录下的所有文件夹内的所有 .css文件
    ** /*               所有文件夹下的所有文件
    ```

    -   => 返回值: gulp 任务流

-   gulp.pipe(gulp 任务流)

    -   => 语法: 需要 gulp 任务流.pipe( 下一个工作内容 )
    -   => 作用: 管道函数 , 用来执行各项工作内容的

-   gulp.dest(dirPath/pathArr)

    -   => 语法: gulp.dest( '路径' )
    -   => 作用: 把前面一个流传递来的内容放在指定目录文件夹下

-   gulp.watch()

    -   => 语法: gulp.watch( 源'文件'路径, 任务名称 )
    -   => 作用: 监控 指定源文件, 只要文件发生任何改变, 就执行一遍 指定任务

-   gulp.series()

    -   => 语法: gulp.series( 任务 1, 任务 2, 任务 3, ... )
    -   => 作用: **串行** 执行每一个任务
    -   -> 前一个任务做完, 在做下一个任务

-   gulp.parallel()
    -   => 语法: gulp.parallel( 任务 1, 任务 2, 任务 3, ... )
    -   => 作用: **并行** 开始每一个任务
    -   -> 所有任务同时开始

## 3、创建一个简单的应用

### 项目目录

```txt
|- dist
|- build
|- src
  |- js
  |- less
|- index.html
|- gulpfile.ts ----- gulp配置文件
|- package.json
```

### 安装 gulp

-   pnpm add gulp -D 局部安装
-   pnpm add @types/gulp -D gulp ts 类型支持
-   pnpm add sucrase -D gulp 默认是不支持 ES6 的语法，sucrase 默认提供了对 ES6 的语法 的转换

### 新增 `gulpfile.ts`

```ts
//引入gulp模块
import { task, series } from 'gulp'

//定义任务
task('任务名', () => {
    // TODO: 将你的任务的任务代码放在这， 运行一个任务可以通过 gulp [任务名] 执行
})

//定义默认任务
task('default', () => {})

// or

// series 串行
series(
    () => {
        // 对sass文件做处理
    },
    () => {
        // 把打包好的css输出到根目录的dist
    }
)
```

在`package.json` 中 新增打包命令

```json
"scripts": {
    "build": "gulp", // gulp default
    "build:css": "gulp build:css" // gulp build:css
}

```

## 参考

[中文主页](http://www.gulpjs.com.cn/)
