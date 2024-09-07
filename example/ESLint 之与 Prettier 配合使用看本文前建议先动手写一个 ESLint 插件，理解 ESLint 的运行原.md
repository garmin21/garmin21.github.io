### 前言

看本文前建议先动手写一个 ESLint 插件，理解 ESLint 的运行原理。

### Lint 和 Prettier

#### 区别

ESLint（包括其他一些 lint 工具）的主要功能包含代码格式和代码质量的校验，而 Prettier 只是代码格式的校验，不会对代码质量进行校验。代码格式问题通常指的是：单行代码长度、tab 长度、空格、逗号表达式等问题。代码质量问题指的是：未使用变量、三等号、全局变量声明等问题。

#### 配合

为什么要两者配合使用？

第一，ESLint 推出 --fix 参数前，ESLint 并没有**自动**格式化代码的功能，而 Prettier 可以自动格式化代码。

第二，虽然 ESLint 也可以校验代码格式，但 Prettier 更擅长。

ESLint 和 Prettier 相互合作的时候有一些问题，对于他们交集的部分规则，ESLint 和 Prettier 格式化后的代码不一致。导致的问题是：当你用 Prettier 格式化代码后再用 ESLint 校验，会出现一些因为格式化导致的 warning or error。

例如：针对字符串使用单引号还是双引号的问题，ESLint 和 Prettier 分别对应如下规则：

