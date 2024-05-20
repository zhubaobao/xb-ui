---
title: Table
---
# table 上传组件

## API

| 属性           | 说明                                                                     | Type   | 默认值   |
| ------------  | -----------------------------------------------------------------------  | ------ | ------- |
| configData          | 上传图片配置                                                     | object | -       |


## configData

| 属性           | 说明                                                                     | Type   | 默认值   |
| ------------  | ----------  | ------ | ------- |
| limit       | 上传图片个数                                                         | number | 1       |
| hasCrop       | 是否需要裁切                                                       | boolean | false      |
| valueType     | 返回值的类型  / string 字符串() / array 数组(图片地址) / object 对象(返回的所有数据)   | string | string      |
| separator    | 多图时 valueType 为 string 时，图片之间的分隔符                              | string | ','      |
| fileKey      | 上传文件字段名                                                       | string | 'file'      |
| responseFormat | 上传数据格式化                                                       | function | -      |
| keysCustom | 自定义返回值字段名  | object | {  <br> url: 'image',  <br> name: 'name'  <br>  }     |
| propAttrs| el-upload 组件的属性 | object | propAttrs: {  <br> accept: 'image/*'   <br> }     |
| requestApi | 上传接口  | - | -      |
