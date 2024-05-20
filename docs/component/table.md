---
title: Table
---
# table 表格组件

## API

| 属性           | 说明                                                                     | Type   | 默认值   |
| ------------  | -----------------------------------------------------------------------  | ------ | ------- |
| name          | 页面的名称, 用于表格上部按钮添加，删除的名称                                   | string | -       |
| requestParams | 表格请求额外请求参数, 如果 key 为 pageSize, page，会覆盖默认的 page,pageSize       | Object | -       | 
| tableConfig   | 表格配置, 详细 [tableConfig配置](#tableconfig)                                  | Object | -       |

## tableConfig


| 属性            | 说明                                                                | Type   | 默认值   |
| --------------  | -----------------------------------------------------------------  | ------ | ------- |
| propAttrs       | 表格属性, 详细见 [el-table](https://element-plus.org/zh-CN/component/table.html#table-%E5%B1%9E%E6%80%A7) 属性      | object | { <br>&nbsp;&nbsp;height: 100% <br>}  |
| hasSelection    | 是否显示表格的选择列                                                   | boolean/ref |true       |
| requestApi      | 请求表格数据的方法, 返回值要求promise                                    | function  | -       |
| paramsFormat    | 格式化请求参数                                                         | function(val) | -   |
| responseFormat  | 格式化请求返回的表格数据                                                | function(val)   | -       |
| formDataFormat  | 表单值格式化用于编辑/复制，支持接口, 通过 resolve(newFormData) 返回新值     |  function(resolve, data, formData) |
| selectable      | 用来决定这一行的 CheckBox 是否可以勾选                                   | function(row, index)  | -       |
| columns         | 表格列配置, 详见 [columns配置](#columns-列)                                 | array | -       |
| headerConfig    | 表格上方操作区域配置, 详见 [headerConfig配置](#headerconfig-表格上方操作区配置) | object  | -       |
| importConfig    | 表格数据导入功能配置, 详见 [importConfig配置](#importconfig-导入功能配置)      | object  | -       |
| operationConfig | 表格最后一列操作按钮的配置, 详见 [operationConfig配置](#operationconfig-表格操作列配置) | object  | -   |
| deleteConfig    | 删除功能的配置, 详见 [deleteConfig配置](#deleteconfig-删除功能配置)             | object   | -       |
| footerConfig   | 底部功能区配置，目前只支持是否显示                                            | Object  | { <br>  &nbsp;&nbsp;&nbsp;show: true<br> }|

<!-- <a id="columns"></a> -->
## columns 列

| 属性           | 说明                                                               | Type   | 默认值   |
| ------------  | ----------------------------------------------------------------  | ------ | ------- |
| prop          | 列的键值, 即列表接口返回的key                                         | string | -       |
| label         | 列的名称                                                           | string | -       |
| show          | 是否显示列                                                          | boolean | -      |
| showHeader    | 是否使用自定义表头                                                    | boolean | false  |
| contentType   | 列的类型, 可选值为 template(自定义)/sort(排序)                          | string | -       |
| propAttrs     | 列的属性, 详见[el-table](https://element-plus.org/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7) 的列属性      | string | -       |
| sortConfig    | contentType为sort时有效，详见 [sortConfig配置](#sortconfig-列表排序功能配置) | object | - |

## headerConfig 表格上方操作区配置

| 属性           | 说明                                       | Type   | 默认值   |
| ------------  | -----------------------------------------  | ------ | ------- |
| show          | 是否显示表格上方操作区域                       | boolean | true       |
| hasAdd        | 是否显示添加按钮                              | boolean/function | true      |
| hasCopy       | 是否显示复制按钮                              | boolean/function | true      |
| hasDelete     | 是否显示删除按钮                              | boolean/function | true       |
| hasImport     | 是否显示导入按钮                              | boolean/function | false      |
| hasBack       | 是否显示返回按钮, 用于二级子页面返回主页面        | boolean/function | false       |
| backCb        | 返回按钮回调函数, 当hasBack为true时使用         | function | -       |

## importConfig 导入功能配置

| 属性            | 说明                                       | Type      | 默认值   |
| ------------   | -----------------------------------------  | -------- | -------  |
| requestApi     | 导入请求接口的方法, 返回值要求promise，         | function |          |
| fileKey        | 文件上传参数的key值                           | string   | -        |
| paramsFormat   | 格式化请求参数                                | function | -       | 
| responseFormat | 格式化返回值                                 | function  | -       |
| accept         | 允许上传的格式                                | array    | -       |


## operationConfig 表格操作列配置-

| 属性           | 说明                                       | Type   | 默认值   |
| ------------  | ----------------------------------------- | ------ | ------- |
| show          | 是否显示表格操作列                           | boolean | true      |
| hasDelete     | 是否显示删除按钮                             | boolean/function | -       |
| hasEdit       | 是否显示编辑按钮                             | boolean/function | -       |
| hasCopy       | 是否显示复制按钮                           | boolean/function | -       |
| width         | 操作列宽度                                  | string/ref | 100       |

## deleteConfig 删除功能配置

| 属性            | 说明                                       | Type   | 默认值   |
| --------------- | ----------------------------------------- | ------ | ------- |
| deleteItemIdKey | 删除参数值在表格数据对应的key                  | string | id      |
| deleteIdKey     | 删除参数的key                               | string | ids       |
| responseFormat  | 格式化返回值                                 | string | -       |
| paramsFormat    | 格式化参数                                   | string | -       |

## sortConfig 列表排序功能配置
| 属性            | 说明                                       | Type   | 默认值   |
| --------------- | ----------------------------------------- | ------ | ------- |
| requestApi      | 排序请求接口的方法                           | function | -       |
| prop            | 列表排序的字段                               | string | sort       |
| responseFormat  | 格式化返回值                                 | string | -       |
| paramsFormat    | 格式化参数                                   | string | -       |