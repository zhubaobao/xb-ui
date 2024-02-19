import { ref, watch } from "vue";
const useCommon = (props, ctx) => {
  // 值
  const searchVal = ref(props.modelValue);
  // 监听值的变化
  watch(
    () => props.modelValue,
    (val) => {
      searchVal.value = val;
    }
  );
  const handleValueChange = (val) => {
    ctx.emit("update:modelValue", val);
  };
  return {
    searchVal,
    handleValueChange
  }
};
export default useCommon;
