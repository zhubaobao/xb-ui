<template>
  <router-view></router-view>
</template>

<script setup>
</script>
<style lang="less" scoped>
#app,
body,
html {
  width: 100%;
  height: 100%;
  background-color: #f6f8f9;
  font-size: 12px;
}
a {
  color: #333;
  text-decoration: none;
}
a:hover,
a:focus {
  color: #000;
  text-decoration: none;
}
a:link {
  text-decoration: none;
}
a:-webkit-any-link {
  text-decoration: none;
}
a,
button,
input,
textarea {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  box-sizing: border-box;
  outline: none !important;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
}
</style>
