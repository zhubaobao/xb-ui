<template>
  <div class="xb-docs-examples">
    <div class="xb-docs-tool">
      <el-checkbox v-model="btnConfig.saveBtnShow">保存</el-checkbox>
      <el-checkbox v-model="btnConfig.submitBtnShow">提交</el-checkbox>
    </div>
    <xb-submit :formConfig="formConfig" isPage>
      <template #formBotton>
        <el-button>我是自定义按钮</el-button>
      </template>
      <template #formBotton-after>
        <el-button>我是自定义按钮</el-button>
      </template>
    </xb-submit>
  </div>
</template>
<script setup>
import { reactive } from 'vue';

const btnConfig = reactive({
  saveBtnShow: true,
  submitBtnShow: true
})
const formConfig = {
  popupType: 'page',
  save: {
    requestApi: (parpams) => {
      return new Promise(resolve => {
        resolve({
          code: 1,
          msg: '保存成功'
        })
      })
    }
  },
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
  // 显示支持函数 和 boolean, 
  footerConfig: {
    saveBtnShow() {
      return btnConfig.saveBtnShow
    },
    saveBtnTitle: '保存-改',
    cancelBtnShow: false,
    submitBtnShow() {
      return btnConfig.submitBtnShow
    },
    submitBtnTitle: '提交-改',
  },
  formItems: [
    {
      type: "XbInput",
      placeholder: "请输入姓名",
      propName: "name",
      label: "姓名"
    },
  ]
}

</script>
<style scoped lang="scss">
.xb-docs-tool {
  display: flex;
  margin-bottom: 30px;
}
</style>