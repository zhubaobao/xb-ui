import { watch } from "vue"
const useLink = (props, cb) => {
  const { linkOptionsProps, linkOptionsCb } = props.configData
  // 联动 option 内容修改
  if (
    Array.isArray(linkOptionsProps) &&
    linkOptionsProps.length > 0 &&
    linkOptionsCb
  ) {
    linkOptionsProps.forEach((item) => {
      watch(
        () => props.formData[item],
        (newVal) => {
          cb(newVal, item, linkOptionsCb);
        },
        {
          immediate: true
        }
      );
    });
  }

}
export default useLink;