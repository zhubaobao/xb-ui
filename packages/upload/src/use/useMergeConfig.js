import { deepMerge } from 'main/utils'
import { inject } from 'vue';
const useMergeConfig = (props) => {
  // 全局配置
  const { uploadConfig = {} } = inject('globalConfig')
  // 默认配置
  const defaultConfig = {
    limit: 1,
    hasCrop: false,
    valueType: 'string',
    separator: ',',
    fileKey: 'file',
    responseFormat(val) {
      return val
    },
    keysCustom: {
      url: 'image',
      name: 'name'
    },
    requestApi: null
  }
  // 表格参数，用于合并默认参数和用户自定义参数
  const config = deepMerge(deepMerge(defaultConfig, uploadConfig), props.configData);
  return {
    config
  }
}
export default useMergeConfig