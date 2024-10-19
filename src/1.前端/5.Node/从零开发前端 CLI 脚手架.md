---
title: 从零开发前端 CLI 脚手架
author: 李嘉明
createTime: 2024/10/19 19:43:49
permalink: /article/a9fbbzgq/
tags:
  - node
---

## 前言

在现代前端开发中，CLI（Command Line Interface）脚手架已经成为提高开发效率、规范团队协作的重要工具之一。本文将介绍如何从零开始开发一个前端 CLI 脚手架，使其能够通过命令行交互生成不同技术栈的模板代码，并预装常用的工具如 ESLint、Husky、Prettier 等，从而为项目的开发提供一致性和高质量的基础。

## 项目结构

首先，我们需要确定脚手架的项目结构。一个典型的结构可以包括以下目录和文件：

```bash
my-cli/
  ├── bin/
  │   └── my-cli.js  # 命令行入口文件
  ├── templates/     # 各种模板代码
  ├── package.json
  └── ...

```
## 核心功能

### 1. 初始化项目

创建一个新的项目文件夹 my-cli，并在其中运行以下命令生成 package.json 文件：

`npm init -y`

创建 /bin/cli.js 后，修改 package.json 文件，将 my-cli 命令的触发文件指向 cli.js。

```json
"bin": { 
    "my-cli": "./bin/cli.js"
},

```

在项目根目录运行以下命令把当前项目中 package.json 的 bin 字段链接到全局变量，就可以在任意文件夹中使用你的 CLI 脚手架命令了。

```bash
npm link  # mac需要加sudo

```

添加依赖


`npm install commander inquirer@^8.0.0 --save`

