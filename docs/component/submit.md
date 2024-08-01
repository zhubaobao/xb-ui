---
title: Submit
---

# submit 提交组件

## 单独页面使用
常用于设置页面，如网站基础设置，需设置 `isPage` 为 true, `formConfig.popupType` 设置page，隐藏取消按钮
:::demo
submit/alone
:::
## 提交类型及各类型配置
该组件提交类型分为3种，`edit`编辑,`add`保存,`save`提交。 单独使用时，需设置`type`值 add/edit, 使用集成组件时无需设置，
save 需要开启保存按钮。<br>
关于类型配置本示例只展示编辑，其他2个类型更编辑相同，只是减少了一些配置<br>
:::demo
submit/type
:::
## 表单验证配置
表单验证配置分为3个地方, `formAttrs 下的`, `add/edit 下的`， `formItems 子项的 formItemPropAttrs 下的`,
如果相同后面的覆盖前面的，不同就合并。
:::demo
submit/rules
:::
## 展示类型
该组件展示类型分为三种，可以通过配置 `popupType`实现，分别为 `drawer(抽屉)`, `dialog(弹窗)`,`page(独立页面) `。
:::demo
submit/popupType
:::

## 底部按钮配置
通过`footerConfig`配置按钮的显示隐藏，按钮的文字。通过`formBotton`，`formBotton-after`插槽自定义底部按钮。
:::demo
submit/footerConfig
:::
## tabs
可以通过配置 `tabs`, 该属性和 `formItems`二者互斥只能选其一
:::demo
submit/tabs
:::
## 其他
当 popuptype 为 drawer 或 dialog 时, 可以通过设置 `width` 改变弹窗的大小，该组件打开时会出发 `openCb` 回调。

:::demo
submit/other
:::

<br><br><br><br>
以下2个示例也适用于 `search` 组件，在search组件不在说明
## element组件的属性和方法设置
该组件包含三部分 element 组件，`el-form`, `el-form-item`, `表单组件: el-input等`，
配置位置按顺序一次在，`formAttrs`, `formItemPropAttrs`, `propAttrs`。
:::demo
submit/attrs
:::
## 响应式布局
采用栅格化布局，一行分为 24份，预设了五个响应尺寸：xs、sm、md、lg 和 xl。可以通过`formConfig 下的 layout` 或 `formItems 子项下的 layout`, 前者为全部子项，后者为单独，后者覆盖前者。
:::demo
submit/layout
:::

