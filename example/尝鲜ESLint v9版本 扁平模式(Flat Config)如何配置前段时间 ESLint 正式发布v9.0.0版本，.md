尝鲜ESLint v9版本 扁平模式(Flat Config)如何配置
===================================

前言
--

前段时间 ESLint 正式发布v9.0.0版本，个人感觉最大的变化有两个：

*   改用扁平模式的配置文件`eslint.config.js`，弃用原有的`.eslintrc`以及`.eslintignore`。
*   弃用了**格式化**相关的规则，例如缩进、空格、空行、单双引号之类规则。

文本主要聚焦于新的配置方式，默认你熟悉旧的配置方式。

扁平模式配置（Flat Config）
-------------------

在以往的eslint配置模式下：

*   一个项目可以包含多个eslint配置文件，分散在项目不同的目录下，但这样往往会很难管理。
    
*   如果有额外配置规则，例如需要对vue配置eslint，还要对tsx配置eslint，这种情况下，除非全部使用继承(extends)，否则它们的规则将混杂在同一个rules中，很难维护。
    
*   插件和继承都只能通过npm包的方式导入，虽然也有一些办法能做到在本地进行扩展，但相对来说比较麻烦。
    

因此为了解决这些问题，从eslint 8.21开始，扁平模式应运而生。

### 基本配置方式

扁平模式下，所有配置都写在一个统一配置文件中：`eslint.config.js`或`eslint.config.cjs`或`eslint.config.mjs`，文件名称也相比以前更了然。

关于文件后缀，`.mjs` 需要用 ES Module 方式导出，`.cjs` 需要用 commonjs 方式导出，如果使用 `.js` ，则取决于`package.json`中的`type`字段，设为`module`就是前者，设为`commonjs`就是后者，默认也是后者。

配置文件需要默认导出一个数组，每一项是一个独立的配置对象：

js

 代码解读

复制代码

`// eslint.config.js import stylistic from '@stylistic/eslint-plugin' export default [     {         files: ["a/*.js"],         rules: {              'eqeqeq': ['error', 'always'],         }     },     {         files: ["b/*.js"],         plugins: { '@stylistic': stylistic },         rules: {             'eqeqeq': 'off',             '@stylistic/quotes': ['warn', 'single'],         }     } ];`

这里配置了两个对象，我们可以给a文件夹和b文件夹分别应用不同的规则。如果某个配置对象没有`files`字段，则该配置会对全局都生效。

如果多项配置对同一个文件配置了同一条规则，则位于数组后面的规则会覆盖位于数组前面的规则。

