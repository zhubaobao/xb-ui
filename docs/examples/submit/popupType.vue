<template >
    <div class="xb-docs-examples">
        <el-button type="primary" @click="handDrawer">抽屉</el-button>
        <el-button type="primary" @click="handDialog">弹窗</el-button>
        <el-button type="primary" @click="handPage">页面</el-button>
        <xb-submit :formConfig="drawerFormConfig" ref="drawerRef"></xb-submit>
        <xb-submit :formConfig="dialogFormConfig" ref="dialogRef"></xb-submit>
        <xb-submit :formConfig="pageFormConfig" ref="pageRef"></xb-submit>
    </div>
</template>
<script setup>
import { ref } from 'vue';
const common = {
  add: {
    requestApi: () => {
      return new Promise(resolve => {
        resolve({
          code: 1,
          msg: '提交成功'
        })
      })
    }
  },
  formItems: [
    {
      type:'XbInput',
      label: "姓名",
      placeholer: "请输入姓名"
    }
  ]
}
const dialogRef = ref(null);
const dialogFormConfig = {
  ...common,
  title: '弹窗',
  popupType: 'dialog',
}
const handDialog = () => {
  dialogRef.value.popupShow = true;
}

const pageRef = ref(null);
const pageFormConfig = {
  ...common,
  popupType: 'page',
}
const handPage = () => {
  pageRef.value.popupShow = true;
} 


const drawerRef = ref(null);
// popupType 默认 drawer
const drawerFormConfig = {
  ...common,
}

const handDrawer = () => {
  drawerRef.value.popupShow = true;
}

</script>