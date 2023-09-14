import { computed, inject } from "vue";
import { deepMerge } from 'main/utils'
const useMergeConfig = (props) => {
  // 全局配置
  const { formConfig = {} } = inject('globalConfig')
  // 默认配置
  const defaultConfig = {
    popupType: 'drawer',
    drawerAttrs: {
    },
    formAttrs: {
      labelWidth: "100px",
      rules: {}
    },
    add: {
      title: '添加',
      rules: {},
      paramsFormat(val) {
        return val
      },
      responseFormat(val) {
        return val
      }
    },
    edit: {
      title: '修改',
      rules: {},
      idKey: 'id',
      paramsFormat(val) {
        return val
      },
      responseFormat(val) {
        return val
      }
    },
    formItems: []
  }
  // 表格参数，用于合并默认参数和用户自定义参数
  const config = deepMerge(deepMerge(defaultConfig, formConfig), props.formConfig);
  const rules = computed(() => ({ ...config.formAttrs.rules, ...config[props.type].rules }))

  return {
    config,
    rules
  }
}
export default useMergeConfig