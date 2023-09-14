---
title: Table
---


## API

| 属性           | 说明                                      | Type   | 默认值   |
| ------------  | ---------------------------------------  | ------ | ------- |
| name          | 页面的名称, 用于表格上部按钮添加，删除的名称    | string | -       |
| tableConfig   | 表格配置, 详细 tableConfig                 | Object | -       |

## tableConfig


| 属性            | 说明                                       | Type   | 默认值   |
| --------------  | -----------------------------------------  | ------ | ------- |
| propAttrs       | 表格属性, 详细见 [el-table](https://element-plus.org/zh-CN/component/table.html#table-%E5%B1%9E%E6%80%A7) 属性      | object | -        |
| hasSelection    | 是否显示表格的选择列                          | boolean | true       |
| requestApi      | 请求表格数据的方法, 返回值要求promise           | function | -       |
| responseFormat  | 格式化请求返回的表格数据                       | function | -       |
| columns         | 表格列配置, 详见 columns                     | array     | -       |
| headerConfig    | 表格上方操作区域配置, 详见 headerConfig        | object   | -       |
| importConfig    | 表格数据导入功能配置                          | object    | -       |
| operationConfig | 表格最后一列操作按钮的配置                     | object   | -       |
| deleteConfig    | 删除功能的配置                               | object   | -       |

## columns 列

| 属性           | 说明                                       | Type   | 默认值   |
| ------------  | -----------------------------------------  | ------ | ------- |
| prop          | 列的键值, 即列表接口返回的key                  | string | -       |
| label         | 列的名称                                    | string | -       |
| showHeader    | 是否使用自定义表头                            | boolean | false  |
| contentType   | 列的类型, 可选值为 template, 可自定义列         | string | -       |
| propAttrs     | 列的属性, 详见[el-table](https://element-plus.org/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7) 的列属性      | string | -       |

## headerConfig 表格上方操作区配置

| 属性           | 说明                                       | Type   | 默认值   |
| ------------  | -----------------------------------------  | ------ | ------- |
| show          | 是否显示表格上方操作区域                       | boolean | -       |
| hasAdd        | 是否显示添加按钮                              | boolean | -       |
| hasDelete     | 是否显示删除按钮                              | boolean | -       |
| hasImport     | 是否显示导入按钮                              | boolean | -       |
| hasBack       | 是否显示返回按钮, 用于二级子页面返回主页面        | boolean | -       |
| backCb        | 返回按钮回调函数                              | function | -       |

## importConfig 导入功能配置

| 属性            | 说明                                       | Type      | 默认值   |
| ------------   | -----------------------------------------  | -------- | ------- |
| requestApi     | 导入请求接口的方法, 返回值要求promise，         | function |        |
| fileKey        | 文件上传参数的key值                           | string   | -       |
| paramsFormat   | 格式化请求参数                                | function | -      | 
| responseFormat | 格式化返回值                                 | function  | -      |
| accept         | 允许上传的格式                                | array    | -    |


## operationConfig 表格操作列配置-

| 属性           | 说明                                       | Type   | 默认值   |
| ------------  | ----------------------------------------- | ------ | ------- |
| show          | 是否显示表格操作列                           | boolean | -       |
| hasDelete     | 是否显示删除按钮                             | boolean | -       |
| hasEdit       | 是否显示编辑按钮                             | string | -       |

## deleteConfig 删除功能配置

| 属性            | 说明                                       | Type   | 默认值   |
| --------------- | ----------------------------------------- | ------ | ------- |
| deleteItemIdKey | 删除参数值在表格数据对应的key                  | string | -       |
| deleteIdKey     | 删除参数的key                               | string | -       |
| responseFormat  | 页面的名称，用于表格上部按钮添加，删除的名称      | string | -       |