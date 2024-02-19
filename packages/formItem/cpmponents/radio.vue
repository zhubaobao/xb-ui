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
import { defineComponent } from "vue";
import useCommon from './use/useCommon';
export default defineComponent({
  name: "XbRadio",
  props: {
    configData: {
      type: Object,
      default: () => ({}),
    },
    modelValue: {
      type: [String, Number]
    },
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
