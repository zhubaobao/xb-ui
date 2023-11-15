import { ref } from "vue";
const useSearch = (props, ctx, config) => {
  const xbFormRef = ref(null);
  // 搜索
  const handleSearch = () => {
    ctx.emit('change', xbFormRef.value.formData)
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