<template>
 	<div class="xb-docs-examples">
    <xb-submit :formConfig="formConfig" isPage></xb-submit>
  </div>
</template>
<script setup>

  const formConfig = {
    add: {
      title: '设置',
      requestApi: (parpams) => {
        return new Promise(resolve => {
          resolve({
            code: 1,
            msg: '设置成功'
          })
        })
      }
    },
    popupType: 'page',
    footerConfig: {
      cancelBtnShow: false,
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
</script>