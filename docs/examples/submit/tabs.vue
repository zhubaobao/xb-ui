<template>
   <div class="xb-docs-examples">
    <xb-submit :formConfig="formConfig" isPage></xb-submit>
   </div>
</template>
<script setup>
const formConfig = {
  popupType: 'page',
  add: {
    requestApi: (parpams) => {
      return new Promise(resolve => {
        resolve({
          code: 1,
          msg: '设置成功'
        })
      })
    }
  },
  footerConfig: {
    cancelBtnShow: false
  },
  tabs: [
    {
      label: "tab1",
      formItems: [
        {
          type: "XbInput",
          placeholder: "请输入姓名",
          propName: "name",
          label: "姓名"
        },
      ]
    },
    {
      label: "tab2",
      formItems: [
        {
          type: "XbInput",
          placeholder: "请输入年龄",
          propName: "a ge",
          label: "年龄"
        },
      ]
    }
  ]
}
</script>