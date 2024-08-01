---
title: CurdTable
---
# from 表单组件

以下为表单的联动示例
## 显隐联动
通过配置 `linkShowProps` ，`linkShowCb`来实现
:::demo
form/visible
:::
## 禁用联动
通过配置 `linkDisabledProps` ，`linkDisabledCb`来实现
:::demo
form/disabled
:::
## 值联动
通过配置 `linkValueProps` ，`linkValueCb`来实现
:::demo
form/value
:::
## select值联动
通过配置 `linkOptionsProps` ，`linkOptionsCb`来实现
:::demo
form/select
:::


## API
| 属性               | 说明                                      | Type   | 默认值   |
| ----------------- | ----------------------------------------- | ------ | ------- |
| config           | 表单配置信息，同submit组件的formConfig     | Array  | -     |
| rules            | 表单验证规则                              | Object | -    |
| submitStatus     | 提交时 disabled 状体， true 为禁用表单       | boolean | false    |



## formItems 配置

| 属性               | 说明                                      | Type   | 默认值   |
| ----------------- | ----------------------------------------- | ------ | ------- |
| type              | 表单类型:   <br>XbSelect(下拉)<br>XbInput(输入框)<br>XbDatePicker(日期选择)<br>XbRadio(单选)<br>XbSwitch(开关)<br>XbUpload(图片上传)配置详见[upload组件](upload.md) <br>XbFormJson(联合组件) <br>XbInputNumber(数字输入框)   | string | -      |
| label             | 标签文本                                    | string | -      |
| propName          | 表单提交key值，接口接受如果为多个字段使用-隔开如：startTiem-endTime  | string | -      |
| defaultValue     | 默认值 | - | -|
| propAttrs         | 表单的属性配置，详见[element-plus](https://element-plus.org/zh-CN/component/input.html)对应的组件配置  | object | -      |
| formItemPropAttrs | elFromItem 的样式，详见[FormItem API](https://element-plus.org/zh-CN/component/form.html#formitem-api) | object | - |
| disabled         | 是否禁用                                      | boolean | -  |
| layout         |  栅格占据的列数, 覆盖 submit/search组件 的 layout<br>xs:	<768px<br> sm:	≥768px <br> md:	≥992px <br> lg:	≥1200px  <br> xl:	≥1920px   | object | { <br>&nbsp;&nbsp;span: 24, <br>} |
| requestApi | 获取下拉菜单值接口/上传文件的接口，类型为XbSelect/Xbupload有效 | function | - |
| responseFormat | 格式化获取下拉菜单值接口返回值/格式化上传文件返回值，类型为XbSelect/Xbupload有效 | function | - |
| options       | options radio 子项， 类型为XbRadio, <br>格式为：<br>{ <br>&nbsp;&nbsp;id:"",<br>&nbsp;&nbsp;name: "" <br>} | - |
| disabledControl | 控制显示隐藏， 类型为XbFormJson的子组件时有效 | function(index) |- |
| slots | 插槽目前支持 extra, prepend, append, 详见slots(#) | Object | --- |


## config - 联动相关
| 属性               | 说明                                      | Type   | 默认值   |
| ----------------- | ----------------------------------------- | ------ | ------- |
| linkOptionsProps  |  联动表单的 propName 值，类型为XbSelect有效 | array | -  |
| linkOptionsCb     |  联动表单值改变后回调, 需 resolve(newVal) 一个新值  <br> val 关联表单的值 <br> key 关联表单的key <br> resolve 用于返回一个新的值 <br> formData 当前表单所有值 <br>  (注：关联多个表单会执行多次,使用 formData 取值判断)| function(val, key, resolve, formData) | -  |
| linkDisabledProps  |  联动表单的 propName 值，联动是否禁用时使用      | array | -  |
| linkDisabledCb   | 联动表单是否禁用回调, 需return布尔值<br>true 禁用 / false 不禁用<br> 参数值同 linkOptionsCb | function(val, key, formData) |- |
| linkShowProps  |  联动表单的 propName 值，联动是否显隐时使用      | array | -  |
| linkShowCb  |  联动表单是否显示回调, 需return布尔值<br>true 禁用 / false 不禁用<br> 参数值同 linkDisabledCb     | function(val, key, formData) | -  |
| linkValueProps  |  联动表单的 propName 值，联动值的时候使用      | array | -  |
| linkValueCb  |  联动表单值的回调, 需return新值 <br> 参数值同 linkDisabledCb     | function(val, key, formData) | -  |

## config - 类型为XbSelect相关
| 属性               | 说明                                      | Type   | 默认值   |
| ----------------- | ----------------------------------------- | ------ | ------- |
| defaultOptions    | 下拉菜单默认值，类型为XbSelect有效, <br>格式为：<br>{ <br>&nbsp;&nbsp;id:"",<br>&nbsp;&nbsp;name: "" <br>}    | ref/array | -  |
| requestParams | 获取下拉菜单值接口的参数，类型为XbSelect有效 | function | - |
| valChangeCb | 下拉菜单值改变时回调  | function(val) | - |



## config - 类型为XbFormJson相关
| 属性               | 说明                                      | Type    | 默认值     |
| ----------------- | ----------------------------------------- | ------  | -------   |
| min               | 内容最小数量                                | number  | 0         |
| max               | 内容最大数量                                | number  | Infinity  |
| formItems         | 内容配置                                   | array   | []        |

## slots - 表单插槽
| 属性      | 说明                                                         | Type   | 默认值   |
| ---------| ------------------------------------------------------------ | ------ | ------- |
| extra    | 表单组件下文字提示，值为xbTemplate时，为自定义, #propNameExtraXbF | string | -       |
| prepend  | 表单组件前缀内容，值为xbTemplate时，为自定义, #propNamePrependXbF | string | -       |
| append   | 表单组件后缀内容，值为xbTemplate时，为自定义, #propNameAppendXbF  | string | -       |