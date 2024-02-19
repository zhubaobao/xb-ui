---
title: Search
---



## API

| 属性          | 说明                                      | Type   | 默认值   |
| ------------ | ----------------------------------------- | ------ | ------- |
| searchConfig | 搜索配置, 详细见[searchConfig](#searchconfig) | object | -      |

## searchConfig

| 属性               | 说明                                      | Type   | 默认值   |
| ----------------- | ----------------------------------------- | ------ | ------- |
| searchDataFormat  | 格式化搜索参数                              | function | -      |
| refreshDataFormat | 格式化重制参数                              | function | -      |
| formAttrs         | 表单样式, 详见[el-form](https://element-plus.org/zh-CN/component/form.html#form-attributes)                                           | function | -      |
| formItems         | 表单子项配置，详见[xb-form](form.md)         | array | -      |
| layout         |  栅格占据的列数, <br>xs:	<768px<br> sm:	≥768px <br> md:	≥992px <br> lg:	≥1200px  <br> xl:	≥1920px   | object | { <br>&nbsp;&nbsp;span: 6, <br>&nbsp;&nbsp;xs: 24, <br>&nbsp;&nbsp;lg: 8,<br>&nbsp;&nbsp;xl: 6, <br>&nbsp;&nbsp;md: 12, <br>&nbsp;&nbsp;sm: 12, <br>} |