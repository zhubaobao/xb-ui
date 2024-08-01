<template>
  <div class="xb-docs-examples">
    <div class="xb-docs-tool">
      <el-checkbox v-model="hasSelection">选择列</el-checkbox>
    </div>
    <xb-table :tableConfig="tableConfig">
    </xb-table>
  </div>
</template>
<script setup>
import { ref } from 'vue';
const data = [{
  s_id: 1,
  name: '张三',
  age: 18,
  sex: '男'
}, {
  s_id: 2,
  name: '李四',
  age: 18,
  sex: '男'
}, {
  s_id: 3,
  name: '王五',
  age: 18,
  sex: '男'
},{
  s_id: 4,
  name: '老六',
  age: 18,
  sex: '男'
}];
const hasSelection = ref(true);
const tableConfig = {
  hasSelection: () => hasSelection.value,
  selectable(row, index) {
    return index % 2 === 0;
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