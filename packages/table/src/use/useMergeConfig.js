import { deepMerge } from 'main/utils'
import { inject } from 'vue';
const useMergeConfig = (props) => {
  // 全局配置
  const { tableConfig = {} } = inject('globalConfig')
  // 默认配置
  const defaultConfig = {
    tableDataList: [],
    tableDataLoading: false,
    propAttrs: {
      height: "100%",
    },
    paramsFormat(val) {
      return val
    },
    hasSelection: true,
    selectable: () => true,
    headerConfig: {
      show: true,
      hasAdd: true,
      hasDelete: true,
      hasImport: false,
      hasBack: false,
      backCb() { }
    },
    importConfig: {
      requestApi: '',
      fileKey: 'file',
      accept: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'],
      responseFormat(val) {
        return val
      }
    },
    operationConfig: {
      show: true,
      hasDelete: true,
      hasEdit: true,
      hasDetails: false,
      hasCopy: false,
      width: 100
    },
    footerConfig: {
      show: true
    },
    deleteConfig: {
      deleteItemIdKey: 'id',
      deleteIdKey: 'ids',
      responseFormat(val) {
        return val
      }
    },
    columns: [],
    responseFormat(val) {
      return val
    }
  }

  // 表格参数，用于合并默认参数和用户自定义参数
  const config = deepMerge(deepMerge(defaultConfig, tableConfig), props.tableConfig);
  return {
    config
  }
}
export default useMergeConfig