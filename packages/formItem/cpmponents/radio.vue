<template>
  <el-radio-group
    v-model="searchVal"
    v-bind="configData.groupPropAttrs"
    @change="handleValueChange"
  >
    <el-radio
      v-bind="configData.propAttrs"
      v-for="item in options"
      :key="item[keysCustom.id]"
      :label="item[keysCustom.id]"
      :value="item[keysCustom.id]"
      >{{ item[keysCustom.name] }}</el-radio
    >
  </el-radio-group>
</template>
<script>
import { defineComponent, ref } from "vue";
import useCommon from "./use/useCommon";
export default defineComponent({
  name: "XbRadio",
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
    const options = ref(props.configData.options);
    const keysCustom = props.configData.keysCustom || {
      id: "id",
      name: "name"
    }
    return {
      searchVal,
      handleValueChange,
      options,
      keysCustom
    };
  },
});
</script>
