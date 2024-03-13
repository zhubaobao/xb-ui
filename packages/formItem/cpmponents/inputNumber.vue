<template>
  <el-input-number
    style="box-sizing: border-box"
    v-model="searchVal"
    v-bind="config.propAttrs"
    @change="handleValueChange"
    :controlsPosition="config.propAttrs.controlsPosition"
  >
  </el-input-number>
</template>
<script>
import { defineComponent } from "vue";
import { deepMerge } from "main/utils";
import useCommon from "./use/useCommon";

export default defineComponent({
  name: "XbInputNumber",
  props: {
    configData: {
      type: Object,
      default: () => ({}),
    },
    modelValue: {},
  },
  emits: ["update:modelValue"],
  setup(props, ctx) {
    const defaultConfig = {
      placeholder: "请输入",
      propAttrs: {
        controlsPosition: "right",
      },
    };
    const config = deepMerge(defaultConfig, props.configData);
    // 通用
    const { searchVal, handleValueChange } = useCommon(props, ctx);
    return {
      searchVal,
      handleValueChange,
      config,
    };
  },
});
</script>
