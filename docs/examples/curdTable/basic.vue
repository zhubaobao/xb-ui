<template>
	<!-- 该div只为文档需要 -->
	<div class="xb-docs-examples" style="height: 400px;">
		<xb-curd-table :tableConfig="tableConfig" :formConfig="formConfig" :searchConfig="searchConfig"></xb-curd-table>
	</div>
</template>
<script setup>
import { ref } from "vue";
// 接口模拟
const data = ref([{
  id: 1,
	name: '章三',
	sex: '男',
	date: '2024-05-03',
},{
  id: 2,
	name: '李四',
	sex: '男',
	date: '2024-05-04',
}])
const requestApi = async (params) => {
  const _data = data.value.filter(item => !params.name || item.name.includes(params.name))
	return new Promise(resolve => resolve({
    code: 1,
    data: {
      list: _data,
      total: data.value.length
    }
  }))
}
// 表格配置
const tableConfig = {
	requestApi: requestApi,
  deleteConfig: {
    requestApi: (params) => {
      console.log(params)
      return new Promise(resolve => {
        data.value = data.value.filter(item => !params.ids.includes(item.id));
        resolve({
          code: 1
        })
      })
    },
  },
	columns: [
    {
			prop: 'id',
			label: 'ID',
		},
		{
			prop: 'name',
			label: '姓名',
		},
		{
			prop: 'sex',
			label: '姓别',
		},
		{
			prop: 'date',
			label: '生日',
		}
	]
}
// 表单配置
const formConfig = {
  add: {
    requestApi: (params) => {
      return new Promise(reslove => {
        let id = data.value.length > 0 ? data.value[data.value.length - 1].id : 0;
        data.value.push({...params, id: ++id});
        reslove({
          code: 1,
          msg: '新增成功'
        })
      })
    },
    title: '新增'
  },
  edit: {
    requestApi: (params) => {
      return new Promise(reslove => {
        let index = data.value.findIndex(item => item.id == params.id)
        data.value[index] = params
        reslove({
          code: 1,
          msg: '编辑成功'
        })
      })
    },
    title: '编辑',
  },
	formItems: [
		{
			propName: 'name',
			label: '姓名',
			type: 'XbInput',
			placeholder: '请输入姓名',
		},
		{
			propName: 'sex',
			label: '姓别',
			type: 'XbRadio',
      defaultValue: '男',
			options: [
				{
					name: '男',
					id: '男'
				},
        {
					name: '女',
					id: '女'
				}
			]
		},
    {
      propName: 'date',
			label: '日期',
			type: 'XbDatePicker',
			placeholder: '请选择日期',
      propAttrs: {
        format: 'YYYY-MM-DD',
        valueFormat: 'YYYY-MM-DD',
      }
    }
	]
}
// 搜索配置
const searchConfig = {
  formItems: [
    {
      propName: 'name',
      label: '姓名',
      type: 'XbInput',
      propAttrs: {
        placeholder: '请输入姓名',
      },
      layout: {
        span: 24, 
      }
    },
  ]
}
</script>