ESLint: [quotes](https://link.juejin.cn?target=https%3A%2F%2Feslint.org%2Fdocs%2Frules%2Fquotes "https://eslint.org/docs/rules/quotes") - enforce the consistent use of either backticks, double, or single quotes, 默认是 double.

js

 代码解读

复制代码

`// .eslintrc.js {   rules: {     quotes: ["error", "double"] // 可简写为 quotes: "error", 表示字符串需使用双引号，否则报错   } }`

Prettier: prettier.singleQuote, 默认是 false.

json

 代码解读

复制代码

`// .prettierrc {   "singleQuote": true // 字符串使用单引号 }`

假如这样一行代码 `const a = "irene"`，用 Prettier 格式化后变成了 `const a = 'irene'`，再用 ESLint 去检测，就会报 `Strings must use doublequote`；当你用 `eslint --fix` 自动修复这个问题后又无法通过 Prettier 的校验，结果陷入死循环。

#### 解决方案

我们一般的解决思路是禁掉 ESLint 中与 Prettier 冲突的规则，然后使用 Prettier 做格式化， ESLint 做代码校验。

*   假设配置文件如下，我们在 .eslintrc.js 禁掉 quotes 这条规则，然后在 .prettierrc 中配置使用单引号。
    
    js
    
     代码解读
    
    复制代码
    
    `// .eslintrc.js {   rules: {     quotes: "off",     "no-unused-vars": "error", // 开启没有用过的变量检测   } } // .prettierrc {   "singleQuote": true }`
    
*   创建一个测试文件 test.js。
    
    js
    
     代码解读
    
    复制代码
    
    `// test.js const a = "irene"`
    
*   运行 prettier 格式化代码，双引号变成了单引号。
    
    shell
    
     代码解读
    
    复制代码
    
    `prettier --write test.js`
    
    js
    
     代码解读
    
    复制代码
    
    `// test.js const a = 'irene' // 双引号变成了单引号`
    
*   运行 eslint 校验代码。
    
    shell
    
     代码解读
    
    复制代码
    
    `eslint test.js // error  'a' is assigned a value but never used  no-unused-vars`
    

上面这种解决思路需要运行两个命令（prettier & eslint）才能完成格式化和校验的工作，我们希望以更简单的方式完成这件事，最好一个命令就能搞定。

于是社区提出了这样一种解决方案：

目的：使用 eslint --fix 就能完成格式化和校验的工作，格式化使用 Prettier，代码校验使用 ESLint。

具体步骤：

*   首先禁掉 ESLint/插件 中与 Prettier 冲突的规则，创建一个包 eslint-config-prettier，里面定义了被禁掉的 ESLint/插件 规则。
    
*   创建一个插件 eslint-plugin-prettier，定义一条规则 prettier/prettier，调用 Prettier，配合 ESLint 实现运行 `eslint --fix` 按 Prettier 规则自动格式化代码。
    
*   在 .eslintrc.js 中如下配置。
    
    js
    
     代码解读
    
    复制代码
    
    `{   extends: [     ..., // 其他     "prettier", // eslint-config-prettier   ]   plugins: ["prettier"], // eslint-plugin-prettier   rules: {     "prettier/prettier": "error" // 开启规则   } }`
    

下面我们介绍下 eslint-config-prettier 和 eslint-plugin-prettier。

### eslint-config-prettier

> [github.com/prettier/es…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fprettier%2Feslint-config-prettier "https://github.com/prettier/eslint-config-prettier")

我们看下 eslint-config-prettier/index.js，这些都是 ESLint 本身已经定义好的[规则](https://link.juejin.cn?target=https%3A%2F%2Fcn.eslint.org%2Fdocs%2Frules%2F "https://cn.eslint.org/docs/rules/")，eslint-config-prettier/index.js 没有创造新的规则，它只是关闭了 ESLint 中一些不必要的规则以及可能与 Prettier 冲突的规则 。请注意，这个配置只能关闭规则，所以只有和其他配置一起使用才有意义。

从下面这个文件可以看出：被关闭的规则一些是 0，一些是 'off'。0 表示这些规则在某些选项下是不会和 Prettier 规则冲突的。

js

 代码解读

复制代码

``module.exports = {   rules: Object.assign(     {       // The following rules can be used in some cases. See the README for more       // information. (These are marked with `0` instead of `"off"` so that a       // script can distinguish them.)       "arrow-body-style": 0,       curly: 0,       "lines-around-comment": 0,       "max-len": 0,       "no-confusing-arrow": 0,       "no-mixed-operators": 0,       "no-tabs": 0,       "no-unexpected-multiline": 0,       "prefer-arrow-callback": 0,       quotes: 0,       // The rest are rules that you never need to enable when using Prettier.       "array-bracket-newline": "off",       "array-bracket-spacing": "off",       "array-element-newline": "off",       "arrow-parens": "off",       "arrow-spacing": "off",       "block-spacing": "off",       ...     },     includeDeprecated && {       // Deprecated since version 4.0.0.       // https://github.com/eslint/eslint/pull/8286       "indent-legacy": "off",       // Deprecated since version 3.3.0.       // https://eslint.org/docs/rules/no-spaced-func       "no-spaced-func": "off",     }   ), };``

#### 使用

*   首先安装 eslint-config-prettier。
    
    shell
    
     代码解读
    
    复制代码
    
    `npm install --save-dev eslint-config-prettier`
    
*   将 eslint-config-prettier 添加到 .eslintrc.js 文件的 "extends" 数组中。确保把它放在最后，这样它就有机会覆盖其他配置。
    
    js
    
     代码解读
    
    复制代码
    
    `{   extends: [     ..., // 其他     "prettier", // eslint-config-prettier 可简写成 prettier   ] }`
    
*   eslint-config-prettier 下还有 @typescript-eslint.js, babel.js, react.js, prettier.js, vue.js 等文件，其内容是禁掉与它搭配使用的插件中创建的与 Prettier 冲突的规则。
    
    例如：当我们想校验 ts 文件时，需要引入 [@typescript-eslint/eslint-plugin](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Ftypescript-eslint%2Ftypescript-eslint "https://github.com/typescript-eslint/typescript-eslint")，这个插件中存在一些与 Prettier 冲突的规则，prettier/@typescript-eslint.js 就是禁掉这些规则。
    
    js
    
     代码解读
    
    复制代码
    
    `{   extends: [     "plugin:@typescript-eslint/recommended", // 引入相关插件     "prettier", // 禁用 ESLint 中与 Prettier 冲突的规则     "prettier/@typescript-eslint" // 禁用插件中与 Prettier 冲突的规则   ] }`
    
    以下插件都对应了 eslint-config-prettier 中的一个配置文件
    
    *   [@typescript-eslint/eslint-plugin](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Ftypescript-eslint%2Ftypescript-eslint "https://github.com/typescript-eslint/typescript-eslint") => prettier/@typescript-eslint.js
    *   [eslint-plugin-babel](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fbabel%2Feslint-plugin-babel "https://github.com/babel/eslint-plugin-babel") => prettier/babel.js
    *   [eslint-plugin-flowtype](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fgajus%2Feslint-plugin-flowtype "https://github.com/gajus/eslint-plugin-flowtype") => prettier/flowtype.js
    *   [eslint-plugin-prettier](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fprettier%2Feslint-plugin-prettier "https://github.com/prettier/eslint-plugin-prettier") => prettier/prettier.js
    *   [eslint-plugin-react](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fyannickcr%2Feslint-plugin-react "https://github.com/yannickcr/eslint-plugin-react") => prettier/react.js
    *   [eslint-plugin-standard](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fxjamundx%2Feslint-plugin-standard "https://github.com/xjamundx/eslint-plugin-standard") => prettier/standard.js
    *   [eslint-plugin-unicorn](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fsindresorhus%2Feslint-plugin-unicorn "https://github.com/sindresorhus/eslint-plugin-unicorn") => prettier/unicorn.js
    *   [eslint-plugin-vue](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Feslint-plugin-vue "https://github.com/vuejs/eslint-plugin-vue") => prettier/vue.js

### eslint-plugin-prettier

> [github.com/prettier/es…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fprettier%2Feslint-plugin-prettier "https://github.com/prettier/eslint-plugin-prettier")

eslint-plugin-prettier 以 ESLint 规则的方式运行 Prettier，通过 Prettier 找出格式化前后的差异，并以 ESLint 问题的方式报告差异，同时针对不同类型的差异提供不同的 ESLint fixer。

注意：eslint-plugin-prettier 不会自动安装 Prettier，你需要自己安装。

#### Options

prettier/prettier 规则接收两个选项，均为对象；第一个可用来传递 Prettier 的配置项；第二个可通过 usePrettierrc 属性设置是否使用 .prettierrc 文件中的Prettier 的配置项；默认值如下：

js

 代码解读

复制代码

`// .eslintrc.js {   rules: {     "prettier/prettier": ["error", {}, {        usePrettierrc: true,        fileInfoOptions: {}      }]   } }`

*   第一个选项: 一个 Prettier 配置项对象 [Prettier options](https://link.juejin.cn?target=https%3A%2F%2Fprettier.io%2Fdocs%2Fen%2Foptions.html "https://prettier.io/docs/en/options.html"). 例如:
    
    js
    
     代码解读
    
    复制代码
    
    `"prettier/prettier": ["error", {    "singleQuote": true,    "parser": "flow"  }]`
    
    这里的配置项会覆盖 .prettierrc 文件中的配置项。
    
    注意：虽然可以通过 ESLint 配置文件将选项传递给 Prettier，但不建议这样做，因为诸如 "prettier-atom" 和 "prettier-vscode" 这样的编辑器插件**会读取 [`.prettierrc`](https://link.juejin.cn?target=https%3A%2F%2Fprettier.io%2Fdocs%2Fen%2Fconfiguration.html "https://prettier.io/docs/en/configuration.html")，但**不会读取 ESLint 中的设置，从而导致不一致的体验。
    
*   第二个选项，包含以下属性的对象：
    
    *   `usePrettierrc`: 是否启用 Prettier 配置文件，默认是启用；
        
        js
        
         代码解读
        
        复制代码
        
        `"prettier/prettier": ["error", {}, {   "usePrettierrc": true }]`
        
    *   `fileInfoOptions`: 传递给 Prettier API - [prettier.getFileInfo](https://link.juejin.cn?target=https%3A%2F%2Fprettier.io%2Fdocs%2Fen%2Fapi.html%23prettiergetfileinfofilepath--options "https://prettier.io/docs/en/api.html#prettiergetfileinfofilepath--options")，用于决定是否需要对文件进行格式化。例如，可以用来选择不忽略位于 `node_modules` 目录下的文件。
        
        js
        
         代码解读
        
        复制代码
        
        `"prettier/prettier": ["error", {}, {   "fileInfoOptions": {     "withNodeModules": true   } }]`
        

#### Prettier 规则

我们看下 prettier/prettier 规则的源码：

js

 代码解读

复制代码

`const prettierOptions = Object.assign(   {},   initialOptions, // { parser }   prettierRcOptions, // .prettierrc 中的选项   eslintPrettierOptions, // .eslintrc.js 中 'prettier/prettier' 规则的第一个 option   { filepath } ); prettierSource = prettier.format(source, prettierOptions);`

可以看出，Prettier 格式化最终采用的规则是 .prettierrc 和 "prettier/prettier" 第一个 option merge 而成的。

#### 使用

*   首先安装 prettier 和 eslint-plugin-prettier。
    
    shell
    
     代码解读
    
    复制代码
    
    `npm install --save-dev prettier npm install --save-dev eslint-plugin-prettier`
    
*   在 `.eslintrc.js` 中开启 prettier 这条规则。
    
    js
    
     代码解读
    
    复制代码
    
    `{   extends: [     ..., // 其他     "prettier", // eslint-config-prettier   ]   plugins: ["prettier"], // eslint-plugin-prettier   rules: {     "prettier/prettier": "error" // 开启规则   } }`
    
*   eslint-plugin-prettier 提供了这样一个配置 plugin:prettier/recommended，具体内容如下:
    
    注意：使用 eslint-plugin-prettier 和 --fix 时开启 `arrow-body-style` & `prefer-arrow-callback` 可能会导致 [issue](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fprettier%2Feslint-plugin-prettier%23arrow-body-style-and-prefer-arrow-callback-issue "https://github.com/prettier/eslint-plugin-prettier#arrow-body-style-and-prefer-arrow-callback-issue")，因此建议关闭这两条规则。
    
    js
    
     代码解读
    
    复制代码
    
    `{   "extends": ["prettier"],   "plugins": ["prettier"],   "rules": {     "prettier/prettier": "error",     "arrow-body-style": "off",      "prefer-arrow-callback": "off"   } }`
    
    因此我们的 .eslintrc.js 可以更简单
    
    js
    
     代码解读
    
    复制代码
    
    `// .eslintrc.js {   "extends": ["plugin:prettier/recommended"] }`
    

### 总结

eslint 和 prettier 配置使用需要进行如下操作：

*   首先下载 eslint, prettier, eslint-config-prettier, eslint-plugin-prettier
    
    shell
    
     代码解读
    
    复制代码
    
    `npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier`
    
*   项目根目录添加 .eslintrc.js 和 .prettierrc
    
    js
    
     代码解读
    
    复制代码
    
    `// .eslintrc.js {   "extends": ["plugin:prettier/recommended"] } // .prettierrc {   "singleQuote": true }`
    
*   如果有使用到一些 ESLint 插件（如eslint-plugin-react），需要禁掉这些插件中与 Prettier 冲突，所以需要添加 "prettier/react"。
    
    js
    
     代码解读
    
    复制代码
    
    `{   "extends": [     "plugin:prettier/recommended",     "prettier/flowtype",     "prettier/react"   ] }`
    

### 推荐

[ESLint 之解析包名](https://juejin.cn/post/6923141007663955982 "https://juejin.cn/post/6923141007663955982")

本文转自 <https://juejin.cn/post/6924568874700505102#heading-10>，如有侵权，请联系删除。