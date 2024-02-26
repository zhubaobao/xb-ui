
import { ref } from 'vue';
const useInit = (props) => {
  // tabs 字段映射,用于校验时跳转到对应的tab
  const tabsFormItemKeys = ref({});
  // 表单
  const formRef = ref(null);
  // 表单的值
  const formData = ref({});
  // 表单值初始化
  const formDataInit = () => {
    let _formItems = [];
    const { formItems = [], tabs = [] } = props.config;
    if (formItems.length) {
      _formItems = formItems
    }
    // 如果tabs 切换
    if (tabs.length) {
      const totalFormDatas = [];
      tabs.forEach((item, index) => {
        totalFormDatas.push(...item.formItems)
        // 添加key
        item.formItems.forEach(formItem => {
          tabsFormItemKeys.value[formItem.propName] = `tab${index}`;
        })
      })
      _formItems = totalFormDatas
    }
    _formItems.forEach((item) => {
      // 类型为text 或 不显示
      if (item.type === "text" || item.show === false) return;
      // 处理时间范围，后台需要2个字段的情况
      if (item.propName && item.propName.includes("-")) {
        const defaultValue = item.defaultValue || [];
        item.propName.split("-").forEach((key, index) => {
          formData.value[key] = 
            defaultValue[index] === "undefined" ? "" : defaultValue[index];
        });
      } else {
        formData.value[item.propName] = 
          item.defaultValue === "undefined" ? "" : item.defaultValue;
      }
    });
  };

  formDataInit();

  const curTabName = ref('tab0');
  return {
    formRef,
    formData,
    formDataInit,
    curTabName,
    tabsFormItemKeys
  }
}
export default useInit