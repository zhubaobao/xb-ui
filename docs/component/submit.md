---
title: Submit
---

# submit 提交组件

## API

| 属性          | 说明                                      | Type   | 默认值   |
| ------------ | ----------------------------------------- | ------ | ------- |
| popupType    | 窗口类型，drawer(抽屉)/dialog(弹窗)/page(独立页面)  | string | drawer  |
| popupAttrs   | 窗口样式，详见[el-drawer](https://element-plus.org/zh-CN/component/drawer.html#%E5%B1%9E%E6%80%A7)/[el-dialog](https://element-plus.org/zh-CN/component/dialog.html#api)         | object | { <br>  &nbsp;&nbsp;&nbsp;alignCenter: true<br> }   |
| formAttrs   | 表单样式, 详见[el-form](https://element-plus.org/zh-CN/component/form.html#form-attributes) <br>此处的 rule 为公用校验   | function | { <br>  &nbsp;&nbsp;&nbsp;labelWidth: "100px"<br> &nbsp;&nbsp;&nbsp;rule: {}<br> }  |
| add          | 添加功能配置，详见[add配置](#add配置)            | object | -  |
| edit          | 添加功能配置，详见[edit配置](#edit配置)            | object | -  |
| tabs          | 切换功能, formItems/tabs 二者选一, 详见[tabs配置](#tabs配置)   | array | -|
| formItems         | 表单子项配置，详见[xb-form](form.md)         | array | -      |
| layout         |  栅格占据的列数, <br>xs:	<768px<br> sm:	≥768px <br> md:	≥992px <br> lg:	≥1200px  <br> xl:	≥1920px   | object | { <br>&nbsp;&nbsp;span: 24, <br>} |

## tabs配置
| 属性           | 说明                                      | Type   | 默认值   |
| ------------  | ----------------------------------------- | ------ | ------- |
| label         |  选项卡标题                               | string | ---   |
| formAttrs      | 表单子项配置，详见[xb-form](form.md)         | array | -      |

## add配置

| 属性           | 说明                                      | Type   | 默认值   |
| ------------  | ----------------------------------------- | ------ | ------- |
| title         | 添加弹窗标题                                 | string | 添加    |
| rules         | 表单验证规则，合并 formAttrs 中 rules 配置     | object | -      |
| paramsFormat  | 格式化请求参数                               | function | -      |
| responseFormat| 格式化请求返回的数据                           | function | -     |


## edit配置

| 属性           | 说明                                      | Type   | 默认值   |
| ------------  | ----------------------------------------- | ------ | ------- |
| title         | 编辑弹窗标题                                | string | 修改    |
| rules         | 表单验证规则，合并 formAttrs 中 rules 配置     | object | -      |
| idKey         | 编辑 id 的 key 值                          | string | id     |
| idValueKey    | 编辑 id 值的 key 值                         | string | id     |
| paramsFormat  | 格式化请求参数                               | function | -      |
| responseFormat| 格式化请求返回的数据                           | function | -     |
