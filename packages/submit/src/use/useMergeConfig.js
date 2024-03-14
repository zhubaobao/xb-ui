import { computed, inject } from "vue";
import { deepMerge } from 'main/utils'
const useMergeConfig = (props) => {
  // 全局配置
  const { formConfig = {} } = inject('globalConfig')
  // 默认配置
  const defaultConfig = {
    popupType: 'drawer',
    popupAttrs: {
      alignCenter: true
    },
    formAttrs: {
      labelWidth: "100px",
      rules: {}
    },
    footerConfig: {
      saveBtnTitle: "保存",
      saveBtnShow: false,
      cancelBtnTitle: "取消",
      cancelBtnShow: true,
      submitBtnTitle: "提交",
      submitBtnShow: true,
    },
    save: {
      paramsFormat(val) {
        return val
      },
      responseFormat(val) {
        return val
      }
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
      idValueKey: 'id',
      paramsFormat(val) {
        return val
      },
      responseFormat(val) {
        return val
      }
    },
    formItems: [],

  }
  // 表格参数，用于合并默认参数和用户自定义参数
  const isPage = props.formConfig.popupType == 'page';
  const config = deepMerge(deepMerge({ ...defaultConfig, layout: { span: isPage ? 13 : 24 } }, formConfig), props.formConfig);
  const rules = computed(() => ({ ...config.formAttrs.rules, ...config[props.type].rules }))

  return {
    config,
    rules
  }
}
export default useMergeConfig