---
title: sass-resources-loader 配置全局 scss
author: 李嘉明
createTime: 2024/05/21 14:14:18
permalink: /article/65mmg5nm/
tags:
  - scss
---

我们在 `element-pro-vue` 中使用 scss ，我们发现，如果我们需要在每一个 vue 文件中使用 `BEM` 命名 mixin。采用原始的方式，我们需要再每一个 scss 文件的开头。导入 配置:

```scss
@import '@/path/to/_variables.scss';
@import '@/path/to/_mixins.scss';
```

这样再开发项目中，，频繁的引入变量让人难受，就想到可以作为全局引入方式，减少变量的引入。

## sass-resources-loader

loader 提供了将您的 SASS 资源加载到每个 required SASS 模块中。因此，您可以在所有 SASS 样式中使用共享变量、mixin 和函数，而无需在每个文件中手动加载它们

```bash
npm install sass-resources-loader
```

这里我使用的是 webpack5 ，所以我们在 webpack 的配置文件中进行配置：

注意: 在使用 sass-resources-loader 提供的配置中，他告诉我们要使用绝对路径

```js
function _resolve(_path) {
  return resolve(appDir, _path)
}

```

```js
{
    test: /\.(css|scss|sass)$/,
    use: [
        {
            loader: 'sass-resources-loader',
            options: {
                resources: [
                    _resolve('src/assets/scss/_global.scss'),
                    _resolve('src/assets/scss/_variables.scss')
                ]
            }
        }
    ],
},
```
