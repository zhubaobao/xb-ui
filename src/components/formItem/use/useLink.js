import { ref, watch } from "vue";
const useLink = (props, cbs) => {
  const disabled = ref(props.configData.disabled);
  const { linkDisabledProps, linkDisabledCb, linkOptionsProps, linkOptionsCb } =
    props.configData;
  // 改变禁用状态
  if (Array.isArray(linkDisabledProps) && linkDisabledProps.length > 0) {
    linkDisabledProps.forEach((item) => {
      watch(
        () => props.formData[item],
        (newVal) => {
          disabled.value = linkDisabledCb(newVal, item);
        }
      );
    });
  }
  // option 内容修改
  if (Array.isArray(linkOptionsProps) && linkOptionsProps.length > 0) {
    linkOptionsProps.forEach((item) => {
      watch(
        () => props.formData[item],
        (newVal) => {
          cbs.linkOptionsCb(newVal, item, linkOptionsCb);
        }
      );
    });
  }

  return {
    disabled,
  };
};
export default useLink;
