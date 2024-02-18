<template>
  <el-time-select
    v-model="searchVal"
    v-bind="configData.propAttrs"
    @change="handleValueChange"
    style="width: 100%"
  >
  </el-time-select>
</template>
<script>
import { defineComponent, ref, watch } from "vue";
export default defineComponent({
  name: "XbTimeSelect",
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
