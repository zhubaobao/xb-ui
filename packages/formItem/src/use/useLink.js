import { watch, ref } from "vue";
import { deepCopy } from "main/utils";
const useLink = (props) => {
  const { formItem, formData } = props;
  const disabled = ref(formItem.disabled || false);
  const { linkDisabledProps, linkDisabledCb } = formItem;
  // 改变禁用状态
  if (Array.isArray(linkDisabledProps) && linkDisabledProps.length > 0 && linkDisabledCb) {
    linkDisabledProps.forEach((item) => {
      watch(
        () => formData[item],
        (newVal) => {
          disabled.value = linkDisabledCb(deepCopy(newVal), item, deepCopy(formData));
        },
        {
          immediate: true,
          deep: true
        }
      );
    });
  }
  return {
    disabled
  }
}
export default useLink;