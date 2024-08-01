<template>
    <div class="xb-docs-examples" >
      <div class="xb-docs-tool">
        <el-checkbox v-model="buttonControls.toolShow">工具栏</el-checkbox>
      </div>
      <xb-table :tableConfig="tableConfig" >
        <template #table-tool>
          <el-button  text size="small">我是自定义按钮</el-button>
        </template>
      </xb-table>
    </div>
  </template>
  <script setup>
  import { reactive } from 'vue';
  const buttonControls = reactive({
    toolShow: true,
  })
  const data = [{
    name: '张三',
    age: 18,
    sex: '男'
  }]
  const tableConfig = {
   
    headerConfig: {
      show: false
    },
    operationConfig: {
      show: false
    },
    footerConfig: {
      show: () => buttonControls.toolShow
    },
    requestApi: () => {
      return new Promise(resolve => resolve({
        code: 1,
        data: {
          list: data,
          total: data.length
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
  <style scoped lang="scss">
  .xb-docs-tool{
    display: flex;
    margin-bottom: 30px;
  }
  </style>