并且这里我们还给b文件夹配置了一个[ESLint Stylistic](https://link.juejin.cn?target=https%3A%2F%2Feslint.style%2F "https://eslint.style/")插件，它是从原本的eslint中分发出来承担**格式化**作用的插件。

### rules 规则

rules的配置方式和以往是一样的，只是增删了一些规则，具体有哪些规则，除了可以查看文档，我强烈推荐使用[@eslint/config-inspector](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Feslint%2Fconfig-inspector "https://github.com/eslint/config-inspector")，它目前已经被eslint内置，我们只需在项目中运行：

shell

 代码解读

复制代码

`npx eslint --inspect-config`

这样就会启动一个网页 ，可以很方便的查看已配置的插件和规则，它还对规则进行了分类，例如已弃用的、已使用的、未使用的、推荐的、可自动修复的等等，每项规则都附有简短的说明，并可以跳转至文档，一目了然。

![eslint-inspect.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0824fbace86248dda836330c31fe2f67~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1851&h=908&s=187740&e=png&b=111929)

Eslint官网上antfu写的关于这个工具的介绍：[Introducing ESLint Config Inspector - ESLint - Pluggable JavaScript Linter](https://link.juejin.cn?target=https%3A%2F%2Feslint.org%2Fblog%2F2024%2F04%2Feslint-config-inspector%2F "https://eslint.org/blog/2024/04/eslint-config-inspector/")

### ignores 忽略文件

以往的忽略文件是通过`.eslintignore`来配置，扁平模式下该方式被废弃，我们需要在`eslint.config.js`中配置ignores字段：

js

 代码解读

复制代码

`// eslint.config.js export default [     {         ignores: ['**/node_modules', '**/dist', '**/output']     },     {         files: ["**/*.js"],         rules: {              'eqeqeq': ['error', 'always'],         },         ignores: ['.config/config.js']     }, ]`

注意：

*   如果一个配置对象只有ignores没有其他字段，它会全局生效。
*   如果一个配置对象既有ignores也有rules，它只在该配置对象范围内生效。

### 继承

在扁平模式下，继承非常简单，例如：

js

 代码解读

复制代码

`// eslint.config.js import eslint_js from '@eslint/js' export default [     ...eslint_js.configs.recommended,     {         rules: {             // 自定义规则         }     } ]`

这里我们继承了`@eslint/js`提供的`recommended`（推荐）配置，它是一个配置好的数组，将其解构然后添加到我们的数组就可以实现继承了，如果有需要自定义或覆盖的rules，新增一个配置对象即可。

### 插件

插件对扁平模式的支持需要第三方跟进，我个人常使用的几个插件都已陆续支持扁平模式，例如：

*   @typescript-eslint/eslint-plugin
*   eslint-plugin-vue
*   eslint-plugin-markdown
*   eslint-plugin-import
*   eslint-plugin-unicorn
*   @stylistic/eslint-plugin

但这些插件目前对扁平模式的支持尚不稳定，虽然大体上能用，但我实际尝试发现有不少坑，目前只能等待它们的后续完善。

这里以vue + ts为例，Flat Config的配置方式如下，供大家参考：

js

 代码解读

复制代码

`// eslint.config.js import eslint_js from '@eslint/js' import eslint_ts from 'typescript-eslint'; import eslint_vue from 'eslint-plugin-vue'; import vue_parser from 'vue-eslint-parser'; export default [     ...eslint_js.configs.recommended,     ...eslint_ts.configs.recommended,     ...eslint_vue.configs['flat/recommended'],     // 为使用ts的vue指定parser     {         files: ['**/*.vue'],         languageOptions: {             parser: vue_parser,             parserOptions: {                 sourceType: 'module',                 parser: eslint_ts.parser,             },         },     },     {         rules: {             // 自定义规则         }     }, ]`

这里插件提供的`recommended`配置都已包含插件本身，因此不需要我们自己显式的引入插件，但由于eslint-plugin-vue提供的 `flat/recommended` 默认并不支持ts，因此需要我们手动指定parser。

### 发布自己的配置

可能有不少人会无脑使用一些社区里其他人提供的现成配置，例如比较有名的[@antfu/eslint-config](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fantfu%2Feslint-config "https://github.com/antfu/eslint-config")

js

 代码解读

复制代码

`// eslint.config.js import antfu from '@antfu/eslint-config' export default antfu()`

在ESLint的扁平模式上线，到9.0.0正式发布前，我也用过antfu的配置，但总归不适合自己，例如我喜欢4格缩进，我不喜欢配置curly，格式化相关的规则我习惯于warn而不是error等等。虽然可以通过合并覆盖，但每次都要写一遍不免麻烦，所以经过一番摸索，我也配置了一个我自己的版本：[@taiyuuki/eslint-config](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Ftaiyuuki%2Feslint-config "https://github.com/taiyuuki/eslint-config")，顺便就写了这篇文章，希望对大家能有所帮助。

js

 代码解读

复制代码

`// eslint.config.js import tyk from '@taiyuuki/eslint-config' export default tyk({     ts: true,     vue: true,     markdown: true,     ignores: [],     rules: {} })`

VS Code扩展设置
-----------

最后顺便一提，如果你使用VS Code的ESLint扩展，使用扁平模式需要在插件设置中勾选`Use Flat Config`：

![eslint-flat-mode.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/65e9499a6e6642cd90257a682ba62d2b~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=839&h=637&s=46283&e=png&b=1d1f27)

本文转自 <https://juejin.cn/post/7359505949319233548>，如有侵权，请联系删除。