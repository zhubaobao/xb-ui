<template>
  <div class="xb-docs-examples">
    <xb-table :tableConfig="tableConfig">
    </xb-table>
  </div>
</template>
<script setup>
import { ref } from 'vue';
const data = ref([{
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
},]);
const tableConfig = {
  requestApi: () => {
    return new Promise(resolve => resolve({
      code: 1,
      data: {
        list: data.value,
        total: data.value.length
      }
    }))
  },
  headerConfig: {
    hasAdd: false
  },
  operationConfig: {
    hasEdit: false,
  },
  deleteConfig: {
    requestApi: (params) => {
      return new Promise(reslove => {
        data.value = data.value.filter(item => !params.s_ids.includes(item.s_id));
        reslove({
          code: 1
        })
      })

    },
    deleteItemIdKey: 's_id',
    deleteIdKey: 's_ids'
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
.xb-docs-tool {
  display: flex;
  margin-bottom: 30px;
}
</style>