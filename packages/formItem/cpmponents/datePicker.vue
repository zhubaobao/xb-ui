<template>
  <el-date-picker
    v-model="searchVal"
    v-bind="configData.propAttrs"
    :valueFormat="valueFormat"
    @change="handleValueChange"
    style="box-sizing: border-box; "
    :style="{
      width: (configData.propAttrs && configData.propAttrs.width) || '100%',
    }"
  >
  </el-date-picker>
</template>
<script>
import { defineComponent, ref, watch  } from "vue";
export default defineComponent({
  name: "XbDatePicker",
  props: {
    configData: {
      type: Object,
      default: () => ({}),
    },
    modelValue: {},
    startValue: {
      type: String,
      default: ''
    },
    endValue: {
      type: String,
      default: ''
    }
  },
  emits: ["update:modelValue", "onUpdate:startValue", "onUpdate:endValue"],
  setup(props, ctx) {
    // 初始化值
    const key = props.configData.propName;
    const isRang = key.includes("-");
    const searchVal = ref(isRang ? ["", ""] : "");

    // 处理时间范围，后台需要2个字段的情况
    if (isRang) {

      // key.split("-").forEach((item, index) => {
      //   searchVal.value[index] = props.formData[item];
      //   watch(
      //     () => props.formData[item],
      //     (val) => {
      //       // 解决清空时searchVal 变成 null
      //       if (!Array.isArray(searchVal.value)) {
      //         searchVal.value = ["", ""];
      //       }
      //       searchVal.value[index] = val;
      //     }
      //   );
      // });
      searchVal.value[0] = props.startValue;
      searchVal.value[1] =  props.endValue
       // 监听值的变化
      watch(
        () => props.startValue,
        (val) => {
          searchVal.value[0] = val;
        }
      );
       // 监听值的变化
      watch(
        () => props.endValue,
        (val) => {
          searchVal.value[1] = val;
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
        if (Array.isArray(val)) {
          ctx.emit("update:startValue", val[0]);
          ctx.emit("update:endValue", val[1]);
        }
        
        // key.split("-").forEach((key, index) => {
        //   data[key] = Array.isArray(val) ? val[index] : "";
        // });
      } else {
        ctx.emit("update:modelValue", val);
      }
     
    };

    let valueFormat = "YYYY-MM-DD HH:mm:ss";
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
