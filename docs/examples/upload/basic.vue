<template>
  <div class="xb-docs-examples">
    <xb-upload :configData="configData" v-model="value"></xb-upload>
  </div>
</template>
<script setup>
import { ref } from 'vue'; 
const value = ref('');
const configData = {
  limit: 2,
  width: 160,
  height: 80,
  propAttrs: {
    multiple: true,
    accept: 'image/*'
  },
  requestApi: () => {
    return new Promise((resolve) => {
      resolve({
        code: 1,
        data: 'https://zhubaobao.github.io/xb-ui/images/xb-logo.png'
      })
    })
  }
}
</script>