import { computed } from "vue";
const useSlot = (props) => {
  // 表格有自定义内容的列表: 看是否有优化的可能
  const columnsHasTemplateList = computed(() => {
    if (!Array.isArray(props.tableConfig.columns)) return [];
    return props.tableConfig.columns.filter(
      (item) => item.contentType === "template"
    );
  });
  // 表格有自定义头部的列表;
  const columnsHasHeaderList = computed(() => {
    if (!Array.isArray(props.tableConfig.columns)) return [];
    return props.tableConfig.columns.filter((item) => item.showHeader);
  });
  return {
    columnsHasTemplateList,
    columnsHasHeaderList
  }
}
export default useSlot