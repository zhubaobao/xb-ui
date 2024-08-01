<template>
  <div class="xb-docs-examples" >
    <xb-search :searchConfig="searchConfig" @change="handleSearch"></xb-search>
  </div>
</template>
<script setup>
import { ElMessage } from 'element-plus';
const searchConfig = {
  // 只是示例需求
  layout: {
    md: 24,
    xs: 24,
    sm: 24,
    lg: 24
  },
  // 搜索数据格式化
  searchDataFormat(val) {
    return val
  },
  // 重置数据格式化
  refreshDataFormat(val) {
    return val
  },
  formItems: [
    {
      propName: 'name',
      label: '姓名',
      type: 'XbInput',
      placeholder: '请输入姓名',
    },
  ]
}
const handleSearch = () => {
  ElMessage.success('操作成功');
}
</script>