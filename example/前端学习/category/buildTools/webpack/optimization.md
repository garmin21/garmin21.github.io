---
title: Webpack4.x：配置优化(optimization)
date: '2024-03-29'
categories:
  - 构建工具
tags:
  - webpack
publish: true
---

[webpack 文档](https://webpack.docschina.org/configuration/)


1. `optimization.minimize`  压缩 bundle

告知 webpack 使用 TerserPlugin 压缩 bundle。

production 模式下，这里默认是 true。

  1. 布尔值
    ```json
      module.exports = {
        //...
        optimization: {
          minimize: false
        }
      };
    ```
  2. 使用插件
    ```json
      const TerserPlugin = require('terser-webpack-plugin');

      module.exports = {
        optimization: {
          minimizer: [
            new TerserPlugin({
              cache: true,
              parallel: true,
              sourceMap: true, // Must be set to true if using source-maps in production
              terserOptions: {
                // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
              }
            }),
          ],
        }
      };

    ```

    3. 函数
    ```json
      module.exports = {
        optimization: {
          minimizer: [
            (compiler) => {
              const TerserPlugin = require('terser-webpack-plugin');
              new TerserPlugin({ /* your config */ }).apply(compiler);
            }
          ],
        }
      };
    ```

2. `splitChunks`

```json
    在 Webpack 中，`splitChunks` 是用于配置代码分割（code splitting）的选项，用于将代码拆分成多个块，以便更好地利用浏览器的缓存机制和减少重复加载的代码量。通过合理配置 `splitChunks` 选项，可以优化项目的性能和用户体验。

以下是一个简单的 `splitChunks` 配置示例：

```javascript
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
```

上面的配置中包含了一些常用的 `splitChunks` 配置选项，主要包括：

- `chunks`: 指定哪些块需要被分割，可以是 `'all'`、`'async'`、`'initial'` 中的一个。
- `minSize`: 指定生成的块的最小大小。
- `maxSize`: 指定生成的块的最大大小。
- `minChunks`: 指定一个模块至少被引用的次数才会被单独拆分出来。
- `cacheGroups`: 定义了拆分规则，可以根据不同的规则将模块打包到不同的文件中，例如将第三方库打包到一个文件中。

通过合理配置 `splitChunks`，可以根据项目的特性和需求来优化代码拆分，提升页面加载性能和用户体验。

```