> [commander](https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fcommander "https://www.npmjs.com/package/commander") ：命令行解决方案。
> 
> [inquirer](https://link.juejin.cn?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Finquirer "https://www.npmjs.com/package/inquirer")：用于在命令行与用户交互，注意 Inquirer v9 使用了 esm 模块，如果使用 commonjs 需要使用 v8 版本。

### 2. 编写 cli 入口文件

注意 #!/usr/bin/env node 标识是必须的，告诉操作系统用 node 环境执行，然后设置基本的操作命令：

```javascript
#!/usr/bin/env node
const { Command } = require("commander");
const inquirer = require("inquirer");
const program = new Command();

// 定义当前版本，通过 command 设置 -v 和 --version 参数输出版本号
const package = require("../package.json");
program.option("-v, --version").action(() => {
  console.log(`v${package.version}`);
});

// 通过 inquirer 进行问答，设置 create 命令开始创建模板
program
  .command("create")
  .description("创建模版")
  .action(async () => {
    // 命名项目
    const { projectName } = await inquirer.prompt({
      type: "input",
      name: "projectName",
      message: "请输入项目名称：",
    });
    console.log("项目名称：", name);
  });

// 解析用户执行命令传入参数
program.parse(process.argv);

```

可以看到当前的效果： ![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9caea838864447a09fae646a7690d1eb~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

基本命令完成以后，设置模板选择，可以把模板放到 templates 文件夹里或者远程仓库，这里使用 templates 文件夹的方式，需要把 inquirer type 改为 list 类型：

```javascript
program
  .command("create")
  .description("创建模版")
  .action(async () => {
    // 命名项目
    ...忽略...
    
    // 选择模板
    const { template } = await inquirer.prompt({
      type: "list",
      name: "template",
      message: "请选择模版：",
      choices: folderNames,
    });
   
  });

```

编写获取 templates 下文件夹名字和路径的逻辑：

```javascript
// 读取 templates 目录下的所有子文件夹名字和路径
const templatesPath = path.join(__dirname, "..", "templates"); // 注意这里的路径计算
const files = fs.readdirSync(templatesPath, { withFileTypes: true });
const subDirectories = files.filter((file) => file.isDirectory());
const folderNames = subDirectories.map((dir) => dir.name);
const folderPaths = subDirectories.map((dir) =>
  path.join(templatesPath, dir.name)
);

```

编写递归复制模板文件的逻辑：

```javascript
// 文件复制函数
const { promisify } = require("util");
const copyFile = promisify(fs.copyFile); // 将 fs.copyFile 方法转换为 Promise 形式
const mkdir = promisify(fs.mkdir); // 将 fs.mkdir 方法转换为 Promise 形式
async function copyTemplateFiles(templatePath, targetPath) {
  const files = await promisify(fs.readdir)(templatePath);
  for (const file of files) {
    const sourceFilePath = path.join(templatePath, file);
    const targetFilePath = path.join(targetPath, file);
    const stats = await promisify(fs.stat)(sourceFilePath);
    if (stats.isDirectory()) {
      await mkdir(targetFilePath);
      await copyTemplateFiles(sourceFilePath, targetFilePath);
    } else {
      await copyFile(sourceFilePath, targetFilePath);
    }
  }
}

// 当全部内容选择完时，创建项目文件夹并复制模板文件到当前目录
const targetPath = path.join(process.cwd(), projectName);
await mkdir(targetPath);
const selectedTemplateIndex = folderNames.indexOf(template);
const selectedTemplatePath = folderPaths[selectedTemplateIndex];
await copyTemplateFiles(selectedTemplatePath, targetPath);
console.log("模板复制完成！");


```

至此，一个基本的 cli 已经完成了。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/00e530f6f3774314919628995edaa144~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

### 3. 优化 cli 交互

**添加可以从命令行传递参数功能，并判断不传递时进行选择操作**

```javascript
program
  .command("create [projectName]") // 增加可选命令 [] 表示可选
  .description("创建模版")
  .action(async (projectName) => {
    // 命名项目，如果没有带参数则进行输入
    if (!projectName) {
      const { name } = await inquirer.prompt({
        type: "input",
        name: "projectName",
        message: "请输入项目名称：",
        validate: (input) => {
          if (!input) {
            return "项目名称不能为空";
          }
          return true;
        },
      });
      projectName = name;
    }
  });

```


**添加可查询命令**

很多工具都会有 `--help` 指令，用于查看工具包的操作，program 提供了监听 `--help` 操作，在 cli.js 添加后，执行 `-h` 或者 `--help` 都会自动把当前注册的所有命令都打印到控制台。

```javascript
program.on('--help', () => {})
```

输入 `--help` 或者 `-h` 查看效果:

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c43b2c754b84cf9961482398102ce52~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

**添加创建同名目录时，是否覆盖的选择**

可以使用 `fs.existsSync` 来检查目标文件夹是否已存在。如果目标文件夹存在，我们使用`inquirer` 来询问用户是否要覆盖。如果用户选择不覆盖，程序会输出消息并退出。如果用户选择覆盖，我们会先使用 `fs.rm` 删除已存在的目标文件夹，然后再创建新的目标文件夹，并进行后续操作。

```javascript
const targetPath = path.join(process.cwd(), projectName);
// 判断文件夹是否存在，存在则询问用户是否覆盖
if (fs.existsSync(targetPath)) {
  const { exist } = await inquirer.prompt({
    type: "confirm",
    name: "exist",
    message: "目录已存在，是否覆盖？",
  });
// 如果覆盖就递归删除文件夹继续往下执行，否的话就退出进程
exist ? await fsRm(targetPath, { recursive: true }) : process.exit(1);

```


**添加模板创建成功后的引导提示**

每种模板可能不同，可以创建配置文件保存各模板的相关信息。

```javascript
console.log("模板创建成功！");
console.log(`\ncd ${projectName}`);
console.log("yarn");
console.log("yarn dev\n");

```

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2988c0fb61d3419791b276e35206e7ff~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?">

## 发布到 npm 仓库

在 package.json 定义需要发布的文件，这里需要发布 cli.js 以及模板。

```json
"files": [
    "bin",
    "templates"
],
```


如果是私有工具需要设置私有源地址，或者配置 .npmrc 文件。

```bash
npm config set registry <私有源地址>
```


登录 npm 账号并发布。

```
npm login 

npm publish
```

## 总结

使用 commander 可以更方便地处理命令行参数和创建交互式界面，从而开发出更加灵活和易用的前端 CLI 脚手架。通过命令行交互，生成不同技术栈的模板代码，并预装常用的工具和插件，使项目开发更加规范统一和高效。在实际开发中，你可以根据需要进一步扩展和优化这个脚手架，以满足不同项目的需求。