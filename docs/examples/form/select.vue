<template>
  <xb-form :config="config"></xb-form>
</template>
<script setup>
const config = {
  formItems: [
    {
      type: "XbSelect",
      label: "班级",
      propName: "class",
      defaultOptions: [
        {
          name: "一年级",
          id: "1"
        },
        {
          name: "二年级",
          id: "2"
        }
      ],
    },
    {
      type: "XbSelect",
      label: "学生",
      propName: "student",
      linkOptionsProps: ["class"],
      linkOptionsCb(val) {
        console.log(val, 'val')
        if(val == 1) {
          return [
            {
              name: "小明",
              id: "1"
            },
            {
              name: "小红",
              id: "2"
            }
          ]
        } else {
          return [
            {
              name: "小黄",
              id: "3"
            }
          ]
        }
      }
    },
  ]
}

</script>