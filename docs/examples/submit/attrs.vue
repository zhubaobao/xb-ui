<template>
  <div class="xb-docs-examples">
    <xb-submit :formConfig="formConfig" isPage></xb-submit>
  </div>
</template>
<script setup>

const formConfig = {
  // el-form 的属性方法
  formAttrs: {
    size: 'small',
    labelWidth: 200,
    labelSuffix: '张'
  },
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
      // el-form-item 的属性方法
      formItemPropAttrs: {
        labelWidth: 100,
      },
      // 子组件的属方法
      propAttrs: {
        size: 'large',
        change(val) {
          console.log(val);
        }
      },
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
</script>