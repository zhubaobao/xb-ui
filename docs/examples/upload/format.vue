<template>
  <div class="xb-docs-examples">
    <xb-upload :configData="configData" v-model="value"></xb-upload>
  </div>
</template>
<script setup>
import { ref } from 'vue'; 
const value = ref('');
const configData = {
  fileKey: 'file', // 设置了 paramsFormat 无需设置 fileKey
  // 参数格式化
  paramsFormat(val) {
    const formData = new FormData()
    formData.set('file', val)
    return formData
  },
  // 返沪值格式化
  responseFormat(val) {
    return {
      code: 1,
      data: {
        url: val.data,
        name: '图片名称'
      }
    }
  },
  // 自定义 keysCustom
  keysCustom: {
    url: 'url',
  },
  requestApi: () => {
    return new Promise((resolve) => {
      resolve({
        code: 200,
        data: 'https://zhubaobao.github.io/xb-ui/images/xb-logo.png'
      })
    })
  }
}
</script>