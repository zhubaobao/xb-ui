---
title: Table
---


# table 表格组件

示例中提到的配置都在 tableConfig 中配置

## columns 列
该示例展示所有类型的表格列配置<br><br>
配置 `columns` 属性，<br>
:::demo
table/columns
:::

## el-table 属性和方法设置

该示例展示了如何设置表格原有的属性方法用法<br><br>
可以通过配置 `propAttrs` 和 `columns 子项的 propAttrs`属性，,具体属性方法可查看 el-table 组件的文档。

:::demo
table/propAttrs
:::

## 生命周期

该示例展示页面请求数据过程中的钩子函数<br><br>
`paramsFormat` 数据请求前，可以对请求参数做一些格式处理。<br>
`responseFormat` 数据请求后，可以对请求成功后接口返回数据做一些格式处理. 该组件需要格式为:
`{ code: 1, data: { list: [], total: 0 } }`,如果接口返回的格式不是该格式需要使用该函数处理返回值。<br>
`formDataFormat` 点击 编辑/复制时的回调函数，可以对该条数据做一些格式处理或请求接口。
:::demo
table/lifecycle
:::

## 选择列配置
该示例展示表格多选功能<br><br>
设置`hasSelection` 为 true, 表示显示表格的选择列，也支持函数，设置`selectable`用来决定这一行的 CheckBox 是否可以勾选。
:::demo
table/selection
:::

## 顶部操作按钮配置

该示例展示了表格顶部操作按钮的配置<br><br>
通过配置 `headerOperation` 属性，来控制添加，删除，导入,返回按钮的显示隐藏, 支持函数或 boolean 类型, 该示例使用的函数。<br>
其中返回按钮用于子页面中配合 backCb 一起使用，导入按钮需配合 `importConfig` 配置使用。删除按钮需要配合`deleteConfig`配置使用 <br>
可以通过设置 headerOperation 下的`addBtnText`,`deleteBtnText`, `importBtnText`来控制按钮的文字
可以通过 `headerOperations-before`, `headerOperations` 插槽自定义按钮, 自定义按钮需加上 `xb-table-operation-btn` 类
:::demo
table/header-operation
:::

## 表格操作按钮配置

该示例展示了表格操作按钮的配置<br><br>
通过配置`operationConfig` 属性，来控制编辑，删除，复制按钮的显示隐藏, 支持函数或 boolean 类型, 该示例使用的函数。<br>
可以配置 `operationConfig.width` 来控制操作栏的宽度。<br>
可以通过 `tableOperations`, `headerOperations-after` 插槽自定义按钮, 自定义按钮需加上 `xb-operation-btn` 类
:::demo
table/operation
:::

## 底部工具栏配置
该示例展示了表格底部工具栏的配置<br><br>
该配置目前只能控制底部栏的显示隐藏,支持函数或 boolean 类型, 该示例使用的函数。<br>
通过 `table-tool` 插槽自定义右侧工具按钮
:::demo
table/tool
:::

## 导入配置
该示例展示了表格导入功能的配置<br><br>
当 设置 `headerConfig.hasImport` 为 true 时，通过配置 `importConfig` 属性，实现导入功能<br>
:::demo
table/import
:::

## 删除功能配置
该示例展示了表格删除功能的配置<br><br>
通过配置`deleteConfig` 属性，实现删除功能<br>
:::demo
table/delete
:::

## API

