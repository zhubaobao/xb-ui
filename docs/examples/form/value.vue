<template>
  <xb-form :config="config"></xb-form>
</template>
<script setup>
const config = {
  formItems: [
    {
      type: "XbInput",
      label: "单价",
      propName: "price",
    },
    {
      type: "XbInput",
      label: "数量",
      propName: "number",
    },
    {
      type: "XbInput",
      label: "总价",
      propName: "total",
      linkValueProps: ["price", "number"],
      linkValueCb(val, key, formData) {
        const { price, number } = formData;
        return price * number || ''
      }
    }
  ]
}

</script>