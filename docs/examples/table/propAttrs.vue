<template>
  <div class="xb-docs-examples">
    <xb-table :tableConfig="tableConfig"></xb-table>
  </div>
</template>
<script setup>
const data = [{
  name: '张三',
  age: 18,
  sex: '男'
},{
  name: '李四',
  age: 18,
  sex: '男'
},{
  name: '王五',
  age: 18,
  sex: '男'
}]
const tableConfig = {
  requestApi: (params) => {
    return new Promise(resolve => resolve({
      code: 1,
      data: {
        list: data,
        total: data.length
      }
    }))
  },
  propAttrs: {
    rowClassName({rowIndex }){
      if (rowIndex === 2) {
        return 'success-row'
      }
      return ''
    },
    showSummary: true
  },
  headerConfig: {
    show: false
  },
  operationConfig: {
    show: false,
  },
  columns: [
    {
      label: "姓名",
      prop: "name",
      propAttrs: {
        width: 80
      }
    },
    {
      label: "年龄",
      prop: "age",
    },
    {
      label: "性别",
      prop: "sex",
    }
  ]
}
</script>
<style scoped lang="scss">

.el-table .success-row {
  background: #d6f3c6;
}
</style>