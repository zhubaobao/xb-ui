<template>
  <el-radio-group
    v-model="searchVal"
    v-bind="configData.groupPropAttrs"
    @change="handleValueChange"
  >
    <el-radio
      v-for="item in configData.options"
      :key="item.id"
      :label="item.id"
      >{{ item.name }}</el-radio
    >
  </el-radio-group>
</template>
<script>
import { defineComponent, ref, watch } from "vue";
export default defineComponent({
  name: "XbRadio",
  props: {
    configData: {
      type: Object,
      default: () => ({}),
    },
    formData: {
      type: Object,
      default: () => {},
    },
  },
  emits: ["eventChange"],
  setup(props, ctx) {
    // key
    const propName = props.configData.propName;
    const searchVal = ref(props.formData[propName]);
    // 监听值的变化
    watch(
      () => props.formData[propName],
      (val) => {
        searchVal.value = val;
      }
    );
    const handleValueChange = (val) => {
      ctx.emit("eventChange", { [propName]: val });
    };
    return {
      searchVal,
      handleValueChange,
    };
  },
});
</script>
