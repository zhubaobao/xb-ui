import { ref } from "vue";
const useSearch = (props, ctx, config) => {
  // 表单的值
  const formData = ref({});
  // 表单值初始化
  const formDataInit = () => {
    config.formItems.forEach((item) => {
      // 处理时间范围，后台需要2个字段的情况
      if (item.propName.includes('-')) {
        const defaultValue = item.defaultValue || []
        item.propName.split('-').forEach((key, index) => {
          formData.value[key] = defaultValue[index] || ''
        })
      } else {
        formData.value[item.propName] = item.defaultValue || "";
      }

    });
  };
  formDataInit();
  // from 表单值变化
  const handleEventChange = (data) => {
    formData.value = { ...formData.value, ...data };
  };
  // 时间范围处理

  // 搜索
  const handleSearch = () => {
    ctx.emit('change', formData.value)
  };
  // 重置
  const handleRefresh = () => {
    formDataInit();
    ctx.emit('change', formData.value)
  };
  return {
    formData,
    handleEventChange,
    handleSearch,
    handleRefresh
  }
}
export default useSearch