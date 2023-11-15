<template>
  <el-input
    v-model="searchVal"
    v-bind="configData.propAttrs"
    :disabled="disabled"
    @change="handleValueChange"
    style="width: 100%"
  >
  </el-input>
</template>
<script>
import useLink from "./use/useLink";
import { defineComponent, ref, watch } from "vue";
export default defineComponent({
  name: "XbInput",
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
    const { disabled } = useLink(props);
    return {
      searchVal,
      disabled,
      handleValueChange,
    };
  },
});
</script>
