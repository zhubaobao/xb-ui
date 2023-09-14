import { deepMerge } from 'main/utils'
const useMergeConfig = (props) => {

  const defaultConfig = {
    searchDataFormat(val) {
      return val
    },
    refreshDataFormat(val) {
      return val
    },
    formAttrs: {
      labelWidth: "100px",
    },
    formItems: [],
  }
  // 表格参数，用于合并默认参数和用户自定义参数
  const config = deepMerge(defaultConfig, props.searchConfig);

  return {
    config
  }
}
export default useMergeConfig