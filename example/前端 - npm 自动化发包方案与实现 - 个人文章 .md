1\. 传统的发包模式
-----------

### 1.1 版本发布

传统的发包模式指用户在本地进行发包、版本升级的操作，因此所有的 cli 都是在本地执行。当我们写好一个 npm package 之后，并且登录好 npm 后，就可以执行以下指令直接发布第一版：

npm publish --access public

### 1.2 版本迭代

当进行了一些变更之后，可以手动去变更 `package.json` 的版本号，当然这是一种非常低效且不优雅的做法，**手动变更版本号存在太多不确定的因素**，比如改错版本号或跳过某个版本号；同时，一般我们在生成一个新的版本后要打一个 tag 对当前版本进行留档，纯手动操作的话会有很多的工作量。因此我们需要一个更加『靠谱』的迭代版本号的方案。

#### 1.2.1 npm 版本规范

在谈论如何优雅的进行迭代版本号之前，我们先来了解一下 npm 采用的[语义化版本号](https://link.segmentfault.com/?enc=2R5YTLYq93ARGXGYqMbEpg%3D%3D.27IvYdqoSzZc5i9oCoIjOecGlrjKnnwd3w392nqUOApQFAlj5eipxQ54qoN8GHT0uBfRoYg2MtdEW8J3InlbDw%3D%3D)：

npm 的语义化版本，共三位，以’.’隔开，从左至右依次代表：

*   主版本（major）
*   次要版本（minor）
*   补丁版本（patch）

举例来说：1(major).0(minor).0(patch)

当然有时某些包还存在预览版本，预览版本的版本号要与前三位版本号使用 `-` 进行间隔，如：

*   1.0.0-1
*   1.0.0-alpha.1
*   1.0.0-beta.1
*   1.0.0-rc.1

> `alhpa` / `beta` / `rc` 这些并不是 npm 官方定义的 prerelease 前缀，你可以使用任何前缀，甚至 `niconiconi`，如何添加这些前缀，我们后面会讨论到。

对于版本变更的规范，推荐采用以下策略：

| 代码状态 | 等级 | 规则 | 版本样例 |
| --- | --- | --- | --- |
| 首次发布 | 新品发布 | 以1.0.0开始 | 1.0.0 |
| bug 修复，向后兼容 | 补丁版本发布 | 变更第三位数字 | 1.0.1 |
| 新功能，向后兼容 | 次版本发布 | 变更第二位数字，并且第三位数字重置为 0 | 1.1.0 |
| 重大变更，不向后兼容 | 主版本发布 | 变更第一位数字，并且第二位和第三位数字重置为 0 | 2.0.0 |

#### 1.2.2 使用 npm version 变更版本号

npm 提供了 [`npm version`](https://link.segmentfault.com/?enc=9rj4X5%2FLWBMyQ2tpRQyXsw%3D%3D.s%2FyMUAirpqXrLbYtXR7mrxk6S7kUPxd9ckJyEHYzNmJp%2Bj%2Fv0KfPBblz8zM1wUb9IGRwRjYdqCRgIcUWqCOuow%3D%3D) 指令可以辅助我们来进行版本迭代，假设我们现在的版本是 `1.0.0`，使用 `npm version` 的各个参数进行版本升级，得到的结果如下：

对于一般的迭代，使用 `major` / `minor` / `patch` 即可：

*   npm version major => 2.0.0
*   npm version minor => 1.1.0
*   npm version patch => 1.0.1

如果你要发布预览版本（prerelease）的 package，你可以使用 `premajor` / `preminor` / `prepatch` 并结合 `prerelease` 来升级预览版本号：

*   npm version premajor => 2.0.0-0 `发型一版重大变更预览版本的 package`
    
    *   npm version prerelease => 2.0.0-1 `增加当前预览版本的版本号`
        
        *   npm version major => 2.0.0 `正式发布`
*   npm version preminor => 1.1.0-0
    
    *   npm version prerelease => 1.1.0-1
        
        *   npm version minor => 1.1.0
*   npm version prepatch => 1.0.1-0
    
    *   npm version prerelease => 1.0.1-1
        
        *   npm version patch => 1.0.1

如果你想为预览版的版本号添加 `alpha` / `beta` 这样的前缀的话，可以使用 `--preid` 参数，我们依旧以 `1.0.0` 为初始版本，使用 `npm version` 进行预览版的版本变更示例如下：

*   npm version prepatch --preid alpha => 1.0.1-alpha.0
    
    *   npm version prerelease => 1.0.1-alpha.1
        
        *   npm version patch --preid alpha => 1.0.1 `⚠️ 如果要发布当前 preid 的正式版，执行正式版并发布指令时需要后缀 --preid 参数`
        *   npm version patch => 1.0.2 `如果不后缀就会直接迭代到下一版本`
        *   npm version prepatch --preid beta => 1.0.2-beta.1 `如果切换了 preid 就会重新生成一个新版本，而不是在当前版本迭代版本号`

需要注意的是，当你执行 `npm version` 指令时，**当前的工作区必须是干净的**，否则会执行失败；且当执行成功后，会自动生成一个 commit（commit message 默认为版本号），**同时在这次自动生成的 commit 上打一个 tag**，tag 名称即为以 `v` 开头的版本号名称，如果你想修改默认的 commit message，你可以使用如下指令：

npm version patch -m "Release version %s" \# 『%s』代表当前版本号

此外，对于你发布的 prerelease 版本的 package 需要注意以下两点：

1.  当用户进行首次安装你的包时，且此时你的包最新的版本为一个 prerelease 版本，那么用户就会安装这个 prerelease 版本；如果用户只想安装稳定版，那么可以通过 `npm install xxx@version`，比如 `npm install xxx@1` 或 `npm install xxx@">1.0.0"` 这样的指令安装的包不会安装到 prerelease 版本。
2.  但是，当用户当前安装的是一个正式版本的包时，使用 `npm update` 去更新你的包，是不会主动更新到 prerelease 版本的；但如果正式版用户想要升级为 prerelease 版，可以通过执行 `npm install package@latest` 来安装最新的版本（包含预览版）。

### 1.3 CHANGELOG 的生成

在一些项目中，会用 `CHANGELOG.md` 来标注每个版本的变更内容，这个文件通常是使用专门的工具生成的，比如 [conventional-changelog](https://link.segmentfault.com/?enc=1Fmv%2F6p%2FuOoq33cXtlBtCw%3D%3D.b0E%2FXGPMIQqvccoD27Vh5H%2Bn0ZK0S6lYJOt%2BtH4eZycL9WcIGi2Xyc95whQGhho2iMkk1E97Oob3xsCtOV6f%2BsuqH370cijY98QtvQ42l6U%3D)，但是自动生成的条件必须满足：

1.  使用标准的 commit 规范，通常在默认情况下使用 [Angular 的提交规范](https://link.segmentfault.com/?enc=cowl0HEimfSCRj3bnIllRg%3D%3D.eV7sqGr4KofVETgeRBauuvUGdYBS36AimUQK8AAO0vd0isMsqxWlRNsYUb3zBq9flIPNsdYsg29HRS1uDd%2FFigLYG5QnZ91ZEjKzCwpULnykqq9%2F5Mch5deNKhaiq6aW)，这样 `conventional-changelog` 就会知道你每次提交做了什么，是新增了一个 fetature，还是修复了一些 bug，亦或是其他。你可以使用 `@commitlint/cli` + `husky` 对你的代码进行提交检查，同时也可以使用 `commitizen` 来生成标准化的 commit，关于这些，你可以参考[这篇文章](https://link.segmentfault.com/?enc=PqA1fKGgbI6OWdebMAWA9A%3D%3D.IYqzeiza28v7dPmpodFukGEd83crBWu9IVDbPSqoZs029kNg1JvrkKH5tpCy0x9UBh3Y7Ui9zV73hTYenTb72Q%3D%3D)。
2.  在每次生成一个新的版本后，在当前的提交上要创建一个 tag，tag 的名称为版本号，比如 `v1.0.0`，这点如果你使用 `npm version` 来生成版本号的话就无需担心这一点。

一个标准的 commit 历史如下：

commit xxxxxxx (tag: v1.1.0)
Author xxx
Date   xxx
1.1.0

commit xxxxxxx
Author xxx
Date   xxx
fix: fix a bug

commit xxxxxxx
Author xxx
Date   xxx
feat: add new fetaure 2

commit xxxxxxx
Author xxx
Date   xxx
feat: add new fetaure 1

commit xxxxxxx (tag: v1.0.1)
Author xxx
Date   xxx
1.0.1

commit xxxxxxx
Author xxx
Date   xxx
fix: fix a bug

commit xxxxxxx (tag: v1.0.0)
Author xxx
Date   xxx
1.0.0

commit xxxxxxx
Author xxx
Date   xxx
feat: base function

commit xxxxxxx
Author xxx
Date   xxx
chore: first commit

`conventional-changelog` 读取到这样的 commit 历史后，就可以生成如下的 CHANGELOG：

\## 1.0.1 (2022-xx-xx)

\### Bug Fixes

\* fix a bug

\### Features

\* add new fetaure 1
\* add new fetaure 2

\## 1.0.1 (2022-xx-xx)

\### Bug Fixes

\* fix a bug

\## 1.0.0 (2022-xx-xx)

\### Features

\* base function

如果你的 commit 符合以上两点要求，你可以安装 `conventional-changelog-cli`：

npm install conventional-changelog-cli -D

运行 cli 指令生成 CHANGELOG：

npx conventional-changelog -p angular -i CHANGELOG.md -s -r 0

之后版本变更后想生成新的 CHANGELOG 就只需要再执行一遍上面的指令即可。但是还有一种更简便的方式，就是使用 npm 的 `version` 钩子来在更新版本号时候自动触发 CHANGELOG 生成，只需要在 `package.json` 中添加以下 script：

"scripts": {
  "version": "conventional-changelog -p angular -i CHANGELOG.md -s && git add CHANGELOG.md"
}

添加之后，在我们执行 `npm version` 时，一旦版本号变更成功就会触发 `version` script 生成 CHANGELOG，并将生成的 `CHANGELOG.md` 添加到暂存区，然后 `npm version` 继续执行，暂存区的代码进行提交，并创建一个 tag。

**总之，将所有的流程配置好之后，完整的工作流如下：**

1.  编辑代码，添加新功能或者修复 bug；
2.  完成某个功能后进行 commit，commit 要符合[Angular 的提交规范](https://link.segmentfault.com/?enc=s0hGoKWWHfvpuJkFCD0eqQ%3D%3D.Y9fLAxGFiJqNsG3iK8oRuoGbl7r2jVwY5ZwekWvCdNnxH6BVL2qCqqfMlMiXFk6RHjFxx83PwulL9MCgE8IkSCbS1M6xIHKpe7kJzye%2BP7chYIR4pGsX0a4CUrzaenNO)；
3.  继续完成其他的功能，并每完成一个功能后及时提交标准化的 commit，直到你想要发版为止；
4.  执行 `npm version xxx` 生成新的版本号，这时 CHANGELOG 和版本号都会自动进行迭代；
5.  执行 `npm publish --access public` 进行版本发布。

2\. standard-version
--------------------

[standard-version](https://link.segmentfault.com/?enc=CfF1ex%2BqeHiP2VzF24fHZQ%3D%3D.HpOsptYo2SiqTgiTk%2Fuiq6sQs1RsrnEyIMj1ukDYXV4Lnlau%2BF3C5rWyI6sKEMZon%2FAaJsMmft5TmYo5OA3ukQ%3D%3D) 是 conventional-changelog 推荐使用的标准化 npm 版本生成工具，它可以取代 `npm version` 指令，并提供更简便、语义化的调用方式；

同时，它也集成了 conventional-chagelog，在生成版本号时会自动创建 CHANGELOG，可以省去我们自己配置 conventional-chagelog-cli 的过程；

此外它还提供了配置文件，你可以很方便的自定义 CHANGELOG 的输出。

### 2.1 安装

standard-version 可以安装到全局来替代 `npm version` 指令，但最好还是安装到本地项目中，方便其他开发人员使用，可以用 `npx` 指令来执行它：

npm install standard-version -D

### 2.2 使用

使用 standard-version 的前提还是要有标准化的 commit 链，就像上面我们在 CHANGELOG 生成中所描述的那样。当你完成了一系列的代码变更后，就可以执行 `npx standard-version` 来生成一个版本（如果是首次发布则需要执行 `npx standard-version --first-release`），执行之后 standard-version 会做如下的事情：

1.  读取 `package.json` 查询当前包的版本号，如果没有查询到，就将最后一个 tag 的版本号视作当前的版本号；
2.  依据你的 commit 信息，来决定下一个版本号（这一过程被称为 `bump version`），然后修改 `package.json`、`package-lock.json` 等需要迭代版本号的文件中的版本号字段；
3.  依据你的 commit 信息生成或更新 `CHANGELOG.md` 文件；
4.  使用新的版本号为名称，创建一个 tag 进行留档。

在使用 `npx standard-version` 来迭代版本时，你无需关心是迭代 major、minor、patch 位的版本号，`standard-version` 会自动根据你的版本号来决定下一个版本号需要迭代哪一位，比如：当发现自上次版本号生成以来，提交的代码中的 commmit message 中仅有 `fix` 类型的提交，那么就只会迭代 patch 位的版本号；但如果发现自上次生成版本号以来，携带有 `feat` 类型的提交，那么就会去迭代 minor 位的版本号。

当然你也可以强行指定升级哪一位版本号，比如：

npx standard-version --release-as minor
npx standard-version --release-as patch
npx standard-version --release-as major

亦或是你想要迭代版本号为 prerelease 版本，那么就要使用下面的指令：

npx standard-version --prerelease alpha

3\. semantic-release
--------------------

目前 standard-version 这个项目已经被标记为 deprecated，意味着后续不再维护，同时也意味着这种模式下的包管理方式正在逐渐『落后』。standard-version 在官方文档中也指明了两条出路，如果你是 github 用户的话，作者推荐使用 [release-please](https://link.segmentfault.com/?enc=gsAkZszOKfTFkcV%2Bi5%2FlkQ%3D%3D.39VxlIxKV0fnn31tCNEnLM2DjK3KDcbGhJQC10MWXPwQY9vNSxp1%2FgJ3Q0Epmwm4) 进行代替；同时，作者也在文中提到了 [semantic-release](https://link.segmentfault.com/?enc=sENusBopF2KMWAobi0aLoA%3D%3D.ETSWHZSai49AA8Lv9k43U716vdsR1A835PxAjMcMrtWS5YjM7oeT3lGN2oR3bglDO697npTXwneT1N9gd5KVOw%3D%3D)，它也是一个语义化的 npm 包版本管理方案。

不论是 release-please 还是 semantic-release 也好，他们都解决了 standard-version 的一个痛点，**那就是 standard-version 的工作流基于本地**，开发人员需要本地进行版本迭代、npm 发布的行为。但是由于 CICD 的流行，似乎在 CI 上进行 npm 包的版本迭代与发布更为合适，这样就不会造成多个开发人员并行开发时版本冲突的问题了。**release-please 与 semantic-release 的目的都是将人为干预的版本迭代和发包行为，转移到标准化的、可持续的 CI 平台上完成**。

> 机器永远比人类靠谱

![](/img/remote/1460000043870985)

鉴于 semantic-release 比 release-please 得到的关注更多，因此我们重点探讨 semantic-release。

### 3.1 安装与使用

semantic-release 也提供了 cli 工具，可以快速的帮你完成安装和配置工作，以 Github 为例，你只需要进入到你的项目目录下，输入：

npx semantic-release-cli setup

交互式命令行就会询问你的 NPM 账号、密码、二步验证，从而获取你的 NPM token（用于在流水线发包）；之后会引导你进行 Github 授权，目的是为了在你的目标项目的 [Secrets](https://link.segmentfault.com/?enc=PYFC3m9ELshl4f%2Fs%2F80EnQ%3D%3D.jfTFLpkTrRCaCoehnvoC19jW72yg%2BdgeD4MHwLq7OB%2ByLmZTYxXBZYIa49D3kVNnq7Bw5eW2cvfEOZzbEafgwKLLj6WhhRLVaY3hKnvVc5c%3D) 中写入 `NPM_TOKEN` 的环境变量。

之后你就可以创建你的 Github Action 来轻松的进行发包，发布的 yml 文件示例如下：

name: Publish package to NPM
on:
  push:
    branches:
      \- master
  pull\_request:
    branches:
      \- master
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      \- uses: actions/checkout@v2

      \- name: Setup pnpm env
        uses: pnpm/action-setup@v2
        with:
          version: 6.32.16

      \- name: Setup node env
        uses: actions/setup-node@v3
        with:
          node-version: 14
          cache: 'pnpm'

      \- name: Install node\_modules
        run: pnpm install \--frozen-lockfile

      \- name: Build module
        \# 进行包构建
        run: pnpm build
        
      \- name: Run publish script
        \# 进行包发布
        run: pnpm release
        env:
          NPM\_TOKEN: ${{ secrets.NPM\_TOKEN }}
          GITHUB\_TOKEN: ${{ secrets.GITHUB\_TOKEN }}

这样，当你的代码向 master 分支合入后，就会自动触发 npm 的发布行为，自动生成 tag、以及你 Github 项目的 Release。

值得注意的是，semantic-release 在初始化好之后就将你 `package.json` 中的版本号重置为 `0.0.0-development`，并且在后续的迭代中，这个版本号都不会有任何改变。这是因为 semantic-release 确定版本号的方法是从 tag 列表中获取最新的版本号，而并非是从 `packageFiles` 中获取版本号。这样的好处就是版本号不跟代码中的任何文件进行强关联，那么在 CI 迭代版本时也不会去修改源代码，造成 CI push 代码的行为。

### 3.2 手动配置

上面我们讨论了使用 `semantic-release-cli` 快速接入 Github 项目的方案，但是再实际的生产环境下是非常复杂的，也许你使用的是 GitLab 亦或是其他平台，那么这时候往往需要我们手动进行配置。

首先我们需要在项目中安装 `semantic-release`：

npm install semantic-release -D

之后我们就可以使用 `npx semantic-release` 指令进行版本发布了，但是在此之前不得不提一下，semantic-release 大部分功能是由插件实现的，比如 npm 发包是由 @semantic-release/npm 插件实现的，在默认情况下 semantic-release 自动开启四个插件：

"@semantic-release/commit-analyzer"
"@semantic-release/release-notes-generator"
"@semantic-release/npm"
"@semantic-release/github"

当你使用 `npx semantic-release` 指令时 semantic-release 会经过多个阶段，在每个阶段的执行过程中 semantic-release 会做一些事情，比如生成 tag、推送tag、编写 git notes 等，同时 semantic-release 的插件也会被触发，从而来『插手』做一些事情。在默认的情况下，`npx semantic-release` 会执行以下流程：

1.  加载配置，确定哪些插件被启用；
2.  加载插件；
3.  执行 `verifyConditions` 阶段，这一阶段负责**校验用户当前的环境权限**。比如 @semantic-release/npm 插件会检查是否有 .npmrc 配置以及是否有 npm token、@semantic-release/github 插件会检查当前环境是否有资格推送代码以及分支；
4.  执行 `analyzeCommits` 阶段，这一阶段负责**确定下一个版本是什么版本**。比如 @semantic-release/commit-analyzer 在这一阶段会根据标准化的 commit 中来判断下一个版本是 major、minor 或 patch ；
5.  执行 `verifyRelease` 阶段，这一阶段负责**验证即将发布的版本的参数**（版本、类型、dist-tag 等）；
6.  执行 `generateNotes` 阶段，这一阶段负责**生成发布说明的内容**；
7.  执行 `prepare` 阶段，这一阶段**负责准备发布，例如创建或更新文件**，比如 `package.json` 中的版本号修改、tag 的生成就是在这一阶段发生的；
8.  执行 `publish` 阶段，这一阶段**负责执行发布相关的指令**，@semantic-release/npm 就会在此发布 package，@semantic-release/github 会在此生成对应的 release；
9.  执行 `addChannel` 阶段，这一阶段**负责添加发布渠道**，这里主要是让 @semantic-release/npm 调用 [npm dist-tag](https://link.segmentfault.com/?enc=CzAFFRAgxJpAmLYCeNswYA%3D%3D.SCFoBth2Str8Hagc5cG0cbZjQWyLJUDrFwjKNoEiNAFaOLa8w2JqSd3qIjSSQvI6) 指令来为刚刚发布的包标记 `@latest` 或 `@beta` 等标签；
10.  执行 `success` 阶段，负责通知新版本；
11.  执行 `fail` 阶段，负责通知发布失败。

如果你想要添加更多的插件，可以参考[这一章节](https://link.segmentfault.com/?enc=VgAlzOGSJV0%2B6zd5uIyDnw%3D%3D.ZkwWqchfZTYNvHQa5V5yLrSZ8zIA%2B5weVCsVowPXp4Xed%2B5DXXGf2u9KYnHKdZZTY7DnZiEPowSLEyXawme58Yh3TxWhACRpGF8T5PbYA3o%3D)。

### 3.3 注意事项

需要注意的是，semantic-release 理论上是可以支持所有的 CI 与 Git 托管平台的，但是需要注意一点就是你的 Git 托管平台必须能支持 CI 往上面有权限推送 tag 以及 git notes。

比如在使用 [Gerrit Code Review](https://link.segmentfault.com/?enc=uYAsZAzYM%2Fe%2FxTzEfZKmRg%3D%3D.Eq3OMrGyv7KYhEXloW6QakgnjFTNCIU7nemXrO8ETIAqBwQfWJsOf8m7KcnKLkXe) 规范的平台上，推送代码仅支持 `git push origin HEAD:refs/for/xxx` 就造成无法推送 `refs/note/semantic`，那么 semantic-release 就会在 `publish` 阶段崩溃，导致后面的流程无法继续。

本文转自 <https://segmentfault.com/a/1190000043870983>，如有侵权，请联系删除。