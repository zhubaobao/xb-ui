<template>
  <el-input
    style="box-sizing: border-box"
    class="xb-input"
    v-model="searchVal"
    v-bind="configData.propAttrs"
    @change="handleValueChange"
  >
  </el-input>
</template>
<script>
import { defineComponent, watch } from "vue";
import useCommon from "./use/useCommon";
export default defineComponent({
  name: "XbInput",
  props: {
    configData: {
      type: Object,
      default: () => ({}),
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
  },
  emits: ["update:modelValue"],

  setup(props, ctx) {
    // 通用
    const { searchVal, handleValueChange } = useCommon(props, ctx);
    watch(
      () => props.modelValue,
      (val) => {
        searchVal.value = val;
      }
    );
    return {
      searchVal,
      handleValueChange,
    };
  },
});
</script>