| 属性        | 说明                                            | Type   | 默认值 |
| ----------- | ----------------------------------------------- | ------ | ------ |
| name        | 页面的名称, 用于表格上部按钮添加，删除的名称    | string | -      |
| tableConfig | 表格配置, 详细 [tableConfig 配置](#tableconfig) | Object | -      |

## tableConfig

| 属性            | 说明                                        | Type  | 默认值   |
| --------------- | ------------------------------------------ | ----------- | --------------- |
| propAttrs       | 表格属性, 详细见 [el-table](https://element-plus.org/zh-CN/component/table.html#table-%E5%B1%9E%E6%80%A7) 属性 | object   | { <br>&nbsp;&nbsp;height: 100% <br>}      |
| requestParams   | 表格请求额外请求参数, 如果 key 为 pageSize, page，会覆盖默认的 page,pageSize   | Object | -   |
| hasSelection    | 是否显示表格的选择列,        | boolean/function   | true            |
| requestApi      | 请求表格数据的方法, 返回值要求 promise      | function     | -    |
| paramsFormat    | 格式化请求参数                             | function(val)   | -   |
| responseFormat  | 格式化请求返回的表格数据                | function(val)   | -   |
| formDataFormat  | 表单值格式化用于编辑/复制，支持接口, 只在使用 curdTable 时有效,通过 resolve(newFormData) 返回新值    | function(resolve, data, formData) | -  |
| selectable      | 用来决定这一行的 CheckBox 是否可以勾选              | function(row, index)    | -   |
| columns         | 表格列配置, 详见 [columns 配置](#columns-列)       | array    | -  |
| headerConfig    | 表格上方操作区域配置, 详见 [headerConfig 配置](#headerconfig-表格上方操作区配置) | object  | -   |
| importConfig    | 表格数据导入功能配置, 详见 [importConfig 配置](#importconfig-导入功能配置)   | object  | -  |
| operationConfig | 表格最后一列操作按钮的配置, 详见 [operationConfig 配置](#operationconfig-表格操作列配置) | object| - |
| deleteConfig    | 删除功能的配置, 详见 [deleteConfig 配置](#deleteconfig-删除功能配置) | object | -    |
| footerConfig    | 底部功能区配置，目前只支持是否显示, 支付函数/boolean        | Object     | { <br> &nbsp;&nbsp;&nbsp;show: true<br> } |

<!-- <a id="columns"></a> -->

## columns 列

| 属性         | 说明                                                        | Type    | 默认值 |
| ----------- | ----------------------------------------------------------- | ------- | ------ |
| prop        | 列的键值, 即列表接口返回的 key, 为必填项                           | string  | -      |
| label       | 列的名称                                                     | string  | -      |
| show        | 是否显示列                                                    | boolean | -      |
| showHeader  | 是否使用自定义表头                                             | boolean | false  |
| contentType | 列的类型, 可选值为 template(自定义) 详见：[Slots 插槽](#slots-插槽) / sort(排序) | string  | -      |
| propAttrs   | 列的属性, 详见[el-table](https://element-plus.org/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7) 的列属性 | Object  | -      |
| sortConfig  | contentType 为 sort 时有效，详见 [sortConfig 配置](#sortconfig-列表排序功能配置) | object  | -   |

## headerConfig 表格上方操作区配置

| 属性        | 说明                                        | Type             | 默认值 |
| ---------  | ------------------------------------------- | ---------------- | ------ |
| show       | 是否显示表格上方操作区域, 支持函数和boolean           | boolean/function | true   |
| hasAdd     | 是否显示添加按钮, 支持函数和boolean                  | boolean/function | true   |
| addBtnText | 编辑按钮文字                             | string | -   |
| hasCopy   | 是否显示复制按钮, 支持函数和boolean          | boolean/function | true   |
| hasDelete | 是否显示删除按钮, 支持函数和boolean         | boolean/function | true   |
| deleteBtnText | 删除按钮文字                             | string | -   |
| hasImport | 是否显示导入按钮 ,支持函数和boolean          | boolean/function | false  |
| hasBack   | 是否显示返回按钮, 用于二级子页面返回主页面, 支持函数和boolean   | boolean/function | false  |
| backCb    | 返回按钮回调函数, 当 hasBack 为 true 时使用 | function         | -      |

## importConfig 导入功能配置

| 属性           | 说明                                     | Type     | 默认值 |
| -------------- | ---------------------------------------- | -------- | ------ |
| requestApi     | 导入请求接口的方法, 返回值要求 promise， | function |        |
| fileKey        | 文件上传参数的 key 值                    | string   | file   |
| paramsFormat   | 格式化请求参, 接收参数data为上传的数据， 需 return 完整的 FormData 数据   | function(data) | -      |
| responseFormat | 格式化返回值                             | function | -      |
| propAttrs     | el-upload 上传组件的属性方法设置           | object   | -      |

## operationConfig 表格操作列配置-

| 属性      | 说明                                   | Type             | 默认值 |
| --------- | ------------------------------------- | ---------------- | ------ |
| show      | 是否显示表格操作列                       | boolean          | true   |
| hasDelete | 是否显示删除按钮,如果是函数时，结束 data 参数(该条数据)，需 return true 或 false, | boolean/function | -    |
| hasEdit   | 是否显示编辑按钮, 如果是函数时 同上                     | boolean/function | -      |
| hasCopy   | 是否显示复制按钮, 如果是函数时 同上                     | boolean/function | -      |
| width     | 操作列宽度                                          | string/ref       | 100    |

## deleteConfig 删除功能配置

| 属性            | 说明                           | Type   | 默认值 |
| --------------- | ------------------------------ | ------ | ------ |
| deleteItemIdKey | 删除参数值在表格数据对应的 key | string | id     |
| deleteIdKey     | 删除参数的 key                 | string | ids    |
| responseFormat  | 格式化返回值                   | string | -      |
| paramsFormat    | 格式化参数                     | string | -      |

## sortConfig 列表排序功能配置

| 属性           | 说明               | Type     | 默认值 |
| -------------- | ------------------ | -------- | ------ |
| requestApi     | 排序请求接口的方法 | function | -      |
| prop           | 列表排序的字段     | string   | sort   |
| responseFormat | 格式化返回值       | string   | -      |
| paramsFormat   | 格式化参数         | string   | -      |

## Slots 插槽

| 插槽名                      | 说明                                         |
| --------------------------- | ------------------------------------------- |
| columns 的 prop 值          | 当 content 为 template 时，自定义内容, 值：scope(数据)   |
| columns 的 prop 值 + Header | 当 showHeader 为 true 时，自定义表头内容     |
| tableOperations             | 表格操作栏按钮 , 值： tableRef(表格实例)， data(数据), refresh(刷新表格), index(索引) |
| headerOperations            | 表格顶部操作按钮, 值： tableRef(表格实例)， refresh(刷新表格)  |
| empty                       | 表格空数据时显示的内容      |
| table-tool                  | 底部右边操作按钮            |
