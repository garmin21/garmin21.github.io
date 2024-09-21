> 批量全局注册场景：我们写好一堆组件，又不想每次要用的时候单独import导入。这时就可以考虑全局批量注册啦，比如布局组件

vite批量全局注册组件可以使用两种方式，大同小异

### 方式一：使用 import.meta.glob

js

 代码解读

复制代码

`const modulesFiles = import.meta.glob('./src/*.vue');`

上述会转译成如下样子：

js

 代码解读

复制代码

`// vite 转译生成的代码 const modulesFiles = {   './src/foo.vue': () => import('./src/foo.vue'),   './src/bar.vue': () => import('./src/bar.vue') }`

然后遍历 `modulesFiles` 对象的path来注册对应的模块

根据官方文档 [功能 | Vite 官方中文文档](https://link.juejin.cn?target=https%3A%2F%2Fcn.vitejs.dev%2Fguide%2Ffeatures.html%23glob-import "https://cn.vitejs.dev/guide/features.html#glob-import") 说明，`import.meta.glob`方式匹配到的文件默认是懒加载的，通过动态导入实现，并会在构建时分离为独立的 chunk。如果你倾向于直接引入所有的模块（例如依赖于这些模块中的副作用首先被应用），你可以传入 `{ eager: true }` 作为第二个参数，那么其转译的形式就与`import.meta.globEager`完全一致啦，如下：

js

 代码解读

复制代码

`const modules = {      './src/foo.vue': __glob__0_0,      './src/bar.vue': __glob__0_1  }`

glob中的 `import` 选项表示具名导入，`import: 'default'`表示导入模块中的default空间的内容，此处内容对应于

js

 代码解读

复制代码

`<script> export default {   // 组件默认名称   name: 'foo', }; </script>`   

> 注意：export default 必须在每个组件的 `xxx.vue` 文件中写明，其中name表示组件的名称，上述 foo表示组件foo的默认名称，这样在批量注册之后，就可以使用 `<foo></foo>`组件啦

最后执行批量全局注册如下：

js

 代码解读

复制代码

`// export.js const modulesFiles = import.meta.glob('./*/*.vue', {import: 'default', eager: true});   // 其中路径path为export.js文件与批量注册vue文件的相对路径 export default (app) => {    for (const path in modulesFiles) {       const componentName = modulesFiles[path].name;  // 获取组件默认名称       app.component(componentName, modulesFiles[path]);    } };`

### 方式二：使用 import.meta.globEager

vite转译之后，形式如下：

js

 代码解读

复制代码

`const modules = {      './src/foo.vue': __glob__0_0,      './src/bar.vue': __glob__0_1  }`

有了方式一的基础，下面这种方法也是一样，而且无需配置 `import和eager` 选项参数，如下：

js

 代码解读

复制代码

`// export.js const modulesFiles = import.meta.globEager('./*/*.vue'); export default (app) => {    for (const path in modulesFiles) {       const componentName = modulesFiles[path].default.name;  // 获取组件默认名称       app.component(componentName, modulesFiles[path].default);    } };`

两种方式均可，只是vite官方说明更推荐 `glob`导入，但是参数配置转译之后，其实跟`globEager`一样，具体还是看各位开发者的习惯和心情，哈哈~

本文转自 <https://juejin.cn/post/7162741138883870733>，如有侵权，请联系删除。