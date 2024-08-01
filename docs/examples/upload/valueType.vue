<template>
  <div class="xb-docs-examples">
    <xb-upload :configData="stringConfigData" v-model="stringValue"></xb-upload>
    字符串返回值：{{ stringValue }}
    <xb-upload :configData="arrayConfigData" v-model="arrayValue"></xb-upload>
    数组返回值：{{ arrayValue }}
    <xb-upload :configData="objectConfigData" v-model="objectValue"></xb-upload>
    对象返回值：{{ objectValue }}
  </div>
</template>
<script setup>
import { ref } from 'vue'
const common = {
  limit: 2,
  requestApi: () => {
    return new Promise((resolve) => {
      resolve({
        code: 1,
        data: {
          image: 'https://zhubaobao.github.io/xb-ui/images/xb-logo.png',
          name: '图片名称'
        }
      })
    })
  }
}
const stringValue = ref('')
const stringConfigData = {
  ...common,
  valueType: 'string'
}
const arrayValue = ref('')
const arrayConfigData = {
  ...common,
  valueType: 'array'
}
const objectValue = ref('')
const objectConfigData = {
  ...common,
  valueType: 'object'
}
</script>