## API
| 属性          | 说明                                      | Type   | 默认值   |
| ------------ | ----------------------------------------- | ------ | ------- |
| formConfig   | 表单配置,详见[formConfig配置](#formconfig-配置) | object | -    |
| isPage       | popupType 为 page时，单独使用该组件时使用，表单永久显示    | boolean | false   |
| type         | 类型，值：add(新增) / edit(编辑) ，单独使用该组件时使用 | string | -    |



## formConfig 配置

| 属性          | 说明                                      | Type   | 默认值   |
| ------------ | ----------------------------------------- | ------ | ------- |
| popupType    | 窗口类型，drawer(抽屉)/dialog(弹窗)/page(独立页面)  | string | drawer  |
| width   | 弹窗大小   popupType为  drawer或dialog时有效          | string | drawer时 600 / dialog 时 800     |
| openCb   | 弹窗打开时的回调函数，接收参数：xbFormRef(该组件实例)       | function | -    |
| popupAttrs   | 窗口样式，详见[el-drawer](https://element-plus.org/zh-CN/component/drawer.html#%E5%B1%9E%E6%80%A7)/[el-dialog](https://element-plus.org/zh-CN/component/dialog.html#api)         | object | { <br>  &nbsp;&nbsp;&nbsp;alignCenter: true<br> }   |
| formAttrs   | 表单样式, 详见[el-form](https://element-plus.org/zh-CN/component/form.html#form-attributes) <br>此处的 rules 为公用校验   | function | { <br>  &nbsp;&nbsp;&nbsp;labelWidth: "100px"<br> &nbsp;&nbsp;&nbsp;rule: {}<br> }  |
| save         | 保存功能配置，详见[add配置](#add配置)            | object | -  |
| add          | 添加功能配置，详见[add配置](#add配置)            | object | -  |
| edit          | 添加功能配置，详见[edit配置](#edit配置)            | object | -  |
| tabs          | 切换功能, formItems/tabs 二者选一, 详见[tabs配置](#tabs配置)   | array | -|
| formItems     | 表单子项配置，详见[xb-form](form.md)         | array | -      |
| footerConfig  | 底部按钮配置，详见[footerConfig配置](#footerConfig配置)         | object | -      |
| layout        |  栅格占据的列数, <br>xs:	<768px<br> sm:	≥768px <br> md:	≥992px <br> lg:	≥1200px  <br> xl:	≥1920px   | object | { <br>&nbsp;&nbsp;span: 24, <br>} |

## tabs配置
| 属性           | 说明                                      | Type   | 默认值   |
| ------------  | ----------------------------------------- | ------ | ------- |
| label         |  选项卡标题                               | string | ---   |
| formItems      | 表单子项配置，详见[xb-form](form.md)         | array | -      |

## save配置
| 属性           | 说明                                      | Type   | 默认值   |
| ------------  | ----------------------------------------- | ------ | ------- |
| requestApi   | 添加接口                                 | promise | -      |
| paramsFormat  | 格式化请求参数                               | function | -      |
| responseFormat| 格式化请求返回的数据                           | function | -     |


## add配置

| 属性           | 说明                                      | Type   | 默认值   |
| ------------  | ----------------------------------------- | ------ | ------- |
| title         | 添加弹窗标题, 支持函数                           | string/function | 添加    |
| requestApi   | 添加接口                                 | promise | -      |
| rules         | 表单验证规则，合并 formAttrs 中 rules 配置     | object | -      |
| paramsFormat  | 格式化请求参数                               | function | -      |
| responseFormat| 格式化请求返回的数据                           | function | -     |


## edit配置

| 属性           | 说明                                      | Type   | 默认值   |
| ------------  | ----------------------------------------- | ------ | ------- |
| title         | 编辑弹窗标题,支持函数                                | string/function | 修改    |
| requestApi   | 编辑接口                                 | promise | -      |
| rules         | 表单验证规则，合并 formAttrs 中 rules 配置     | object | -      |
| idKey         | 编辑 id 的 key 值                          | string | id     |
| idValueKey    | 编辑 id 值的 key 值                         | string | id     |
| paramsFormat  | 格式化请求参数                               | function | -      |
| responseFormat| 格式化请求返回的数据                           | function | -     |

## footerConfig底部按钮配置
| 属性          | 说明                                                         | 类型    | 默认值 |
| ------------- | ------------------------------------------------------------ | ------- | ------ |
| saveBtnShow   | 保存按钮是否显示, 为函数时接受2个参数，type(类型) / formRef(表单组件实例)，需 return false 或 true  | boolean/function | false   |
| saveBtnTitle   | 保存按钮文字                                                 | string  | 保存   |
| cancelBtnShow   | 取消按钮是否显示, 为函数时 同 saveBtnShow                      | boolean/function | true   |
| cancelBtnTitle  | 取消按钮文字                                                | string  | 取消   |
| submitBtnShow   | 提交按钮是否显示, 为函数时 同 saveBtnShow                      | boolean/function | true   |
| submitBtnTitle  | 提交按钮文字                                                | string  | 提交   |


## Slots 插槽

| 插槽名              | 说明                                       |
| ------------------ | ----------------------------------------- | 
| headContent  | 表单页面顶部内容插槽       | 
| formBotton  | 底部按钮区域插槽， 值： <br> xbFormRef (该组件实例) <br> changePopupStatus (表单组件状态切换函数集，changePopupStatus.open() 打开表单，changePopupStatus.close() 关闭表单) <br>  changeSubmitStatus()   | 
| formBotton-after |  同上 ｜





