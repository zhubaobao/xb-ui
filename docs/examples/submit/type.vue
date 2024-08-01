<template>
  <div class="xb-docs-examples">
    <el-button type="primary" @click="handleAdd" >添加</el-button>
    <el-button type="primary" @click="handleEdit">编辑</el-button>
    <xb-submit :formConfig="formConfig" :type="type" ref="submitRef" @submit="handleSunmit"></xb-submit>
 </div>
</template>
<script setup>
import { nextTick, ref } from "vue";
import { ElMessage } from 'element-plus';
// 伪代码模拟表格数据
const data = [{
  s_id: 1,
  name: '张三',
  age: 18
}]
const submitRef = ref(null);
const type = ref('add');
const formConfig = {
  formAttrs: {
    rules: {
      name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
    },
  },
  save: {
    requestApi: (params) => {
       return new Promise(resolve => {
         resolve({
           code: 1,
           msg: '设置成功'
         })
       })
     }
  },
   add: {
    // 支持函数，字符串
     title: "添加",
     requestApi: (params) => {
       return new Promise(resolve => {
         resolve({
           code: 1,
           msg: '设置成功'
         })
       })
     }
   },
   edit: {
    // 标题
    title (xbFormRef) {  
       if (xbFormRef?.formData) {
        return "编辑" + xbFormRef.formData.name
       } 
       return "编辑"
     },
    // 请求接口
    requestApi: (params) => {
       return new Promise(resolve => {
         resolve({
           code: 1,
           msg: '设置成功'
         })
       })
     },
     // 该函数可以对请求参数进行数据处理, 如 时间格式的转换等
     paramsFormat(params) {
      const newParams = {
         ...params,
         age: 18
       }
      return newParams
     },
     // 该函数对请求接口返回值的一些处理, 如：如果接口返回的c ode 200为成功，那么需要转换为 1，
     responseFormat(res){
        return {
          code : 1,
          msg: ''
        }
     },
     // 表单验证规则
     rules: {},
     // 接口需要的 id  key 值, 如 api({ s_id: 1 })
     idKey: 's_id',
     // 表格数据中 id de key 值, 如 data 中 id 为 s_id
     idValueKey: 's_id',
   },
   footerConfig: {
     saveBtnShow: true,
   },
   formItems: [
     {
       type: "XbInput",
       placeholder: "请输入姓名",
       propName: "name",
       label: "姓名"
     },
     {
       type: "XbRadio",
       propName: "sex",
       label: "性别",
       options: [
         {
           name: "男",
           id: 1
         },
         {
           name: "女",
           id: 0
         }
       ]
     },
   ]
}

const handleAdd = () => {
  type.value = 'add';
  submitRef.value.popupShow = true;
}
const handleEdit = () => {
  type.value = 'edit';
  submitRef.value.popupShow = true;
  nextTick(() => {
    const formData = submitRef.value.xbFormRef.formData;
    for (let key in formData) {
      formData[key] = data[0][key];
    }
  })
}
const handleSunmit = (type) => {
  ElMessage.success(`${type} 操作成功回调`)
} 
</script>