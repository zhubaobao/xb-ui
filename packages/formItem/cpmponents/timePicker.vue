<template>
  <el-time-picker
    v-model="searchVal"
    v-bind="configData.propAttrs"
    :valueFormat="valueFormat"
    @change="handleValueChange"
    style="box-sizing: border-box"
  >
  </el-time-picker>
</template>
<script>
import { defineComponent, ref, watch } from "vue";
export default defineComponent({
  name: "XbTimePicker",
  props: {
    configData: {
      type: Object,
      default: () => ({}),
    },
    modelValue: {},
    startValue: {
      type: String,
      default: "",
    },
    endValue: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue", "update:startValue", "update:endValue"],
  setup(props, ctx) {
    // 初始化值
    const key = props.configData.propName;
    const isRang = key.includes("-");
    const searchVal = ref(isRang ? ["", ""] : "");

    // 处理时间范围，后台需要2个字段的情况
    if (isRang) {
      searchVal.value[0] = props.startValue;
      searchVal.value[1] = props.endValue;
      // 监听值的变化
      watch(
        () => props.startValue,
        (val) => {
          if (Array.isArray(searchVal.value)) {
            searchVal.value[0] = val;
          }
        }
      );
      // 监听值的变化
      watch(
        () => props.endValue,
        (val) => {
          if (Array.isArray(searchVal.value)) {
            searchVal.value[1] = val;
          }
        }
      );
    } else {
      searchVal.value = props.modelValue;
      // 监听值的变化
      watch(
        () => props.modelValue,
        (val) => {
          searchVal.value = val;
        }
      );
    }
    const handleValueChange = (val) => {
      // 处理时间范围，后台需要2个字段的情况
      if (isRang) {
        val = Array.isArray(val) ? val : ["", ""];

        ctx.emit("update:startValue", val[0]);
        ctx.emit("update:endValue", val[1]);
      } else {
        ctx.emit("update:modelValue", val);
      }
    };
    let valueFormat = "HH:mm:ss";
    if (props.propAttrs && props.propAttrs.valueFormat) {
      valueFormat = props.propAttrs.valueFormat;
    }
    return {
      searchVal,
      valueFormat,
      handleValueChange,
    };
  },
});
</script>
