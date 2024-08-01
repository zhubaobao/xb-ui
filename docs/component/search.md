---
title: Search
---

# search 搜索组件

## 基本使用
搜索，重置前可以通过 `searchDataFormat`, `refreshDataFormat`进行格式化数据
:::demo
search/basic
:::

其他示例在submit组件中有说明

## API

| 属性          | 说明                                      | Type   | 默认值   |
| ------------ | ----------------------------------------- | ------ | ------- |
| searchConfig | 搜索配置, 详细见[searchConfig](#searchconfig) | object | -      |

## searchConfig

| 属性               | 说明                                      | Type   | 默认值   |
| ----------------- | ----------------------------------------- | ------ | ------- |
| formAttrs         | 表单样式, 详见[el-form](https://element-plus.org/zh-CN/component/form.html#form-attributes)                                           | function | -      |
| formItems         | 表单子项配置，详见[xb-form](form.md)         | array | -      |
| layout         |  栅格占据的列数, <br>xs:	<768px<br> sm:	≥768px <br> md:	≥992px <br> lg:	≥1200px  <br> xl:	≥1920px   | object | { <br>&nbsp;&nbsp;span: 6, <br>&nbsp;&nbsp;xs: 24, <br>&nbsp;&nbsp;lg: 8,<br>&nbsp;&nbsp;xl: 6, <br>&nbsp;&nbsp;md: 12, <br>&nbsp;&nbsp;sm: 12, <br>} |
