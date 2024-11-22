---
title: element-ui 整体样式修改记录贴
author: 李嘉明
createTime: 2024/11/22 16:30:30
permalink: /article/kt9xn1ip/
---

## 前言

现有的 element-ui 的 有一些痛点，样式书写的不够健壮，使用起来也不够灵活，这次将在公司中，实际修改一套 老系统中 使用 element-ui 作为 UI 框架的记录贴

整体设置 element-ui 的  `size: mini`

## 安装 node-sass

老系统支持 sass 版本 为

```json
{
  "node-sass": "4.14.1",
  "sass-loader": "6.0.7"
}
```

## 编写 element-variables.scss 修改底层变量

```scss
$--color-primary: #3161ff;
$--color-success: #13a865;
$--color-warning: #ff9300;
$--color-danger: #ff5555;
$--color-info: #999999;
$--color-kye: #7d97ed;
$--input-mini-height: 24px;
$--button-mini-padding-vertical: 5px;
$--button-mini-padding-horizontal: 8px;
$--select-input-font-size: 12px;
// $--color-text-placeholder: $--color-primary;
$--select-option-height: 24px;
$--message-padding: 8px 15px 8px 20px;
// $--input-font-color:#C0C4CC;
// $--input-border: #E1E6EB;
$--input-placeholder-color: #c0c4cc;
$--input-max-width: 200px;
// $--input-border-color: #f90;
$--input-hover-border: #3161ff;
$--input-focus-border: #3161ff;
$--input-border-color-hover: #3161ff;
$--select-input-focus-border-color: #3161ff;
$--input-icon-color: #c0c4cc;
$--font-path: '~element-ui/lib/theme-chalk/fonts';

@import '~element-ui/packages/theme-chalk/src/index';
```

## icon 图标自定义

我们创建一个 icon.css 文件，里面书写一个个自定义图标, 在模板中使用 i 标签 class 使用

```css
.el-icon-01 {
  background: url('./image/01.svg') center no-repeat;
  background-size: contain;
  cursor: pointer;
}
.el-icon-01:before {
  content: '01';
  font-size: 12px;
  visibility: hidden;
}
```

## 强制 权重  element-ui 的样式

创建一个 `important.css` 样式文件


```css
.el-button.el-button--mini {
	min-width: 88px !important;
  height: 24px !important;
}
.el-button.el-button--small {
	min-width: 88px !important;
  height: 24px !important;
}

/* 限制某个页面下的按钮的样式 */
.backend .el-button,
.releaseIndex .el-button,
.frontIndex .el-button {
  margin-left: 0px !important;
  margin-right: 10px !important;
  margin-top: 5px !important;
}

/* 限制某个页面下的按钮的样式 */
.backend .el-select,
.releaseIndex .el-select,
.frontIndex .el-select  {
  margin-top: 5px !important;
}

.el-button.el-button--mini.el-button--text {
  min-width: initial !important;
}

.el-button.el-button--small.el-button--text {
  min-width: initial !important;
}

.el-button--small {
	padding: 6px 8px !important;
	font-size: 12px !important;
	border-radius: 3px !important;
}
.el-select {
	max-width: 100px !important;
}
.log .el-select .el-input__inner {
  border-color: rgba(49, 97, 255, 0.4) !important;
}
.log .el-select .el-input__inner::placeholder {
  color: #3161FF !important;
}
.el-message {
  top: 12px !important;
}

.el-dialog__body {
  padding: 20px !important;
}

.fe-cicd-select {
	max-width: 500px !important;
}

/* 图表 */
.kye-report-echarts-line-bar h4 {
  display: none !important;
}

.el-input__prefix {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

/* 表格无数据显示图片 */
.el-table__empty-block{
  background-image: url("../images/none.svg") !important;
  background-repeat: no-repeat;
  background-position: center;
  width: 310px !important;
  height: 238px !important;
  position: relative;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  padding-bottom: 40px;
}
.el-table__empty-text {
  display: none !important;
}

.fe-cicd-body #nprogress .bar {
  background: #3161FF !important;
}
```