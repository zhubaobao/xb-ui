<template>
  <xb-form :config="config"></xb-form>
</template>
<script setup>
const config = {
  formItems: [
    {
      type: "XbSwitch",
      label: "是否显示",
      defaultValue: true,
      propName: "visible",
    },
    {
      type: "XbInput",
      label: "姓名",
      propName: "name",
      linkShowProps: ["visible"],
      linkShowCb(val) {
        return val
      }
    },
    {
      type: "XbInput",
      label: "年龄",
      propName: "age",
      linkShowProps: ["visible"],
      linkShowCb(val) {
        return val
      }
    }
  ]
}

</script>