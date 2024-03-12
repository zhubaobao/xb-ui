<template>
  <el-checkbox-group
    v-model="searchVal"
    v-bind="configData.groupPropAttrs"
    @change="handleValueChange"
  >
    <el-checkbox
      v-bind="configData.propAttrs"
      v-for="item in configData.options"
      :key="item.id"
      :label="item.id"
      >{{ item.name }}</el-checkbox
    >
  </el-checkbox-group>
</template>
  <script>
import { defineComponent } from "vue";
import useCommon from "./use/useCommon";
export default defineComponent({
  name: "XbCheckbox",
  props: {
    configData: {
      type: Object,
      default: () => ({}),
    },
    modelValue: {},
  },
  emits: ["update:modelValue"],
  setup(props, ctx) {
    const { searchVal, handleValueChange } = useCommon(props, ctx);
    return {
      searchVal,
      handleValueChange,
    };
  },
});
</script>
  