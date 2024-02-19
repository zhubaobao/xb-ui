<template>
  <el-time-picker
    v-model="searchVal"
    v-bind="configData.propAttrs"
    @change="handleValueChange"
   style="box-sizing: border-box; "
    :style="{
      width: (configData.propAttrs && configData.propAttrs.width) || '100%',
    }"
  >
  </el-time-picker>
</template>
<script>
import { defineComponent } from "vue";
import useCommon from './use/useCommon';
export default defineComponent({
  name: "XbTimePicker",
  props: {
    configData: {
      type: Object,
      default: () => ({}),
    },
     modelValue: {
      type: String,
      default: ''
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
