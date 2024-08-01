<template>
  <xb-form :config="config"></xb-form>
</template>
<script setup>
const config = {
  formItems: [
    {
      type: "XbSwitch",
      label: "是否禁用",
      defaultValue: true,
      propName: "disabled",
    },
    {
      type: "XbInput",
      label: "姓名",
      propName: "name",
      linkDisabledProps: ["disabled"],
      linkDisabledCb(val) {
        return val
      }
    },
    {
      type: "XbInput",
      label: "年龄",
      propName: "age",
      linkDisabledProps: ["disabled"],
      linkDisabledCb(val) {
        return val
      }
    }
  ]
}

</script>