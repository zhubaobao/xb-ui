<template>
  <el-switch
    v-model="searchVal"
    v-bind="configData.propAttrs"
    :disabled="disabled"
    @change="handleValueChange"
  >
  </el-switch>
</template>
<script>
import useLink from "./use/useLink";
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
  setup(props, context) {
    const searchVal = ref(props.formData[props.configData.propName]);
    // 监听值的变化
    watch(
      () => props.formData[props.configData.propName],
      (val) => {
        searchVal.value = val;
      }
    );
    const handleValueChange = (val) => {
      context.emit("eventChange", { [props.configData.propName]: val });
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
