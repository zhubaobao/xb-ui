import { ref } from 'vue';
const useInit = (props) => {
  // 表单
  const formRef = ref(null);
  // 表单的值
  const formData = ref({});
  // 表单值初始化
  const formDataInit = () => {
    props.config.formItems.forEach((item) => {
      // 类型为text 或 不显示
      if (item.type === "text" || item.show === false) return;
      // 处理时间范围，后台需要2个字段的情况
      if (item.propName && item.propName.includes("-")) {
        const defaultValue = item.defaultValue || [];
        item.propName.split("-").forEach((key, index) => {
          formData.value[key] =
            defaultValue[index] === "undefined" ? "" : defaultValue[index];
        });
      } else {
        formData.value[item.propName] =
          item.defaultValue === "undefined" ? "" : item.defaultValue;
      }
    });
  };
  formDataInit();
  // from 表单值变化
  const handleEventChange = (data) => {
    formData.value = { ...formData.value, ...data };
  };
  return {
    formRef,
    formData,
    handleEventChange,
    formDataInit
  }
}
export default useInit