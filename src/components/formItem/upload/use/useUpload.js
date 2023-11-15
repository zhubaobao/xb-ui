import { ElMessage } from 'element-plus';
import { ref, watch } from 'vue'

const useUpload = (props, ctx, config) => {
  // 初始化值
  const searchVal = ref([]);
  let initValue = props.formData[props.configData.propName]
  // 值处理
  const dealVal = (oldVal) => {
    let newVal = ''
    if (config.valueType === 'string') {
      newVal = oldVal ? oldVal.split(config.separator) : []
    }
    return newVal
  }
  searchVal.value = dealVal(initValue)
  console.log(searchVal.value, 'initValue')
  // 当前文件
  const file = ref({})
  // 预览文件列表
  const previewList = ref([]);

  // 裁剪dom
  const cropRef = ref(null);

  // 上传请求
  const upLoadRequest = async (val) => {
    previewList.value.push(val);
    const { requestApi, responseFormat, paramsFormat, fileKey } = config;
    let params = {}
    if (paramsFormat) {
      params = paramsFormat(val)
    } else {
      const formData = new FormData()
      formData.set(fileKey, val)
      params = formData
    }
    if (!requestApi) return false
    let res = await requestApi(params);

    res = responseFormat(res)
    if (res.code === 1) {
      searchVal.value.push(res.src);
      const val = config.valueType === 'string' ? searchVal.value.join(config.separator) : searchVal.value;
      ctx.emit("eventChange", { [props.configData.propName]: val });
    } else {
      ElMessage.error(res.msg || '上传失败')
    }
  };
  // 上传回调
  const handleRequest = (param) => {
    file.value = param.file;
    if (props.hasCrop) {
      cropRef.value.cropperDialogIsShow = true;
    } else {
      upLoadRequest(param.file);
    }
  };
  // 删除文件
  const handleFileDelete = (index) => {
    searchVal.value.splice(index, 1);
    previewList.value.splice(index, 1);
  }
  watch(
    () => props.formData[props.configData.propName],
    (val) => {
      const newVal = dealVal(val);
      searchVal.value = [...newVal];
      previewList.value = [...newVal];
    }
  );
  return {
    handleRequest,
    handleFileDelete,
    searchVal,
    previewList,
  }
}
export default useUpload