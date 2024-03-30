---
title: Webpack4.x：配置出口(output)
date: '2024-03-29'
categories:
  - 构建工具
tags:
  - webpack
publish: true
---

[webpack 文档](https://webpack.docschina.org/configuration/)


webpack 的 output 配置项用于指定打包后的输出文件的相关配置，主要包括以下几个常用配置选项：

1.  **path**：指定输出文件的存放路径，是一个字符串类型的绝对路径。

        ```json

          module.exports = {

    //...
    output: {
    path: path.resolve(\_\_dirname, 'dist/assets')
    }
    };
    ```

2.  **filename**：指定输出文件的名称，可以包含占位符（placeholders），比如 `[name]` 用于指代入口文件的名称。

```json
module.exports = {
//...
output: {
  filename: 'bundle.js'
}
};

```

3. **publicPath**：表示资源(assets)被引用的根路径，在生产环境下生效；可以是相对路径，也可以是绝对路径；

```json
  publicPath: './',   // 相对于index.html获取资源
  publicPath: '/assets/',   // 从当前服务器根路径获取资源
  publicPath: 'https://cdn.example.com/assets/' // 从https://cdn.example.com/assets/ 获取资源


  <script src="./app.js"></script>
  <script src="/assets/app.js"></script>
  <script src="https://cdn.example.com/assets/app.js"></script>
```

4. **chunkFilename**：用于指定输出文件的名称, 比如 `[name].[contenthash].chunk.js`

5. **library**：如果需要将输出文件作为一个库来使用，可以通过该选项指定库的名称。
   在 webpack 中，`library` 选项用于指定如何导出 library，以便在其他项目或环境中使用。通过配置 `library`，你可以将你的代码打包成一个库（library），使其可以被其他模块引入并使用。

```json
    module.exports = {
//...
output: {
  library: 'MyLibrary'
}
};

```

`library` 可以配置为一个字符串或对象，具体取决于你希望如何导出你的库。以下是一些常见的用法：

1. **将库暴露给全局变量**：通过设置 `library` 为一个字符串，可以将库暴露为一个全局变量，从而可以在浏览器环境下直接访问该库。

   ```javascript
   module.exports = {
     output: {
       library: 'MyLibrary',
     },
   }
   ```

2. **将库暴露给 CommonJS 模块**：通过设置 `library` 为一个对象，可以将库暴露为一个 CommonJS 模块，以便在 Node.js 等环境中使用。

   ```javascript
   module.exports = {
     output: {
       library: {
         type: 'commonjs2',
         name: 'MyLibrary',
       },
     },
   }
   ```

3. **将库暴露给 AMD 模块**：也可以将库暴露为一个 AMD 模块，以便在浏览器环境中使用 RequireJS 等模块加载器。
   ```javascript
   module.exports = {
     output: {
       library: {
         type: 'amd',
         name: 'MyLibrary',
       },
     },
   }
   ```

通过配置 `library`，你可以根据需要将你的代码打包成不同类型的库，并指定如何在不同环境下使用这个库。这样可以更灵活地管理和共享你的代码。

6. **libraryTarget**：指定以何种方式导出库，比如 commonjs、amd、umd 等。

```json
    webpack 中的 `libraryTarget` 配置项用于指定以何种方式导出库。当你将打包后的文件作为一个库供他人使用时，`libraryTarget` 非常有用。以下是一些常见的 `libraryTarget` 可选项：

    1. **var**：将库暴露为一个变量，适用于浏览器环境。
    2. **commonjs**：将库暴露为 CommonJS 模块，适用于 Node.js 环境。

    3. **commonjs2**：和 commonjs 类似，但返回的是 module.exports.default。

    4. **amd**：将库暴露为 AMD 模块，适用于 RequireJS 等 AMD 加载器。

    5. **umd**：通用模块定义，可以在 CommonJS、AMD 和全局变量使用。

    6. **this**：将库绑定到 this 上，适用于全局变量和 CommonJS 模块。

    7. **window**：将库暴露为全局变量，在浏览器中使用。

    通过设置 `libraryTarget`，你可以根据需要选择合适的导出方式，以确保你的库能够在不同的环境中被正确引用和调用。这样可以增加库的灵活性和可移植性，使其更易于被其他开发者使用。

```

7. **pathinfo**：指定是否在输出文件中包含有关模块路径信息。

```json
    值为 true 或者 false.

    默认 webpack 会在输出的 bundle 中生成路径信息，设置为false将路径信息删除可小幅提升构建速度。

```

8. **sourceMapFilename**：指定输出的 source map 文件名称。

```json
    在 webpack 中，`sourceMapFilename` 选项用于指定生成的 source map 文件的名称。source map 是一种文件，其中包含了原始源代码和转换后的代码之间的映射关系，它能够帮助开发者在调试阶段更容易地定位到源代码中的问题。

    通过配置 `sourceMapFilename`，你可以指定生成的 source map 文件的名称和路径。通常情况下，你可以使用占位符（placeholders）来动态地生成文件名，比如 `[name]`、`[id]`、`[hash]` 等。

    例如，如果你设置了 `sourceMapFilename` 为 `sourcemap/[file].map`，那么生成的 source map 文件会被放置在一个名为 `sourcemap` 的目录下，并且文件名会与对应的 JavaScript 文件名相同，只是后缀变为 `.map`。

    正确配置 `sourceMapFilename` 可以帮助你管理和组织生成的 source map 文件，使其与对应的 JavaScript 文件关联并且易于在调试时使用。

```

9. **assetModuleFilename** 是 webpack 配置中用来指定生成的静态资源文件名规则的一个选项

```json
    `assetModuleFilename` 是 webpack 配置中用来指定生成的静态资源文件名规则的一个选项。通过配置 `assetModuleFilename`，可以控制 webpack 如何命名生成的资源文件，比如图片、字体等。

例如，可以这样配置 `assetModuleFilename`：

  module.exports = {
    //...其他配置
    output: {
      assetModuleFilename: 'images/[name][ext]'
    }
  };
上面的配置将会把所有的静态资源文件都放在 `images` 文件夹下，文件名保持原始文件名不变，这样生成的图片文件就会被命名为 `images/example.jpg`。根据具体需求，你可以根据自己的项目结构和规范来配置 `assetModuleFilename`。

```

10. **auxiliaryComment** 为生成插入注释

11. **chunkLoadTimeout** chunk 请求到期毫秒数，默认为 120 000

```json
  在 webpack 中，`chunkLoadTimeout` 是用来指定加载代码块（chunk）的超时时间的选项。当使用动态导入（dynamic import）或 `import()` 来异步加载代码块时，如果加载超时，webpack 将会采取相应的处理方式。

通过配置 `chunkLoadTimeout`，你可以指定加载代码块的超时时间，单位是毫秒。如果代码块在指定的超时时间内没有成功加载，webpack 将会触发相应的处理逻辑，比如显示错误信息或者执行其他自定义的操作。

例如，你可以这样配置 `chunkLoadTimeout`：

module.exports = {
  //...其他配置
  performance: {
    chunkLoadTimeout: 120000
  }
};

在上面的配置中，`chunkLoadTimeout` 被设置为 120000 毫秒（即 2 分钟）。这意味着如果一个代码块加载超过 2 分钟仍未完成，webpack 将会触发相应的性能处理逻辑。

通过合理配置 `chunkLoadTimeout`，你可以控制代码块加载的超时行为，从而优化用户体验和应用程序的性能。


```

12. **crossOriginLoading**

```json
在 webpack 中，`crossOriginLoading` 是用于配置加载跨域资源的选项。当你需要从不同源加载资源时（比如从 CDN 加载 JavaScript 文件），可以通过配置 `crossOriginLoading` 来指定在加载这些资源时使用何种跨域策略。

具体而言，`crossOriginLoading` 可以设置为以下几种值：

- `"anonymous"`：表示以匿名方式加载跨域资源，不发送用户凭据（如 cookie）。
- `"use-credentials"`：表示以使用凭据的方式加载跨域资源，会发送用户凭据（如 cookie）。

例如，你可以这样配置 `crossOriginLoading`：

module.exports = {
  //...其他配置
  output: {
    crossOriginLoading: 'anonymous'
  }
};

在上面的配置中，`crossOriginLoading` 被设置为 `'anonymous'`，意味着在加载跨域资源时将以匿名方式进行加载。

通过合理配置 `crossOriginLoading` 选项，你可以控制 webpack 在加载跨域资源时的行为，确保符合安全性和性能的要求。

```

13. **jsonpScriptType**

```json
在 webpack 中，`jsonpScriptType` 是一个配置选项，用于指定动态加载的 JSONP 脚本标签的 `type` 属性。JSONP（JSON with Padding）是一种跨域数据请求方式，通常用于在浏览器中进行跨域数据获取。

通过配置 `jsonpScriptType`，你可以指定 webpack 在动态加载代码块时使用的 JSONP 脚本标签的 `type` 属性，以便适应不同环境或需求。

例如，你可以这样配置 `jsonpScriptType`：


module.exports = {
  //...其他配置
  output: {
    jsonpScriptType: 'module'
  }
};


在上面的配置中，`jsonpScriptType` 被设置为 `'module'`，表示在动态加载代码块时将使用带有 `type="module"` 属性的 JSONP 脚本标签。

通过合理配置 `jsonpScriptType` 选项，你可以控制 webpack 在动态加载代码块时生成的 JSONP 脚本标签的 `type` 属性，以适配不同的场景和需求。

```

14. **libraryExport**

```json
在 Webpack 中，`libraryExport` 是一个配置选项，用于指定库导出暴露的内容。当你打包一个库（Library）时，可以使用 `libraryExport` 来指定哪些模块或变量会被导出给用户使用。

常见的用法是将 `libraryExport` 配置为导出某个模块中的特定变量或函数。例如，如果你的库有一个入口文件 `index.js`，并且你想要导出该文件中的特定函数 `myFunction`，你可以这样配置：

module.exports = {
  //...其他配置
  output: {
    library: 'MyLibrary',
    libraryTarget: 'umd',
    libraryExport: 'myFunction'
  }
};

在上面的配置中，`libraryExport` 被设置为 `'myFunction'`，表示只导出 `index.js` 中的 `myFunction` 函数。这样，在使用你的库时，用户只能访问到 `myFunction` 这个函数。

通过合理配置 `libraryExport`，你可以控制库打包后向外暴露的内容，确保用户可以方便地访问到他们需要的部分。

```
