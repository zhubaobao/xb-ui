<template>
  <div class="xb-docs-examples">
    <xb-submit :formConfig="formConfig" isPage></xb-submit>
  </div>
</template>
<script setup>

const formConfig = {
  // 第一个位置
  formAttrs: {
    rules: {
      name: [
        {
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        }
      ],
    }
  },
  add: {
    title: '设置',
    // 第二个位置，eiit 和 add 一样，根据type 取 对应的
    rules : {
      sex: [{
        required: true,
          message: '请输选择',
          trigger: 'blur'
      }]
    },
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
    {
      type: "XbInput",
      placeholder: "请输入年龄",
      propName: "age",
      label: "年龄",
      formItemPropAttrs: {
        rules: {
          required: true,
          message: '请输入年龄',
          trigger: 'blur'
        }
      }
    }
  ]
}
</script>