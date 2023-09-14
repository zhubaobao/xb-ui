---
title: Submit
---


## API

| 属性          | 说明                                      | Type   | 默认值   |
| ------------ | ----------------------------------------- | ------ | ------- |
| formConfig   | 表单配置, formConfig                 | object | -      |

## searchConfig

| 属性               | 说明                                      | Type   | 默认值   |
| ----------------- | ----------------------------------------- | ------ | ------- |
| searchDataFormat  | 格式化搜索参数                              | function | -      |
| refreshDataFormat | 格式化重制参数                              | function | -      |
| formAttrs         | 表单样式, 详见[el-form](https://element-plus.org/zh-CN/component/form.html#form-attributes)                                          | function | -      |
| formItems         | 表单子项, 详见formItems                    | array | -      |


## formItems

| 属性               | 说明                                      | Type   | 默认值   |
| ----------------- | ----------------------------------------- | ------ | ------- |
| type              | 类型                                       | string | -      |
| label             | 标签文本                                    | function | -      |
| propName          | 表单提交key值                               | function | -      |
| propAttrs         | 表单的属性配置，详见[element-plus](https://element-plus.org/zh-CN/component/input.html)对应的组件配置  | function | -      |

