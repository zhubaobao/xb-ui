<template>
  <el-date-picker
    v-model="searchVal"
    v-bind="configData.propAttrs"
    :valueFormat="valueFormat"
    @change="handleValueChange"
    style="width: 100%"
  >
  </el-date-picker>
</template>
<script>
import { defineComponent, ref, watch } from "vue";
export default defineComponent({
  name: "XbDatePicker",
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
  setup(props, ctx) {
    // 初始化值
    const key = props.configData.propName;
    const isRang = key.includes("-");
    const searchVal = ref(isRang ? ["", ""] : "");

    // 处理时间范围，后台需要2个字段的情况
    if (isRang) {
      key.split("-").forEach((item, index) => {
        searchVal.value[index] = props.formData[item];
        watch(
          () => props.formData[item],
          (val) => {
            // 解决清空时searchVal 变成 null
            if (!Array.isArray(searchVal.value)) {
              searchVal.value = ["", ""];
            }
            searchVal.value[index] = val;
          }
        );
      });
    } else {
      searchVal.value = props.formData[key];
      // 监听值的变化
      watch(
        () => props.formData[key],
        (val) => {
          searchVal.value = val;
        }
      );
    }
    const handleValueChange = (val) => {
      let data = {};
      // 处理时间范围，后台需要2个字段的情况
      if (isRang) {
        key.split("-").forEach((key, index) => {
          data[key] = Array.isArray(val) ? val[index] : "";
        });
      } else {
        data = { [key]: val };
      }
      ctx.emit("eventChange", data);
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
