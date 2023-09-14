import { defineComponent, ref, watch } from "vue";
const useCommon = (props, ctx) => {
  const searchVal = ref(props.formData[props.configData.propName]);
  // 监听值的变化
  watch(
    () => props.formData[props.configData.propName],
    (val) => {
      searchVal.value = val;
    }
  );
  const handleValueChange = (val) => {
    ctx.emit("eventChange", { [props.configData.propName]: val });
  };
  return {
    searchVal,
    handleValueChange
  }
};
export default useCommon;
