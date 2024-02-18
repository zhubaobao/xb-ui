<template>
  <el-switch
    v-model="searchVal"
    v-bind="configData.propAttrs"
    @change="handleValueChange"
  >
  </el-switch>
</template>
<script>
import { defineComponent, ref, watch } from "vue";
export default defineComponent({
  name: "XbSwitch",
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
    const searchVal = ref(props.formData[props.configData.propName]);
    // 监听值的变化
    watch(
      () => props.formData[props.configData.propName],
      (val) => {
        searchVal.value = val;
      }
    );
    const handleValueChange = (val) => {
      ctx.emit("eventChange", { [props.configData.propName]: val });
    };
    return {
      searchVal,
      handleValueChange,
    };
  },
});
</script>
