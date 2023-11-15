---
title: CurdTable
---


## formItems

| 属性               | 说明                                      | Type   | 默认值   |
| ----------------- | ----------------------------------------- | ------ | ------- |
| type              | 表单类型                                    | string | -      |
| label             | 标签文本                                    | string | -      |
| propName          | 表单提交key值，接口接受如果为多个字段使用-隔开如：startTiem-endTime  | string | -      |
| propAttrs         | 表单的属性配置，详见[element-plus](https://element-plus.org/zh-CN/component/input.html)对应的组件配置  | function | -      |
| defaultOptions    | 下拉菜单默认值，类型为XbSelect有效             | ref/array | -  |
| linkOptionsProps  |  联动表单的 propName 值，类型为XbSelect有效                     | array | -  |
| linkOptionsCb     |  联动表单值改变后回调, 需 return 一个新值          | function | -  |
| disabled |        | 是否禁用                                      | boolean | -  |


