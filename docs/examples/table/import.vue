<template>
  <div class="xb-docs-examples">
    <xb-table :tableConfig="tableConfig">
    </xb-table>
  </div>
</template>
<script setup>
import { ref } from 'vue';
const data = ref([{
  name: '张三',
  age: 18,
  sex: '男'
}])
const tableConfig = {
  headerConfig: {
    hasAdd: false,
    hasDelete: false,
    hasImport: true
  },
  importConfig: {
    requestApi: (pa) => {
      return new Promise(resolve => {
        data.value.push(
          {
            name: '李四',
            age: 18,
            sex: '男'
          }
        );
        resolve({
          code: 1,
          msg: ''
        })
      })
    },
    fileKey: 'file', //上传文件 key 值, 默认 file,
    // paramsFormat 返回  FormData 数据, 无需设置 fileKey
    paramsFormat(data) {
      const formData = new FormData()
      formData.set('file', data.file)
      return formData
    },
    responseFormat(val) {
      return val
    },
    propAttrs: {
      accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel',
    }
  },
  operationConfig: {
    show: false
  },
  requestApi: () => {
    return new Promise(resolve => resolve({
      code: 1,
      data: {
        list: data.value,
        total: data.value.length
      }
    }))
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
}
</script>