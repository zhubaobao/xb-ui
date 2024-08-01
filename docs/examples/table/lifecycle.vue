<template>
  <div class="xb-docs-examples">
    <xb-curd-table :tableConfig="tableConfig" :formConfig="formConfig"></xb-curd-table>
  </div>
</template>
<script setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
const data = ref([{
  id: 1,
  name: '张三',
  age: 18,
  sex: '男'
}])
// 表单配置
const formConfig = {
  edit: {
    requestApi: (params) => {
      return new Promise(reslove => {
        let index = data.value.findIndex(item => item.id == params.id)
        data.value[index] = params
        reslove({
          code: 1,
          msg: '编辑成功'
        })
      })
    },
    title: '编辑',
  },
  formItems: [
    {
      propName: 'name',
      label: '姓名',
      type: 'XbInput',
      placeholder: '请输入姓名',
    },
    {
      propName: 'age',
      label: '年龄',
      type: 'XbInput',
      placeholder: '请输入年龄',
    },
    {
      propName: 'sex',
      label: '姓别',
      type: 'XbRadio',
      defaultValue: '男',
      options: [
        {
          name: '男',
          id: '男'
        },
        {
          name: '女',
          id: '女'
        }
      ]
    },
  ]
}
const tableConfig = {
  operationConfig: {
    hasDelete: false
  },
  headerConfig: {
    show: false
  },
  columns: [
    {
      label: "姓名",
      prop: "name",
    },
    {
      label: "年龄",
      prop: "age",
    },
    {
      label: "性别",
      prop: "sex",
    },
  ],
  requestApi: () => {
    return new Promise(resolve => resolve({
      code: 1,
      data: data.value
    }))
  },
  paramsFormat(params) {
    // 处理接口请求值
    return {
      ...params,
      type: 1
    }
  },
  responseFormat(val) {
    // 处理接口返回值, 
    return {
      code: val.code,
      data: {
        list: val.data,
        total: val.data.length
      }
    }
  },
  // 只在 使用 curdTable 有效
  formDataFormat(resolve, data, formData) {
    ElMessage.success('我是编辑回调')
    new Promise(() => {
      resolve({
        id: 1,
        name: '张三',
        age: 18,
        class: '高一6班',
        sex: '女'
      })
    })
  }
}
</script>