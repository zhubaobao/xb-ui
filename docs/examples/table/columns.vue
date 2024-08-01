<template>
  <div class="xb-docs-examples">
  <xb-table :tableConfig="tableConfig">
    <!-- 自定义内容 sex 为 配置的 prop 的值 -->
    <template #sex="{ scope: { row } }">
      <el-tag v-if="row.sex == 1" type="info">男</el-tag>
      <el-tag v-else type="info">女</el-tag>
    </template>
    <!-- 自定义头部 otherHeader 为 配置的 prop 的值  + Header-->
     <template #otherHeader>
       我是自定义头部
     </template>
     <!-- contentType 为 expand 时 的内容-->
      <template #expand="{ scope: { row } }">
        <el-descriptions >
          <el-descriptions-item label="班级">{{ row.class }}</el-descriptions-item>
          <el-descriptions-item label="爱好">{{ row.love }}</el-descriptions-item>
        </el-descriptions>
      </template>
  </xb-table>
  </div>
</template>
<script setup>
const data = [{
  name: '张三',
  age: 18,
  sex: 1,
  other: 1,
  class: '1班',
  love: '篮球'
},{
  name: '李四',
  age: 18,
  sex: 0,
  other: 2,
  class: '1班',
  love: '羽毛球'
}];
const tableConfig = {
  requestApi: () => {
    return new Promise(resolve => resolve({
      code: 1,
      data: {
        list: data,
        total: data.length,
      }
    }))
  },
  propAttrs: {
    defaultExpandAll: true
  },
  headerConfig: {
    show: false,
  },
  operationConfig: {
    show: false,
  },
  footerConfig: {
    show: false,
  },
  hasSelect: false,
  columns: [
    {
      prop: 'expand',
      contentType: 'expand',
    },
    {
      prop: 'name',
      label: '姓名',
    },
    {
      prop: 'sex',
      label: '性别',
      contentType: 'template'
    },
    // 自定义表头
    {
      prop: 'other',
      showHeader: true,
    }
  ]
}
</script>