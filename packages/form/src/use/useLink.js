import { ref, watch, computed } from "vue";
const useLink = (props, formData) => {
  // 需要显示的表单集合
  const showProp = ref({});
  // 控制显示隐藏
  const visibilityControl = (formItem) => {
    const { linkShowProps, linkShowCb, propName } = formItem;
    if (
      Array.isArray(linkShowProps) &&
      linkShowProps.length > 0 &&
      linkShowCb
    ) {
      linkShowProps.forEach((item) => {
        watch(
          () => formData.value[item],
          (newVal) => {
            showProp.value[propName] = linkShowCb(newVal, item, {
              ...formData.value,
            });
          },
          {
            immediate: true
          }
        );
      });
    }
  }
  const disabledProp = ref({});
  const disbaledControl = (formItem) => {
    const { linkDisabledProps, linkDisabledCb, propName } = formItem;
    // 改变禁用状态
    if (Array.isArray(linkDisabledProps) && linkDisabledProps.length > 0 && linkDisabledCb) {
      linkDisabledProps.forEach((item) => {
        watch(
          () => formData.value[item],
          (newVal) => {
            disabledProp.value[propName] = linkDisabledCb(newVal, item, {
              ...formData.value,
            });
          },
          {
            immediate: true
          }
        );
      });
    }
  }
  // 联动值初始化
  const watchInit = () => {
    let _formItems = [];
    const { formItems = [], tabs = [] } = props.config;
    if (formItems.length) {
      _formItems = formItems
    }
    // 如果tabs 切换
    if (tabs.length) {
      const totalFormDatas = [];
      tabs.forEach(item => {
        totalFormDatas.push(...item.formItems)
      })
      _formItems = totalFormDatas
    }
    _formItems.forEach((formItem) => {
      // 显示隐藏
      visibilityControl(formItem);
      // 启用禁用
      disbaledControl(formItem);
    });
  };
  watchInit();
  // 表单
  const initFormItems = (formItems) => {
    return formItems
      .map(item => {
        // 处理 时间范围 为2字段的
        if (item.propName && item.propName.includes("-")) {
          const keys = item.propName.split("-");
          item.startPropName = keys[0];
          item.endPropName = keys[1];
        }
        item.disabled = disabledProp.value[item.propName] || item.disabled || false;
        return item;
      })
      .filter(
        item => showProp.value[item.propName] !== false
      );
  }
  const formItems = computed(() => {
    const { formItems = [] } = props.config;
    return initFormItems(formItems);
  });
  // tabs
  const tabs = computed(() => {
    const cloneTabs = []
    props.config.tabs.forEach(item => {
      cloneTabs.push({
        ...item,
        formItems: initFormItems(item.formItems)
      })
    })
    // console.log(disabledProp.value, 'cloneTabscloneTabscloneTabs')
    return cloneTabs
  })

  return {
    showProp,
    formItems,
    tabs,
  }
}
export default useLink;