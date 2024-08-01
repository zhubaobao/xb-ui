<template>
  <div class="xb-docs-examples">
    <div class="xb-docs-tool">
      <el-checkbox v-model="buttonControls.operationShow">操作栏</el-checkbox>
      <el-checkbox v-model="buttonControls.hasEdit">编辑</el-checkbox>
      <el-checkbox v-model="buttonControls.hasDelete">删除</el-checkbox>
      <el-checkbox v-model="buttonControls.hasCopy">复制</el-checkbox>
    </div>
    <xb-table :tableConfig="tableConfig" @edit="handleEdit" @copy="handleCopy">
      <template #tableOperations>
        <el-button class="xb-operations-btn" text size="small">我是自定义按钮</el-button>
      </template>
      <template #tableOperations-after>
        <el-button class="xb-operations-btn" text size="small">我是自定义按钮</el-button>
      </template>
    </xb-table>
  </div>
</template>
<script setup>
import { ElMessage } from 'element-plus';
import { reactive } from 'vue';
const buttonControls = reactive({
  operationShow: true,
  hasEdit: true,
  hasDelete: true,
  hasCopy: false,
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
  // row 该条数据的值, 函数只是示例需要，可以直接为 boolean 值 hasEdit: hasEdit
  operationConfig: {
    show: (row) => buttonControls.operationShow,
    hasEdit: (row) => buttonControls.hasEdit,
    hasDelete: (row) => buttonControls.hasDelete,
    hasCopy: (row) => buttonControls.hasCopy,
    width: 300
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
const handleEdit = () => {
  ElMessage.success('编辑')
}
const handleCopy = () => {
  ElMessage.success('复制')
}
</script>
<style scoped lang="scss">
.xb-docs-tool {
  display: flex;
  margin-bottom: 30px;
}
</style>