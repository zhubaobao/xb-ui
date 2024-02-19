import { ref } from "vue";
const useSearch = (_, ctx) => {
  const xbFormRef = ref(null);
  // 搜索
  const handleSearch = () => {
    const { formData, showProp } = xbFormRef.value
    let finalData = { ...formData };
    for (let k in showProp) {
      !showProp[k] && finalData.hasOwnProperty(k)
        ? delete finalData[k]
        : "";
    }
    ctx.emit('change', finalData)
  };
  // 重置
  const handleRefresh = () => {
    xbFormRef.value.formDataInit();
    ctx.emit('change', xbFormRef.value.formData)
  };
  return {
    xbFormRef,
    handleSearch,
    handleRefresh
  }
}
export default useSearch