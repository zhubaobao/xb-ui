---
title: Table
---
# table 上传组件

## 基础使用

该组件单独使用时在`configData`中配置，如果在集合组件在 `formItems 子项中配置`。必须字段为`requestApi`。
返回格式要求 `{ code: 1, data: '' }` 或 `{ code: 1, data: { image: '' } }`。还可以配其他设置，
如最多上传数量 - `limit`, el-upload 组件的属性方法设置 - `propAttrs`。组件大小设置 - `width`, `height`

:::demo
upload/basic
:::

## 返回值类型设置

上传组件返回类型分为三类，可通过`valueType`属性设置，分别为 `string`字符串, `array`数组，`object`对象。
如果多张时，选字符串类型，可以通过配置`separator`,修改图片之间的分隔符，默认为英文逗号`,`。
:::demo
upload/valueType
:::

## 数据处理

分为以下几大类上传参数图片key值的修改 - `fileKey`, 上传参数格式化 - `paramsFormat`, 上传数据格式化 - `responseFormat`,
自定义返回值的key，默认为 `image` 和 `name` - `keysCustom`。
:::demo
upload/format
:::

## 图片裁切

通过设置`hasCrop` 为 true, 开启图片裁剪功能。
:::demo
upload/crop
:::

## API

| 属性           | 说明                                                                     | Type   | 默认值   |
| ------------  | -----------------------------------------------------------------------  | ------ | ------- |
| configData          | 上传图片配置                                                     | object | -       |
| v-model         | 绑定值                                                     | - | -       |

## configData

| 属性           | 说明                                                                     | Type   | 默认值   |
| ------------  | ----------  | ------ | ------- |
| limit       | 上传图片个数                                                         | number | 1       |
| width       | 组件宽度                                                        | number | 110       |
| height       | 组件高度                                                        | number | 110       |
| hasCrop       | 是否需要裁切                                                       | boolean | false      |
| valueType     | 返回值的类型  / string 字符串() / array 数组(图片地址) / object 对象(返回的所有数据)   | string | string      |
| separator    | 多图时 valueType 为 string 时，图片之间的分隔符                              | string | ','      |
| fileKey      | 上传文件字段名                                                       | string | 'file'      |
| paramsFormat | 上传参数格式化                                                       | function | -      |
| responseFormat | 上传数据格式化                                                       | function | -      |
| keysCustom | 自定义返回值字段名  | object | {  <br> url: 'image',  <br> name: 'name'  <br>  }     |
| propAttrs| el-upload 组件的属性 | object | propAttrs: {  <br> accept: 'image/*'   <br> }     |
| requestApi | 上传接口  | - | -      |

<!-- ## libConfig配置

| 属性           | 说明                                                                     | Type   | 默认值   |
| ------------  | ----------  | ------ | ------- |
| requestApi   | 图库列表接口                                                        | - | -       |
| paramsFormat   | 参数格式化                                                 | function(params) | -       |
| responseFormat   | 返回值格式化，                                                    | - | -     | -->
