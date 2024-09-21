本系列Vue3源码解读文章基于3.3.4版本

**1、[目录结构](https://zhida.zhihu.com/search?q=%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84&zhida_source=entity&is_preview=1)**
--------------------------------------------------------------------------------------------------------------------

**「1.1 将源代码clone到本地：」**

```text
git clone https://github.com/vuejs/core.git
```

**「1.2 在终端执行」** `tree -aI ".git*|.vscode" -C -L 2` **「获取目录结构。」**

这里是命令的详细解释：

*   `tree`: 这是调用 `tree` 程序的命令，它以图形方式显示目录结构。
*   `a`: 显示所有文件和目录，包括以点（`.`）开头的隐藏文件。
*   `I ".git*|.vscode"`: 忽略列表，不显示与提供的[模式匹配](https://zhida.zhihu.com/search?q=%E6%A8%A1%E5%BC%8F%E5%8C%B9%E9%85%8D&zhida_source=entity&is_preview=1)的文件或目录。在这个例子中，它会忽略所有以 `.git` 开头的文件和目录，以及 `.vscode` 目录。
*   `C`: 在输出中启用颜色，以区分不同类型的文件。
*   `L 2`: 限制目录树的显示深度为 2 层。

综上所述，这个命令会以彩色输出[当前目录](https://zhida.zhihu.com/search?q=%E5%BD%93%E5%89%8D%E7%9B%AE%E5%BD%95&zhida_source=entity&is_preview=1)及其子目录的结构，但只显示到第二层，并且会忽略所有以 `.git` 开头的文件和目录以及 `.vscode` 目录。

**「去掉部分目录后得到以下结构：」**

```text
.
├── .eslintrc.cjs              // eslint代码风格检查工具的配置文件
├── .prettierignore            // Pretttier格式化工具忽略文件的配置文件
├── .prettierrc                // Pretttier格式化工具配置文件
├── BACKERS.md                 // 支持者列表
├── CHANGELOG.md               // 代码版本变更日志
├── LICENSE                    // 软件许可证，vue3遵循The MIT License (MIT)协议
├── README.md                  // 本项目说明
├── SECURITY.md                // 安全相关信息说明
├── changelogs                 // 存放版本变更日志的文件夹
│   ├── CHANGELOG-3.0.md
│   ├── CHANGELOG-3.1.md
│   └── CHANGELOG-3.2.md
├── netlify.toml               // Netlify 部署工具的配置文件
├── package.json               // 项目依赖和脚本的配置文件
├── packages
│   ├── compiler-core          // 编译器核心，独立于平台
│   ├── compiler-dom           // 针对浏览器的 DOM 模板编译器
│   ├── compiler-sfc           // 单文件组件(.vue)编译器的实现
│   ├── compiler-ssr           // 服务端渲染编译器的实现
│   ├── dts-test               // TypeScript 类型声明测试
│   ├── global.d.ts            // 全局 TypeScript 类型声明文件
│   ├── reactivity             // 响应式系统的实现
│   ├── reactivity-transform   // 实验性代码，会在 3.4 中从 Vue 核心中删除
│   ├── runtime-core           // 运行时核心实例相关代码
│   ├── runtime-dom            // 针对浏览器的运行时实现
│   ├── runtime-test           // 运行时测试相关代码
│   ├── server-renderer        // 服务端渲染的实现
│   ├── sfc-playground         // 单文件组件在线调试器
│   ├── shared                 // package 之间共享的工具库
│   ├── template-explorer      // 模板代码在线编译器
│   ├── vue                    // vue编译后dist产物，不同场景的引入文件
│   └── vue-compat             // 兼容旧版 API 的代码
├── pnpm-lock.yaml             // pnpm 包管理器的依赖锁定文件
├── pnpm-workspace.yaml        // pnpm 包管理器的工作区配置文件
├── rollup.config.js           // Rollup 打包工具的配置文件
├── rollup.dts.config.js       // Rollup 打包工具用于生成 TypeScript 类型声明文件的配置文件
├── scripts                    // 存放脚本文件的文件夹
│   ├── aliases.js
│   ├── build.js
│   ├── const-enum.js
│   ├── dev.js
│   ├── pre-dev-sfc.js
│   ├── release.js
│   ├── setupVitest.ts
│   ├── size-report.ts
│   ├── usage-size.ts
│   ├── utils.js
│   └── verifyCommit.js
├── tsconfig.build.json         // 用于编译打包后的代码的 TypeScript 配置文件
├── tsconfig.json               // 项目 TypeScript 配置文件
├── vitest.config.ts            // Vitest 测试工具的基础配置文件
├── vitest.e2e.config.ts        // Vite 测试工具的端到端测试配置文件
└── vitest.unit.config.ts       // Vite 构建工具的单元测试配置文件
```

**2、模块依赖关系图**
-------------

Vue3源码都放在packages目录下。

```text
├── packages
│   ├── compiler-core          // 编译器核心，独立于平台
│   ├── compiler-dom           // 针对浏览器的 DOM 模板编译器
│   ├── compiler-sfc           // 单文件组件(.vue)编译器的实现
│   ├── compiler-ssr           // 服务端渲染编译器的实现
│   ├── dts-test               // TypeScript 类型声明测试
│   ├── global.d.ts            // 全局 TypeScript 类型声明文件
│   ├── reactivity             // 响应式系统的实现
│   ├── reactivity-transform   // 实验性代码，会在 3.4 中从 Vue 核心中删除
│   ├── runtime-core           // 运行时核心实例相关代码
│   ├── runtime-dom            // 针对浏览器的运行时实现
│   ├── runtime-test           // 运行时测试相关代码
│   ├── server-renderer        // 服务端渲染的实现
│   ├── sfc-playground         // 单文件组件在线调试器
│   ├── shared                 // package 之间共享的工具库
│   ├── template-explorer      // 模板代码在线编译器
│   ├── vue                    // vue编译后dist产物，不同场景的引入文件
│   └── vue-compat             // 兼容旧版 API 的代码
```

根据模块之间的调用关系，可以得出如下的模块关系图如下：

<img src="https://pica.zhimg.com/v2-3e2e44f10c6eee7604ffd081babca49e\_b.jpg" data-caption="" data-size="normal" data-rawwidth="641" data-rawheight="481" class="origin\_image zh-lightbox-thumb" width="641" data-original="https://pica.zhimg.com/v2-3e2e44f10c6eee7604ffd081babca49e\_r.jpg"/>

![](https://pica.zhimg.com/80/v2-3e2e44f10c6eee7604ffd081babca49e_1440w.webp)

在后面的源码分析中，我们会集中分析：@vue/reactivity、@vue/runtime-core、@vue/runtime-core、@vue/compiler-core、@vue/compiler-core包。

**3、构建版本**
----------

可以通过以下命令进行构建，构建出Vue3所有的版本

```text
npm run build
```

构建好的文件在目录: core\\packages\\vue\\dist，生成的文件有:

```text
// cjs（用于服务端渲染）
vue.cjs.js
vue.cjs.prod.js（生产版，代码进行了压缩）

// global（用于浏览器<script src="" />标签导入，导入之后会增加一个全局的Vue对象）
vue.global.js
vue.global.prod.js（生产版，代码进行了压缩，包含编译器）
vue.runtime.global.js
vue.runtime.global.prod.js（生产版，代码进行了压缩）

// browser（用于支持ES 6 Modules浏览器<script type="module" src=""/>标签导入）
vue.esm-browser.js
vue.esm-browser.prod.js（生产版，代码进行了压缩，包含编译器）
vue.runtime.esm-browser.js
vue.runtime.esm-browser.prod.js（生产版，代码进行了压缩）

// bundler（这两个版本没有打包所有的代码，只会打包使用的代码，需要配合打包工具来使用，会
让Vue体积更小）
vue.esm-bundler.js
vue.runtime.esm-bundler.js
```

不同版本的作用和使用场景总结如下：

<img src="https://pic3.zhimg.com/v2-40bef2c246ddd63752c298dcb785f090\_b.jpg" data-caption="" data-size="normal" data-rawwidth="1528" data-rawheight="584" class="origin\_image zh-lightbox-thumb" width="1528" data-original="https://pic3.zhimg.com/v2-40bef2c246ddd63752c298dcb785f090\_r.jpg"/>

![](https://pic3.zhimg.com/80/v2-40bef2c246ddd63752c298dcb785f090_1440w.webp)

*   完整版：包括编译器（只集成在完整版本中，用来将模板字符串编译成渲染函数）和运行时版本
*   运行时版：由于不包括编译器，如果导入的vue是运行时版本，则要求在构建期间就要编译好

**4、总结**
--------

Vue3的源码采用pnpm实现monorepo管理的方式，这种方式可以将不同的功能模块分开管理，使得代码更加结构化和可维护。好处如下：

1.  **「模块化」**: 代码按功能划分成不同的模块，便于管理和维护。
2.  **「清晰的职责划分」**: 每个模块有明确的功能和职责，使得代码更加清晰和易于理解。
3.  **「可维护性」**: 模块化的代码结构有助于定位问题和快速开发新功能。
4.  **「可重用性」**: 独立的模块可以在不同的环境或项目中重用。
5.  **「易于测试」**: 模块化的结构使得编写和运行单元测试更加容易。
6.  **「优化打包」**: 通过模块化，现代打包工具可以更好地进行树摇（tree-shaking）等优化，减少最终构建的体积。
7.  **「TypeScript 支持」**: Vue 3 使用 TypeScript 编写，[模块化](https://zhida.zhihu.com/search?q=%E6%A8%A1%E5%9D%97%E5%8C%96&zhida_source=entity&is_preview=1)有助于提供类型安全和更好的开发体验。

**5、参考资料**
----------

\[1\] [Vue官网](https://link.zhihu.com/?target=https%3A//cn.vuejs.org/)

\[2\] [Vuejs设计与实现](https://link.zhihu.com/?target=https%3A//item.jd.com/10088879641393.html)

\[3\] [vue3不同构建版本](https://link.zhihu.com/?target=https%3A//blog.wangzhanghao.com/2020/09/27/vue3%25E4%25B8%258D%25E5%2590%258C%25E6%259E%2584%25E5%25BB%25BA%25E7%2589%2588%25E6%259C%25AC/)

> 欢迎关注我的公众号：前端Talkking

本文转自 <https://zhuanlan.zhihu.com/p/669398649>，如有侵权，请联系删除。