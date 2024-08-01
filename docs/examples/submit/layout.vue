<template>
  <div class="xb-docs-examples">
    <xb-submit :formConfig="formConfig" isPage></xb-submit>
  </div>
</template>
<script setup>
import { ref } from 'vue';
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
  formAttrs: {
    labelWidth: 55,
  },
  layout: {
    span: 6
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
      propName: "age",
      label: "年龄"
    },
    {
      type: "XbInput",
      placeholder: "请输入学校",
      propName: "school",
      label: "学校"
    },
    {
      type: "XbInput",
      placeholder: "请输入年级",
      propName: "grade",
      label: "年级"
    },
    {
      type: "XbInput",
      placeholder: "请输入班级",
      propName: "class",
      label: "班级"
    },
    {
      type: "XbInput",
      placeholder: "请输入爱好",
      propName: "love",
      label: "爱好"
    },
    {
      type: "XbInput",
      placeholder: "请输入母亲名字",
      propName: "monther",
      label: "母亲"
    },
    {
      type: "XbInput",
      placeholder: "请输入父亲名字",
      propName: "age",
      label: "父亲"
    },
    {
      type: "XbInput",
      placeholder: "请输入备注",
      propName: "remark",
      label: "备注",
      layout: {
        span: 12
      }
    }
  ]
}
</script>