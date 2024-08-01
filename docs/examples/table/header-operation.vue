<template>
  <div class="xb-docs-examples">
    <div class="xb-docs-tool">
      <el-checkbox v-model="buttonControls.headerOperationShow">顶部操作栏</el-checkbox>
      <el-checkbox v-model="buttonControls.hasBack">返回</el-checkbox>
      <el-checkbox v-model="buttonControls.hasAdd">添加</el-checkbox>
      <el-checkbox v-model="buttonControls.hasDelete">删除</el-checkbox>
      <el-checkbox v-model="buttonControls.hasImport">导入</el-checkbox>
    </div>
    <xb-table :tableConfig="tableConfig" @add="handleAdd">
      <template #headerOperations-before>
        <el-button class="xb-table-operation-btn">我是自定义按钮</el-button>
      </template>
      <template #headerOperations>
        <el-button class="xb-table-operation-btn">我是自定义按钮</el-button>
      </template>
    </xb-table>
  </div>
</template>
<script setup>
import { ElMessage } from 'element-plus';
import { reactive } from 'vue';
const buttonControls = reactive({
  headerOperationShow: true,
  hasAdd: true,
  hasDelete: true,
  hasImport: false,
  hasBack: false
})
const data = [{
  name: '张三',
  age: 18,
  sex: '男'
}]
const tableConfig = {
  // 函数只是示例需要，可以直接为 boolean 值 hasAdd: hasEdit
  headerConfig: {
    deleteBtnText: '删除学生',
    addBtnText: '添加学生',
    importBtnText: '导入学生',
    show: () => buttonControls.headerOperationShow,
    hasAdd: () => buttonControls.hasAdd,
    hasDelete: () => buttonControls.hasDelete,
    hasImport: () => buttonControls.hasImport,
    hasBack: () => buttonControls.hasBack,
    backCb() {
      ElMessage.success('返回成功');
    }
  },
  operationConfig: {
    show: false
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
const handleAdd = () => {
  ElMessage.success('添加')
}
</script>
<style scoped lang="scss">
.xb-docs-tool {
  display: flex;
  margin-bottom: 30px;
}
</style>