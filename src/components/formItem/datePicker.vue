<template>
  <el-date-picker
    v-model="searchVal"
    v-bind="configData.propAttrs"
    :valueFormat="valueFormat"
    :disabled="disabled"
    @change="handleValueChange"
  >
  </el-date-picker>
</template>
<script>
import useLink from "./use/useLink";
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
    let initSearchVal = "";
    // 处理时间范围，后台需要2个字段的情况
    if (isRang) {
      initSearchVal = [];
      key.split("-").forEach((item, index) => {
        initSearchVal[index] = props.formData[item];
        watch(
          () => props.formData[item],
          (val) => {
            searchVal.value[index] = val;
          }
        );
      });
    } else {
      initSearchVal = props.formData[key];
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
          data[key] = val[index] || "";
        });
      } else {
        data = { [key]: val };
      }
      ctx.emit("eventChange", data);
    };

    const searchVal = ref(initSearchVal);
    let valueFormat = "YYYY-MM-DD HH:mm:ss";
    if (props.propAttrs && props.propAttrs.valueFormat) {
      valueFormat = props.propAttrs.valueFormat;
    }

    const { disabled } = useLink(props);
    return {
      searchVal,
      disabled,
      valueFormat,
      handleValueChange,
    };
  },
});
</script>
