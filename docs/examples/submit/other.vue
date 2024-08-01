<template>
   <div class="xb-docs-examples">
    <el-button @click="handleAdd" type="primary">添加</el-button>
    <xb-submit :formConfig="formConfig" ref="formRef"></xb-submit>
  </div>
</template>
<script setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
const formRef = ref(null);
const formConfig = {
  popupType: 'dialog',
  width: 400,
  openCb() {
    ElMessage.success('弹窗已经打开');
  },
  formItems: [
    {
      type: "XbInput",
      placeholder: "请输入姓名",
      propName: "name",
      label: "姓名"
    },
    {
      type: "XbInput",
      placeholder: "请输入年龄",
      propName: "name",
      label: "年龄"
    },
  ]
}
const handleAdd = () => {
  formRef.value.popupShow = true;
}
</script>