<template>
  <el-switch
    v-model="searchVal"
    v-bind="configData.propAttrs"
    @change="handleValueChange"
  >
  </el-switch>
</template>
<script>
import { defineComponent } from "vue";
import useCommon from './use/useCommon';
export default defineComponent({
  name: "XbSwitch",
  props: {
    configData: {
      type: Object,
      default: () => ({}),
    },
    modelValue: {},
  },
  emits: ["update:modelValue"],
  setup(props, ctx) {
     // 通用
    const { searchVal, handleValueChange } = useCommon(props, ctx);
    return {
      searchVal,
      handleValueChange,
    };
  },
});
</script>
